<template>
    <li class="media position-relative pt-1 pr-1 mr-3">
        <img v-if="attach.isImage" :src="attach.thumb.path" class="" :alt="attach.originalName" :title="attach.originalName" />
        <template v-else>
            <i v-if="isArchive" class="fas fa-file-archive fa-3x d-inline-block" :alt="attach.originalName" :title="attach.originalName" ></i>
            <i v-else class="fas fa-file-alt fa-3x d-inline-block" :alt="attach.originalName"  :title="attach.originalName" ></i>
        </template>

        <button type="button"
                @click.prevent="onRemoveBtnClick($event)"
                class="btn btn-close btn-link border-0 border-danger bg-danger text-white rounded-circle" aria-label="delete">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
    </li>
</template>

<script>
import PliziAttachment from '../../classes/PliziAttachment.js';

export default {
name : 'AttachmentItem',
props : {
    attach : PliziAttachment
},

computed:{
    isArchive(){
        const ext = this.attach.originalName.split('.').pop().toLowerCase();
        return (`zip`===ext  || `rar`===ext);
    }
},

methods: {
    onRemoveBtnClick(ev){
        this.$emit(`RemoveAttachment`, {
            event: ev,
            attach : this.attach
        });
    }
}
}
</script>
