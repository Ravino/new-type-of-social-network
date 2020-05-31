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
                                               @uploadingImage="uploadingImage"/>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="photo-album-description-block">
                                    <PhotoalbumEditBlock :photoAlbum="photoAlbum"/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="photo-album-images-content w-100">
                                <div v-if="photoAlbum && photoAlbum.images" class="card mb-4 border-0 bg-white-br20">
                                    <div class="card-body py-0">
                                        <div class="row">
                                            <template v-if="loadImages">
                                                <div v-for="loadImage in loadImages"
                                                     :key="loadImage.id"
                                                     class="col-12 col-sm-6 col-xl-3 my-3 photo-album-image-loading">
                                                    <div class="image-loading-wrap">
                                                        <img v-if="loadImage"
                                                             :src="loadImage.fileBlob"
                                                             class="img-fluid"
                                                             alt=""/>
                                                        <div class="spinner-wrap">
                                                            <SmallSpinner v-if="loadImage.isBlob"
                                                                          clazz="media__spinner"
                                                                          :hide-text="true"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>

                                            <div v-for="image in photoAlbum.images"
                                                 :key="image.id"
                                                 class="col-12 col-sm-6 col-xl-3 my-3 photo-album-image">
                                                <img v-if="image"
                                                     :key="image.id"
                                                     :src="image.image.original.path"
                                                     class="img-fluid"
                                                     alt=""/>
                                                <button type="button"
                                                        @click.prevent="onDeleteImage(image.id)"
                                                        class="btn btn-close btn-link border-0 border-danger bg-danger text-white rounded-circle delete__button"
                                                        aria-label="Удалить видео">
                                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                                </button>
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
                if (!this.photoAlbum.images) {
                    this.photoAlbum.images = [];
                }

                this.photoAlbum.images.unshift(new PliziAttachment(image));

                let loadImageIndex = this.loadImages.findIndex(loadImage => loadImage.id === image.id);
                this.loadImages.splice(loadImageIndex, 1);

                // TODO: @YZ сделать по нормальному после MVP
                let lsUser = JSON.parse(localStorage.getItem('pliziUser'));

                if (!lsUser.data.stats.imageCount) {
                    lsUser.data.stats.imageCount = 1;
                } else {
                    lsUser.data.stats.imageCount++;
                }

                localStorage.setItem('pliziUser', JSON.stringify(lsUser));
            },
            uploadingImage(image) {
                if (!this.loadImages) {
                    this.loadImages = []
                }

                this.loadImages.push(image);
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

<style lang="scss">
    .photo-album-images-content {
        .photo-album-image-loading {
            .image-loading-wrap {
                position: relative;
            }

            img {
                position: relative;
                border-radius: 5px;
            }

            .spinner-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.3);

                .media__spinner {
                    div {
                        padding-right: 0 !important;
                    }
                }
            }
        }
        .photo-album-image {
            &:hover {
                .delete__button {
                    opacity: 1;
                }
            }

            img {
                position: relative;
                border-radius: 5px;
            }

            .delete__button {
                position: absolute;
                top: -5px;
                left: 95%;
                width: 20px;
                height: 20px;
                display: inline-block;
                padding: 4px;
                border: 0;
                background-color: #ef482c;
                font-size: 10px;
                color: #fff;
                border-radius: 100%;
                transform: translate(-60%, 0%) rotate(45deg);
                transition: 0.4s;
                z-index: 1;
                opacity: 0;
            }
        }
    }
</style>

