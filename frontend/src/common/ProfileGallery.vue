<template>
    <div class="profile-photos">
        <div v-if="profilePhotos" class="w-100  d-flex flex-row plz-profile-photos-list">

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
        <div class="plz-gallery__show" v-if="activeImage">
            <GalleryViewer
                :images="images"
                :active-image="activeImage"
                @showImage="showImage"
                @close="activeImage = null">
            </GalleryViewer>
            <ProfileGalleryDescription
                :comments="comments"
                :image="activeImage"
                @updateComments="updateComments">
            </ProfileGalleryDescription>
        </div>
    </div>
</template>

<script>
    import GalleryViewer from './GalleryViewer.vue';
    import GalleryDescription from "./GalleryDescription.vue";
    import ProfileGalleryDescription from "./ProfileGalleryDescription.vue";
    import PliziComment from "../classes/PliziComment";

    export default {
        name: 'ProfileGallery',
        components: {ProfileGalleryDescription, GalleryDescription, GalleryViewer},
        props: {
            profilePhotos: Boolean,
            images: {
                type: Array,
                default: () => [],
            },
        },

        data() {
            return {
                activeImage: null,
                comments: [],
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
            async getCommentsOfAlbum( activeImageId ) {
                try {
                    let response = await this.$root.$api.$post.getAlbumComments(activeImageId);
                    this.comments = response.data.list.map(comment => new PliziComment(comment));
                } catch (e) {
                    console.warn(e.detailMessage);
                }
            },
            updateComments({ comments, id }) {
                if (this.activeImage.id === id) {
                    this.comments = comments;
                }
            },
            showImage(image) {
                this.activeImage = this.images.find(attach => attach.id === image.id);
                this.getCommentsOfAlbum( image.id );

            },
        },
    }
</script>
