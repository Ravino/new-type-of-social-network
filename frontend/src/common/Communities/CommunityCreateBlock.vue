<template>
    <div id="createCommunityBlock" class="col-4 pl-2">
        <div class="bg-white-br20 h-100 py-3 px-3">
            <button type="button"
                    @click="ShowCommunityCreateModal"
                    class="btn btn-block btn-primary rounded-pill py-3">
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
