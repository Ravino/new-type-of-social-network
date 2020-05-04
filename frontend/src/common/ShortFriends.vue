<template>
    <div v-if="$root.$auth.fm.size>0" id="shortFriends" class="plz-short-friends overflow-hidden">

        <div class="d-flex flex-row justify-content-start pb-3 pt-5">
            <h6 class="plz-sf-title w-auto mt-2 ml-3">Друзья
                <span class="plz-sf-subtitle ml-2">{{$root.$auth.fm.size}}</span>
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

export default {
name: 'ShortFriends',
components : { ShortFriendItem},

data () {
    return {
        isDataReady : false,
    }
},

computed : {
    shortFriends(){
        return this.$root.$auth.fm.buddies;
    }
}

}
</script>


