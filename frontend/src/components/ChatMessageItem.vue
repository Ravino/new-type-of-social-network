<template>
    <div class="w-100 d-flex px-5 " @click.prevent="pickMessage()"
         :class="{ 'checked-message': isPicked }">
        <div class="message-item d-flex w-100 justify-content-start"
                :class="calcMessageItemClass()">

            <label v-if="isPicked" class="radio position-relative">
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

            <div class="message-body d-flex"
                 :class="{'has-only-one-smile': detectSmiles}">
                <div class="message-text">
                    <div class="message-text-inner mb-0"
                         v-html="message.body"></div>

                    <template v-if="message.isAttachments">
                        <img v-if="messageSendedImg" class="message-sended-image mt-1" src="../images/user-main-photo.png" alt="" />

                        <!-- TODO: Показать архив -->
                        <span v-if="messageSendedZip" class="message-sended-zip d-flex align-items-center mt-1">
                            <IconZip />
                            <span class="message-sended-zip-info mx-2">
                                <span class="message-sended-name m-0">Dixy.zip</span>
                                <span class="message-sended-size m-0">15Mb</span>
                            </span>
                        </span>
                    </template>

                    <div v-if="message.isReply" class="message-resend pl-3 ml-3 mt-3">
                        <div class="message-user-data  d-flex align-items-center mb-2 ">
                            <div class="media-pic border rounded-circle mr-3">
                                <img :src="message.replyOn.userPic" :alt="message.replyOn.firstName" />
                            </div>
                            <div class="media-body">
                                <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left" style="line-height: 20px;">{{message.replyOn.firstName}}</h6>
                                <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">{{message.replyOn.createdAt | lastMessageTime}}</p>
                            </div>
                        </div>
                        <p>{{message.replyOn.body}}</p>
                    </div>
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

            <!-- TODO: показать при появлении чекбокса -->
            <div v-if="isPicked" class="messages-edit-group btn-group bg-white-br20 d-flex overflow-hidden">
                <button class="btn btn-message-share d-flex align-items-center justify-content-center border-right "
                        @click="openResendMessageModal()">
                    <IconShare  />
                    Переслать
                </button>
                <button class="btn btn-message-basket d-flex align-items-center justify-content-center ">
                    <IconBasket  />
                    Удалить
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import IconPencilEdit from '../icons/IconPencilEdit.vue';
import IconCheckedDouble from '../icons/IconCheckedDouble.vue';
import IconZip from '../icons/IconZip.vue';

import IconShare from '../icons/IconShare.vue';
import IconBasket from '../icons/IconBasket.vue';

import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatMessageItem',
components: {IconBasket, IconShare, IconPencilEdit, IconCheckedDouble, IconZip},
props: {
    message : {
        type: PliziMessage,
        required : true
    },
    pickedID: Number,
    next : PliziMessage | null
},

data() {
    return {
        //messageReaded: true,
        messageEdited: true,
        messageSendedImg: true,
        messageSendedZip: false,
        //messageSettings: false,
        //messageChecked: true,
        messageResend: true,
        messageWriting: false,
    }
},

methods: {
    pickMessage(){
        this.$emit( 'ChatMessagePick', {
            messageID: (this.pickedID !== this.message.id) ? this.message.id : -1
        });
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
            'compact-message'    :  isNextSame,
            'fullsize-message'   : !isNextSame
        }
    },

    openResendMessageModal() {
        this.$emit( 'ShowForwardMessageModal', {
            messageID: this.message.id
        });
    },
},

computed: {
    isPicked(){
        return this.message.id === this.pickedID;
    },
    detectSmiles() {
        let str = this.message.body.replace(/<\/?[^>]+>/g, '');

        if (!(!!str.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim())) {
            return str.match(/[\u{1F300}-\u{1F6FF}]/gu).length === 1;
        }

        return false;
    },
}
}
</script>

<style lang="scss">
    .has-only-one-smile {
        background-color: transparent !important;
        box-shadow: none;

        .message-text {
            .message-text-inner {
                font-size: 2.5rem !important;
            }
        }
    }
</style>
