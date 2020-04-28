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
                                     @ChatMessageReply="onChatMessageReply"
                                     @ShowForwardMessageModal="onShowForwardMessageModal"
                                     @RemoveMessage="onRemoveMessage"
                                     @openChatVideoModal="openChatVideoModal"
                                     v-bind:message="message"
                                     v-bind:next="getNext(messageIndex)"
                                     v-bind:pickedID="pickedMessageID"
                                     v-bind:replyID="replyMessageID"
                                     v-bind:dialogID="currentDialog.id"
                                     v-bind:key="message.id">
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
                            v-bind:pickedMessage="pickedMessage"
                            v-bind:currentDialog="currentDialog"
                            v-bind:pickedID="pickedMessageID">
        </ResendMessageModal>

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
import ChatVideoModal from './ChatVideoModal.vue';

import PliziMessage from '../../classes/PliziMessage.js';

export default {
    name: 'ChatMessages',
    components: {
        vueCustomScrollbar,
        ChatMessageItem,
        ResendMessageModal,
        ChatVideoModal,
    },

    props: {
        messagesList: Array,
        currentDialog: Object,
        filter: Object
    },

data() {
    return {
        pickedMessageID: -1,
        replyMessageID: -1,
        removeMessageID: -1,
        previousMsg: null,
        resendMessageModalShow: false,

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
    onChatMessagePick(evData){
        this.pickedMessageID = evData.messageID;
    },

    onChatMessageReply(evData){
        this.replyMessageID = evData.messageID;
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

    getNext(currIndex) {
        let ret = (currIndex < this.filteredMessages.length) ? this.filteredMessages[currIndex + 1] : null;
        return (typeof ret === 'undefined') ? null : ret;
    },

    scrollToEnd() {
        return setTimeout(() => {
            const container = this.$el.querySelector('.ps-container');
            container.scrollTop = container.scrollHeight;
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

        let range_start, range_end;

        if (this.filter.range && this.filter.range.start && this.filter.range.end) {
            range_start = this.filter.range.start;
            range_end = this.filter.range.end;

            this.rangeStart = range_start;
            this.rangeEnd = range_end;
        }

        // есть и текст и дата
        if (this.filter.text && this.filter.range && range_start && range_end) {
            const ft = this.filter.text.toLocaleLowerCase();

            if (ft.length > 2) {
                return this.messagesList.filter((msgItem) => {
                    return msgItem.body.toLowerCase().includes(ft) &&
                        (msgItem.createdAt > range_start) && (msgItem.createdAt < range_end);
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
        if (this.filter.range && range_start && range_end) {
            return this.messagesList.filter((msgItem) => {
                return (msgItem.createdAt > this.filter.range.start) && (msgItem.createdAt < range_end);
            });
        }

        return this.messagesList;
    },

    pickedMessage() {
        if (this.pickedMessageID < 0)
            return {};

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
},

mounted() {
    this.$root.$on('hideMessageResendModal', () => {
        this.resendMessageModalShow = false;
    });

    this.$root.$on('hideChatVideoModal', () => {
        this.chatVideoModalShow = false;
    });

    this.scrollToEnd();
},

}
</script>

<style lang="scss">
.btn-filter-clear {
    color: #1554F7;
    text-decoration: underline;

    &:hover {
        box-shadow: none;
    }
}
</style>
