<template>
    <div id="chatFooter" class="bg-white align-self-end w-100 pb-2">
        <div class="row align-items-center">
            <div class="col-1">
                <div class="media mx-auto">
                    <img class="chat-companion-user-pic rounded-circle my-0 mx-auto" width="32" height="32"
                         v-bind:src="userPic" v-bind:alt="currentDialog.firstname" />
                </div>
            </div>
            <div class="col-9 pl-0">
                <div class="form">
                    <div class="form-row align-items-center mt-3 pl-0">
                        <div class="col-12">
                            <label class="sr-only d-none" for="txtMessage">Написать сообщение</label>
                            <input type="search"
                                   v-model="newMessage"
                                   @keydown="onMessageKeyDown($event)"
                                   class="form-control px-2 w-100" id="txtMessage" ref="txtMessage" placeholder="Написать сообщение" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="btn-group">
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="../images/chat-staple-icon.png" width="24" height="24" alt="загрузить файл" />
                    </button>
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="../images/chat-camera-icon.png" width="24" height="24" alt="загрузить картинку" />
                    </button>
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="../images/chat-smile-icon.png" width="24" height="24" alt="добавить смайлик" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
name: 'ChatFooter',
props: {
    currentDialog: Object
},

data() {
    return {
        newMessage: ``,
    }
},

methods: {
    onMessageKeyDown(ev) {
        if (13===ev.keyCode  &&  this.newMessage.trim()!=='') {
            const newMsg = {
                body: this.newMessage.trim(),
                createdAt: moment().unix(),
                isMine: true,
                isRead: false,
                isEdited: false
            };

            const evData = {
                message : newMsg,
                chatId : this.currentDialog.id
            };

            this.$root.$emit('sentNewChatMessageToAPI', evData);

            this.newMessage = ``;
        }
    }
},

computed : {
    userPic : function () {
        return (this.currentDialog  &&  this.currentDialog.userPic) ? this.currentDialog.userPic : this.$defaultAvatarPath;
    }
},

mounted() {
    window.console.log(JSON.parse(JSON.stringify(this.currentDialog)), 'currentDialog' );
}

}
</script>
