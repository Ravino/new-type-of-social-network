<template>
    <div v-if="images" class="gallery grid-gallery w-100">
        <div class="container-fluid">
            <div class="row">
                <div v-for="(image, index) in images"
                     :key="index"
                     class="gallery-item col-12 col-sm-6 col-xl-3 my-3 d-flex align-items-stretch position-relative">
                    <div v-if="image.image && image.image.original.path"
                         class="gallery-image-wrapper d-flex flex-column position-relative overflow-hidden">
                        <img :src="image.image.original.path"
                             @click="show(image)"
                             class="gallery-image img-fluid"
                             alt=""/>

                        <button type="button"
                                aria-label="Удалить изображение"
                                class="delete__button"
                                @click.prevent="$emit('onDelete', image.id)">
                            <i class="fa fa-plus"
                               aria-hidden="true"></i>
                        </button>
                    </div>

                    <div v-else
                         class="gallery-image-wrapper d-flex flex-column position-relative overflow-hidden">
                        <img :src="image.fileBlob"
                             class="gallery-image img-fluid"
                             alt=""/>
                        <div class="spinner-wrap">
                            <SmallSpinner v-if="image.isBlob"
                                          clazz="media__spinner"
                                          :hide-text="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="plz-gallery__show" v-if="activeImageId">
            <GalleryViewer
                class="w-100"
                :images="images"
                :active-image="activeImage"
                @showImage="show"
                @close="activeImageId = null">
            </GalleryViewer>

        </div>
    </div>
</template>

<script>
    import GalleryViewer from '../GalleryViewer.vue';
    import SmallSpinner from "../../common/SmallSpinner.vue";

    export default {
        name: "GridGallery",
        components: {
            GalleryViewer,
            SmallSpinner,
        },
        props: {
            images: {
                type: Array,
                default: null,
            },
        },
        data() {
            return {
                activeImageId: null,
                activeImage: null,
            }
        },
        methods: {
            show(image) {
                this.activeImageId = image.id;
                this.activeImage = this.images.find(attach => attach.id === image.id);
            },
        },
    }
</script>

<style scoped>

</style>
