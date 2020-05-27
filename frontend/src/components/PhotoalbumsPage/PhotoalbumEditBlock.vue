<template>
    <div id="createCommunityBlock">
        <button type="button"
                @click="showPhotoalbumEditModal"
                class="btn btn-create btn-block btn-primary">
            Редактировать альбом
        </button>
        <PhotoalbumEditModal v-if="photoalbumEditModalShow"
                             @HidePhotoalbumEditModal="onHidePhotoalbumEditModal" :albumId="toCheckAlbumId">
        </PhotoalbumEditModal>
    </div>
</template>

<script>
    import PhotoalbumEditModal from './PhotoalbumEditModal.vue';

    export default {
        name: 'PhotoalbumEditBlock',
        components: {
            PhotoalbumEditModal
        },
        data() {
            return {
                photoalbumEditModalShow: false
            }
        },
        computed: {
            toCheckAlbumId() {
                return this.$route.params.id;
            }
        },
        methods: {
            showPhotoalbumEditModal() {
                this.photoalbumEditModalShow = true;
            },

            onHidePhotoalbumEditModal() {
                this.photoalbumEditModalShow = false;
            }
        }

    }
</script>
