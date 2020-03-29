<template>
    <div class="w-100">
        <div v-if="message.isMine" class="my-message">
            {{message.message}}
        </div>
        <div v-else class="companion-message">
            {{message.message}}
        </div>
    </div>
</template>

<script>
export default {
name: 'ChatMessageItem',
props: {
    message : Object,
    companion: Object,
    selfPerson: Object
},
data() {
    return {
    }
    // {
    //     message: `давай`,
    //         dtLabel : `2020-03-29 14:32:00`,
    //     isMine: false,
    //     isRead: false,
    //     isEdited: false
    // },
},

methods: {
},
mounted() {

}

}
</script>
