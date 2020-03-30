<template>
    <div class="w-100">
        <div class="message-item" :class="{ 'my-message': message.isMine, 'companion-message': !message.isMine, 'compact-message': isNextIsSamePerson() }">
            <div v-if="message.isMine" class="message-user-pic">
                <img :src="selfPerson.userPic" alt="" />
            </div>
            <div v-else class="message-user-pic">
                <img :src="companion.userPic" alt="" />
            </div>
            <div class="message-body">
                <div class="message-text">{{message.message}}</div>
                <time v-if="!isNextIsSamePerson()" class="message-time" :datetime="message.dtLabel">
                    {{message.dtLabel | lastMessageTime}}
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
    companion: Object,
    selfPerson: Object
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
