<template>
    <div class="w-100">
        <div class="message-item" :class="{ 'my-message': message.isMine, 'companion-message': !message.isMine, 'compact-message': isNextIsSamePerson() }">
            <div class="message-user-pic">
                <img v-if="message.isMine"  src="/images/noavatar-256.png" :alt="currentDialog.firstname" class="message-user-img" />
                <img v-else :src="companionPic" :alt="companionName" class="message-user-img" />
            </div>
            <div class="message-body">
                <div class="message-text">{{message.body}}</div>
                <time v-if="!isNextIsSamePerson()" class="message-time" :datetime="message.createdAt">
                    {{message.createdAt | lastMessageTime}}
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
            co = JSON.parse(JSON.stringify(co));
        } catch (e) {
            if (window.console !== undefined && window.console.error) window.console.warn(e.toString());
        }

        return co;
    }
},

computed: {
    companionName: function(){
        let com = null;
        try {
            com = this.getCompanion();
        } catch (e) {
            if (console !== undefined && console.error) console.error(e);
        }

        return (com  &&  com.firstname) ? com.firstname : '---';
    },

    companionPic: function(){
        let com = null;
        try {
            com = this.getCompanion();
        } catch (e) {
            if (console !== undefined && console.error) console.error(e);
        }

        return (com  &&  com.userPic) ? com.userPic : '/images/noavatar-256.png';
    },
},

mounted(){
}

}
</script>
