<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">
                <div class="w-100">
                    <div class="col-12">
                        <PhotoalbumsPageFilter/>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="videos-content w-100">
                                <div>
                                    <div class="card mb-4">
                                        <div class="card-body py-0">
                                            <div class="row">
                                                    <div v-for="(album, index) in photoAlbums"
                                                         :key="index"
                                                         class="col-12 col-sm-6 col-xl-3 my-3">
                                                        <PhotoalbumItem :album="album" :key="album.id"></PhotoalbumItem>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    import SmallSpinner from "../common/SmallSpinner.vue";

    import PliziPhotoAlbum from "../classes/PliziPhotoAlbum.js";

    export default {
        name: "PhotoalbumsListPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
            PhotoalbumsPageFilter,
            PhotoalbumsPageModal,
            PhotoalbumItem,
            SmallSpinner
        },
        data() {
            return {
                photoAlbums: null,
                filterMode: 'my'
            }
        },
        methods: {
            onAddPhotoAlbum(photoAlbum) {
                this.photoAlbums.unshift(new PliziPhotoAlbum(photoAlbum));
            },

            async getPhotoAlbums() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.list();
                    this.hidePhotoalbumCreateModal();
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                this.photoAlbums = apiResponse.map((photoAlbum) => {
                    return new PliziPhotoAlbum(photoAlbum);
                });
            }
        },
        async mounted() {
            await this.getPhotoAlbums();

            this.$root.$on('onAddPhotoAlbum', this.onAddPhotoAlbum);
        },
    }
</script>

