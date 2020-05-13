<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-1 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-9 col-lg-9 col-xl-10">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <VideosPageFilter @wallPostsSelect="wallPostsSelectHandler"/>
                        </div>
                        <div class="col-12">
                            <div class="videos-content">
                                <template v-if="filterMode === 'my'">
                                    <div class="card mb-4">
                                        <div class="card-body">
                                            <div class="row">
                                                <div v-for="(video, index) in userVideos" class="col-3 mb-4">
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
                                <template v-else>
                                    <div class="card mb-4">
                                        <div class="card-header bg-white border-bottom-0">Мои видео</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header bg-white border-bottom-0">Прямые трансляции</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header bg-white border-bottom-0">Рекомендуемое видео</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header bg-white border-bottom-0">Лучшее за неделю</div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
                                                </div>
                                                <div class="col-3">
                                                    <img src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png"
                                                         class="img-fluid"
                                                         alt="">
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
            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
        <VideoPageModal v-if="videoModal.isVisible"
                        :videoLink="videoModal.content.videoLink"
                        @hideVideoModal="hideVideoModal"/>
    </div>
</template>

<script>
    import AccountToolbarLeft from "../common/AccountToolbarLeft.vue";
    import FavoriteFriends from "../common/FavoriteFriends.vue";
    import VideosPageFilter from "../components/VideosPage/VideosPageFilter.vue";
    import VideoPageModal from "../components/VideosPage/VideoPageModal.vue";

    import LinkMixin from "../mixins/LinkMixin.js";
    import PliziVideo from '../classes/PliziVideo.js';

    export default {
        name: "VideosPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
            VideosPageFilter,
            VideoPageModal,
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

<style lang="scss">
    .videos-content {
        .card {
            border: none;
            border-radius: 20px;

            .card-header {
                font-weight: bold;

                &:first-child {
                    border-radius: 20px;
                }
            }

            .card-body {
                img {
                    width: 300px;
                    height: 300px;
                }
            }
        }
    }
</style>
