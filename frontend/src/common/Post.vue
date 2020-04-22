<template>
    <div class="row plz-post-item mb-4 bg-white-br20 py-4">

        <div class="col-12 border-bottom plz-post-item-header">
            <div class="post-news-item d-flex flex-row align-content-center pb-4">
                <div class="post-poster-pic mr-3">
                    <img :src="post.posterPic" :alt="post.posterName"/>
                </div>

                <div class="post-poster-name d-flex flex-column justify-content-center">
                    <h6 class="post-poster-title mb-1">
                        <!-- TODO: @TGA странно что мы нигде не выводим название поста-->
                        <b>{{post.posterName}}</b>
                    </h6>
                    <time :datetime="post.createdAt" class="post-poster-time">
                        {{ post.createdAt | lastPostTime }}
                    </time>
                </div>

                <div class="post-poster-actions my-auto ml-auto">
                    <button class="btn btn-link post-settings"
                            :id="`postSettings` + post.id"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <i class="dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right py-3 px-3"
                         :aria-labelledby="`postSettings` + post.id">

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/editing">
                                Редактировать
                            </router-link>
                        </div>

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/account">
                                Настройки
                            </router-link>
                        </div>

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/help">
                                Помощь
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 plz-post-item-body pt-4 pb-2">
            <p v-if="post.body" class="post-main-text mb-2" v-html="this.$options.filters.toBR(post.body)"></p>
        </div>

        <div class="col-12 plz-post-item-images">
            <div v-if="post.isImages" class="post-images">
                <PostImage v-for="(postImageItem, postImageindex) in post.images"
                           :class="['post-image', postImageindex === 0 ? 'first-post-image' : null]"
                           :key="postImageindex"
                           :src="postImageItem" />
            </div>
        </div>

        <div class="plz-post-item-footer col-12 pt-4">
            <div class="d-flex">
                <div class="d-flex">
                    <div class="post-watched-counter">
                        <IconHeard />
                        <span>{{ post.likes | space1000 }}</span>
                    </div>
                    <div class="post-watched-counter ml-4">
                        <IconMessage />
                        <span>{{ post.commentsCount | space1000 }}</span>
                    </div>

                    <div class="post-watched-counter ml-4">
                        <IconShare />
                        <span>{{ post.sharesCount | space1000 }}</span>
                    </div>
                </div>

                <div class="ml-auto d-flex align-items-center">
                    <div class="post-watched-counter">
                        <span>{{ post.views | space1000 }}</span>
                        <IconEye />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import IconEye from '../icons/IconEye.vue';
import IconHeard from '../icons/IconHeard.vue';
import IconMessage from '../icons/IconMessage.vue';
import IconMessageUserPost from '../icons/IconMessageUserPost.vue';
import IconShare from '../icons/IconShare.vue';

import PostImage from './PostImage.vue';

import PliziPost from '../classes/PliziPost.js';

export default {
name: 'Post',
components: {
    IconShare,
    IconMessage,
    IconHeard,
    IconEye,
    IconMessageUserPost,
    PostImage,
},
props: {
    post: PliziPost
},
}
</script>

<style lang="scss">
.plz-post-item {
    .plz-post-item-header,
    .plz-post-item-body,
    .plz-post-item-images,
    .plz-post-item-footer {
        padding: 0 35px 0 39px;
    }
}

.post-images {
    margin-left: -5px;
    img {
        max-height: 337px;
        border-radius: 3px;
        margin-left: 5px;
        margin-bottom: 5px;
    }
}
</style>
