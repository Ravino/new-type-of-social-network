<template>
    <li class="chat-list-user media m-0 px-4 py-2"
        :class="{ 'bg-light':  dialog.id === currentDialogID, 'bg-white': dialog.id !== currentDialogID  }">

        <!--        TODO: @tga добавить .stop для @click после стилизации  -->
        <div class="user-friend d-flex col-12" @click="switchToChat()">
            <div class="user-friend-pic mr-3">
                <img class="user-friend-img rounded-circle overflow-hidden" v-bind:src="dialog.companion.userPic" v-bind:alt="dialog.companion.firstName" />
                <span v-if="dialog.companion.isOnline" class="user-friend-isonline" :title="dialog.companion.firstName + ' онлайн'"></span>
                <span v-else class="user-friend-isoffline"></span>
            </div>

            <div class=" user-friend-body m-0 col-12 pr-5 ">
                <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                    <h6 class="user-friend-name my-0">{{ dialog.companion.firstName }}</h6>
                    <small v-if="dialog.isRead " class="mr-1 ml-auto mb-1">
                        <IconCheckedDouble :clazz="'mb-2'"/>
                    </small>
                    <time :datetime="dialog.lastMessageDT" class="">
                        {{ dialog.lastMessageDT | lastMessageTime }}
                    </time>
                </div>

                <div class="user-friend-body-bottom d-flex pr-5">
                    <span class="user-friend-details mr-1" v-if="dialog.isLastFromMe">Вы:</span>
                    <p class="user-friend-desc p-0 my-0  d-inline ">
                        {{dialog.lastMessageText}}
                    </p>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import IconCheckedDouble from '../icons/IconCheckedDouble.vue';
import PliziDialog from '../classes/PliziDialog.js';

export default {
name: 'ChatListItem',
components: { IconCheckedDouble},
props: {
    dialog: {
        type: PliziDialog,
        required : true
    },
    currentDialogID: {
        type: Number,
        required: true,
        default: -1
    },
},

data() {
    return {}
},

methods: {
    switchToChat() {
        this.$root.$emit('switchToChat', {dialogId: this.dialog.id});
    }
},

}
</script>
