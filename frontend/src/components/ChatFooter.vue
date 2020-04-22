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

    killBrTrail(sText){
        const brExample = `<br/>`;

        while (true){
            const pos = sText.length - brExample.length;
            const trail = sText.substr(pos).toLowerCase();

            if (trail === brExample) {
                sText = sText.substr(0, pos);
            }
            else {
                break;
            }
        }

        return sText;
    },

    onFileChange(evData){
        window.console.log(evData, `ChatFooter::onFileChange`);
    },

    onImageChange(evData){
        window.console.log(evData, `ChatFooter::onImageChange`);
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
    }
}

}
</script>
