<template>
    <div id="chatFooter" class="bg-white align-self-end w-100 pb-2">
        <div class="row align-items-center">
            <div class="col-1">
                <div class="media mx-auto">
                    <img class="chat-companion-user-pic my-0 mx-auto" width="32" height="32"
                         v-bind:src="user.user_pic" v-bind:alt="user.name"/>
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
                                   class="form-control px-2 w-100" id="txtMessage" placeholder="Написать сообщение"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="btn-group">
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="/images/chat-staple-icon.png" width="24" height="24" alt=""/>
                    </button>
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="/images/chat-camera-icon.png" width="24" height="24" alt=""/>
                    </button>
                    <button class="btn btn-link mx-0 px-1" type="button">
                        <img src="/images/chat-smile-icon.png" width="24" height="24" alt=""/>
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
        props: {},

        data() {
            return {
                newMessage: ``,
                user: this.$store.getters.userData
            }
        },

        methods: {
            onMessageKeyDown(ev) {
                if (13 === ev.keyCode && this.newMessage.trim() !== '') {
                    let now = moment();
                    let nowS = now.format('YYYY-MM-DD HH:mm:ss');
                    let newMsg = {
                        body: this.newMessage.trim(),
                        createdAt: nowS,
                        isMine: true,
                        isRead: false,
                        isEdited: false
                    };

                    this.$root.$emit('addNewChatMessage', newMsg);

                    this.newMessage = ``;
                }
            }
        },
        mounted() {
        }

    }
</script>
