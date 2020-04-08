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
                    <h6 class="user-friend-name my-0">
                        {{ dialog.attendees[0].firstname }}
                    </h6>
                    <small v-if="dialog.isRead" class="mr-1 ml-auto">
                        <i class="fas fa-check-double text-success mt-1"></i>
                    </small>
                    <time :datetime="dialog.lastMessageDT"
                          class="">
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
export default {
name: 'ChatListItem',
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
    companionPic: function(){
        if (this.dialog  &&  this.dialog.attendees  &&  this.dialog.attendees[0]  &&  this.dialog.attendees[0].userPic) {
            return this.dialog.attendees[0].userPic;
        }

        return this.$defaultAvatarPath;
    }
}

}
</script>


<style lang="scss">
/*:root {*/
/*    --user-pic-size: 32px;*/
/*    --isonline-pic-size: 10px;*/
/*}*/

/*.chat-list-user.media {*/
/*    position: relative;*/

/*    .chat-list-user-pic {*/
/*        width: var(--user-pic-size);*/
/*        min-width: var(--user-pic-size);*/
/*        max-width: var(--user-pic-size);*/
/*        height: var(--user-pic-size);*/
/*        min-height: var(--user-pic-size);*/
/*        max-height: var(--user-pic-size);*/
/*        border-radius: var(--user-pic-size);*/
/*        margin-right: 10px;*/
/*        !*background-color: yellow;*!*/
/*        !*border: 1px solid red;*!*/
/*    }*/
/*}*/

/*.chat-list-user {*/
/*    .btn-switch-to-chat-room {*/
/*        cursor: pointer;*/
/*    }*/

/*    .btn-switch-to-chat-room:hover {*/
/*        text-decoration: underline;*/
/*    }*/

/*    .wide-list.chat-list-user-isonline {*/
/*        display: block;*/
/*        position: absolute;*/
/*        left: calc(var(--user-pic-size) + 8px);*/
/*        top: calc(var(--user-pic-size));*/
/*        z-index: 100;*/
/*    }*/
/*}*/
</style>
