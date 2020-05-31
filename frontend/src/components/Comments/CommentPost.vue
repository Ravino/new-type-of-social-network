<template>
    <div class="plz-comment-post">
        <div class="plz-comment-post-user mr-3">
            <img :src="getUserData.userPic" alt="">
        </div>
        <TextEditor :clazz="`plz-text-editor h-auto plz-comment-post-text-field align-items-start flex-grow-1 `"
                    :editorPlaceholder="'Оставить комментарий...'"
                    :dropToDown="true"
                    :maximumCharacterLimit="500"
                    workMode="comment"
                    @editorPost="onTextPost"
        >
        </TextEditor>
    </div>
</template>
<script>
    import TextEditor from "../../common/TextEditor.vue";
    import ChatMixin from "../../mixins/ChatMixin.js";
    export default {
        name: "CommentPost",
        components: {TextEditor},
        mixins: [ChatMixin],
        props: {
            postId: {
                type: Number|String,
            },
        },
        computed: {
            getUserData() {
                return this.$root.$auth.user;
            },
        },
        methods: {
            async onTextPost(evData){
                let msg = evData.postText.trim();

                if (msg !== '') {
                    const brExample = `<br/>`;
                    msg = msg.replace(/<p><\/p>/g, brExample);
                    msg = this.killBrTrail(msg);

                    if (msg !== '') {
                        this.sendComment(msg, evData.attachments);
                    } else if (evData.attachments.length > 0) {
                        this.sendComment('', evData.attachments);
                    }
                } else {
                    if (evData.attachments.length > 0) {
                        this.sendComment('', evData.attachments );
                    }
                }
            },
            async sendComment(msg, attachments) {
                try {
                    let response = await this.$root.$api.$post.setPostComments(msg, this.postId, attachments);
                    this.$emit('updateComments', response.data);
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
        },
    }
</script>

