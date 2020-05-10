<template>
    <div v-if="shortFriends.length>0" id="shortFriends" class="plz-short-friends overflow-hidden">

        <div class="d-flex flex-row justify-content-start pb-3">
            <h6 class="plz-sf-title w-auto mt-2 ml-3">Друзья
                <span class="plz-sf-subtitle ml-2">{{$root.$auth.user.stats.totalFriendsCount}}</span>
            </h6>

            <router-link to="/friends" tag="a" class=" plz-sf-subtitle w-auto ml-auto --align-self-end mr-3 mt-2">
                Все
            </router-link>
        </div>

        <div class="plz-short-friends-list pb-2" >
            <ShortFriendItem  v-for="friend in shortFriends"
                              v-bind:friend="friend"
                              v-bind:key="friend.id"></ShortFriendItem>
        </div>

    </div>
</template>

<script>
import ShortFriendItem from './ShortFriendItem.vue';

import PliziCollection from '../classes/PliziCollection.js';
import { shuffle } from '../utils/ArrayUtils.js';

export default {
name: 'ShortFriends',
components : { ShortFriendItem},
props: {
    friends: Array | PliziCollection
},

data () {
    return {
        isDataReady : false,
    }
},

computed: {
    shortFriends(){
        if (!this.friends){
            return [];
        }

        const friends = this.friends.filter(fItem => !this.$root.$auth.fm.checkIsFavorite(fItem.id));

        return shuffle(friends).slice(0, 10);
    }
},

created(){
    this.$root.$on([ this.$root.$auth.frm.restoreEventName,
        this.$root.$auth.frm.loadEventName,
        this.$root.$auth.frm.updateEventName,
        this.$root.$auth.fm.restoreEventName,
        this.$root.$auth.fm.loadEventName,
        this.$root.$auth.fm.updateEventName ], ()=>{
        this.$forceUpdate();
    });
},

}
</script>


