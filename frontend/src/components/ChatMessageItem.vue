<template>
    <div class="w-100 d-flex px-5 " :class="{ ' checked-message': true}"><!-- TODO: добавить сюда класс .checked-messageпри появлении чекбокса -->
        <div class="message-item d-flex w-100 justify-content-start"
             :class="calcMessageItemClass()">

                <label v-if="true" class="radio position-relative d-none" > <!-- TODO: показать при клике на сообщение-->
                    <input type="checkbox" name="dateTimeId" ref="dateTimeId" id="dateTimeId" >
                    <span></span>
                </label>

            <div class="message-user-pic mt-auto">
                <img v-if="message.isMine" :src="ownerPic" :alt="currentDialog.firstname" class="message-user-img" />
                <img v-else :src="companionPic" :alt="companionName" class="message-user-img" />
            </div>
            <div class="message-body">
                <div class="message-text">
                    <p>{{message.body}}</p>

                    <img class="message-sended-image" v-if="true" src="../images/user-main-photo.png" alt=""><!-- TODO: Показать картинку -->
                    <span class="message-sended-zip d-flex align-items-center" v-if="false" ><!-- TODO: Показать Архив -->
                        <IconZip />
                        <span class="message-sended-zip-info mx-2">
                            <p class="message-sended-name m-0">Dixy.zip</p>
                            <p class="message-sended-size m-0">15Mb</p>
                        </span>
                    </span>
                </div>
                <time v-if="!isNextIsSamePerson()" class="message-time" :datetime="message.createdAt">
                    {{ message.createdAt | lastMessageTime }}
                </time>
                <div class="message-info">
                    <span class="" :class="{ ' message-edited': true}"> <!--TODO:  -->
                        <IconPencilEdit />
                    </span>
                    <span class="message-delivery ml-3" :class="{ ' message-writed': true }"> <!--TODO:  -->
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
