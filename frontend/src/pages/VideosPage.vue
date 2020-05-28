<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">
                <div class="w-100">
                    <div class="col-12">
                        <VideosPageFilter @wallPostsSelect="wallPostsSelectHandler"/>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="videos-content w-100">
                                <template v-if="filterMode === 'my'">
                                    <div class="card mb-4">
                                        <div class="card-body py-0">
                                            <div class="row">
                                                <div v-for="(video, index) in userVideos" class="col-3 my-3">
                                                    <img v-if="video.isYoutubeLink"
                                                         :src="`//img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`"
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
                                        <div class="card-header pb-0 bg-white border-bottom-0">Мои видео</div>
                                        <div class="card-body py-0 pr-0">
                                        <div class="ml-n3 clearfix">
                                            <div class="col-12 col-xl-6 my-3 float-left ">
                                                <div class="videos-item videos-item-wide">
                                                    <div class="video mb-2">
                                                        <div class="video-wrap-pre">
                                                            <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                        </div>
                                                        <button type="button" aria-label="Запустить видео" class="video__button">
                                                            <IconYoutube/>
                                                        </button>
                                                        <div class="video-time">0:32</div>
                                                    </div>
                                                    <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-xl-3 my-3 float-left ">
                                                <div class="videos-item ">
                                                    <div class="video mb-2">
                                                        <div class="video-wrap-pre">
                                                            <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                        </div>
                                                        <button type="button" aria-label="Запустить видео" class="video__button">
                                                            <IconPlayVideo/>
                                                        </button>
                                                        <div class="video-time">0:32</div>
                                                    </div>
                                                    <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-xl-3 my-3 float-left ">
                                                <div class="videos-item ">
                                                    <div class="video mb-2">
                                                        <div class="video-wrap-pre">
                                                            <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                        </div>
                                                        <button type="button" aria-label="Запустить видео" class="video__button">
                                                            <IconYoutube/>
                                                        </button>
                                                        <div class="video-time">0:32</div>
                                                    </div>
                                                    <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-xl-3 my-3 float-left ">
                                                <div class="videos-item ">
                                                    <div class="video mb-2">
                                                        <div class="video-wrap-pre">
                                                            <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                        </div>
                                                        <button type="button" aria-label="Запустить видео" class="video__button">
                                                            <IconPlayVideo/>
                                                        </button>
                                                        <div class="video-time">0:32</div>
                                                    </div>
                                                    <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-xl-3 my-3 float-left ">
                                                <div class="videos-item ">
                                                    <div class="video mb-2">
                                                        <div class="video-wrap-pre">
                                                            <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                        </div>
                                                        <button type="button" aria-label="Запустить видео" class="video__button">
                                                            <IconPlayVideo/>
                                                        </button>
                                                        <div class="video-time">0:32</div>
                                                    </div>
                                                    <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header pb-0 bg-white border-bottom-0">Прямые трансляции</div>
                                        <div class="card-body py-0">
                                            <div class="row">
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header pb-0 bg-white border-bottom-0">Рекомендуемое видео</div>
                                        <div class="card-body py-0">
                                            <div class="row">
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-4">
                                        <div class="card-header pb-0 bg-white border-bottom-0">Лучшее за неделю</div>
                                        <div class="card-body py-0">
                                            <div class="row">
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconYoutube/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-sm-6 col-xl-3 my-3">
                                                    <div class="videos-item ">
                                                        <div class="video mb-2">
                                                            <div class="video-wrap-pre">
                                                                <img alt="image" src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_960_720.png">
                                                            </div>
                                                            <button type="button" aria-label="Запустить видео" class="video__button">
                                                                <IconPlayVideo/>
                                                            </button>
                                                            <div class="video-time">0:32</div>
                                                        </div>
                                                        <a href="/user-1" class="video-desc mb-0">Sunrise </a>
                                                    </div>
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
    import IconYoutube from "../icons/IconYoutube.vue";
    import IconPlayVideo from "../icons/IconPlayVideo.vue";

    export default {
name: "VideosPage",
components: {
    IconPlayVideo,
    IconYoutube,
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
    onAddVideo(video) {
        console.log(video);
        this.userVideos.unshift(new PliziVideo(video));
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

    this.$root.$on('onAddVideo', this.onAddVideo);
},
}
</script>

