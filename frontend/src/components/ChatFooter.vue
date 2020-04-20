<template>
    <div id="chatFooter" class="bg-white w-100 border-top position-relative mt-auto">
        <div class="row d-flex align-items-center mx-0 py-4">
            <div class="col-1 col-md-2 align-items-center text-center">

                <img class="chat-companion-user-pic rounded-circle my-0 mx-auto"
                     v-bind:src="userPic" v-bind:alt="userFullName"/>

            </div>
            <div class="col-9 col-md-8 pl-0">
                <div class="form">
                    <div class="form-row align-items-center ">
                        <div class="col-12  p-0">
<!--                            <textarea-autosize-->
<!--                                class="form-control px-2 pt-4 w-100"-->
<!--                                v-model="newMessage"-->
<!--                                @keydown.native="onMessageKeyDown($event)"-->
<!--                                ref="txtMessage"-->
<!--                                id="txtMessage"-->
<!--                                :min-height="10"-->
<!--                                :max-height="200"-->
<!--                                placeholder="Написать сообщение..."-->
<!--                            />-->
                            <Editor class="form-control p-0 h-100"
                                    ref="editor"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">

                <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                    <IconAddFile/>
                    <input type="file">
                </label>
                <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                    <IconAddCamera/>
                    <input type="file">
                </label>

                <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                    <EmojiPicker @addEmoji="addEmoji"/>
                </button>

            </div>
        </div>
    </div>
</template>

<script>
    import IconAddFile from '../icons/IconAddFile.vue';
    import IconAddCamera from '../icons/IconAddCamera.vue';
    import Editor from '../components/Editor.vue';
    import EmojiPicker from '../components/EmojiPicker.vue';

    import PliziDialog from '../classes/PliziDialog.js';

    /**  TODO: Вставка файлов **/
    /** @link https://www.npmjs.com/package/vue-filepond **/

    /** @link https://www.npmjs.com/package/vue-textarea-autosize **/

    export default {
        name: 'ChatFooter',
        props: {
            currentDialog: {
                type: PliziDialog | null,
                required: true
            }
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
        },
        data() {
            return {
                newMessage: ``,
            }
        },
        methods: {
            onMessageKeyDown(ev) {
                if (13 === ev.keyCode && ev.ctrlKey === true && this.newMessage.trim() !== '') {
                    const newMsg = {
                        body: this.newMessage.trim(),
                        createdAt: Math.floor((new Date()).getTime() / 1000),
                        isMine: true,
                        isRead: false,
                        isEdited: false
                    };

                    this.addMessageToChat(newMsg);
                }
            },
            async addMessageToChat(msg) {
                const chatId = (this.currentDialog) ? this.currentDialog.id : -1;

                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.chatSend(chatId, msg.body);
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                if (apiResponse != null && apiResponse.status.toUpperCase() === 'OK') {
                    msg.id = -1;
                    msg.firstName = this.$root.$user.firstName;
                    msg.lastName = this.$root.$user.lastName;
                    msg.userPic = this.$root.$user.userPic;

                    const eventData = {
                        dialogId: (this.currentDialog) ? this.currentDialog.id : -1,
                        message: msg
                    }

                    try {
                        this.$root.$emit('newMessageInDialog', eventData);
                    } catch (e) {

                    }
                    this.newMessage = ``;
                } else {
                    window.console.info(apiResponse);
                }
            },
            addEmoji(emoji) {
                this.$refs.editor.addEmoji(emoji);
            },
        },
    }
</script>
