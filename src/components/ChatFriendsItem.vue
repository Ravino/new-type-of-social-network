<template>
    <li class="chat-list-user media m-0 px-3 py-2" :class="{ 'bg-light': friend.isSelected, 'bg-white': !friend.isSelected  }">
        <img class="chat-list-user-pic" v-bind:src="friend.userPic" v-bind:alt="friend.name" />

        <div v-if="friend.isOnline" class="chat-list-user-isonline">
            <img class="" src="/src/images/companion-is-online.png" alt="онлайн" />
        </div>

        <div class="media-body mb-0">
            <div class="d-flex --flex-row align-items-center">
                <h6 class="w-75 align-self-start mt-0 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                    <b>{{friend.name}}</b>
                </h6>

                <small v-if="friend.isRead" class="d-block align-self-end mr-1 mt-0 w-auto" style="line-height: 20px;">
                    <i class="fas fa-check-double text-success"></i>
                </small>

                <time :datetime="friend.lastMessageDT" class="d-block align-self-end text-dark w-auto" style="line-height: 20px;">
                    {{displayLastMessageTime(friend.lastMessageDT)}}
                </time>
            </div>
            <div class="d-flex flex-row">
                <div class="text-dark p-0 mb-0 mt-1 w-100 d-block clearfix">
                    <span v-if="friend.isLastFromMe">Вы:</span>
                    {{friend.lastMessageText}}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import moment from 'moment';

export default {
name: 'ChatFriendsItem',
props: {
    friend : Object,
},
data () {
    return {

    }
},

methods : {
    //TODO: перевести потом в фильтры
    displayLastMessageTime(lastMessageDT){
        let now = moment();
        let yesterday = moment().subtract(1, 'days');
        let lmt = moment(lastMessageDT);

        // если сообщение было сегодня или вчера
        if (now.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')  ||  yesterday.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')) {
            return lmt.format('HH:mm');
        }

        // сообщение было в течение последних 7 дней
        let lastWeek = moment().subtract(7, 'days');
        if ( +lmt.format('X') >= +lastWeek.format('X')) {
            let dow = lmt.format('dd');
            return dow.charAt(0).toUpperCase() + dow.slice(1);
        }

        return lmt.format('DD.MM.YY');
    },
},
mounted() {

}

}
</script>

<style scoped>
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

.chat-list-user.media .chat-list-user-isonline {
    display: block;
    position: absolute;
    left: calc(var(--user-pic-size) + 8px);
    top: calc(var(--user-pic-size) );
    z-index: 100;
}
</style>
