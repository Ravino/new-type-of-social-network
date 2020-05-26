<template>
    <div class="plz-comment-item">
        <div class="plz-comment-item-wrapper">
            <a class="plz-comment-item-data-name" :href="`user-${authorId}`">
                <img class="plz-comment-item-wrapper-avatar"
                     :src="checkAuthorAvatar"
                     :alt="name">
            </a>
        </div>
        <div class="plz-comment-item-data">
            <div class="plz-comment-item-data-info">
                <h6>
                    <a class="plz-comment-item-data-name" :href="`user-${authorId}`">
                       <b>{{name}}&nbsp;{{surname}}</b>
                    </a>
                </h6>
                <TextEditor
                    v-if="isEdit"
                    :clazz="`plz-text-editor h-auto  align-items-start flex-grow-1 `"
                    :dropToDown="true"
                    :maximumCharacterLimit="500"
                    workMode="post"
                    @editorPost="onTextPost"
                    :input-editor-text="text"
                ></TextEditor>
                <p v-else v-html="livePreview">{{text}}</p>
            </div>
            <div class="plz-comment-item-data-comment">
                <div class="plz-comment-item-reply">
                    <span class="plz-comment-item-reply-date">{{ getTimeComment }}</span>
                    <button class="plz-comment-item-reply-btn"
                            @click="isAnswer = !isAnswer"
                    >
                        Ответить
                    </button>
                    <button v-if="isEdit === false && isAuthor" @click="isEdit = true" class="plz-comment-item-reply-btn plz-comment-item-edit">
                        Изменить
                    </button>
                    <button v-if="isEdit === true" @click="isEdit = false" class="plz-comment-item-reply-btn plz-comment-item-edit">
                        Отменить
                    </button>
                </div>
                <div class="plz-comment-item-likes">
                    <IconHeard></IconHeard>
                </div>
            </div>
            <div class="plz-comment-item-wrapper-close">
                <button class="plz-comment-item-close-btn" v-if="isAuthor" @click="deleteComment"></button>
            </div>
            <CommentReply
                v-if="isAnswer"
                :commentId="commentId"
                :postId="postId"
                :name="name"
            ></CommentReply>
        </div>
    </div>
</template>

<script>
    import IconHeard from "../icons/IconHeard.vue";
    import CommentReply from "./CommentReply.vue";
    import moment from "moment";
    import LinkMixin from '../mixins/LinkMixin.js';
    import TextEditor from "../common/TextEditor.vue";
    import ChatMixin from "../mixins/ChatMixin.js";
    export default {
        name: "CommentItem",
        components: {TextEditor, CommentReply, IconHeard},
        mixins : [LinkMixin, ChatMixin],
        props: {
            name: {
                type: String,
            },
            text: {
                type: String,
            },
            avatar: {
                type: String,
            },
            surname: {
                type: String,
            },
            commentId: {
                type: Number,
            },
            authorId: {
                type: String|Number
            },
            postId: {
                type: String|Number
            },
            createdAt: {
                type: Number,
            },
        },
        data() {
            return {
                noAvatar: '../images/noavatar-256.png',
                isAnswer: false,
                isEdit: false,
            };
        },
        computed: {
            livePreview() {
                let str = this.text.replace(/<\/?[^>]+>/g, '').trim();
                let returnedStr = this.transformStrWithLinks(str);

                return str === returnedStr ? this.text : this.transformStrWithLinks(str);
            },
            checkAuthorAvatar() {
                if (this.avatar === null) {
                    return this.noAvatar;
                }

                return this.avatar;
            },
            getTimeComment() {
                return moment.unix(this.createdAt).fromNow();
            },
            isAuthor() {
                return this.$root.$auth.user.id === this.authorId;
            },
        },
        methods: {
            async onTextPost(evData){
                let msg = evData.postText.trim();

                if (msg !== '') {
                    const brExample = `<br/>`;
                    msg = msg.replace(/<p><\/p>/g, brExample);
                    msg = this.killBrTrail(msg);

                    this.updateComment(msg);
                    this.isEdit = false;
                }
            },
            async deleteComment() {
                try {
                    await this.$root.$api.$post.deleteCommentById(this.commentId);
                    this.$emit('onDelete', this.commentId);
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
            async updateComment(msg) {
                try {
                    let response = await  this.$root.$api.$post.editCommentById(this.commentId, msg);
                    this.$emit('update', response.data);
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            }
        }
    }
</script>
