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
                                               @addNewImages="addNewImages"/>
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
                                <div v-if="photoAlbum && photoAlbum.images" class="card mb-4">
                                    <div class="card-body py-0">
                                        <div class="row">
                                            <div v-for="image in photoAlbum.images"
                                                 :key="image.id"
                                                 class="col-12 col-sm-6 col-xl-3 my-3 photo-album-image">
                                                <img v-if="image"
                                                     :key="image.id"
                                                     :src="image.image.original.path"
                                                     class="img-fluid"
                                                     alt=""/>
                                                <button type="button"
                                                        aria-label="Удалить изображение"
                                                        class="delete__button"
                                                        @click="onDeleteImage(image.id)">
                                                    <IconDelete/>
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
        },
        data() {
            return {
                photoAlbumId: this.$route.params.id,
                photoAlbum: null,
            }
        },
        methods: {
            onUpdatePhotoAlbum({ title, description }) {
                this.photoAlbum.title = title;
                this.photoAlbum.description = description;
            },
            addNewImages(images) {
                if (!this.photoAlbum.images) {
                    this.photoAlbum.images = [];
                }

                images.forEach((image) => {
                    this.photoAlbum.images.unshift(new PliziAttachment(image))
                });
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
        .photo-album-image {
            &:hover {
                .delete__button {
                    display: block;
                }
            }

            img {
                position: relative;
            }

            .delete__button {
                display: none;
                position: absolute;
                top: 10px;
                right: 20px;
            }
        }
    }
</style>

