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
    </div>
</template>

<script>
    import AccountToolbarLeft from "../common/AccountToolbarLeft.vue";
    import FavoriteFriends from "../common/FavoriteFriends.vue";
    import VideosPageFilter from "../components/VideosPage/VideosPageFilter.vue";

    export default {
        name: "VideosPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
            VideosPageFilter,
        },
        computed: {
            filteredVideos() {
                // switch (this.filterMode) {
                //     case 'my':
                //         return this.userPosts.filter( post => post.checkIsMinePost( this.$root.$auth.user.id ) );
                //
                //     case 'all':
                //         return this.userPosts.filter( post => post.isArchivePost );
                // }
                //
                // return this.userPosts;
            }
        },
        data() {
            return {
                filterMode: 'my',
                videos: null,
            }
        },
        methods: {
            wallPostsSelectHandler(evData) {
                this.filterMode = evData.wMode;
            },
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
