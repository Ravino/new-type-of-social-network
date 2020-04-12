<template>
    <div class="modal show" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true"
         style="display: block; background-color: rgba(0, 0, 0, .7);" @click.stop="hidePersonalMsgModal">
        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div class="modal-header">
                    <h4 class="modal-title p-2">Новое сообщение</h4>
                </div>

                <div class="modal-body">
                    <div class="mb-2">
                        <router-link to="/chats-list" tag="a" class="btn btn-link btn-block text-left p-3 bg-light text-black-50">
                            Перейти к диалогу с {{user.firstName}}
                        </router-link>
                    </div>

                    <div class="user-friend d-flex">
                        <div class="user-friend-pic mr-3 ">
                            <img class="user-friend-img rounded-circle overflow-hidden" v-bind:src="user.userPic" v-bind:alt="user.firstName" />
                            <span v-if="user.isOnline" class="user-friend-isonline" title="онлайн"></span>
                            <span v-else class="user-friend-isoffline"></span>
                        </div>

                        <div class=" user-friend-body m-0 col-12 pr-5 ">
                            <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                                <h6 class="user-friend-name my-0">{{ user.fullName }}</h6>
                            </div>

                            <div class="user-friend-body-bottom d-flex pr-5">
                                <p class="user-friend-desc p-0 my-0  d-inline">{{user.isOnline}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="form mt-3">
                        <div class="form-group row border-bottom">
                            <label for="privateMessage" class="col-12 col-form-label">Ваше сообщение</label>

                            <div class="col-9 py-1">
                                <input type="text" class="form-control border-0"
                                       v-model="privateMessage" id="privateMessage" ref="privateMessage"
                                       @keydown="personalMsgKeyDownCheck($event)"
                                       placeholder="Начните печатать..." />
                            </div>

                            <div class="col-3">
                                <div class="btn-group ">
                                    <button class="btn btn-link mx-0 px-1 btn-add-file" type="button">
                                        <IconAddFile />
                                    </button>
                                    <button class="btn btn-link mx-0 px-1 btn-add-camera" type="button">
                                        <IconAddCamera />
                                    </button>
                                    <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                                        <IconAddSmile />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-12">
                                <button type="button" class="btn plz-btn plz-btn-primary" @click.prevent="startPersonalMessage()">Отправить</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconAddFile from '../icons/IconAddFile.vue';
import IconAddCamera from '../icons/IconAddCamera.vue';
import IconAddSmile from '../icons/IconAddSmile.vue';

export default {
name: 'NewPersonalMessageModal',
props: {
    user: Object
},
components: { IconAddCamera, IconAddSmile, IconAddFile },
data() {
    return {
        privateMessage: ``
    }
},

methods: {
    hidePersonalMsgModal() {
        this.$root.$emit('hidePersonalMsgModal', {});
    },

    personalMsgKeyDownCheck(ev) {
        if (13 === ev.keyCode  &&  ev.ctrlKey  &&  this.privateMessage.trim()!==``)
            return this.startPersonalMessage();
    },

    startPersonalMessage(){
        this.$root.$emit('hidePersonalMsgModal', {});

        this.$root.$emit('sendPersonalMessage', {
            message: this.privateMessage.trim(),
            from: this.$root.$user.toJSON(),
            to: this.user.toJSON(),
        });
    }
},

mounted() {
    setTimeout(() => {
        this.$refs.privateMessage.focus();
    }, 100);
},
}
</script>
