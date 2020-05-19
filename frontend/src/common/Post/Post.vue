<template>
    <div class="row plz-post-item mb-4 bg-white-br20 py-4">

        <template v-if="!post.deleted">
            <div class="col-12 border-bottom plz-post-item-header">
                <div class="post-news-item d-flex flex-row align-content-center pb-4">
                    <div class="post-poster-pic mr-3">
                        <router-link v-if="postable" :to="{name: 'PersonalPage', params: {id: postable.id}}">
                            <img :src="post.posterPic" :alt="post.posterName"/>
                        </router-link>
                        <router-link v-else :to="{name: 'CommunityPage', params: {id: post.community.id}}">
                            <img :src="post.posterPic" :alt="post.posterName"/>
                        </router-link>
                    </div>

                    <div class="post-poster-name d-flex flex-column justify-content-center">
                        <h6 class="post-poster-title mb-1">
                            <!-- TODO: @TGA странно что мы нигде не выводим название поста-->

                            <router-link v-if="postable" :to="{name: 'PersonalPage', params: {id: postable.id}}">
                                <b>{{post.posterName}}</b>
                            </router-link>
                            <router-link v-else :to="{name: 'CommunityPage', params: {id: post.community.id}}">
                                <b>{{post.posterName}}</b>
                            </router-link>
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
                        <div class="dropdown-menu dropdown-menu-right py-3 px-0"
                             :aria-labelledby="`postSettings` + post.id">

                            <div v-if="post.author.id === user.id" class="nav-item">
                                <button class="btn dropdown-item px-3 py-1"
                                        @click="$emit('onEditPost', post)">
                                    Редактировать
                                </button>
                            </div>
                            <div v-if="post.author.id === user.id" class="nav-item">
                                <button class="btn dropdown-item px-3 py-1"
                                        @click="$emit('onDeletePost', post.id)">
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <template v-if="post.sharedFrom">
                    <div class="col-12 plz-post-item-body pb-2 pt-4">
                        <div class="post-news-item d-flex flex-row align-content-center pb-4" :class="{'shared px-4': post.sharedFrom, 'pb-4': !post.sharedFrom}">
                            <div class="post-poster-pic mr-3">
                                <router-link v-if="post.sharedFrom.user" :to="{name: 'PersonalPage', params: {id: post.sharedFrom.user.id}}">
                                    <img :src="post.sharedFrom.posterPic" :alt="post.sharedFrom.posterName"/>
                                </router-link>
                                <router-link v-else :to="{name: 'CommunityPage', params: {id: post.sharedFrom.community.id}}">
                                    <img :src="post.sharedFrom.posterPic" :alt="post.sharedFrom.posterName"/>
                                </router-link>
                            </div>

                            <div class="post-poster-name d-flex flex-column justify-content-center">
                                <h6 class="post-poster-title mb-1">
                                    <!-- TODO: @TGA странно что мы нигде не выводим название поста-->

                                    <router-link v-if="post.sharedFrom.user" :to="{name: 'PersonalPage', params: {id: post.sharedFrom.user.id}}">
                                        <b>{{post.sharedFrom.posterName}}</b>
                                    </router-link>
                                    <router-link v-else :to="{name: 'CommunityPage', params: {id: post.sharedFrom.community.id}}">
                                        <b>{{post.sharedFrom.posterName}}</b>
                                    </router-link>
                                </h6>
                                <time :datetime="post.sharedFrom.createdAt" class="post-poster-time">
                                    {{ post.sharedFrom.createdAt | lastPostTime }}
                                </time>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="col-12 plz-post-item-body pb-2" :class="{'--px-2 --pt-2': post.sharedFrom, 'pt-4': !post.sharedFrom}">
                    <template v-if="livePreview && typeof livePreview === 'object'">
                        <p v-if="livePreview.text"
                           class="post-main-text mb-0"
                           v-html="livePreview.text">
                        </p>

                        <template v-if="livePreview.videoLinks">
                            <div class="youtube-video-link d-flex justify-content-center">
                                <p class="post-main-text  mt-2"
                                   v-html="livePreview.videoLinks"
                                   @click.stop="hasYoutubeLinks ? openVideoModal() : null">
                                </p>
                                <button class="video__button" type="button" aria-label="Запустить видео">
                                    <svg width="68" height="48" viewBox="0 0 68 48">
                                        <path class="video__button-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
                                        <path class="video__button-icon" d="M 45,24 27,14 27,34"></path>
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </template>

                    <template v-else>
                        <p v-if="post.body"
                           class="post-main-text mb-2"
                           v-html="this.$options.filters.toBR(post.body)"></p>
                    </template>
                </div>

                <div class="col-12 plz-post-item-images">
                    <div class="post-images">
                        <Gallery v-if="imageAttachments.length > 0" :images="imageAttachments"></Gallery>

                        <template v-for="(postAttachment) in post.attachments">
                            <template v-if="!postAttachment.isImage">
                                <AttachmentFile :attach="postAttachment"/>
                            </template>
                        </template>
                    </div>
                </div>

            <div class="plz-post-item-footer col-12 pt-4">
                <div class="d-flex">
                    <div class="d-flex">
                        <div class="post-watched-counter"
                             :class="{'is-active': post.alreadyLiked}"
                             @click="onLike">
                            <IconHeard/>
                            <span>{{ post.likes | space1000 }}</span>
                            <div v-if="post.usersLikes.length" class="usersLikes p-3" @click.stop="">
                                <p class="mb-0">
                                    <b>Понравилось</b> {{ post.likes }} пользователю(-ям)
                                </p>
                               <p v-for="(user, index) in shortUsersLikes" class="d-flex">
                                   <router-link :to="{ name: 'PersonalPage', params: { id: user.id } }">
                                       <img :src="user.profile.userPic"
                                            :alt="user.profile.firstName + ' ' + user.profile.lastName"
                                            :title="user.profile.firstName + ' ' + user.profile.lastName"
                                            class="rounded-circle">
                                   </router-link>
                               </p>
                            </div>
                        </div>
                        <div class="post-watched-counter ml-4">
                            <IconMessage/>
                            <span>{{ post.commentsCount | space1000 }}</span>
                        </div>

                        <div class="post-watched-counter ml-4" @click="$emit('onShare', post)">
                            <IconShare/>
                            <span>{{ post.sharesCount | space1000 }}</span>
                        </div>
                    </div>

                    <div class="ml-auto d-flex align-items-center">
                        <div class="post-watched-counter">
                            <span>{{ post.views | space1000 }}</span>
                            <IconEye/>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="col-12">
                <div class="post-deleted text-center">
                    <p>Запись удалена.</p>
                    <button class="btn btn-secondary"
                            @click="$emit('onRestorePost', post.id)">
                        Восстановить запись
                    </button>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
    import IconEye from '../../icons/IconEye.vue';
    import IconHeard from '../../icons/IconHeard.vue';
    import IconMessage from '../../icons/IconMessage.vue';
    import IconMessageUserPost from '../../icons/IconMessageUserPost.vue';
    import IconShare from '../../icons/IconShare.vue';

    import PostImage from './PostImage.vue';
    import AttachmentFile from "../AttachmentFile.vue";

    import PliziPost from '../../classes/PliziPost.js';
    import Gallery from '../Gallery.vue';
    import LinkMixin from '../../mixins/LinkMixin.js';

    export default {
        name: 'Post',
        components: {
            Gallery,
            IconShare,
            IconMessage,
            IconHeard,
            IconEye,
            IconMessageUserPost,
            PostImage,
            AttachmentFile,
        },
        props: {
            post: PliziPost,
            isCommunity: {
                type: Boolean,
                default: false,
            },
        },
        mixins: [LinkMixin],
        computed: {
            hasYoutubeLinks() {
                let str = this.post.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.detectYoutubeLinks(str);
            },
            livePreview() {
                let str = this.post.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.transformStrWithLinks(str);
            },
            postable() {
                if (this.isCommunity) {
                    return this.post.author;
                }

                return this.post.user ? this.post.user : null;
            },
            imageAttachments() {
                return this.post.attachments.filter(attachment => attachment.isImage);
            },
            user() {
                return this.$root.$auth.user;
            },
            shortUsersLikes() {
                return this.post.usersLikes && this.post.usersLikes.length ? this.post.usersLikes.slice(0, 5) : null;
            },
        },
        methods: {
            openVideoModal() {
                this.$emit('openVideoModal', {
                    videoLink: this.detectYoutubeLinks(this.post.body.replace(/<\/?[^>]+>/g, '').trim())[0],
                })
            },

            async onLike() {
                let response = null;

                try{
                    response = await this.$root.$api.$post.likePost(this.post.id);
                } catch (e){
                    console.warn( e.detailMessage );
                }

                if ( response !== null ){
                    if (this.post.alreadyLiked) {
                        this.post.alreadyLiked = false;
                        this.post.likes--;
                    } else {
                        this.post.alreadyLiked = true;
                        this.post.likes++;
                    }
                }
            },
        },
    }
</script>
