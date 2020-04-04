<template>
    <div id="shortFriends" class="plz-short-friends">

        <div class="d-flex flex-row justify-content-start pb-3 pt-5">
            <h6 class="plz-ff-title w-auto mt-2 ml-3">Друзья <span>{{user.friendsNumber}}</span></h6>

            <a href="#" class="w-auto ml-auto --align-self-end mr-3 mt-2 text-body" title="свернуть">
                Все
            </a>
        </div>

        <div class="plz-short-friends-list">
            <div v-for="(friend, friendIndex) in shortFriends" v-bind:key="friendIndex" class="plz-short-friends-item d-flex flex-row my-2 px-2">

                <a class="plz-short-friend-userpic d-flex align-self-start" href="#">
                    <img class="plz-short-userpic" width="48" height="48" :src="friend.userPic" :alt="friend.firstName" />

                    <img v-if="friend.isOnline" class="plz-short-isonline" src="/images/companion-is-online.png" alt="в сети" />
                </a>

                <div class="plz-short-friend-title mr-auto  align-self-start">
                    <a class="plz-short-friend-name text-body" href="#">
                        <div>{{friend.firstName}}</div>
                    </a>

                    <div class="plz-short-friend-status text-black-50">
                        общих друзей {{friend.commonFriendsNumber}}
                    </div>
                </div>
                <div class="plz-short-friend-is-active">
                    <span v-if="friend.isActive" class="">
                        <img src="/images/chat-search-loupe.png" alt="" />
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
name: 'ShortFriends',
props: {
    user: Object
},
data () {
    return {
        shortFriends : [
            {
                firstName : `Алина`,
                lastName : `Маркияш`,
                sex : `f`,
                userPic: `images/chat/alexandra.png`,
                commonFriendsNumber: 13,
                isActive : false,
                isOnline : false,
            },
            {
                firstName : `Марина`,
                lastName : `Кравчук`,
                sex : `f`,
                userPic: `images/chat/mariya2.png`,
                commonFriendsNumber: 9,
                isActive : true,
                isOnline : true,
            },
            {
                firstName : `Анна`,
                lastName : `Ахматова`,
                sex : `f`,
                userPic: `images/chat/anna.png`,
                commonFriendsNumber: 7,
                isActive : false,
                isOnline : false,
            },
            {
                firstName : `Ким`,
                lastName : `Шухаян`,
                sex : `f`,
                userPic: `images/chat/anna2.png`,
                commonFriendsNumber: 4,
                isActive : false,
                isOnline : true,
            },
            {
                firstName : `Алина`,
                lastName : `Сулимская`,
                sex : `f`,
                userPic: `images/chat/alina.png`,
                commonFriendsNumber: 3,
                isActive : false,
                isOnline : true,
            },

        ]
    }
},

methods: {

}

}
</script>

<style>
.plz-short-friends {

}

.plz-short-friends .plz-ff-title {

}

.plz-short-friend-userpic {
    display: block;
    position: relative;
    width: 48px;
    min-width: 48px;
    max-width: 48px;
    height: 48px;
    min-height: 48px;
    max-height: 48px;
    margin-right: 10px;
}

.plz-short-friend-userpic .plz-short-userpic {

}

.plz-short-friend-userpic .plz-short-isonline {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0px;
    bottom: 0px;
}

.plz-short-friend-title .plz-short-friend-status {

}
</style>
