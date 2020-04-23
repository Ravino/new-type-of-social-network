<template>
    <div class="modal" id="resendMessageModal" tabindex="-1" role="dialog" aria-labelledby="resendMessageModal"
          aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
          @click.stop="hideMessageResendModal">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div id="resendMessageModalBody" class="modal-body p-4">
                    <h5 class="resend-message-title text-left mb-3">Переслать собщение</h5>

                    <form id="resendMessageModalForm" novalidate="novalidate">
                        <div class="form-group">
                            <multiselect v-model="selectedFriend"
                                         :options="getFriendsCombo"
                                         label="fullName"
                                         track-by="fullName"
                                         :searchable="true"
                                         :close-on-select="true"
                                         :show-labels="false"
                                         :multiple="false"
                                         placeholder="Выберите друга">
                            </multiselect>
                        </div>

                        <div class="form-group">
                            <TextEditor id="forwardMessageEditor"
                                        ref="forwardMessageEditor"
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
                    </form>

                    <button type="button" class="btn plz-btn plz-btn-primary mt-4" @click.prevent="startForwardMessage()">
                        Отправить
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import TextEditor from '../common/TextEditor.vue';

import ChatMixin from '../mixins/ChatMixin.js';

import ResendMessageItem from './ResendMessageItem.vue';

//import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ResendMessageModal',
components: { ResendMessageItem, TextEditor },
mixins : [ChatMixin],
props: {
    pickedMessage: Object,
    messageID: Number,
    currentDialog: Object
},
data() {
    return {
        msgData : null,

        selectedFriend: null,
        textareaValue: ''
    }
},
methods: {
    startForwardMessage(){
        const dialog = this.$root.$user.getDialogByUser( this.selectedFriend.id );

        if (!dialog) {
            window.console.warn(`Диалог с ${this.selectedFriend.fullName} не найден!`);
            return;
        }

        //window.console.dir( dialog, `dialog` );

        const msgData = this.$refs.forwardMessageEditor.getContent();

        const fwdData = {
            chatId : dialog.id,
            body : msgData.postText,
            replyOnMessageId : this.msgData.id,
            forwardFromChatId : this.currentDialog.id,
            attachments : msgData.attachments
        };

        this.forwardChatMessage(fwdData);
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

    async forwardChatMessage( msgData ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatForwardMessage( msgData );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ){
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
        return this.$root.$user.fm.list;
    }
},

created(){
    this.msgData = this.pickedMessage;
    //window.console.log(`ResendMessageModal created`);
},
mounted(){
    //window.console.log(`ResendMessageModal mounted`);
}
}
</script>
