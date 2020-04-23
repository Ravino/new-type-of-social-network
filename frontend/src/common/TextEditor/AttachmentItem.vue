<template>
    <li class="media mr-3">
        <img v-if="attach.isImage" :src="attach.thumb.path" class="" :alt="attach.originalName" />
        <template v-else>
            <i v-if="isArchive" class="fas fa-file-archive fa-3x d-inline-block" :alt="attach.originalName"></i>
            <i class="fas fa-file-alt fa-3x d-inline-block" :alt="attach.originalName"></i>
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
