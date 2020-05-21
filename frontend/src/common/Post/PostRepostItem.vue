<template>
    <div class="post-repost pl-3 ml-1 mt-3">
        <div class="post-user-data  d-flex align-items-center mb-2">
            <div class="media-pic border rounded-circle  mr-3">
                <img :src="user ? user.userPic : community.primaryImage" :alt="user ? user.firstName : community.name" />
            </div>
            <div class="media-body">
                <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">{{ user ? user.firstName : community.name }}</h6>
            </div>
        </div>

        <template v-if="livePreview && typeof livePreview === 'object'">
            <p v-if="livePreview.text"
               class="post-main-text mb-0"
               v-html="livePreview.text">
            </p>

            <template v-if="livePreview.videoLinks">
                <div class="youtube-video-link d-flex justify-content-center">
                    <p class="post-main-text  mt-2"
                       v-html="livePreview.videoLinks">
                    </p>
                    <button class="video__button" type="button" aria-label="Запустить видео">
                        <IconYoutube/>
                    </button>
                </div>
            </template>
        </template>

        <template v-else>
            <p v-if="post.body"
               class="post-main-text mb-2"
               v-html="this.$options.filters.toBR(post.body)"></p>
        </template>

        <div v-if="post.attachments && post.attachments.length" class="attachments">
            <Gallery :post="post" v-if="imageAttachments.length > 0" :images="imageAttachments"></Gallery>

            <template v-for="(postAttachment) in post.attachments">
                <template v-if="!postAttachment.isImage">
                    <AttachmentFile :attach="postAttachment"/>
                </template>
            </template>
        </div>

        <div v-if="sharedFromUser">
            <div class="post-user-data  d-flex align-items-center mb-2">
                <div class="media-pic border rounded-circle  mr-3">
                    <img :src="sharedFromUser ? sharedFromUser.userPic : community.primaryImage" :alt="sharedFromUser ? sharedFromUser.profile.firstName : community.name" />
                </div>
                <div class="media-body">
                    <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                        {{ sharedFromUser ? sharedFromUser.firstName : community.name }}
                    </h6>
                </div>
            </div>

            <template v-if="sharedFromLivePreview && typeof sharedFromLivePreview === 'object'">
                <p v-if="sharedFromLivePreview.text"
                   class="post-main-text mb-0"
                   v-html="sharedFromLivePreview.text">
                </p>

                <template v-if="sharedFromLivePreview.videoLinks">
                    <div class="youtube-video-link d-flex justify-content-center">
                        <p class="post-main-text  mt-2"
                           v-html="sharedFromLivePreview.videoLinks">
                        </p>
                        <button class="video__button" type="button" aria-label="Запустить видео">
                            <IconYoutube/>
                        </button>
                    </div>
                </template>
            </template>

            <template v-else>
                <p v-if="post.sharedFrom.body"
                   class="post-main-text mb-2"
                   v-html="this.$options.filters.toBR(post.sharedFrom.body)"></p>
            </template>

            <div v-if="post.sharedFrom.attachments && post.sharedFrom.attachments.length" class="attachments">
                <Gallery :post="post.sharedFrom" v-if="sharedFromImageAttachments.length > 0" :images="sharedFromImageAttachments"></Gallery>

                <template v-for="(postAttachment) in post.sharedFrom.attachments">
                    <template v-if="!postAttachment.isImage">
                        <AttachmentFile :attach="postAttachment"/>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import PliziUser from '../../classes/PliziUser.js';
    import PliziCommunity from '../../classes/PliziCommunity.js';
    import PliziPost from '../../classes/PliziPost.js';
    import LinkMixin from '../../mixins/LinkMixin.js';

    import Gallery from '../Gallery.vue';
    import AttachmentFile from "../AttachmentFile.vue";
    import IconYoutube from "../../icons/IconYoutube.vue";

    export default {
        name: "PostRepostItem",
        props: {
            user: PliziUser,
            community: PliziCommunity,
            post: PliziPost,
        },
        mixins: [LinkMixin],
        components: {
            Gallery,
            AttachmentFile,
            IconYoutube,
        },
        computed: {
            imageAttachments() {
                return this.post.attachments.filter(attachment => attachment.isImage);
            },
            sharedFromImageAttachments() {
                return this.post.sharedFrom.attachments.filter(attachment => attachment.isImage);
            },
            livePreview() {
                let str = this.post.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.transformStrWithLinks(str);
            },
            sharedFromLivePreview() {
                let str = this.post.sharedFrom.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.transformStrWithLinks(str);
            },
            hasYoutubeLinks() {
                let str = this.post.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.detectYoutubeLinks(str);
            },
            hasSharedFromYoutubeLinks() {
                let str = this.post.sharedFrom.body.replace(/<\/?[^>]+>/g, '').trim();

                return this.detectYoutubeLinks(str);
            },
            sharedFromUser() {
                return this.post.sharedFrom ? this.post.sharedFrom.user : null;
            },
        },
    }
</script>

<style lang="scss">
    .post-repost {
        border-left: 2px solid #cececf;

        .attachments {
            img {
                width: 500px;
            }
        }
    }
</style>
