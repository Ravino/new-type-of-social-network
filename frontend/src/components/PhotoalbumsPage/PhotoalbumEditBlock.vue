<template>
    <div v-if="photoAlbum" class="photoalbum-page-description">
        <h6>{{ photoAlbum.title }}</h6>
        <p>{{ photoAlbum.description }}</p>
        <div class="d-flex">
            <button @click="showPhotoalbumEditModal"
                    class="btn plz-btn-primary edit-album">
                Редактировать альбом
            </button>
            <button class="btn btn-outline-danger delete-album"
                    @click="onShowDeletePhotoAlbumModal">
                Удалить альбом
            </button>
        </div>

        <PhotoalbumEditModal v-if="photoalbumEditModalShow"
                             @HidePhotoalbumEditModal="onHidePhotoalbumEditModal"
                             :photoAlbum="photoAlbum"/>

        <DeletePhotoAlbumModal v-if="deletePhotoAlbumModal.isVisible"
                               :id="deletePhotoAlbumModal.content.id"
                               :isSuccess="isSuccessDelete"
                               :isShipped="isShippedDelete"
                               @onSuccessDelete="deletePhotoAlbum"
                               @onHide="onHideDeletePhotoAlbumModal"/>
    </div>
</template>

<script>
    import PhotoalbumEditModal from './PhotoalbumEditModal.vue';
    import AlertModal from '../AlertModal.vue';
    import DeletePhotoAlbumModal from "./DeletePhotoAlbumModal.vue";

    import PliziPhotoAlbum from "../../classes/PliziPhotoAlbum.js";

    export default {
        name: 'PhotoalbumEditBlock',
        components: {
            PhotoalbumEditModal,
            AlertModal,
            DeletePhotoAlbumModal,
        },
        props: {
            photoAlbum: PliziPhotoAlbum,
        },
        data() {
            return {
                photoalbumEditModalShow: false,
                deletePhotoAlbumModal: {
                    isVisible: false,
                    content: {
                        id: null,
                    },
                },
                isSuccessDelete: false,
                isShippedDelete: false,
            }
        },
        methods: {
            showPhotoalbumEditModal() {
                this.photoalbumEditModalShow = true;
            },
            onHidePhotoalbumEditModal() {
                this.photoalbumEditModalShow = false;
            },
            onShowDeletePhotoAlbumModal() {
                this.deletePhotoAlbumModal.content.id = this.photoAlbum.id;
                this.deletePhotoAlbumModal.isVisible = true;
            },
            onHideDeletePhotoAlbumModal() {
                this.deletePhotoAlbumModal.isVisible = false;
                this.deletePhotoAlbumModal.content.id = null;
            },

            async deletePhotoAlbum() {
                this.isShippedDelete = true;
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.deleteAlbum(this.deletePhotoAlbumModal.content.id);
                } catch (e) {
                    this.isShippedDelete = false;
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    this.isSuccessDelete = true;

                    setTimeout(() => {
                        this.$router.push({path: '/photoalbums-list'});
                    }, 3000);
                }
            },
        }
    }
</script>
