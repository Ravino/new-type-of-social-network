<template>
    <div id="chatMessagesBody" class="w-100 align-self-stretch position-relative h-100">
        <vue-custom-scrollbar class="chat-messages-scroll py-4" :settings="customScrollbarSettings"
                              ref="vueCustomScrollbar">
            <div v-if="messagesList  &&  messagesList.length>0" class="d-flex flex-column">
                <div v-if="filteredMessages.length === 0" class="text-center">
                    <p v-if="filter.range &&  filter.range.isSameDate">
                        Ничего не найдено за <b>{{ rangeStart | toLongDate }}</b>
                    </p>
                    <p v-if="filter.range &&  !filter.range.isSameDate">
                        Ничего не найдено за период с <b>{{rangeStart | toLongDate}}</b>  по <b>{{rangeEnd | toLongDate}}</b>
                    </p>
                    <p v-if="!filter.range &&  filter.text!==''">
                        Не найдено сообщений с текстом <b>{{ filter.text }}</b>
                    </p>

                    <button class="btn btn-link --btn-filter-clear" @click="clearFilters">
                        Очистить фильтр
                    </button>
                </div>

                <transition-group v-else name="slide-fade" :duration="700">
                    <ChatMessageItem v-for="(message, messageIndex) in filteredMessages"
                                     v-if="message.id !== removeMessageID"
                                     @ChatMessagePick="onChatMessagePick"
                                     @ShowForwardMessageModal="onShowForwardMessageModal"
                                     @ShowReplyMessageModal="onShowReplyMessageModal"
                                     @RemoveMessage="onRemoveMessage"
                                     @openChatVideoModal="openChatVideoModal"
                                     v-bind:message="message"
                                     v-bind:next="getNext(messageIndex)"
                                     v-bind:pickedID="pickedMessageID"
                                     v-bind:dialogID="currentDialog.id"
                                     v-bind:key="message.id+`-`+messageIndex">
                    </ChatMessageItem>
                </transition-group>
            </div>
            <div v-else class="d-flex flex-column">
                <div v-if="currentDialog" class="alert alert-info mx-3">
                    <p v-if="currentDialog.isPrivate">Сейчас Вы ещё ничего не написали для <b>{{currentDialog.companion.fullName}}</b>.</p>
                    <p v-if="currentDialog.isGroup">Сейчас ещё никто ничего не написал в этом <b>групповом</b> чате.</p>
                </div>
            </div>
        </vue-custom-scrollbar>

        <ResendMessageModal v-if="resendMessageModalShow"
                            v-bind:pickedMessage="pickedMessage()"
                            v-bind:currentDialog="currentDialog"
                            v-bind:pickedID="pickedMessageID">
        </ResendMessageModal>

        <ReplyMessageModal v-if="replyMessageModalShow"
                            v-bind:pickedMessage="pickedMessage()"
                            v-bind:currentDialog="currentDialog"
                            v-bind:pickedID="pickedMessageID"
                           :attendees="currentDialog.attendees">
        </ReplyMessageModal>

        <ChatVideoModal v-if="chatVideoModalShow"
                        :videoLink="chatVideoModalContent.videoLink"></ChatVideoModal>
    </div>
</template>

<script>
import ChatMessageItem from './ChatMessageItem.vue';

/** @link https://binaryify.github.io/vue-custom-scrollbar/en/#why-custom-scrollbar **/
import vueCustomScrollbar from 'vue-custom-scrollbar';

/** TODO: переименовать в ForwardMessageModal **/
import ResendMessageModal from './ResendMessageModal.vue';
import ReplyMessageModal from './ReplyMessageModal.vue';
import ChatVideoModal from './ChatVideoModal.vue';

import PliziMessage from '../../classes/PliziMessage.js';

export default {
name: 'ChatMessages',
components: {
    vueCustomScrollbar,
    ChatMessageItem,
    ResendMessageModal, ReplyMessageModal,
    ChatVideoModal,
},

props: {
    messagesList: Array,
    currentDialog: Object,
    filter: Object
},

data() {
    return {
        pickedMessageID: 'unknown',
        replyMessageID: 'unknown',
        removeMessageID: 'unknown',
        previousMsg: null,
        resendMessageModalShow: false,
        replyMessageModalShow: false,

        customScrollbarSettings: {
            maxScrollbarLength: 60,
            suppressScrollX: true, // rm scroll x
        },
        chatVideoModalShow: false,
        chatVideoModalContent: {
            videoLink: null,
        },

        range_start : null,
        range_end : null
    }
},

methods: {
    pickedMessage() {
        let lMsg = this.messagesList.find((mItem) => {
            return mItem.id === this.pickedMessageID;
        });

        if (lMsg) {
            lMsg = new PliziMessage(lMsg);
        }
        else {
            window.console.warn(this.pickedMessageID + ` не найден`);
        }

        return lMsg;
    },

    onChatMessagePick(evData){
        this.pickedMessageID = evData.messageID;
    },

    openChatVideoModal(evData) {
        if (evData.videoLink) {
            this.chatVideoModalShow = true;
            this.chatVideoModalContent.videoLink = evData.videoLink;
        }
    },

    onRemoveMessage(evData){
        this.removeMessageID = evData.messageID;

        setTimeout(()=>{
            this.removeMessageById(this.removeMessageID);
            //this.checkUpdatedChatContainerHeight(); // FIXME: в этом компоненте нет такого метода
        }, 500);
    },

    async removeMessageById(msgID) {
        const fIndex = this.messagesList.findIndex((mItem) => {
            return mItem.id === msgID;
        });
        this.messagesList.splice(fIndex, 1);

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.messageDelete(msgID);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }
    },

    onShowForwardMessageModal() {
        this.resendMessageModalShow = true;
    },

    hideMessageResendModal() {
        this.$root.$emit('hideMessageResendModal', {});
    },

    onShowReplyMessageModal() {
        this.replyMessageModalShow = true;
    },

    hideReplyMessageModal() {
        this.$root.$emit('hideReplyMessageModal', {});
    },

    getNext(currIndex) {
        let ret = (currIndex < this.filteredMessages.length) ? this.filteredMessages[currIndex + 1] : null;
        return (typeof ret === 'undefined') ? null : ret;
    },

    scrollToEnd() {
        return setTimeout(() => {
            const container = this.$el.querySelector('.ps-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 200);
    },

    clearFilters() {
        this.$emit('clearFilters');
    },
},

computed: {
    filteredMessages() {
        // без фильтра
        if (''===this.filter.text  &&  this.filter.range===null) {
            return this.messagesList;
        }

        let rangeStart, rangeEnd;

        if (this.filter.range && this.filter.range.start && this.filter.range.end) {
            rangeStart = this.filter.range.start;
            rangeEnd = this.filter.range.end;

            this.rangeStart = rangeStart;
            this.rangeEnd = rangeEnd;
        }

        // есть и текст и дата
        if (this.filter.text && this.filter.range && rangeStart && rangeEnd) {
            const ft = this.filter.text.toLocaleLowerCase();

            if (ft.length > 2) {
                return this.messagesList.filter((msgItem) => {
                    return msgItem.body.toLowerCase().includes(ft) &&
                        (msgItem.createdAt > rangeStart) && (msgItem.createdAt < rangeEnd);
                });
            }
        }

        // есть только текст
        if (this.filter.text) {
            const ft = this.filter.text.toLocaleLowerCase();

            if (ft.length > 2)
                return this.messagesList.filter((msgItem) => {
                    return msgItem.body.toLowerCase().includes(ft);
                });
        }

        // только дата
        if (this.filter.range && rangeStart && rangeEnd) {
            return this.messagesList.filter((msgItem) => {
                return (msgItem.createdAt > this.filter.range.start) && (msgItem.createdAt < rangeEnd);
            });
        }

        return this.messagesList;
    }
},

mounted() {
    this.$root.$on('hideMessageResendModal', () => {
        this.resendMessageModalShow = false;
    });

    this.$root.$on('hideReplyMessageModal', () => {
        this.replyMessageModalShow = false;
    });

    this.$root.$on('hideChatVideoModal', () => {
        this.chatVideoModalShow = false;
    });

    this.scrollToEnd();
},

}
</script>
