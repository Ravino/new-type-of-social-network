<template>
    <div id="createCommunityBlock">
                <button type="button"
                        @click="showPhotoalbumCreateModal"
                        class="btn btn-create btn-block btn-primary rounded-pill">
                    Создать альбом
                </button>
                <PhotoalbumCreateModal v-if="photoalbumCreateModalShow"
                         @HidePhotoalbumCreateModal="onHidePhotoalbumCreateModal">
                </PhotoalbumCreateModal>
    </div>
</template>

<script>
import PhotoalbumCreateModal from './PhotoalbumCreateModal';

export default {
name: 'PhotoalbumCreateBlock',
components: {
    PhotoalbumCreateModal
},
data(){
    return {
        photoalbumCreateModalShow : false
    }
},

methods: {
    showPhotoalbumCreateModal(){
        this.photoalbumCreateModalShow = true;
    },

    onHidePhotoalbumCreateModal(){
        this.photoalbumCreateModalShow = false;
    }
}

}
</script>
