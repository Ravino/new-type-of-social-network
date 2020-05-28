<template>
    <div class="plz-comment-item">
        <div class="plz-comment-item-wrapper">
            <a class="plz-comment-item-data-pic" :href="`user-${authorId}`">
                <img class="plz-comment-item-data-img"
                     :src="checkAuthorAvatar"
                     :alt="name">
            </a>
        </div>
        <div class="plz-comment-item-data">
            <div class="plz-comment-item-holder">
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
                        workMode="comment"
                        @editorPost="onTextPost"
                        :input-editor-text="text"
                    ></TextEditor>
                    <p v-else v-html="livePreview">{{text}}</p>
                    <Gallery v-if="images.length > 0" :images="imageList"></Gallery>
                </div>
                <div class="plz-comment-item-data-comment">
                    <div class="plz-comment-item-reply d-flex">
                        <span class="plz-comment-item-reply-date">{{ getTimeComment }}</span>
                        <button class="plz-comment-item-reply-btn pl-2"
                                @click="isAnswer = !isAnswer"
                        >
                            Ответить
                        </button>
                        <button v-if="isEdit === false && isAuthor"
                                @click="isEdit = true"
                                class="plz-comment-item-reply-btn plz-comment-item-edit pl-2"
                        >
                            Изменить
                        </button>
                        <button v-if="isEdit === true"
                                @click="isEdit = false"
                                class="plz-comment-item-reply-btn plz-comment-item-edit"
                        >
                            Отменить
                        </button>
                    </div>
                    <div class="plz-comment-item-likes">
                        <IconHeard></IconHeard>
                    </div>
                </div>
            </div>
             <div class="plz-comment-item__wrapper-answers"
                  v-for="answer of answers"
                  :key="answer.id"
             >
                 <CommentItem
                     :answers="answer.thread ? answer.thread.list : []"
                     :key="answer.id"
                     :commentId="answer.id"
                     :text="answer.body"
                     :authorId="answer.author.id"
                     :name="answer.author.profile.firstName"
                     :surname="answer.author.profile.lastName"
                     :avatar="answer.author.profile.avatar.image.medium.path"
                     :postId="postId"
                     :createdAt="answer.createdAt"
                     @onDelete="removeComment"
                     @update="editComment"
                     @updateAnswers="updateAnswers"
                 >
                 </CommentItem>
             </div>
            <div class="plz-comment-item-wrapper-close">
                <button class="plz-comment-item-close-btn" v-if="isAuthor" @click="deleteComment"></button>
            </div>
            <CommentReply
                v-if="isAnswer"
                :commentId="commentId"
                :postId="postId"
                :name="name"
                @addComment="addComment"
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
    import Gallery from "../common/Gallery.vue";
    import PliziAttachment from "../classes/PliziAttachment.js";
    export default {
        name: "CommentItem",
        components: {Gallery, TextEditor, CommentReply, IconHeard},
        mixins: [LinkMixin, ChatMixin],
        props: {
            images: {
                type: Array,
            },
            answers: {
                type: Array,
            },
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
                type: String | Number
            },
            postId: {
                type: String | Number
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
            imageList() {
                // Its not images its attachments !
                return this.images.map(file => new PliziAttachment(file)).filter(attachment => attachment.isImage);
            },
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
            editComment(newComment) {
                const answers = this.answers.map(comment => comment.id === newComment.id ? newComment : comment);

                this.$emit('updateAnswers', {id: this.commentId, answers});
            },
            addComment(comment) {
                this.$emit('updateAnswers', {id: this.commentId, answers: [...this.answers, comment]});
            },
            removeComment(commentId) {
                const answers = this.answers.filter(comment => comment.id !== commentId);

                this.$emit('updateAnswers', {id: this.commentId, answers});
            },
            updateAnswers({id, answers}) {
                const newAnswers = this.answers.map(comment => comment.id === id ? {
                    ...comment,
                    thread: {list: answers}
                } : comment);

                this.$emit('updateAnswers', {id: this.commentId, answers: newAnswers});
            },
            async onTextPost(evData) {
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
                    let response = await this.$root.$api.$post.editCommentById(this.commentId, msg);
                    this.$emit('update', {...response.data, thread: {list: this.answers}});
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            }
        },
        mounted() {
            console.log(this.images, 'images')
        }
    }
</script>
