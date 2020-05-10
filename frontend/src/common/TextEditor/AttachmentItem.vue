<template>
    <li class="media position-relative pt-1 pr-1 mr-3 mb-1">
        <Spinner v-if="attach.isBlob" clazz="media__spinner" :hide-text="true"></Spinner>
        <img v-if="attach.isImage" :src="imageSrc"
             v-on:load="onAttachmentLoaded"
             :alt="attach.originalName.originalName" :title="attach.originalName.originalName" />
        <template v-else v-on:show="onZipDisplayed">
            <AttachmentFile :attach="attach.attachment"/>
        </template>

        <button type="button"
                @click.prevent="onRemoveBtnClick($event)"
                class="btn btn-close btn-link border-0 border-danger bg-danger text-white rounded-circle" aria-label="delete">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
    </li>
</template>

<script>
import AttachmentFile from "../AttachmentFile.vue";
import PliziAttachmentItem from '../../classes/PliziAttachmentItem.js';
import Spinner from '../Spinner.vue';

export default {
name : 'AttachmentItem',
  components: {
    AttachmentFile,
    Spinner
  },
props : {
    attach : PliziAttachmentItem
},
methods: {
    onRemoveBtnClick(ev){
        this.$emit(`RemoveAttachment`, {
            event: ev,
            attach : this.attach.attachment
        });
    },

    onAttachmentLoaded(ev) {
        this.$emit(`AttachmentLoaded`, {
            event: ev,
            attach : this.attach.attachment
        });
    },

    onZipDisplayed () {
        this.$emit(`ZipAttachmentDisplayed`, {
            event: ev,
            attach : this.attach.attachment
        });

    }
},
computed: {
    imageSrc() {
        return this.attach.isBlob ? this.attach.fileBlob : this.attach.attachment.thumb.path;
    }
}
}
</script>
