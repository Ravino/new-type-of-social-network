<template>
    <div class="photoalbum-page-description">
        <h6>{{ album.title }}</h6>
        <p>{{ album.description }}</p>
        <p>
            <span @click="showPhotoalbumEditModal" class="edit-album">Редактировать альбом</span>
            |
            <span class="delete-album" @click="deletePhotoalbum">Удалить альбом</span>
        </p>

        <PhotoalbumEditModal v-if="photoalbumEditModalShow"
                             @HidePhotoalbumEditModal="onHidePhotoalbumEditModal" :albumId="1">
        </PhotoalbumEditModal>
    </div>
</template>

<script>
    import PhotoalbumEditModal from './PhotoalbumEditModal.vue';
    import AlertModal from '../AlertModal.vue';

    export default {
        name: 'PhotoalbumEditBlock',
        components: {
            PhotoalbumEditModal,
            AlertModal
        },
        props: {
            album: Object
        },
        data() {
            return {
                photoalbumEditModalShow: false
            }
        },
        methods: {
            async deletePhotoalbum() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$photoalbums.deleteAlbum(this.album.id);
                    this.hidePhotoalbumCreateModal();
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    await this.$root.$alert(`Вы удалили альбом ${this.album.title}`, 'bg-success', 3);
                    await this.$router.push({path: '/photoalbums-list'});
                }
            },
            showPhotoalbumEditModal() {
                this.photoalbumEditModalShow = true;
            },

            onHidePhotoalbumEditModal() {
                this.photoalbumEditModalShow = false;
            }
        }
    }
</script>
