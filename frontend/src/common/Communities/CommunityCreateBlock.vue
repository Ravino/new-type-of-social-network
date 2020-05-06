<template>
    <div id="createCommunityBlock" class="col-3 mb-4  d-flex align-items-center pl-0">
        <div class="col-12  d-flex align-items-center h-100  bg-white-br20 ">
            <div class=" bg-white-br20 w-100">
                <button type="button"
                        @click="ShowCommunityCreateModal"
                        class="btn btn-create btn-block btn-primary rounded-pill ">
                    Создать сообщество
                </button>
                <CommunityCreateModal v-if="communityCreateModalShow"
                         @HideCommunityCreateModal="onHideCommunityCreateModal">
                </CommunityCreateModal>
            </div>
        </div>
    </div>
</template>

<script>
import CommunityCreateModal from './CommunityCreateModal.vue';

export default {
name: 'CommunityCreateBlock',
components: {
    CommunityCreateModal
},
data(){
    return {
        communityCreateModalShow : false
    }
},

methods: {
    ShowCommunityCreateModal(){
        this.communityCreateModalShow = true;
    },

    onHideCommunityCreateModal(){
        this.communityCreateModalShow = false;
    }
}

}
</script>
