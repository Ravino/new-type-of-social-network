<template>
    <div class="plz-gallery-description-header-body d-flex w-100 flex-column align-items-end">
        <div class="plz-gallery-description--footer d-flex w-100 p-3 mt-auto">
            <div class="plz-gallery-description--footer-pic mr-2">
                <img class="plz-gallery-description--footer-img" :src="getUserData.userPic" alt="avatar">
            </div>

            <TextEditor :clazz="`plz-text-editor h-auto  align-items-start flex-grow-1 `"
                        :editorPlaceholder="'Оставить комментарий...'"
                        :dropToDown="true"
                        :maximumCharacterLimit="10000"
                        workMode="comment"
                        @editorPost="onTextPost"
            >
            </TextEditor>

        </div>
    </div>
</template>

<script>
    import TextEditor from "../../common/TextEditor.vue";
    import ChatMixin from "../../mixins/ChatMixin.js";
    export default {
        name: "CommentGallery",
        components: {TextEditor},
        mixins: [ChatMixin],
        props: {
            postId: {
                type: Number|String,
            },
            imageId: {
                type: Number|String,
            },
        },
        computed: {
            getUserData() {
                return this.$root.$auth.user;
            },
        },
        methods: {
            async onTextPost(evData) {
                let msg = evData.postText.trim();

                if (msg !== '') {
                    const brExample = `<br/>`;
                    msg = msg.replace(/<p><\/p>/g, brExample);
                    msg = this.killBrTrail(msg);
                }

                this.sendCommentToGallery(msg);
            },
            async sendCommentToGallery(msg) {
                try {
                    let response = await this.$root.$api.$post.setGalleryComments(msg, this.postId, this.imageId);
                    this.$emit('updateComments', response.data);
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
        },
    }
</script>
