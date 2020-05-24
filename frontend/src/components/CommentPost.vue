<template>
    <div class="plz-comment-post">
        <div class="plz-comment-post-user">
            <img :src="getUserData.userPic" alt="">
        </div>
        <TextEditor :clazz="`plz-text-editor h-auto  align-items-start flex-grow-1 `"
                    :editorPlaceholder="'Оставить комментарий...'"
                    :dropToDown="true"
                    :maximumCharacterLimit="10000"
                    workMode="post"
                    @editorPost="sendComment"
                    :inputEditorText="this.comment"
        >
        </TextEditor>
    </div>
</template>
<script>
    import TextEditor from "../common/TextEditor";
    export default {
        name: "CommentPost",
        components: {TextEditor},
        props: {
            postId: {
                type: Number|String,
            },
        },
        data() {
            return {
                comment: 'Hi all',
            };
        },
        mounted() {
            console.log(this.getUserData)
            console.log(this.comment);
        },
        computed: {
            getUserData() {
                return this.$root.$auth.user;
            },
        },
        methods: {
            async sendComment() {
                let response = null;

                try {
                    response = await this.$root.$api.$post.setPostComments(this.comment, this.postId);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

            },
            async getCommentsOnPost() {
                let response = null;

                try {
                    response = await this.$root.$api.$post.getCommentsById(this.postId);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

            },
        },
    }
</script>

