<template>
    <TextEditor id="communityEditor"
                :clazz="`row plz-text-editor mb-4 p-4 h-auto  align-items-start bg-white-br20`"
                :editorPlaceholder="'Введите текст ...'"
                :dropToDown="true"
                @editorPost="onTextPost"
                workMode="post">
    </TextEditor>
</template>

<script>
import TextEditor from '../TextEditor.vue';
import ChatMixin from '../../mixins/ChatMixin.js';

export default {
name: 'CommunityEditor',
components: {
    TextEditor
},
mixins: [ChatMixin],
props: {
    communityId: {
        type: Number,
        default: null,
    },
},

methods: {
    async onTextPost(evData){
        let msg = evData.postText.trim();

        if (msg !== '') {
            const brExample = `<br/>`;
            msg = msg.replace(/<p><\/p>/g, brExample);
            msg = this.killBrTrail(msg);

            if (msg !== '') {
                this.savePost( msg, evData.attachments );
            } else if (evData.attachments.length > 0) {
                this.savePost( '<p></p>', evData.attachments );
            }
        } else {
            if (evData.attachments.length > 0) {
                this.savePost( '', evData.attachments );
            }
        }
    },

    async savePost(text, attachments) {
        let response;
        let formData = {};

        formData.body = text.trim();

        if (attachments && attachments.length) {
            formData.attachmentIds = attachments;
        }

        try {
            response = await this.$root.$api.$post.storePostByCommunity(this.communityId, formData);
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response) {
            this.$emit('addNewPost', response);
        }
    }
},
}
</script>
