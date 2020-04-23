<template>
    <TextEditor :id="`chatFooter`" :showAvatar="false"
                :dropToDown="false"
                :clazz="`bg-white w-100 border-top position-relative mt-auto d-flex align-items-start px-3 py-3 `"
        @editorPost="onTextPost" @editorFile="onFileChange" @editorImage="onImageChange">
    </TextEditor>
</template>

<script>
import TextEditor from '../common/TextEditor.vue';
import PliziDialog from '../classes/PliziDialog.js';

import ChatMixin from '../mixins/ChatMixin.js';

export default {
name: 'ChatFooter',
props: {
    currentDialog: {
        type: PliziDialog | null,
        required: true
    }
},
components: {
    TextEditor
},
mixins : [ChatMixin],

data() {
    return {
    }
},

methods: {
    onTextPost(evData){
        /** @type {string} **/
        let msg = evData.postText.trim();

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                this.addMessageToChat( msg );
            }
        }
    },

    onFileChange(evData){
        window.console.log(evData, `ChatFooter::onFileChange`);
    },

    onImageChange(evData){
        this.addImageToChat( evData.files );
    },

    async addMessageToChat( msgText ){
        const chatId = (this.currentDialog) ? this.currentDialog.id : -1;

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatSend( chatId, msgText );
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
    },


    async addImageToChat( picsArr ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatAttachment( picsArr );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ){
            window.console.log(apiResponse, `apiResponse`);

            //const eventData = {
            //    dialogId : apiResponse.data.chatId,
            //    message : apiResponse.data
            //}
            //
            //this.$root.$emit( 'newMessageInDialog', eventData );
        }
        else{
            window.console.info( apiResponse );
        }
    }

}

}
</script>
