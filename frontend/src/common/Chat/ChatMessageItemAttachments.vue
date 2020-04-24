<template>
    <div class="message-attachments d-flex flex-wrap " v-if="message.isAttachments">
        <div class="message-attachment-item mb-2"
             v-for="attach in message.attachments" v-bind:key="attach.id">

            <img v-if="attach.isImage" class="message-sended-image" :src="attach.medium.path" :alt="attach.originalName" />

            <span v-else class="message-sended-attach d-flex align-items-center mb-2">
                <IconZip/>
                <span class="message-sended-attach-info d-flex flex-column mx-2">
                    <span class="message-sended-name m-0">{{attach.originalName}}</span>
                    <span class="message-sended-size m-0">{{attach.size}}</span>
                </span>
            </span>

        </div>
    </div>
</template>

<script>
import IconZip from '../../icons/IconZip.vue';

import PliziMessage from '../../classes/PliziMessage.js';

export default {
name : 'ChatMessageItemAttachments',
components : { IconZip },
props : {
    message : PliziMessage
},
computed:{
    isArchive(){
        const ext = this.attach.originalName.split('.').pop().toLowerCase();
        return (`zip`===ext  || `rar`===ext);
    }
},
}
</script>
