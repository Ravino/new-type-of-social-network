<template>
    <TextEditor :id="`profileWhatsNew`"
                :dropToDown="true"
                :showAvatar="true" :clazz="`row plz-text-editor mb-4 p-4 h-auto  align-items-start bg-white-br20`"
                @editorPost="onTextPost" @editorFile="onFileChange" @editorImage="onImageChange">
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
    textAreaAutoHeight() {
        let textarea = document.querySelector('#txtWhatsNew');
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px";
    },

    async onTextPost(evData){
        if (evData.postText.trim() !== '') {
            let response;

            try {
                response = await this.$root.$api.storePost({body: evData.postText.trim()});
            } catch (e) {
                console.warn(e.detailMessage);
            }

            if (response) {
                this.$emit('addNewPost', response);
            }
        }
    },

    onFileChange(evData){
        window.console.log(evData, `WhatsNewBlock::onFileChange`);
    },

    onImageChange(evData){
        window.console.log(evData, `WhatsNewBlock::onImageChange`);
    },
},
}
</script>

