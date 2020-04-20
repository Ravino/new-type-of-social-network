<template>
    <div id="favoritFriends" class="plz-favorit-friends bg-white-br20 overflow-hidden">

        <div v-if="isDataReady" class="--d-flex --flex-row --justify-content-start pb-3 --border-bottom pt-3">
            <h6 class="plz-ff-title w-100 mt-2 ml-3 d-block">Избранные</h6>

<!--            <a href="#" class="w-auto ml-auto &#45;&#45;align-self-end mr-3 mt-2 text-body" title="свернуть">-->
<!--                <i class="fas fa-chevron-right"></i>-->
<!--            </a>-->

            <div class="plz-favorit-friends-list pb-2">
                <FavoritFriendItem v-for="friend in favoritFriends"
                                   v-bind:friend="friend"
                                   v-bind:key="friend.id">
                </FavoritFriendItem>
            </div>
        </div>
        <Spinner v-else></Spinner>

    </div>
</template>

<script>
import FavoritFriendItem from './FavoritFriendItem.vue';
import Spinner from '../common/Spinner.vue';

export default {
name: 'FavoritFriends',
components : { Spinner, FavoritFriendItem },
data () {
return {
    isDataReady : false,
    favoritFriendsOld : [
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

methods : {

},

computed: {
    favoritFriends(){
        return (this.isDataReady ? this.$root.$user.fm.favorits : []);
    }
},

created(){
    this.$root.$on('friendsIsLoad', ()=>{
        this.isDataReady = true;
    });
}

}
</script>
