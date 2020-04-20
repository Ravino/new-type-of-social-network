<template>
    <!--
    @TGA: от внешнего вида не пугаться, потом починим
    использовать события для получения инфы
    -->

    <TextEditor :id="`chatFooter`" :showAvatar="false" :clazz="`bg-white w-100 border-top position-relative mt-auto`"
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
        window.console.log(evData.postText, `ChatFooter::onTextPost`);
        if (evData.postText.trim() !== '') {
            this.addMessageToChat( evData.postText.trim() );
        }
    },

    onFileChange(evData){
        window.console.log(evData, `ChatFooter::onFileChange`);
    },

    onImageChange(evData){
        window.console.log(evData, `ChatFooter::onImageChange`);
    },

    async addMessageToChat( msgText ){
        const chatId = (this.currentDialog) ? this.currentDialog.id : -1;

        const newMsg = {
            body : msgText,
            createdAt : Math.floor( (new Date()).getTime() / 1000 ),
            isMine : true,
            isRead : false,
            isEdited : false
        };

        let apiResponse = null;

        try{
            apiResponse = await this.$root.$api.chatSend( chatId, newMsg.body );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ){
            window.console.dir( apiResponse.data, `apiResponse` );

            const eventData = {
                dialogId : (this.currentDialog) ? this.currentDialog.id : -1,
                message : apiResponse.data
            }

            this.$root.$emit( 'newMessageInDialog', eventData );
            this.newMessage = ``;
        }
        else{
            window.console.info( apiResponse );
        }
    }
}

}
</script>
