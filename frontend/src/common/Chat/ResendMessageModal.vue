<template>
    <div class="modal" id="resendMessageModal" tabindex="-1" role="dialog" aria-labelledby="resendMessageModal"
          aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
          @click.stop="hideMessageResendModal">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div id="resendMessageModalBody" class="modal-body p-4">
                    <h5 class="resend-message-title text-left mb-3">Переслать собщение</h5>

                    <div class="form" id="resendMessageModalForm">
                        <div class="form-group">
                            <multiselect v-model="selectedFriend"
                                         :options="getFriendsCombo"
                                         label="fullName"
                                         track-by="fullName"
                                         :searchable="true"
                                         :close-on-select="true"
                                         :show-labels="false"
                                         :multiple="false"
                                         placeholder="Выберите получателя">
                                <template slot="option" slot-scope="props">
                                    <div class="plz-receivers-item d-flex align-items-center py-1 px-3">

                                        <span class="plz-receiver-userpic text-body">
                                            <img class="plz-short-userpic rounded-circle" :src="props.option.userPic" :alt="props.option.firstName"/>

                                            <span v-if="props.option.isOnline" class="plz-short-isonline" title="в сети"></span>
                                            <span v-else class="plz-short-isoffline" title="не в сети"></span>
                                        </span>

                                        <div class="plz-receiver-title flex align-items-center mr-auto ">
                                            <span class="plz-receiver-name">
                                                {{props.option.fullName}}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <TextEditor id="forwardMessageEditor"
                                        ref="forwardMessageEditor"
                                        workMode="chat"
                                        :showAvatar="false"
                                        :dropToDown="false"
                                        :clazz="`row plz-text-editor mb-4 px-1 py-4 align-items-start`"
                                        @editorPost="onTextPost">
                            </TextEditor>
                        </div>

                        <div class="form-group mb-4">
                            <ResendMessageItem v-if="pickedMessage"
                                               v-bind:message="msgData"></ResendMessageItem>
                        </div>
                    </div>

                    <button type="button" class="btn plz-btn plz-btn-primary mt-4" @click.prevent="startForwardMessage()">
                        Отправить
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import TextEditor from '../TextEditor.vue';

import ChatMixin from '../../mixins/ChatMixin.js';

import ResendMessageItem from './ResendMessageItem.vue';

import PliziMessage from '../../classes/PliziMessage.js';
import PliziRecipientsCollection from '../../classes/Collection/PliziRecipientsCollection.js';

export default {
name: 'ResendMessageModal',
components: { ResendMessageItem, TextEditor },
mixins : [ChatMixin],
props: {
    pickedMessage: PliziMessage | null,
    messageID: Number,
    currentDialog: Object
},
data() {
    return {
        /** @var PliziRecipientsCollection **/
        recipients :null,
        msgData : null,
        /** @var PliziRecipient */
        selectedFriend: null
    }
},
methods: {
    startForwardMessage(){
        const msgData = this.$refs.forwardMessageEditor.getContent();

        const config = {
            chatId : this.selectedFriend.chatId,
            userId : this.selectedFriend.id,
        }

        const fwdData = {
            body : msgData.postText,
            replyOnMessageId : this.msgData.id,
            forwardFromChatId : this.currentDialog.id,
            attachments : msgData.attachments,
            isForward: true
        };

        this.forwardChatMessage(config, fwdData);
    },

    hideMessageResendModal() {
        this.$root.$emit('hideMessageResendModal', {});
    },

    onTextPost(evData){
        /** @type {string} **/
        let msg = evData.postText.trim();

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                this.forwardChatMessage();
            }
        }
    },

    async forwardChatMessage( config, msgData ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.messageForward( config, msgData );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            const eventData = {
                dialogId : apiResponse.data.chatId,
                message : apiResponse.data
            }

            this.$root.$emit( 'newMessageInDialog', eventData );
            this.hideMessageResendModal();
        }
        else{
            window.console.info( apiResponse );
        }
    }
},

computed: {
    getFriendsCombo(){
        this.recipients = new PliziRecipientsCollection();

        /** @TGA сначала диалоги - это важно **/
        this.$root.$auth.dm.asArray().map( (dItem) => {
            this.recipients.add(dItem.companion, dItem.id);
        });

        this.$root.$auth.fm.list.map( (frItem) => {
            this.recipients.add(frItem, null);
        });

        return this.recipients.asArray();
    }
},

created(){
    this.msgData = this.pickedMessage;
}

}
</script>
