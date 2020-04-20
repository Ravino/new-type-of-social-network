<template>
    <img :src="src" :alt="alt" :class="classnames">
</template>

<script>
    export default {
        name: "PostImage",
        props: {
            classnames: {
                type: String,
                default: null,
            },
            src: {
                type: String,
                default: null,
            },
            alt: {
                type: String,
                default: null,
            },
        },
    }
</script>

<style scoped>

</style>
