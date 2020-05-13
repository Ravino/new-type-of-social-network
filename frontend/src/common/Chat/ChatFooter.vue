<template>
    <div id="chatFooter" class="chat-footer">
        <TextEditor :showAvatar="false"
                    :dropToDown="false"
                    :clazz="`d-flex bg-white w-100 border-top position-relative mt-auto align-items-start px-3 py-3`"
                    workMode="chat"
                    :editorPlaceholder="placeholder"
                    :maximumCharacterLimit="500"
                    @editorNewHeight="onEditorChangeHeight"
                    @editorKeyDown="onEditorKeyDown"
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
        placeholder: 'Написать сообщение...',
        timeout: 0
    }
},

methods: {
    onEditorKeyDown(){
        /**
         * @TGA пытаемся тут через сокеты отправить инфу о  том что печатаем
         **/
        const keyPressData = {
            channel: window.localStorage.getItem('pliziChatChannel'),
            userId: this.$root.$auth.user.id,
            chatId: this.currentDialog.id
        };

        this.$root.$api.sendToChannel(keyPressData);
    },

    onAddAttachToTextEditor(evData){
        //window.console.log( evData.attach , `ChatFooter::onAddAttachToTextEditor`);
        //this.onEditorChangeHeight();
    },

    onEditorChangeHeight(evData) {
        this.$emit('chatFooterEditorChangedHeight', {
            changedHeight: evData.newHeight
        });
    },

    detectYoutubeLink(str) {
        let msg = str.replace(/<\/?[^>]+>/g, '').trim();
        let youtubeLinksRegExp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;

        return msg.match(youtubeLinksRegExp);
    },

    onTextPost(evData){
        /** @type {string} **/
        let msg = evData.postText.trim();

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                let youtubeIds = this.detectYoutubeLink(msg);

                if (youtubeIds && youtubeIds.length) {
                    youtubeIds.forEach((youtubeId) => {
                        this.addMessageToChat(`${youtubeId} ${msg}`);
                        msg = '';
                    });

                    if (evData.attachments && evData.attachments.length) {
                        this.addMessageToChat( '', evData.attachments );
                    }
                }
                else {
                    this.addMessageToChat( msg, evData.attachments );
                }
            } else if (evData.attachments.length > 0) {
                this.addMessageToChat( '', evData.attachments );
            }
        }
        else {
            // сообщение пустое - проверяем есть ли аттачи
            if (evData.attachments.length > 0) {
                this.addMessageToChat( '', evData.attachments );
            }
        }
    },


    async addMessageToChat( msgText, attachments ){
        const chatId = (this.currentDialog) ? this.currentDialog.id : 'unknown';

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.messageSend( chatId, msgText, attachments );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ){
            // делим на 1000 потому, что тут JS считает в миллисекундах
            const nowDT = +( (new Date()).valueOf() / 1000).toFixed(0);

            const newMessage = {
                id: apiResponse.data.id,
                userId: this.$root.$auth.user.id,
                chatId: chatId,
                firstName: this.$root.$auth.user.firstName,
                lastName: this.$root.$auth.user.lastName,
                userPic: this.$root.$auth.user.userPic,
                sex: this.$root.$auth.user.sex,
                body: msgText,
                isMine: true,
                isRead: false,
                isEdited: false,
                createdAt: nowDT,
                updatedAt: nowDT,
                attachments: { list : attachments },
                replyOn: null,
                isForward: null
            };

            //const eventData = {
            //    chatId : apiResponse.data.chatId,
            //    message : apiResponse.data
            //}

            const eventData = {
                chatId : chatId,
                message : newMessage
            }

            this.$root.$emit( 'newMessageInDialog', eventData );
        }
        else{
            window.console.info( apiResponse );
        }
    },
},

mounted(){
    //this.$root.$on('userIsTyping', this.someoneTyping);
}

}
</script>
