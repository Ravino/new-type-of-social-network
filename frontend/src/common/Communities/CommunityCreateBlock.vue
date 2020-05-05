<template>
    <div id="createCommunityBlock" class="bg-white-br20 col-4 mb-4 px-4 d-flex align-items-center ">
        <div class="w-100">
            <button type="button"
                    @click="ShowCommunityCreateModal"
                    class="btn btn-create btn-block btn-primary rounded-pill ">
                Создать сообщество
            </button>
        </div>

        <CommunityCreateModal v-if="communityCreateModalShow"
                                  @HideCommunityCreateModal="onHideCommunityCreateModal">
        </CommunityCreateModal>
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
