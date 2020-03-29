<template>
    <div class="w-100 align-self-stretch my-auto --bg-info">
        <div class="d-flex flex-column --align-items-start">
            <ChatMessageItem v-for="(message) in messages" v-bind:message="message" v-bind:companion="companion" v-bind:self-person="selfPerson"></ChatMessageItem>
        </div>
    </div>
</template>

<script>
import ChatMessageItem from './ChatMessageItem.vue';

export default {
name: 'ChatMessages',
props: {
    messages : Array,
    companion: Object,
    selfPerson: Object
},
components: {ChatMessageItem},
data() {
    return {
    }
},

methods: {
},
mounted() {
}

}
</script>
