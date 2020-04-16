<template>
    <div class="w-100 d-flex px-5 " v-on:click="messageSettings = !messageSettings"
         :class="{ ' checked-message': messageSettings}">
        <div class="message-item d-flex w-100 justify-content-start"
             :class="calcMessageItemClass()">

                <label v-if="messageSettings" class="radio position-relative " > <!-- TODO: показать при клике на сообщение-->
                    <input type="checkbox" name="dateTimeId" ref="dateTimeId" id="dateTimeId" checked >
                    <span></span>
                </label>

            <div class="message-user-pic mt-auto">
                <img v-if="message.isMine" :src="ownerPic" :alt="currentDialog.firstname" class="message-user-img" />
                <img v-else :src="companionPic" :alt="companionName" class="message-user-img" />
            </div>
            <div class="message-body py-2" v-if="messageWriting">
                <p class="d-flex align-items-center mb-0">
                    <span class="loading ">
                        <span></span><span></span><span></span>
                    </span>
                    Печатает
                </p>
            </div>
            <div v-else class="message-body d-flex ">
                <div class="message-text">
                    <p class="mb-0">{{message.body}}</p>

                    <img class="message-sended-image mt-1" v-if="messageSendedImg" src="../images/user-main-photo.png" alt="">
                    <span class="message-sended-zip d-flex align-items-center mt-1" v-if="messageSendedZip" ><!-- TODO: Показать Архив -->
                        <IconZip />
                        <span class="message-sended-zip-info mx-2">
                            <span class="message-sended-name m-0">Dixy.zip</span>
                            <span class="message-sended-size m-0">15Mb</span>
                        </span>
                    </span>

                    <div class="message-resend pl-3 ml-3 mt-3" v-if="messageResend">
                        <div class="message-user-data  d-flex align-items-center mb-2 ">
                            <div class="media-pic border rounded-circle  mr-3">
                                <img src="/images/user-photos/user-photo-01.png" alt="Дарья">
                            </div>
                            <div class="media-body">
                                <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left" style="line-height: 20px;"> Дарья </h6>
                                <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block"> Понедельник </p>
                            </div>
                        </div>
                        <p>{{message.body}}</p>
                    </div>

                </div>
                <time v-if="!isNextIsSamePerson()" class="message-time mx-2" :datetime="message.createdAt">
                    {{ message.createdAt | lastMessageTime }}
                </time>
                <div class="message-info">
                    <span class="" :class="{ ' message-edited': messageEdited}">
                        <IconPencilEdit />
                    </span>
                    <span class="message-delivery ml-3" :class="{ ' message-readed': messageReaded }">
                        <IconCheckedDouble />
                    </span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import IconPencilEdit from "../icons/IconPencilEdit.vue";
import IconCheckedDouble from "../icons/IconCheckedDouble.vue";
import IconZip from "../icons/IconZip.vue";

export default {
name: 'ChatMessageItem',
    components: {IconPencilEdit, IconCheckedDouble, IconZip},
    props: {
    message : Object,
    next : Object | null,
    currentDialog: Object
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

    getCompanion() {
        let co = {};

        /**TODO: @TGA перетестировать в разных кейсах и убрать **/
        try {
            co = this.currentDialog.attendees[0];
        } catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString());
        }

        return co;
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

computed: {
    ownerPic(){
        return this.$root.$user.userPic;
    },

    companionName(){
        let com = null;
        try {
            com = this.getCompanion();
        } catch (e) {
            if (console !== undefined && console.error) console.error(e);
        }

        return (com  &&  com.firstName) ? com.firstName : '---';
    },

    companionPic(){
        let com = null;
        try {
            com = this.getCompanion();
        } catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString());
        }

        let res = (com  &&  com.userPic) ? com.userPic : this.$defaultAvatarPath;

        // TODO: @TGA выпилить когда перестанут сеять в БД lorempixel.com
        const url = document.createElement('a');
        url.href = res;

        if (`lorempixel.com` === url.hostname.toLowerCase()) {
            res = this.$defaultAvatarPath;
        }

        return res;
    },
},

mounted(){
}

}
</script>
