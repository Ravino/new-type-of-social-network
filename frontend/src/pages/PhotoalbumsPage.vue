<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">
                <div class="w-100">
                    <div class="col-12">
                        <PhotoalbumsPageFilter @wallPostsSelect="wallPostsSelectHandler"/>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="videos-content w-100">
                                <template v-if="filterMode === 'my'">
                                    <div class="card mb-4">
                                        <div class="card-body py-0">
                                            <div class="row">
                                                <div v-for="(video, index) in userVideos" class="col-3 my-3 mb-4">
                                                    <img v-if="video.isYoutubeLink"
                                                         :src="`//img.youtube.com/vi/${video.youtubeId}/0.jpg`"
                                                         class="img-fluid"
                                                         alt=""
                                                         @click.stop="openVideoModal(video.link)"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-xl-1 d-none d-lg-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>

        <PhotoalbumsPageModal v-if="videoModal.isVisible"
                        :videoLink="videoModal.content.videoLink"
                        @hideVideoModal="hideVideoModal"/>
    </div>
</template>

<script>
    import AccountToolbarLeft from "../common/AccountToolbarLeft.vue";
    import FavoriteFriends from "../common/FavoriteFriends.vue";
    import PhotoalbumsPageFilter from "../components/PhotoalbumsPage/PhotoalbumsPageFilter.vue";
    import PhotoalbumsPageModal from "../components/PhotoalbumsPage/PhotoalbumsPageModal.vue";

    import LinkMixin from "../mixins/LinkMixin.js";
    import PliziVideo from '../classes/PliziVideo.js';
    import IconYoutube from "../icons/IconYoutube.vue";
    import IconPlayVideo from "../icons/IconPlayVideo.vue";

    export default {
name: "PhotoalbumsPage",
components: {
    IconPlayVideo,
    IconYoutube,
    AccountToolbarLeft,
    FavoriteFriends,
    PhotoalbumsPageFilter,
    PhotoalbumsPageModal,
},
mixins: [LinkMixin],
data() {
    return {
        filterMode: 'my',
        userVideos: [],
        videoModal: {
            isVisible: false,
            content: {
                videoLink: null,
            },
        },
    }
},
methods: {
    wallPostsSelectHandler(evData) {
        this.filterMode = evData.wMode;
    },
    openVideoModal(id) {
        this.videoModal.isVisible = true;
        this.videoModal.content.videoLink = id;
    },
    hideVideoModal(){
        this.videoModal.isVisible = false;
    },

    async getUserVideo() {
        let response;

        try {
            response = await this.$root.$api.$video.getUserVideo();
        } catch (e) {
            console.log(e.detailMessage);
        }

        if (response) {
            response.map((video) => {
                this.userVideos.push(new PliziVideo(video));
            });
        }
    },
},
async mounted() {
    await this.getUserVideo();
},
}
</script>

