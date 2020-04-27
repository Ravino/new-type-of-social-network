<template>
    <TextEditor :id="`profileWhatsNew`"
                :showAvatar="true"
                :clazz="`row plz-text-editor mb-4 p-4 h-auto  align-items-start bg-white-br20`"
                :editorPlaceholder="'Что у Вас нового?'"
                :dropToDown="true"
                @editorPost="onTextPost"
                work-mode="post">
    </TextEditor>
</template>

<script>
import TextEditor from './TextEditor.vue';

export default {
name: 'WhatsNewBlock',
components: {
    TextEditor
},
data() {
    return {}
},
computed: {
    userData() {
        return this.$root.$user;
    },
},
methods: {
    killBrTrail(sText){
        const brExample = `<br/>`;

        while (true){
            const pos = sText.length - brExample.length;
            const trail = sText.substr(pos).toLowerCase();

            if (trail === brExample) {
                sText = sText.substr(0, pos);
            }
            else {
                break;
            }
        }

        return sText;
    },

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
        }
        else {
            if (evData.attachments.length > 0) {
                this.savePost( '', evData.attachments );
            }
        }
    },
    async savePost(text, attachments) {
        let response;

        try {
            response = await this.$root.$api.storePost({
                body: text.trim(),
                attachmentIds: attachments && attachments.length ? attachments : null,
            });
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

