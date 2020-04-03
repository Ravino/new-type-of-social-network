<template>
    <div id="favoritFriends" class="plz-favorit-friends bg-white-br20">

        <div class="d-flex flex-row justify-content-start pb-3 border-bottom pt-3">
            <h6 class="plz-ff-title w-auto mt-2 ml-3">Избранные</h6>

            <a href="#" class="w-auto ml-auto --align-self-end mr-3 mt-2 text-body" title="свернуть">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>

        <div class="plz-favorit-friends-list">
            <div v-for="(friend, friendIndex) in favoritFriends" v-bind:key="friendIndex" class="plz-favorit-friends-item d-flex flex-row my-2 px-2">

                <a class="plz-favorit-friend-userpic d-flex  align-self-start" href="#">
                    <img class="plz-favorit-userpic" width="48" height="48" :src="friend.userPic" :alt="friend.firstName" />

                    <img v-if="friend.isOnline" class="plz-favorit-isonline" src="/images/companion-is-online.png" alt="в сети" />
                </a>

                <div class="plz-favorit-friend-title mr-auto  align-self-start">
                    <a class="plz-favorit-friend-name" href="#">
                        <div>{{friend.firstName}}</div>
                    </a>

                    <div class="plz-favorit-friend-status">
                        <div v-if="friend.isType">
                            ... Печатает
                        </div>
                        <div v-else-if="friend.isOnline">
                            В сети
                        </div>
                        <div v-else>
                            {{ getSexTitle(friend) }}
                        </div>
                    </div>
                </div>
                <div class="plz-favorit-friend-title">
                    <span v-if="(friend.messagesNumber > 0)" class="bg-danger rounded-pill text-white py-0 px-1 mt-1 mr-2">{{friend.messagesNumber}}</span>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
export default {
name: 'FavoritFriends',
data () {
    return {
        favoritFriends : [
            {
                firstName : `Валерия`,
                sex : `f`,
                userPic: `images/chat/alexandra.png`,
                isType : true,
                isOnline : true,
                lastVisit: `2020-04-03 15:04:00`,
                messagesNumber: 12
            },
            {
                firstName : `Максим`,
                sex: `m`,
                userPic: `images/chat/malunder.png`,
                isType : false,
                isOnline : true,
                lastVisit: `2020-04-03 15:04:00`,
                messagesNumber: 4
            },
            {
                firstName : `Лера`,
                sex: `f`,
                userPic: `images/chat/alina.png`,
                isType : false,
                isOnline : true,
                lastVisit: `2020-04-03 15:04:00`,
                messagesNumber: 0
            },
            {
                firstName : `Анастасия`,
                sex: `f`,
                userPic: `images/chat/anna.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-04-03 12:04:00`,
                messagesNumber: 0
            },
            {
                firstName : `Екатерина`,
                sex: `f`,
                userPic: `images/chat/anna2.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-04-02 18:04:00`,
                messagesNumber: 0
            },
            {
                firstName : `Антон`,
                sex: `m`,
                userPic: `images/chat/malunder.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-03-02 18:04:00`,
                messagesNumber: 0
            },
            {
                firstName : `Виктория`,
                sex: `f`,
                userPic: `images/chat/maria.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-03-16 16:04:00`,
                messagesNumber: 0
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
.plz-favorit-friends {

}

.plz-favorit-friends .plz-ff-title {

}

.plz-favorit-friend-userpic {
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

.plz-favorit-friend-userpic .plz-favorit-userpic {

}

.plz-favorit-friend-userpic .plz-favorit-isonline {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0px;
    bottom: 0px;
}

.plz-favorit-friend-title .plz-favorit-friend-status {

}
</style>
