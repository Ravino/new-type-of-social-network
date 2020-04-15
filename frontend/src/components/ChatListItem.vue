<template>
    <li class="chat-list-user media m-0 px-4 py-2"
        :class="{ 'bg-light':  dialog.id === currentDialog.id, 'bg-white': dialog.id !== currentDialog.id  }">

        <!--        TODO: @tga добавить .stop для @click после стилизации  -->
        <div class="user-friend d-flex col-12" @click="switchToChat()">
            <div class="user-friend-pic mr-3 ">
                <img class="user-friend-img rounded-circle overflow-hidden" v-bind:src="companionPic" v-bind:alt="dialog.name" />
                <span v-if="dialog.isOnline" class="user-friend-isonline" title="онлайн"></span>
                <span v-else class="user-friend-isoffline"></span>
            </div>

            <div class=" user-friend-body m-0 col-12 pr-5 ">
                <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                    <h6 class="user-friend-name my-0">{{ companionName }}</h6>
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

import IconCheckedDouble from "../icons/IconCheckedDouble.vue";

export default {
name: 'ChatListItem',
    components: { IconCheckedDouble},
props: {
    dialog: Object,
    currentDialog: Object,
    dialogID: Number
},
data() {
    return {}
},

methods: {
    switchToChat() {
        this.$root.$emit('switchToChat', {dialogID: this.dialog.id});
    }
},

computed : {
    companionPic(){
        let res = this.$defaultAvatarPath;

        if (this.dialog  &&  this.dialog.attendees  &&  this.dialog.attendees[0]  &&  this.dialog.attendees[0].userPic  &&  !!this.dialog.attendees[0].userPic) {
            res = this.dialog.attendees[0].userPic;
        }

        // TODO: @TGA выпилить когда перестанут сеять в БД lorempixel.com
        const url = document.createElement('a');
        url.href = res;

        if (`lorempixel.com` === url.hostname.toLowerCase()) {
            res = this.$defaultAvatarPath;
        }

        return res;
    },

    companionName(){
        let res = `Кто-то неизвестный`;

        if (this.dialog  &&  this.dialog.attendees  &&  this.dialog.attendees[0]  &&  this.dialog.attendees[0].firstName  &&  !!this.dialog.attendees[0].firstName) {
            res = this.dialog.attendees[0].firstName;
        }

        return res;
    }
}

}
</script>
