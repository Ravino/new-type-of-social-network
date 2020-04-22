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
                            <multiselect v-model="value"
                                         :options="options"
                                         :searchable="false"
                                         :close-on-select="true"
                                         :show-labels="false"
                                         :multiple="true"
                                         placeholder="Pick a value"></multiselect>
                        </div>

                        <div class="form-group">
                            <TextEditor :id="`chatFooter`" :showAvatar="false"
                                        :dropToDown="false"
                                        :clazz="`row plz-text-editor mb-4 px-1 py-4 h-auto align-items-start`"
                                        @editorPost="onTextPost" @editorFile="onFileChange" @editorImage="onImageChange">
                            </TextEditor>
                        </div>

                        <div class="form-group mb-4">
                            <ResendMessageItem v-if="pickedMessage"
                                               v-bind:message="msgData"></ResendMessageItem>
                        </div>
                    </form>

                    <button id="resendMessageSacces"
                            type="submit"
                            class="btn plz-btn plz-btn-primary mt-4">
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
},
data() {
    return {
        msgData : null,

        value: [
             'Pitter Pen'
        ],
        options: ['Vue.js', 'Javascript', 'Open Source', 'os' ],
        textareaValue: ''
    }
},
methods: {
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
                this.forwardChatMessage( );
            }
        }
    },

    onFileChange(evData){
        window.console.log(evData, `ChatFooter::onFileChange`);
    },

    onImageChange(evData){
        window.console.log(evData, `ChatFooter::onImageChange`);
    },

    forwardChatMessage(){
        window.console.log(`forwardChatMessage`);
    },

    addTag (newTag) {
        const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        };
        this.options.push(tag);
        this.value.push(tag);
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
