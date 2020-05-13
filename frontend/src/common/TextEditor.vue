<template>
    <div :id="fieldId" :class="blockClass" ref="editorContainer">
        <div class="--flex-column w-100 position-relative">
            <div class="row w-100 ml-0">
                <div v-if="showAvatar" class="plz-editor-avatar col-1 align-items-center text-center pt-2">
                    <img class="chat-companion-user-pic rounded-circle my-0 mx-auto"
                         v-bind:src="userPic" v-bind:alt="userFullName" />
                </div>

                <div class="plz-editor-body pl-0" :class="{ 'plz-editor-body-wza': showAvatar, 'forward-message-width': !showAvatar }">
                    <div class="form pl-2">
                        <div class="form-row align-items-center">
                            <div class="col-12 d-flex justify-content-between p-0 ">
                                <Editor class="plz-text-editor-form form-control px-2 py-1 "
                                        @editorPost="onEditorNewPost"
                                        @editorKeyDown="onEditorKeyDown"
                                        @onMaximumCharacterLimit="onMaximumCharacterLimit"
                                        :placeholder="editorPlaceholder"
                                        :inputEditorText="inputEditorText"
                                        :maximumCharacterLimit="maximumCharacterLimit"
                                        :isError="isMaximumCharacterLimit"
                                        ref="editor" />
                                <button @click.stop="onSendPostClick" class="btn btn-link">
                                    <IconSend style="height: 20px"/>
                                </button>
                            </div>
                            <div v-if="isMaximumCharacterLimit" class="col-12">
                                <p class="text-danger">Превышено максимально допустимое количество символов.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="plz-editor-btns d-flex flex-column flex-md-row justify-content-between"  >

                    <label
                        :class="{'attach-file--disallow cursor-non-drop' : isDisallowUpload}"
                        class="attach-file w-100 d-flex align-items-center justify-content-center btn btn-link my-0 ml-0 mr-0 mr-md-2 px-1 btn-add-file position-relative"
                    >
                        <IconAddFile />
                        <input type="file" :disabled="isDisallowUpload" @change="onSelectFile($event)" ref="editorFiler" multiple />
                    </label>

                    <!--<label class="attach-file d-flex align-items-center  btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                        <IconAddCamera />
                        <input type="file" @change="onSelectImage($event)" ref="editorImager" multiple />
                    </label>-->

                    <button class="btn btn-link w-100 mx-0 px-1 btn-add-smile position-relative" type="button">
                        <EmojiPicker v-if="dropToDown"
                                     @addEmoji="onAddEmoji"
                                     :transform="'transform: translate(-40%, 40px)'">
                        </EmojiPicker>
                        <EmojiPicker v-else
                                     @addEmoji="onAddEmoji"
                                     :transform="'transform: translate(-54%, -100%)'">
                        </EmojiPicker>
                    </button>
                </div>
            </div>

            <div v-if="attachFiles  &&  attachFiles.length>0" class="row mt-3">
                <div class="plz-attachment-images pl-4" :class="{'offset-1 col-9 ' : showAvatar, 'col-10': !showAvatar }" >
                    <ul class="plz-attachment-images-list list-unstyled d-flex flex-row mb-0 flex-wrap"
                        ref="attachList">
                        <AttachmentItem v-for="atFile in attachFiles"
                            @RemoveAttachment="onRemoveAttachment"
                            @AttachmentLoaded="onAttachmentLoaded"
                            @ZipAttachmentDisplayed="onAttachmentLoaded"
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
import IconSend from "../icons/IconSend.vue";

import Editor from './TextEditor/Editor.vue';
import EmojiPicker from './TextEditor/EmojiPicker.vue';
import AttachmentItem from './TextEditor/AttachmentItem.vue';

import PliziAttachment from '../classes/PliziAttachment.js';
import { checkExtension } from '../utils/FileUtils.js';
import { docsExtensions, imagesExtensions } from '../enums/FileExtensionEnums.js';
import PliziAttachmentItem from "../classes/PliziAttachmentItem.js";

/**  TODO: Вставка файлов **/
/** @link https://www.npmjs.com/package/vue-filepond **/

export default {
name: 'TextEditor',
components: {
    IconSend,
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
    workMode: {
        type: String,
        required: true,
    },
  inputEditorText: String,
  inputEditorAttachment: Array,
  maxFilesCount: {
      type: Number,
      default: 10,
  },
    maximumCharacterLimit: {
        type: Number,
        default: 10000,
    }
},

data() {
    let attachFiles = [];

    if (this.inputEditorAttachment) {
        attachFiles = this.inputEditorAttachment.map(file => {
            const attachment = new PliziAttachmentItem(false, file.isImage, file.originalName);
            attachment.attachment = file;

            return attachment;
        });
    }

    return {
        attachFiles,
        defaultClasses: `bg-white w-100 border-top position-relative mt-auto`,
        editorContainerHeight: 32,
        isMaximumCharacterLimit: false,
    }
},

computed: {
    userPic() {
        return this.$root.$auth.user.userPic;
    },

    userFullName() {
        return this.$root.$auth.user.fullName;
    },

    blockClass(){
        return this.clazz || this.defaultClasses;
    },
    isDisallowUpload() {
        return this.attachFiles.length >= this.maxFilesCount;
    }
},

methods: {
    focus(){
        this.$refs.editor.focus();
    },

    getContent() {
        return {
            postText: this.$refs.editor.getContent(),
            attachments: this.getAttachmentsIDs()
        }
    },

    getAttachmentsIDs() {
        if (this.attachFiles && this.attachFiles.length > 0)
            return this.attachFiles.map((aItem) => {
                return aItem.attachment.id;
            });

        return [];
    },

    onRemoveAttachment(evData) {
        this.attachFiles = this.attachFiles.filter((aItem) => {
            return aItem.attachment.id !== evData.attach.id;
        });

        const $this = this;
        setTimeout(function() {
            $this.checkUpdatedChatContainerHeight();
        }, 200);

        this.$emit('onRemoveAttachment', evData.attach.id);
    },

    onAttachmentLoaded(evData) {
        this.checkUpdatedChatContainerHeight();
    },

    onSendPostClick(){
        const cont = this.$refs.editor.getContent();
        let str = cont.replace(/<p>|<\/p>/g, '').trim();

        if (!str.length)
            return;

        this.$refs.editor.setContent('');
        this.$refs.editor.focus();

        this.onEditorNewPost({
            postText: cont
        });
    },

    onEditorNewPost(evData) {
        if (this.isMaximumCharacterLimit) {
            this.isMaximumCharacterLimit = false;
            return;
        }

        this.$emit('editorPost', {
            postText: evData.postText,
            attachments: this.getAttachmentsIDs()
        });

        this.attachFiles = [];
    },

    onEditorKeyDown(ev) {
        this.$emit('editorKeyDown', ev);
    },

    onSelectFile(evData) {
        this.addUploadAttachment(this.$refs.editorFiler.files);
    },

    onSelectImage(evData) {
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
                this.$emit('editorPost', {postText: sendSmile});
            } else { // просто добавляем эмоджи
                this.$refs.editor.addEmoji(evData.emoji);
            }
        } else { // просто добавляем эмоджи
            this.$refs.editor.addEmoji(evData.emoji);
        }
    },

    onEditorNewHeight(evData) {
        this.$emit('editorNewHeight', {
            newHeight: evData
        });
    },

    getStartContainerHeight () {
        let startChatContainerHeight = this.$refs.editorContainer.offsetHeight;
        this.editorContainerHeight = startChatContainerHeight;
    },

    checkUpdatedChatContainerHeight() {
        const updatedChatContainerHeight = this.$refs.editorContainer.offsetHeight;

        if (this.editorContainerHeight !== updatedChatContainerHeight) {
            this.editorContainerHeight = updatedChatContainerHeight;// TODO проверить @TGA
        }

        this.onEditorNewHeight(this.editorContainerHeight);
        //console.log('checkUpdatedChatContainerHeight', this.editorContainerHeight);
    },

    onMaximumCharacterLimit(str) {
        this.isMaximumCharacterLimit = str.length > this.maximumCharacterLimit;
    },

    async addUploadAttachment(picsArr) {
        this.$refs.editor.focus();

        const filseCount = picsArr.length + this.attachFiles.length;

        if (filseCount > this.maxFilesCount) {
            this.$alert(`
                <h4 class="text-white">Ошибка</h4>
                <div class="alert alert-danger">
                Превышен лимит загрузки файлов
                <br />
                Допустимый максимальный лимит файлов: <b class="text-success">${this.maxFilesCount}</b>
                </div>`, `bg-danger`, 30
            );
            return;
        }

        const allowExtensions = [...imagesExtensions, ...docsExtensions];

        for (const file of picsArr) {
            if (!checkExtension(file, allowExtensions)) {
                this.$alert(`
                    <h4 class="text-white">Ошибка</h4>
                    <div class="alert alert-danger">
                        Недопустимое расширение у файла <b>${file.name}</b>
                        <br />
                        Допустимые расширения файлов: <b class="text-success">${allowExtensions.join( ', ' )}</b>
                    </div>`,
                    `bg-danger`,
                    30
                );

                picsArr = picsArr.filter(foundFile => foundFile.name !== file.name);
            }
        }

        if (picsArr.length === 0) {
          return;
        }

        for (const file of picsArr) {
            const reader = new FileReader();
            reader.onload = () => {
                const attachment = new PliziAttachmentItem(true, checkExtension(file, imagesExtensions), file.name);
                attachment.isBlob = true;
                attachment.fileBlob = reader.result;
                this.attachFiles.push(attachment);
            };

            reader.readAsDataURL(file);

            let apiResponse = null;

            /** TODO: @TGA надо потом перенести отсюда загрузку аттачей **/
            switch (this.workMode) {
                case 'chat':
                    apiResponse = this.$root.$api.$chat.attachment([file]);
                    break;

                case 'post':
                    apiResponse = this.$root.$api.$post.storePostAttachments([file]);
                    break;

                default:
                    console.warn('TextEditor::addUploadAttachment - No matches in switch.');
            }

            apiResponse.then(response => {
                response.map((attItem) => {
                    const newAtt = new PliziAttachment(attItem);

                    this.attachFiles = this.attachFiles.map(foundFile => {
                        if (foundFile.originalName === newAtt.originalName) {
                            foundFile.attachment = newAtt;
                            foundFile.isBlob = false;
                            foundFile.fileBlob = null;
                        }

                        return foundFile;
                    });

                    this.$emit('newAttach', {attach: newAtt});

                    // const $this = this;
                    // setTimeout(function () {
                    //     $this .checkUpdatedChatContainerHeight();
                    // }, 1200); // TODO @TGA как узнать время, когда картинка загружена @veremey

                }).catch(e => {
                    window.console.warn(e.detailMessage);
                    throw e;
                });
            })
        }
    },
},
mounted() {
    this.getStartContainerHeight();
}
}

</script>
