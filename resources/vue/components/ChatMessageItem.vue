<template>
    <div class="w-100">
        <div class="message-item" :class="{ 'my-message': message.isMine, 'companion-message': !message.isMine, 'compact-message': isNextIsSamePerson() }">
            <div class="message-user-pic">
                <!-- // TODO: Please change this to message.userPic when mock will be done -->
                <img src="/images/chat/alexandra.png" alt="" />
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
    }
},
mounted(){
}

}
</script>
