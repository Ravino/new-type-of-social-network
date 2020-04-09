<template>
    <div id="favoritFriends" class="plz-favorit-friends bg-white-br20 overflow-hidden">

        <div class="d-flex flex-row justify-content-start pb-3 border-bottom pt-3">
            <h6 class="plz-ff-title w-auto mt-2 ml-3">Избранные</h6>

            <a href="#" class="w-auto ml-auto --align-self-end mr-3 mt-2 text-body" title="свернуть">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>

        <div class="plz-favorit-friends-list pb-2">
            <div v-for="(friend, friendIndex) in favoritFriends" v-bind:key="friendIndex"
                 class="plz-favorit-friends-item d-flex align-items-center align-items-center py-1 px-3 ">

                <a class="plz-favorit-friend-userpic " href="#">
                    <img class="plz-favorit-userpic rounded-circle" :src="friend.userPic" :alt="friend.firstName" />

                    <span v-if="friend.isOnline" class="plz-favorit-isonline"  title="в сети" ></span>
                    <span v-else class="plz-favorit-isoffline"  :title="getSexTitle(friend)" ></span>
                </a>

                <div class="plz-favorit-friend-title flex align-items-center mr-auto ">
                    <a class="plz-favorit-friend-name" href="#">{{friend.firstName}}</a>

                    <div class="plz-favorit-friend-status">
                        <p v-if="friend.isType" >
                            <span class="loading">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                            Печатает
                        </p>
                        <p v-else-if="friend.isOnline">
                            В сети
                        </p>
                        <p v-else>
                            {{ getSexTitle(friend) }}
                        </p>
                    </div>
                </div>
                <a href="#" class="plz-ff-messages-count">
                    <span v-if="(friend.messagesNumber > 0)"
                          class="py-0 mr-2">
                        {{friend.messagesNumber}}</span>
                </a>
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
                firstName : `Анастасия`,
                sex: `f`,
                userPic: `images/chat/anna.png`,
                isType : false,
                isOnline : false,
                lastVisit: `2020-04-03 12:04:00`,
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
