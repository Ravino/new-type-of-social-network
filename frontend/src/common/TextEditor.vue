<template>
    <div :id="fieldId" class-x="row d-flex align-items-center mx-0 py-4"
         :class="blockClass">

        <div v-if="showAvatar" class="col-1 align-items-center text-center pt-2">
            <img class="chat-companion-user-pic rounded-circle my-0 mx-auto"
                 v-bind:src="userPic" v-bind:alt="userFullName" />
        </div>

        <div class="pl-0" :class="{ 'col-9': showAvatar, 'col-10 forward-message-width': !showAvatar }">
            <div class="form pl-3">
                <div class="form-row align-items-center">
                    <div class="col-12  p-0">
                        <Editor class="plz-text-editor-form form-control px-2 py-1 h-100"
                                @editorPost="onEditorNewPost"
                                :placeholder="editorPlaceholder"
                                ref="editor" />
                    </div>
                </div>
            </div>
        </div>

        <div class="forward-attach-width col-2 d-flex justify-content-end"  :class="{ 'pt-2': showAvatar } " >

            <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                <IconAddFile />
                <input type="file" @change="onSelectFile($event)" ref="editorFiler" />
            </label>

            <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                <IconAddCamera />
                <input type="file" @change="onSelectImage($event)" ref="editorImager" />
            </label>

            <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">

                <EmojiPicker v-if="dropToDown" @addEmoji="onAddEmoji"
                             :transform="'transform: translate(-40%, 40px)'"/>

                <EmojiPicker v-else  @addEmoji="onAddEmoji"
                             :transform="'transform: translate(-40%, -100%)'"/>
            </button>
        </div>
    </div>
</template>

<script>
import IconAddFile from '../icons/IconAddFile.vue';
import IconAddCamera from '../icons/IconAddCamera.vue';
import Editor from './TextEditor/Editor.vue';
import EmojiPicker from './TextEditor/EmojiPicker.vue';

/**  TODO: Вставка файлов **/
/** @link https://www.npmjs.com/package/vue-filepond **/

export default {
name: 'TextEditor',
props: {
    fieldId : String,
    showAvatar: Boolean,
    clazz: String,
    editorPlaceholder: String,
    dropToDown: Boolean,
},
components: {
    IconAddCamera,
    IconAddFile,
    Editor,
    EmojiPicker,
},
computed: {
    userPic() {
        return this.$root.$user.userPic;
    },

    userFullName() {
        return this.$root.$user.fullName;
    },

    blockClass(){
        return this.clazz || this.defaultClasses
    }
},

data() {
    return {
        defaultClasses: `bg-white w-100 border-top position-relative mt-auto`,
    }
},

methods: {
    getContent(){
        return this.$refs.editor.getContent();
    },

    onEditorNewPost(evData){
        this.$emit('editorPost', { postText : evData.postText });
    },

    onSelectFile(evData){
        this.$emit('editorFile', {
            event : evData,
            path: this.$refs.editorFiler.value
        });
    },

    onSelectImage(evData){
        this.$emit('editorImage', {
            event : evData,
            path: this.$refs.editorImager.value
        });
    },

    onAddEmoji(evData) {
        if (evData.keys.ctrlKey) { // бал нажат Ctrl
            let txt = this.$refs.editor.getContent();

            //this.$emit('editorPost', { postText : `<!--<p onclick="alert(11111)">Серега привет!!!</p>>-->` });
            //this.$emit('editorPost', { postText : `<img src="https://steamuserimages-a.akamaihd.net/ugc/792010418808130585/980E17AA6CF29E06865DA40F9067B9164AB54BCD/" alt="" />` });

            if (`<p></p>` === txt.toLowerCase()) { // поле ввода пустое - значит отправляем только увеличенный эмоджи
                const sendSmile = `<p class="big-emoji">${evData.emoji}</p>`;
                this.$emit('editorPost', { postText : sendSmile });
            }
            else { // просто добавляем эмоджи
                this.$refs.editor.addEmoji(evData.emoji);
            }
        }
        else { // просто добавляем эмоджи
            this.$refs.editor.addEmoji(evData.emoji);
        }
    },

    getFormData(fName){
        const formData = new FormData();
        const imageFile = document.querySelector('#userAvatarFile');
        formData.append('image', imageFile.files[0]);

        return formData;
    }
}

}
</script>
