<template>
    <div id="chatFooter" class="bg-white w-100 border-top position-relative mt-auto">
        <div class="row d-flex align-items-center mx-0 py-4">
            <div class="col-1 col-md-2 align-items-center text-center">

                    <img class="chat-companion-user-pic rounded-circle my-0 mx-auto"
                         v-bind:src="userPic" v-bind:alt="userFullName" />

            </div>
            <div class="col-9 col-md-8 pl-0">
                <div class="form">
                    <div class="form-row align-items-center ">
                        <div class="col-12  p-0">

                            <textarea-autosize
                                class="form-control px-2 pt-4 w-100"

                                @keydown="onMessageKeyDown($event)"
                                ref="txtMessage"
                                id="txtMessage"
                                :min-height="10"
                                :max-height="200"
                                placeholder="Написать сообщение..."
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-end">

                <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                    <IconAddFile />
                    <input type="file">
                </label>
                <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                    <IconAddCamera />
                    <input type="file">
                </label>

                <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                    <IconAddSmile />
                </button>

            </div>
        </div>
    </div>
</template>

<script>
import IconAddFile from '../icons/IconAddFile.vue';
import IconAddCamera from '../icons/IconAddCamera.vue';
import IconAddSmile from '../icons/IconAddSmile.vue';

/**  TODO: Вставка файлов **/
/** @link https://www.npmjs.com/package/vue-filepond **/

export default {
name: 'ChatFooter',
props: {
    currentDialog: Object
},
components: { IconAddCamera, IconAddSmile, IconAddFile },
data() {
    return {
        newMessage: ``,
    }
},

methods: {
    onMessageKeyDown(ev) {
        if (13===ev.keyCode && ev.ctrlKey===true  &&  this.newMessage.trim()!=='') { //TODO не работает отправка
            const newMsg = {
                body: this.newMessage.trim(),
                createdAt: Math.floor((new Date()).getTime() / 1000),
                isMine: true,
                isRead: false,
                isEdited: false
            };

            this.sendMessage(newMsg);
        }
    },


    async sendMessage(msg){
        const chatId = (this.currentDialog) ? this.currentDialog.id : -1;

        let response = null;

        try {
            response = await this.$root.$api.chatSend(chatId, msg.body);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (response != null &&  response.status.toUpperCase() === 'OK') {
            this.$root.$emit('addNewChatMessageToList', msg);
            this.newMessage = ``;
        }
        else {
            window.console.info(response);
        }

    }
},

computed : {
    userPic() {
        return this.$root.$user.userPic;
    },

    userFullName() {
        return this.$root.$user.fullName;
    }
},

mounted() {
}

}
</script>
