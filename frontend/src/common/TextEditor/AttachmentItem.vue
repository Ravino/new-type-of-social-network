<template>
    <li class="media position-relative pt-1 pr-1 mr-3 mb-1">
        <img v-if="attach.isImage" :src="attach.thumb.path" class=""
             v-on:load="onAttachmentLoaded"
             :alt="attach.originalName" :title="attach.originalName" />
        <template v-else v-on:show="onZipDisplayed">
            <AttachmentFile :attach="attach"/>
        </template>

        <button type="button"
                @click.prevent="onRemoveBtnClick($event)"
                class="btn btn-close btn-link border-0 border-danger bg-danger text-white rounded-circle" aria-label="delete">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
    </li>
</template>

<script>
    import AttachmentFile from "../AttachmentFile";
import PliziAttachment from '../../classes/PliziAttachment.js';

export default {
name : 'AttachmentItem',
  components: {
    AttachmentFile,
  },
props : {
    attach : PliziAttachment
},
methods: {
    onRemoveBtnClick(ev){
        this.$emit(`RemoveAttachment`, {
            event: ev,
            attach : this.attach
        });
    },

    onAttachmentLoaded(ev) {
        this.$emit(`AttachmentLoaded`, {
            event: ev,
            attach : this.attach
        });
    },

    onZipDisplayed () {
        this.$emit(`ZipAttachmentDisplayed`, {
            event: ev,
            attach : this.attach
        });

    }
}
}
</script>
