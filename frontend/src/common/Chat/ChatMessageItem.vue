<template>
    <div class="w-100 d-flex px-5" @click.prevent="pickMessage()"
         :class="{ 'checked-message': isPicked }"
         :id="messageID">
        <div class="message-item d-flex w-100 justify-content-start"
                :class="calcMessageItemClass()">

            <label v-if="isPicked" class="radio">
                <input type="checkbox" name="dateTimeId" ref="dateTimeId" id="dateTimeId" checked />
                <span></span>
            </label>

            <div v-if="!isNextIsSamePerson()" class="message-user-pic mt-auto">
                <img :src="message.userPic" :alt="message.firstName" class="message-user-img" />
            </div>

            <!-- TODO: @TGA мы это перенесём отсюда -->
            <div v-if="false" class="message-body py-2">
                <p class="d-flex align-items-center mb-0">
                    <span class="loading ">
                        <span></span><span></span><span></span>
                    </span>
                    Печатает
                </p>
            </div>

            <div class="message-body d-flex">
                <div class="message-text" @click.stop="detectYoutubeLink ? openChatVideoModal() : null">
                    <div class="message-text-inner mb-0" v-html="msgBody"></div>
                    <ChatMessageItemAttachments v-bind:message="message"></ChatMessageItemAttachments>
                    <ChatMessageItemReplyContent v-if="message.isReply"
                                                 v-bind:replyOn="message.replyOn"
                                                 v-bind:isForward="message.isForward"
                    ></ChatMessageItemReplyContent>
                </div>

                <time v-if="!isNextIsSamePerson()" class="message-time mx-2" :datetime="message.createdAt">
                    {{ message.createdAt | lastMessageTime }}
                </time>

                <div class="message-info">
                    <span v-if="message.isMine &&  message.isEdited" class="message-edited">
                        <IconPencilEdit />
                    </span>
                    <span v-if="message.isMine" class="message-delivery ml-3" :class="{ 'message-readed': message.isRead }">
                        <IconCheckedDouble />
                    </span>
                </div>
            </div>

            <div v-if="isPicked  &&  !isShowReplyBlock" class="messages-edit-group btn-group bg-white-br20 d-flex overflow-hidden">
                <button class="btn btn-message-share d-flex align-items-center justify-content-center border-right"
                        @click="onForwardBtnClick()">
                    <IconShare />
                    Переслать
                </button>

                <button v-if="!message.isMine" class="btn btn-message-reply d-flex align-items-center justify-content-center border-right"
                        @click="onReplyBtnClick()">
                    <i class="far fa-comment-dots mr-2"></i>
                    Ответить
                </button>

                <button v-if="message.isMine" class="btn btn-message-basket d-flex align-items-center justify-content-center"
                        @click.prevent="onRemoveBtnClick()">
                    <IconBasket />
                    Удалить
                </button>
            </div>

            <div v-if="isPicked  &&  isShowReplyBlock" class="messages-reply-group bg-white-br20">
                <div class="text-editor-wrapper bg-white-br20" @click.stop="">
                    <TextEditor :showAvatar="false"
                                :dropToDown="false"
                                :height="40"
                                workMode="chat"
                                :clazz="`d-flex h-100 w-100 --border-top m-0 px-3 py-3`"
                                @editorPost="onReplyPost">
                    </TextEditor>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import IconPencilEdit from '../../icons/IconPencilEdit.vue';
import IconCheckedDouble from '../../icons/IconCheckedDouble.vue';

import IconShare from '../../icons/IconShare.vue';
import IconBasket from '../../icons/IconBasket.vue';

import TextEditor from '../TextEditor.vue';

import ChatMessageItemReplyContent from './ChatMessageItemReplyContent.vue';
import ChatMessageItemAttachments from './ChatMessageItemAttachments.vue';

import ChatMixin from '../../mixins/ChatMixin.js';

import PliziMessage from '../../classes/PliziMessage.js';

export default {
name: 'ChatMessageItem',
components: {
    ChatMessageItemAttachments, ChatMessageItemReplyContent,
    TextEditor,
    IconBasket, IconShare, IconPencilEdit, IconCheckedDouble
},
mixins : [ChatMixin],
props: {
    message : {
        type: PliziMessage,
        required : true
    },
    dialogID: Number,
    pickedID: Number,
    next : PliziMessage | null
},

data() {
    return {
        messageEdited: true,
        messageResend: true,
        messageWriting: false,
        isShowReplyBlock: false
    }
},

computed: {
    isPicked(){
        return this.message.id === this.pickedID;
    },

    messageID(){
        return 'message-' + this.message.id;
    },

    msgBody(){
        return this.message.body;
    },

    currentDialog(){
        return this.$parent.currentDialog;
    },

    detectEmoji() {
        /** @TGA когда в сообщении только один эмоджи он приходит в обёртке <p class="big-emoji">емоджа</p> **/
        //let str = this.message.body.replace(/<\/?[^>]+>/g, '');
        //window.console.log(this.message.body + ` :${str}:`);
        //if (!(!!str.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim())) {
        //    return str.match(/[\u{1F300}-\u{1F6FF}]/gu).length === 1;
        //}
        //return false;

        return this.message.body.includes('<p class="big-emoji">');
    },

    detectYoutubeLink() {
        let str = this.message.body.replace(/<\/?[^>]+>/g, '').trim();
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = str.match(regExp);

        return (match && match[7].length === 11) ? match[7] : false;
    },
},

methods: {
    onReplyPost(evData){
        /** @type {string} **/
        let msg = evData.postText.trim();

        const config = {
            chatId : this.dialogID,
            userId : null // чтобы Reply получился
        }

        const fwdData = {
            body : msg,
            replyOnMessageId : this.message.id,
            forwardFromChatId : this.dialogID,
            attachments : evData.attachments,
            isForward: true
        };

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                this.replyOnMessage( config, fwdData );
            }
        }
        else { // сообщение пустое - проверяем есть ли аттачи
            if (evData.attachments.length > 0) {
                this.replyOnMessage( config, fwdData );
            }
        }
    },

    async replyOnMessage( config, msgData ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatForwardMessage( config, msgData );
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

    pickMessage(){
        this.$emit( 'ChatMessagePick', {
            messageID: (this.pickedID !== this.message.id) ? this.message.id : -1,
        });
    },

    openChatVideoModal() {
        this.$emit( 'openChatVideoModal', {
            videoLink: this.message.body.replace(/<\/?[^>]+>/g, '').trim(),
        })
    },

    isNextIsSamePerson() {
        if (null === this.next)
            return false;

        let nextID = this.next.isMine ? 1 : 0;
        let msgID = this.message.isMine ? 1 : 0;

        return (nextID === msgID);
    },

    calcMessageItemClass(){
        const isNextSame = this.isNextIsSamePerson();

        return {
            'my-message ml-auto flex-row-reverse': this.message.isMine,
            'companion-message ' : !this.message.isMine,
            'compact-message'    : isNextSame,
            'fullsize-message'   : !isNextSame,
            'has-only-one-emoji' : this.detectEmoji,
            'youtube-link'       : this.detectYoutubeLink,
        }
    },

    onForwardBtnClick() {
        this.$emit( 'ShowForwardMessageModal', {
            messageID: this.message.id
        });
    },

    onReplyBtnClick() {
        this.isShowReplyBlock = true;
    },

    onRemoveBtnClick() {
        this.$emit( 'RemoveMessage', {
            messageID: this.message.id
        });
    },

    livePreview() {
        if (this.detectYoutubeLink) {
            this.msgBody = `<img src="//img.youtube.com/vi/${this.detectYoutubeLink}/0.jpg" alt="" />`;
        }
    },
},

mounted() {
    this.livePreview();
}
}
</script>
