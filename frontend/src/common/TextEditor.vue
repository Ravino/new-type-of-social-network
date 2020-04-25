<template>
    <div :id="fieldId" :class="blockClass">
        <div class="flex-column w-100 ">
            <div class="row w-100 ml-0">
                <div v-if="showAvatar" class="col-1 align-items-center text-center pt-2">
                    <img class="chat-companion-user-pic rounded-circle my-0 mx-auto"
                         v-bind:src="userPic" v-bind:alt="userFullName" />
                </div>

                <div class="pl-0" :class="{ 'col-9': showAvatar, 'col-10 forward-message-width': !showAvatar }">
                    <div class="form pl-3">
                        <div class="form-row align-items-center">
                            <div class="col-12  p-0">
                                <Editor class="plz-text-editor-form form-control px-2 py-1 h-100"
                                        :height="height"
                                        @editorPost="onEditorNewPost"
                                        @editorKeyDown="onEditorKeyDown"
                                        :placeholder="editorPlaceholder"
                                        ref="editor" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="forward-attach-width col-2 d-flex justify-content-end"  :class="{ 'pt-2': showAvatar } " >

                    <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                        <IconAddFile />
                        <input type="file" @change="onSelectFile($event)" ref="editorFiler" multiple />
                    </label>

                    <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                        <IconAddCamera />
                        <input type="file" @change="onSelectImage($event)" ref="editorImager" multiple />
                    </label>

                    <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                        <EmojiPicker v-if="dropToDown"
                                     @addEmoji="onAddEmoji"
                                     :transform="'transform: translate(-40%, 40px)'"/>
                        <EmojiPicker v-else
                                     @addEmoji="onAddEmoji"
                                     :transform="'transform: translate(-40%, -100%)'"/>
                    </button>
                </div>
            </div>
            <!-- @TGA это чтобы блок с plz-attachment-images начался с новой строки -->
            <div v-if="attachFiles  &&  attachFiles.length>0" class="row mt-3">
                <div class="plz-attachment-images col-10 offset-1 pl-4" >
                    <ul class="plz-attachment-images-list list-unstyled d-flex flex-row mb-0"
                        ref="attachList">
                        <AttachmentItem v-for="atFile in attachFiles"
                            @RemoveAttachment="onRemoveAttachment"
                            v-bind:attach="atFile"
                            v-bind:key="atFile.id">
                        </AttachmentItem>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconAddFile from '../icons/IconAddFile.vue';
import IconAddCamera from '../icons/IconAddCamera.vue';

import Editor from './TextEditor/Editor.vue';
import EmojiPicker from './TextEditor/EmojiPicker.vue';
import AttachmentItem from './TextEditor/AttachmentItem.vue';

import PliziAttachment from '../classes/PliziAttachment.js';

/**  TODO: Вставка файлов **/
/** @link https://www.npmjs.com/package/vue-filepond **/

export default {
name: 'TextEditor',
components: {
    IconAddCamera,
    IconAddFile,
    Editor,
    EmojiPicker,
    AttachmentItem
},
props: {
    fieldId : String,
    showAvatar: Boolean,
    clazz: String,
    editorPlaceholder: String,
    dropToDown: Boolean,
    height: {
        type: Number,
        required: false,
        default: 100
    }
},

data() {
    return {
        attachFiles: [],
        defaultClasses: `bg-white w-100 border-top position-relative mt-auto`,
    }
},

computed: {
    userPic() {
        return this.$root.$user.userPic;
    },

    userFullName() {
        return this.$root.$user.fullName;
    },

    blockClass(){
        return this.clazz || this.defaultClasses;
    }
},

methods: {
    getContent(){
        return {
            postText : this.$refs.editor.getContent(),
            attachments : this.getAttachmentsIDs()
        }
    },

    getAttachmentsIDs(){
        if (this.attachFiles  &&  this.attachFiles.length > 0)
            return this.attachFiles.map((aItem)=>{ return aItem.id; });

        return [];
    },

    onRemoveAttachment(evData){
        this.attachFiles = this.attachFiles.filter( (aItem) => { return aItem.id !== evData.attach.id;});
    },

    onEditorNewPost(evData){
        this.$emit('editorPost', {
            postText : evData.postText,
            attachments : this.getAttachmentsIDs()
        });

        this.attachFiles = [];
    },

    onEditorKeyDown(ev){
        this.$emit('editorKeyDown', ev);
    },

    onSelectFile(evData){
        this.addUploadAttachment(this.$refs.editorFiler.files);
    },

    onSelectImage(evData){
        this.addUploadAttachment(this.$refs.editorImager.files);
    },

    onAddEmoji(evData) {
        if (evData.keys.ctrlKey) { // бал нажат Ctrl
            this.$refs.editor.focus();

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

    setEditorNewHeight (newEditorH) {
        this.$emit('editorChangeHeight', {
            newHeight: newEditorH
        });
        // console.log(newEditorH);
    },

    async addUploadAttachment( picsArr ){
        this.$refs.editor.focus();

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatAttachment( picsArr );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            apiResponse.map( (attItem)=>{
                let newAtt = new PliziAttachment(attItem);
                this.attachFiles.push( newAtt );
                this.$emit('newAttach', { attach : newAtt });
            });
        }
        else {
            window.console.info( apiResponse );
        }
    },
},
}
</script>
