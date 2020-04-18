<template>
    <div class="w-100 d-flex px-5 " v-on:click="messageSettings = !messageSettings"
         :class="{ 'checked-message': messageSettings }">
        <div class="message-item d-flex w-100 justify-content-start"
                :class="calcMessageItemClass()">

            <!-- TODO: показать при клике на сообщение-->
            <label v-if="messageSettings" class="radio position-relative">
                <input type="checkbox" name="dateTimeId" ref="dateTimeId" id="dateTimeId" checked />
                <span></span>
            </label>

            <div v-if="!isNextIsSamePerson()" class="message-user-pic mt-auto">
                <img :src="message.userPic" :alt="message.firstName" class="message-user-img" />
            </div>

            <div v-if="messageWriting" class="message-body py-2">
                <p class="d-flex align-items-center mb-0">
                    <span class="loading ">
                        <span></span><span></span><span></span>
                    </span>
                    Печатает
                </p>
            </div>

            <div v-else class="message-body d-flex">
                <div class="message-text">
                    <p class="mb-0">{{message.body}}</p>

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
        </div>
    </div>
</template>

<script>
import IconPencilEdit from '../icons/IconPencilEdit.vue';
import IconCheckedDouble from '../icons/IconCheckedDouble.vue';
import IconZip from '../icons/IconZip.vue';

import PliziMessage from '../classes/PliziMessage.js';

export default {
name: 'ChatMessageItem',
components: {IconPencilEdit, IconCheckedDouble, IconZip},
props: {
    message : {
        type: PliziMessage,
        required : true
    },
    next : PliziMessage | null
},
data() {
    return {
        messageReaded: true,
        messageEdited: true,
        messageSendedImg: true,
        messageSendedZip: false,
        messageSettings: false,
        messageChecked: true,
        messageResend: true,
        messageWriting: false,
    }
},

methods: {
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
    }
},

mounted(){
}

}
</script>
