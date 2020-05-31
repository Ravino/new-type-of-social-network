<template>
    <div class="profile-photos">
        <div v-if="profilePhotos" class="w-100  d-flex flex-row plz-profile-photos-list pt-4">

            <div class="profile-photos-item" v-for="(photo) in images" v-bind:key="photo.id">
                <div class="plz-profile-photo-item my-0 ml-0 mr-3"
                     :class="{'plz-gallery-image-mores': photo.isMore}"
                     @click="showImage(photo)">
                    <img @click="showImage(photo)"
                         :src="photo.medium.path"
                         :alt="photo.name"/>
                </div>
<!--                <button class="btn-close"  aria-label="delete" @click="onDeleteImage(photo.id)">-->
<!--                    <i class="fa fa-plus" aria-hidden="true"></i>-->
<!--                </button>-->

            </div>

        </div>
        <div class="plz-gallery__show" v-if="activeImageId">
            <GalleryViewer
                class="w-100"
                :images="images"
                :active-image="activeImage"
                @close="activeImageId = null">
            </GalleryViewer>

        </div>
    </div>
</template>

<script>
    import GalleryViewer from './GalleryViewer.vue';

    export default {
        name: 'ProfileGallery',
        components: {GalleryViewer},
        props: {
            profilePhotos: Boolean,
            images: {
                type: Array,
                default: () => [],
            },
        },

        data() {
            return {
                activeImageId: null,
                activeImage: null,
            };
        },

        computed: {
            viewImages() {
                return this.images.slice(0, this.moreCount);
            },

            firstImageView() {
                return this.images.slice(0, 1).pop();
            },

            lastImageView() {
                return this.viewImages.slice(-1).pop();
            },

        },

        methods: {
            showImage(image) {
                this.activeImageId = image.id;
                this.activeImage = this.images.find(attach => attach.id === image.id);
            },
        },
    }
</script>
