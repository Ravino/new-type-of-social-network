<template>
    <div id="shortFriends" class="plz-short-friends">

        <div class="d-flex flex-row justify-content-start pb-3 pt-5">
            <h6 class="plz-ff-title w-auto mt-2 ml-3">Друзья
                <span class="plz-ff-subtitle ml-2">{{user.friendsNumber}}</span>
            </h6>

            <a href="#" class=" plz-ff-subtitle w-auto ml-auto --align-self-end mr-3 mt-2" title="свернуть">
                Все
            </a>
        </div>

        <div class="plz-favorit-friends-list  ml-4 pr-4 pb-2" >
            <div v-for="(friend, friendIndex) in shortFriends" v-bind:key="friendIndex"
                 class="plz-favorit-friends-item d-flex align-items-center my-3 ">

                <a class="plz-favorit-friend-userpic" href="#">
                    <img class="plz-favorit-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName" />

                    <span v-if="friend.isOnline" class="plz-favorit-isonline"  title="в сети" ></span>
                    <span v-else class="plz-favorit-isoffline"  :title="getSexTitle(friend)" ></span>
                </a>

                <div class="plz-favorit-friend-title flex align-items-center mr-auto ">
                    <a class="plz-favorit-friend-name" href="#">{{friend.firstName}}</a>

                    <div class="plz-favorit-friend-status">
                        <p>общих друзей {{friend.commonFriendsNumber}}</p>
                    </div>
                </div>
                <div class="plz-short-friend-is-active">
                    <i class="far fa-comment fa-flip-horizontal fa-2x"></i>
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
                firstName : `Анастасия`,
                sex: `f`,
                userPic: `images/chat/anna.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-04-03 12:04:00`,
                messagesNumber: 0,
                commonFriendsNumber: 0
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
    getSexTitle(fItem){
        if (`m` === fItem.sex)
            return `был давно`;

        if (`f` === fItem.sex)
            return `была давно`;

        return `был(а) давно`;
    }
}

}
</script>

<style>
.plz-short-friend-is-active {
    cursor: pointer;
}
.plz-ff-title .plz-ff-subtitle {
    display: inline-block;
}
.plz-ff-subtitle {
    color: #9a9a9a;
    font-size: 12px;
}

</style>
