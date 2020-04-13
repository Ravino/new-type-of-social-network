<template>
    <div class="w-100 d-flex">
        <div class="message-item d-flex w-100 justify-content-start"
             :class="calcMessageItemClass()">
            <div class="message-user-pic mt-auto">
                <img v-if="message.isMine" :src="ownerPic" :alt="currentDialog.firstname" class="message-user-img" />
                <img v-else :src="companionPic" :alt="companionName" class="message-user-img" />
            </div>
            <div class="message-body">
                <div class="message-text">{{message.body}}</div>
                <time v-if="!isNextIsSamePerson()" class="message-time" :datetime="message.createdAt">
                    {{ message.createdAt | lastMessageTime }}
                </time>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'ChatMessageItem',
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
