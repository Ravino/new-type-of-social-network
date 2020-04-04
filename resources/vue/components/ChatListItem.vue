<template>
    <li class="chat-list-user media m-0 px-3 py-2"
        :class="{ 'bg-light': dialog.isSelected, 'bg-white': !dialog.isSelected  }">
        <img class="chat-list-user-pic" v-bind:src="dialog.userPic" v-bind:alt="dialog.name"/>

        <div v-if="dialog.isOnline" class="chat-list-user-isonline">
            <img class="" src="/images/companion-is-online.png" alt="онлайн"/>
        </div>

        <div class="media-body mb-0">
            <div class="d-flex --flex-row align-items-center">
                <h6 class="w-75 align-self-start mt-0 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                    <span class="btn btn-link text-body" @click="switchToChat()">{{dialog.name}}</span>
                </h6>

                <small v-if="dialog.isRead" class="d-block align-self-end mr-1 mt-0 w-auto" style="line-height: 20px;">
                    <i class="fas fa-check-double text-success"></i>
                </small>

                <time :datetime="dialog.lastMessageDT" class="d-block align-self-end text-dark w-auto"
                      style="line-height: 20px;">
                    {{dialog.lastMessageDT | lastMessageTime}}
                </time>
            </div>
            <div class="d-flex flex-row">
                <div class="text-dark p-0 mb-0 mt-1 w-100 d-block clearfix">
                    <span v-if="!dialog.isLastFromMe">Вы:</span>
                    {{dialog.lastMessageText}}
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
        mounted() {

        }

    }
</script>

<style>
    :root {
        --user-pic-size: 32px;
        --isonline-pic-size: 10px;
    }

    .chat-list-user.media {
        position: relative;
    }

    .chat-list-user.media .chat-list-user-pic {
        width: var(--user-pic-size);
        min-width: var(--user-pic-size);
        max-width: var(--user-pic-size);
        height: var(--user-pic-size);
        min-height: var(--user-pic-size);
        max-height: var(--user-pic-size);
        border-radius: var(--user-pic-size);
        margin-right: 10px;
        /*background-color: yellow;*/
        /*border: 1px solid red;*/
    }

    .chat-list-user .wide-list.chat-list-user-isonline {
        display: block;
        position: absolute;
        left: calc(var(--user-pic-size) + 8px);
        top: calc(var(--user-pic-size));
        z-index: 100;
    }
</style>
