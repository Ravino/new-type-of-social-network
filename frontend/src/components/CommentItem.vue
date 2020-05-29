<template>
    <div class="plz-comment-item">
        <div class="plz-comment-item-wrapper">
            <a class="plz-comment-item-data-pic" :href="`user-${comment.author.id}`">
                <img class="plz-comment-item-data-img"
                     :src="checkAuthorAvatar"
                     :alt="comment.author.profile.firstName">
            </a>
        </div>
        <div class="plz-comment-item-data">
            <div class="plz-comment-item-holder">
                <div class="plz-comment-item-data-info">
                    <h6>
                        <a class="plz-comment-item-data-name" :href="`user-${comment.author.id}`">
                           <b>{{comment.author.profile.firstName}}&nbsp;{{comment.author.profile.lastName}}</b>
                        </a>
                    </h6>
                    <TextEditor
                        v-if="isEdit"
                        :clazz="`plz-text-editor h-auto  align-items-start flex-grow-1 `"
                        :dropToDown="true"
                        :maximumCharacterLimit="500"
                        workMode="comment"
                        @editorPost="onTextPost"
                        :input-editor-text="comment.body"
                    ></TextEditor>
                    <template v-else>
                        <p v-html="livePreview">{{comment.body}}</p>
                        <Gallery v-if="imageList.length > 0" :images="imageList"></Gallery>
                    </template>
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
                        <div class="plz-comment-item-likes post-watched-counter"
                             :class="{'is-active': comment.alreadyLiked}"
                             @click="onLike">
                            <IconFillHeard v-if="comment.alreadyLiked"/>
                            <IconHeard v-else/>
                            <span>{{ comment.likes | space1000 }}</span>
                            <div v-if="comment.usersLikes && comment.usersLikes.length" class="usersLikes p-3">
                                <p class="mb-1">
                                    <b style="cursor: pointer">Понравилось</b>
                                    {{ comment.likes }} пользователям
                                </p>
                                <div class="d-flex mb-0">
                                    <router-link v-for="(user, index) in shortUsersLikes"
                                                 :key="index"
                                                 class="usersLikes-user"
                                                 :to="{ name: 'PersonalPage', params: { id: user.id } }">
                                        <img :src="user.profile.userPic"
                                             :alt="user.profile.firstName + ' ' + user.profile.lastName"
                                             :title="user.profile.firstName + ' ' + user.profile.lastName"
                                             class="rounded-circle">
                                    </router-link>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
             <div class="plz-comment-item__wrapper-answers" v-for="answer of comment.thread" :key="answer.id">
                 <CommentItem
                     :key="answer.id"
                     :postId="postId"
                     :comment="answer"
                     @onDelete="removeComment"
                     @update="editComment"
                 >
                 </CommentItem>
             </div>
            <div class="plz-comment-item-wrapper-close">
                <button class="plz-comment-item-close-btn" v-if="isAuthor" @click="deleteComment"></button>
            </div>
            <CommentReply
                v-if="isAnswer"
                :commentId="comment.id"
                :postId="postId"
                :name="comment.author.profile.firstName"
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
    import IconFillHeard from "../icons/IconFillHeard.vue";
    import PliziComment from "../classes/PliziComment.js";

    export default {
        name: "CommentItem",
        components: {IconFillHeard, Gallery, TextEditor, CommentReply, IconHeard},
        mixins: [LinkMixin, ChatMixin],
        props: {
            comment: {
                type: PliziComment
            },
            postId: {
                type: String | Number
            },
        },
        data() {
            return {
                isAnswer: false,
                isEdit: false,
            };
        },
        computed: {
            shortUsersLikes() {
                return this.comment.usersLikes && this.comment.usersLikes.length ? this.comment.usersLikes.slice(0, 8) : null;
            },
            imageList() {
                return this.comment.attachments.filter(attachment => attachment.isImage);
            },
            livePreview() {
                let str = this.comment.body.replace(/<\/?[^>]+>/g, '').trim();
                let returnedStr = this.transformStrWithLinks(str);

                return str === returnedStr ? this.comment.body : this.transformStrWithLinks(str);
            },
            checkAuthorAvatar() {
                if (this.comment.author.profile.avatar.image.medium.path === null) {
                    return this.comment.defaultAvatarPath;
                }

                return this.comment.author.profile.avatar.image.medium.path;
            },
            getTimeComment() {
                return moment(this.comment.createdAt).fromNow();
            },
            isAuthor() {
                return this.$root.$auth.user.id === this.comment.author.id;
            },
        },
        methods: {
            editComment(newComment) {
                this.comment.thread = this.comment.thread.map(comment => comment.id === newComment.id ? new PliziComment(newComment) : comment);
            },
            addComment(comment) {
                this.comment.thread.push(new PliziComment(comment));
            },
            removeComment(commentId) {
                this.comment.thread = this.comment.thread.filter(comment => comment.id !== commentId);
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
                    await this.$root.$api.$post.deleteCommentById(this.comment.id);
                    this.$emit('onDelete', this.comment.id);
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
            async updateComment(msg) {
                try {
                    let response = await this.$root.$api.$post.editCommentById(this.comment.id, msg);
                    this.$emit('update', {...response.data, thread: {list: this.answers}});
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
            async onLike() {
                console.log(123)
                try {
                    let response = await this.$root.$api.$post.likeComment(this.comment.id);

                    if (response !== null) {
                        if (this.comment.alreadyLiked) {
                            this.comment.alreadyLiked = false;
                            this.comment.likes--;
                            let userLikeIndex = this.comment.usersLikes.findIndex((userLike) => {
                                return userLike.id === this.$root.$auth.user.id;
                            });
                            this.comment.usersLikes.splice(userLikeIndex, 1);
                        } else {
                            this.comment.alreadyLiked = true;
                            this.comment.likes++;
                            this.comment.usersLikes.push(this.$root.$auth.user);
                        }
                    }
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
        },
    }
</script>
