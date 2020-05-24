<template>
    <div class="comment-item">
        <p>{{name}}</p>
    </div>
</template>

<script>
    export default {
        name: "CommentItem",
        props: {
            name: {
                type: String,
            },
        },
    }
</script>

<style lang="scss">

</style>
