<template>
    <div id="favoritFriends" class="plz-favorit-friends bg-white-br20">

        <div class="d-flex flex-row justify-content-start pb-3 border-bottom pt-3">
            <h6 class="plz-ff-title w-auto mt-2 ml-3">Избранные</h6>

            <a href="#" class="w-auto ml-auto --align-self-end mr-3 mt-2 text-body" title="свернуть">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>

        <div class="plz-favorit-friends-list ml-4 pr-4 pb-2">
            <div v-for="(friend, friendIndex) in favoritFriends" v-bind:key="friendIndex"
                 class="plz-favorit-friends-item d-flex align-items-center my-3">

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
                <div class="plz-ff-messages-count">
                    <span v-if="(friend.messagesNumber > 0)"
                          class="py-0 px-1  mr-2">
                        {{friend.messagesNumber}}</span>
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
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
}
.plz-favorit-friends .fa-chevron-right{
    font-size: 10px;
    color: #acacac;
    line-height: 27px;
}
.plz-favorit-friends .border-bottom{
    border-color: #e9ecf6;
}
.plz-favorit-friends-list {
    overflow: auto;
    max-height: 430px;
}
.plz-ff-title {
   font-family: OpenSans, sans-serif;
    font-size: 16px;
    color: #50535e
}
.plz-favorit-friend-userpic {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 48px;
    min-width: 48px;
    height: 48px;
    margin-right: 20px;
}
.plz-favorit-friend-userpic img {
    width: 48px;
    height: 48px;
}
 .plz-favorit-isonline {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0px;
    bottom: 0px;
     background-color: #9fcd48;
     border: 1px solid #fff;
     border-radius: 100%;
}
 .plz-favorit-isoffline {
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    right: 0px;
    bottom: 0px;
     background-color: #cacac9;
     border: 1px solid #fff;
     border-radius: 100%;
}
.plz-favorit-friend-name {
    font-size: 13px;
    color: #50535e;
}
.plz-favorit-friend-status {
    display: flex;
    align-items: center;

}
.plz-favorit-friend-status p {
    color: #acaeb7;
    font-size: 13px;
    margin-bottom: 0;
}
    .plz-ff-messages-count span {
        display: inline-block;
        vertical-align: top;
        padding: 0 4px;
        height: 16px;
        background-color: #ef482c;
        font-size: 11px;
        font-family: OpenSans-Semibold, sans-serif;
        color: #fff;
        border-radius: 16px
    }
</style>
