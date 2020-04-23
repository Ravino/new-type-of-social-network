<template>
    <div class="modal" id="chatVideoModal" tabindex="-1" role="dialog" aria-labelledby="chatVideoModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="hideChatVideoModal">

        <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">
                <iframe v-if="youtubeId" type="text/html"
                        :src="`http://www.youtube.com/embed/${youtubeId}?enablejsapi=1`"
                        frameborder="0" style="height: 640px;"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatVideoModal",
        props: {
            youtubeId: {
                type: String,
                default: null,
            },
        },
        methods: {
            hideChatVideoModal() {
                this.$root.$emit('hideChatVideoModal', {});
            },
        },
    }
</script>

<style scoped>

</style>
