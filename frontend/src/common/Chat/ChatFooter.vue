<template>
    <div id="chatFooter" class="" > <!-- // TODO Показать высоту футтера -->
        <TextEditor :showAvatar="false"
                    :dropToDown="false"
                    :height="32"
                    :clazz="`d-flex bg-white w-100 border-top position-relative mt-auto align-items-start px-3 py-3`"
                    @editorChangeHeight="onEditorChangeHeight"
                    @newAttach="onAddAttachToTextEditor"
            @editorPost="onTextPost">
        </TextEditor>
    </div>
</template>

<script>
import TextEditor from '../TextEditor.vue';
import PliziDialog from '../../classes/PliziDialog.js';

import ChatMixin from '../../mixins/ChatMixin.js';

export default {
name: 'ChatFooter',
props: {
    currentDialog: {
        type: PliziDialog | null,
        required: true
    }
},
components: { TextEditor },
mixins : [ChatMixin],

data() {
    return {
    }
},

methods: {
    onAddAttachToTextEditor(evData){
        window.console.log( evData.attach , `ChatFooter::onAddAttachToTextEditor`);
    },

    onEditorChangeHeight(evData) {
        this.$emit('chatFooterEditorChangedHeight', {
            changedHeight: evData.newHeight
        });
    },

    onTextPost(evData){
        /** @type {string} **/
        let msg = evData.postText.trim();

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                this.addMessageToChat( msg, evData.attachments );
            }
        }
        else { // сообщение пустое - проверяем есть ли аттачи
            if (evData.attachments.length > 0) {
                this.addMessageToChat( '', evData.attachments );
            }
        }
    },

    async addMessageToChat( msgText, attachments ){
        const chatId = (this.currentDialog) ? this.currentDialog.id : -1;

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatSend( chatId, msgText, attachments );
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
        }
        else{
            window.console.info( apiResponse );
        }
    }

}

}
</script>
