<template>
    <div id="favoritFriends" class="plz-favorit-friends bg-white-br20 overflow-hidden">

        <div v-if="isDataReady" class="--d-flex --flex-row --justify-content-start pb-3 --border-bottom pt-3">
            <h6 v-if="!isNarrow" class="plz-ff-title w-100 mt-2 ml-3 d-block">Избранные</h6>

<!--            <a href="#" class="w-auto ml-auto &#45;&#45;align-self-end mr-3 mt-2 text-body" title="свернуть">-->
<!--                <i class="fas fa-chevron-right"></i>-->
<!--            </a>-->

            <div class="plz-favorit-friends-list pb-2">
                <FavoriteFriendItem v-for="friend in favoritFriends"
                                   v-bind:friend="friend"
                                   v-bind:isNarrow="isNarrow"
                                   v-bind:key="friend.id">
                </FavoriteFriendItem>
            </div>
        </div>
        <Spinner v-else></Spinner>

    </div>
</template>

<script>
import FavoriteFriendItem from './FavoriteFriendItem.vue';
import Spinner from '../common/Spinner.vue';

export default {
name: 'FavoritFriends',
components : { Spinner, FavoriteFriendItem },
props : {
    isNarrow: {
        type: Boolean,
        required: false,
        default: false
    }
},
data () {
    return {
        isDataReady : false,
    }
},

methods : {

},

computed: {
    favoritFriends(){
        return (this.isDataReady ? this.$root.$auth.fm.favorites : []);
    }
},

created(){
    this.$root.$on('friendsIsLoad', ()=>{
        this.isDataReady = true;
    });
}

}
</script>
