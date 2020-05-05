<template>
    <TextEditor :id="`profileWhatsNew`"
                :clazz="`row plz-text-editor mb-4 p-4 h-auto  align-items-start bg-white-br20`"
                :editorPlaceholder="'Что у Вас нового?'"
                :dropToDown="true"
                @editorPost="onTextPost"
                work-mode="post">
    </TextEditor>
</template>

<script>
import TextEditor from './TextEditor.vue';

import ChatMixin from '../mixins/ChatMixin.js';

export default {
name: 'WhatsNewBlock',
components: {
    TextEditor
},
    mixins: [ChatMixin],
data() {
    return {}
},
computed: {
    userData() {
        return this.$root.$auth.user;
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
          response = await this.$root.$api.$post.storePost(formData);
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

