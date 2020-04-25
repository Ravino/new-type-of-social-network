<template>
    <li class="chat-list-user media m-0 px-4 py-2"
        :class="{ 'bg-light':  dialog.id === currentDialogID, 'bg-white': dialog.id !== currentDialogID  }">

        <div class="user-friend d-flex col-12" @click.prevent="switchToChat()">
            <div v-if="dialog.isPrivate" class="user-friend-pic mr-3">
                <img class="user-friend-img rounded-circle overflow-hidden" v-bind:src="dialog.companion.userPic" v-bind:alt="dialog.companion.firstName" />
                <span v-if="dialog.companion.isOnline" class="user-friend-isonline" :title="dialog.companion.firstName + ' онлайн'"></span>
                <span v-else class="user-friend-isoffline"></span>
            </div>

            <div v-if="dialog.isGroup" class="user-friend-pic mr-3">
                <img class="user-friend-img rounded-circle overflow-hidden" v-bind:src="dialog.companion.userPic" v-bind:alt="dialog.companion.firstName" />
            </div>

            <div class=" user-friend-body m-0 col-12 pr-5">
                <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                    <h6 v-if="dialog.isPrivate" class="user-friend-name my-0">{{ dialog.companion.firstName }}</h6>
                    <h6 v-if="dialog.isGroup" class="user-friend-name my-0">{{ groupDialogName }}</h6>

                    <small v-if="dialog.isRead " class="mr-1 ml-auto mb-1">
                        <IconCheckedDouble :clazz="'mb-2'" />
                    </small>
                    <time :datetime="dialog.lastMessageDT" class="">
                        {{ dialog.lastMessageDT | lastMessageTime }}
                    </time>
                </div>

                <div class="user-friend-body-bottom d-flex pr-5">
                    <span v-if="dialog.isLastFromMe" class="user-friend-details mr-1">Вы:</span>
                    <p class="user-friend-desc p-0 my-0 d-inline" v-html="lastMsgText"></p>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import IconCheckedDouble from '../../icons/IconCheckedDouble.vue';
import PliziDialog from '../../classes/PliziDialog.js';

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

methods: {
    switchToChat() {
        this.$root.$emit('switchToChat', {dialogId: this.dialog.id});
    }
},

computed: {
    lastMsgText(){
        if (!this.dialog.lastMessageText) {
            return `<span class="text-black-50">вы ещё ничего на написали друг другу</span>`;
        }

        let txt = this.dialog.lastMessageText || ``;
        txt = txt.replace(/<br\/>/g, '&nbsp;');

        return this.$options.filters.stripTags(txt);
    },

    groupDialogName(){
        return 'Вы, '+ this.dialog.attendeesName.join(', ');
    }
}

}
</script>
