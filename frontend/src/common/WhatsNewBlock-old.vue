<template>
    <div id="profileWhatsNew" class="row bg-white-br20 mb-4 p-4">
        <div class="col-1 p-0 text-center">
            <div class="profilePhotos-userpic text-left">
                <img :src="userData.userPic" :alt="userData.firstName"/>
            </div>
        </div>
        <div class="col-9 py-0 px-0">
            <!--            <textarea-autosize-->
            <!--                class="form-control profileWhatsNew-textarea"-->
            <!--                name="profileWhatsNew-textarea"-->
            <!--                id="txtWhatsNew" cols="1" rows="1"-->
            <!--                :min-height="10"-->
            <!--                :max-height="200"-->
            <!--                @input="textAreaAutoHeight"-->
            <!--                placeholder="Что у Вас нового?"-->
            <!--            />-->
            <Editor class="form-control p-0 h-100"
                    ref="editor"/>
        </div>
        <div class="col-2 ml-auto py0 pr-0 d-flex align-items-center justify-content-end">
            <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                <IconAddFile/>
                <input type="file">
            </label>
            <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                <IconAddCamera/>
                <input type="file">
            </label>

            <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                <EmojiPicker @addEmoji="addEmoji"
                             :transform="'transform: translate(0, 18%)'"/>
            </button>
        </div>
    </div>
</template>

<script>
    import IconAddFile from '../icons/IconAddFile.vue';
    import IconAddCamera from '../icons/IconAddCamera.vue';
    import IconAddSmile from '../icons/IconAddSmile.vue';
    import Editor from './TextEditor/Editor.vue';
    import EmojiPicker from './TextEditor/EmojiPicker.vue';

    export default {
        name: 'WhatsNewBlock',
        components: {
            IconAddCamera,
            IconAddSmile,
            IconAddFile,
            Editor,
            EmojiPicker,
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
            addEmoji(emoji) {
                this.$refs.editor.addEmoji(emoji);
            },
        },
    }
</script>

