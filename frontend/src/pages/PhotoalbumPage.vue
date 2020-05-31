<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>
            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">
                <div class="w-100">
                    <div class="col-12">
                        <PhotoalbumsPageFilter :photoAlbum="photoAlbum"
                                               @addNewImages="addNewImages"
                                               @finishAddNewImages="finishAddNewImages"/>
                    </div>
                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="col-12">
                                <div class="photo-album-description-block">
                                    <PhotoalbumEditBlock :photoAlbum="photoAlbum"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="photoAlbum && photoAlbum.images"
                             class="row photoalbum-images-content mb-4">
                            <div class="col-12">
                                <div class="bg-white-br20 d-flex flex-wrap px-3">
                                    <div v-for="image in photoAlbum.images"
                                         :key="image.id"
                                         class="photoalbum-image col-12 col-sm-6 col-xl-3 my-3 d-flex align-items-stretch position-relative">
                                        <div class="photoalbum-pic d-flex flex-column position-relative overflow-hidden">
                                            <img v-if="image"
                                                 :key="image.id"
                                                 :src="image.image.original.path"
                                                 class="photoalbum-img img-fluid"
                                                 alt=""/>
                                        </div>

                                        <button type="button"
                                                aria-label="Удалить изображение"
                                                class="delete__button"
                                                @click.prevent="onDeleteImage(image.id)">
                                                <i class="fa fa-plus"
                                                   aria-hidden="true"></i>
                                        </button>
                                        <SmallSpinner v-if="image.isBlob"
                                                      clazz="media__spinner"
                                                      :hide-text="true"/>
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
    import PhotoalbumEditBlock from "../components/PhotoalbumsPage/PhotoalbumEditBlock.vue";
    import IconDelete from "../icons/IconDelete.vue";
    import SmallSpinner from "../common/SmallSpinner.vue";

    import PliziPhotoAlbum from "../classes/PliziPhotoAlbum.js";
    import PliziAttachment from "../classes/PliziAttachment.js";

    export default {
        name: "PhotoalbumPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
            PhotoalbumsPageFilter,
            PhotoalbumsPageModal,
            PhotoalbumItem,
            PhotoalbumEditBlock,
            IconDelete,
            SmallSpinner,
        },
        data() {
            return {
                photoAlbumId: this.$route.params.id,
                photoAlbum: null,
                loadImages: null,
            }
        },
        methods: {
            onUpdatePhotoAlbum({ title, description }) {
                this.photoAlbum.title = title;
                this.photoAlbum.description = description;
            },
            addNewImages(image) {
                // this.loadImages = [];
                // this.loadImages.unshift(new PliziAttachment(image));

                if (!this.photoAlbum.images) {
                    this.photoAlbum.images = [];
                }

                this.photoAlbum.images.unshift(new PliziAttachment(image));

                // TODO: @YZ сделать по нормальному после MVP
                let lsUser = JSON.parse(localStorage.getItem('pliziUser'));

                if (!lsUser.data.stats.imageCount) {
                    lsUser.data.stats.imageCount = 1;
                } else {
                    lsUser.data.stats.imageCount++;
                }

                localStorage.setItem('pliziUser', JSON.stringify(lsUser));
            },
            finishAddNewImages() {

            },

            async onDeleteImage(id) {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.deleteImageInPhotoAlbum(this.photoAlbumId, id);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    let deletedImageIndex = this.photoAlbum.images.findIndex(image => image.id === id);
                    this.photoAlbum.images.splice(deletedImageIndex, 1);

                    // TODO: @YZ сделать по нормальному после MVP
                    let lsUser = JSON.parse(localStorage.getItem('pliziUser'));

                    if (!lsUser.data.stats.imageCount) {
                        lsUser.data.stats.imageCount = 0;
                    } else {
                        lsUser.data.stats.imageCount--;
                    }

                    localStorage.setItem('pliziUser', JSON.stringify(lsUser));
                }
            },
            async getPhotoAlbum() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.getPhotoAlbum(this.photoAlbumId);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    this.photoAlbum = new PliziPhotoAlbum(apiResponse);
                }
            }
        },
        async mounted() {
            await this.getPhotoAlbum();

            this.$root.$on('onUpdate', this.onUpdatePhotoAlbum);
        },
    }
</script>



