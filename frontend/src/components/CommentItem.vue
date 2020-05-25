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
                    :editorPlaceholder="'Оставить комментарий...'"
                    :dropToDown="true"
                    :maximumCharacterLimit="500"
                    workMode="post"
                    @editorPost="onTextPost"
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
<!--                     :TODO нужно поле по которому будет проверка я автор комментария-->
                    <button @click="isEdit = true" class="plz-comment-item-reply-btn plz-comment-item-edit">
                        Изменить
                    </button>
                </div>
                <div class="plz-comment-item-likes">
                    <IconHeard></IconHeard>
                </div>
            </div>
            <div class="plz-comment-item-wrapper-close">
                <button class="plz-comment-item-close-btn" @click="deleteComment"></button>
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

<style lang="scss">
.plz-comment-item {
    position: relative;
    display: flex;
    margin-top: 20px;
    &:hover {
        .plz-comment-item-close-btn {
            display: inline-block;
        }
        .plz-comment-item-edit {
            display: inline-block;
        }
    }
    &-data {
        margin-left: 15px;
        width: 100%;
        border-bottom: 1px solid #e1e1e1;
        &-name {
            font-weight: bolder;
            color: #363636;
            font-size: 13px;
            &:hover {
                text-decoration: underline;
                color: #363636;
            }
        }
        &-comment {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
    }
    &-wrapper {
        &-avatar {
            border-radius: 50%;
            height: 50px;
            width: 50px;
        }
    }
    &-close {
        &-btn {
            position: absolute;
            right: 10px;
            top: 0;
            width: 5px;
            height: 5px;
            opacity: 0.6;
            z-index: 20;
            border: none;
            background: none;
            outline: none;
            display: none;
            &:focus {
                outline: none;
            }
            &:hover {
                opacity: 1;
            }
            &:before,
            &:after {
                position: absolute;
                left: 15px;
                top: 0;
                content: ' ';
                height: 20px;
                width: 2px;
                background-color: #b9b2b2;
            }
            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
    &-reply {
        &-date {
            color: #333336;
            opacity: 0.7;
        }
        &-btn {
            border: none;
            background: none;
            outline: none;
            opacity: .4;
            transition: opacity .3s;
            &:focus {
                outline: none;
            }
            &:hover {
                opacity: 1;
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
    &-edit {
        display: none;
    }
}
</style>
