<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">
                <div class="w-100">
                    <div class="col-12">
                        <PhotoalbumsPageFilter />
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="videos-content w-100">
                                <template>
                                    <div class="card mb-4">
                                        <div class="card-body py-0">
                                            <div class="photoalbum-description-block">
                                                <PhotoalbumEditBlock :album="album"/>
                                            </div>
                                            <div class="row mx-lg-n1 justify-content-center">
                                                <div v-for="album in photoalbums" class="px-lg-1 col-md-auto my-2 mb-2">
                                                    <img v-if="album"
                                                         src="../images/noavatar-256.png"
                                                         :key="album.id"
                                                         class="img-fluid"
                                                         alt=""/>
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
    </div>
</template>

<script>
    import AccountToolbarLeft from "../common/AccountToolbarLeft.vue";
    import FavoriteFriends from "../common/FavoriteFriends.vue";
    import PhotoalbumsPageFilter from "../components/PhotoalbumsPage/PhotoalbumsPageFilter.vue";
    import PhotoalbumsPageModal from "../components/PhotoalbumsPage/PhotoalbumsPageModal.vue";
    import PhotoalbumItem from "../components/PhotoalbumsPage/PhotoalbumItem.vue";
    import PhotoalbumEditBlock from "../components/PhotoalbumsPage/PhotoalbumEditBlock.vue";

    export default {
        name: "PhotoalbumPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
            PhotoalbumsPageFilter,
            PhotoalbumsPageModal,
            PhotoalbumItem,
            PhotoalbumEditBlock
        },
        data() {
            return {
                albumId: this.$route.params.id,
                album: null,
                photoalbums: null
            }
        },
        methods: {
            async getPhotoalbums() {
                let apiResponse = null;
                let res;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.list();
                    this.hidePhotoalbumCreateModal();
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                this.photoalbums = apiResponse;

                res = this.photoalbums.filter(album => album.id.toString() === this.albumId);
                if (apiResponse) {
                    apiResponse.forEach(album => {
                        if (album.id.toString() === this.albumId) {
                            this.album = album;
                        }
                    });
                }
            }
        },
        async mounted() {
            await this.getPhotoalbums();
        },
    }
</script>

