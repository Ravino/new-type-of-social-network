<template>
    <div class="message-attachments" v-if="message.isAttachments">
        <div class="message-attachment-item" v-for="attach in message.attachments" v-bind:key="attach.id">

            <img v-if="attach.isImage" class="message-sended-image mt-1" :src="attach.medium.path" :alt="attach.originalName" />

            <span v-else class="message-sended-zip d-flex align-items-center mt-1">
                <IconZip/>
                <span class="message-sended-zip-info mx-2">
                    <span class="message-sended-name m-0">{{attach.originalName}}}</span>
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
}
}
</script>
