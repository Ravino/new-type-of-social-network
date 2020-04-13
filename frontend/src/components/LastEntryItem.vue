<template>
    <div class="plz-last-entry-item mb-2">
        <img v-bind:src="entryItem.src" class="plz-last-entry-user-pic" :alt="entryItem.fullName"/>
        <div class="d-inline-block text-center mx-auto px-4 my-0">
            <a href="#/profile" :class="{ 'text-black-50' : !entryItem.isUser, 'text-body': entryItem.isUser }"
               class="">{{entryItem.fullName}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LastEntryItem',
        props: {
            entryItem: Object
        },
        data() {
            return {}
        },
    }
</script>
