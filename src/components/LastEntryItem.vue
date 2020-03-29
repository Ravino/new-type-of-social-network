<template>
    <div class="--media border w-25 mr-3 p3 d-block p-1">
        <img v-bind:src="entryItem.src" class="d-block w-75 my-2 mx-auto" :alt="entryItem.fullName" />
        <div class="d-block w-100 text-center pb-2">
            <a href="#" :class="{ 'text-black-50' : !entryItem.isUser, 'text-body': entryItem.isUser }" class="">{{entryItem.fullName}}</a>
        </div>
    </div>
</template>

<script>
export default {
name: 'LastEntryItem',
props: {
    entryItem : Object
},
data () {
    return {
    }
},

methods: {
}

}
</script>

