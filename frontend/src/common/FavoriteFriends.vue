<template>
    <div v-if="showFavoritesBlock" id="favoritFriends" class="plz-favorit-friends overflow-hidden mb-5"
         :class="{ 'bg-white-br20' : !isPickFavorite, 'is-pick-favorite':isPickFavorite } ">

        <div v-if="isDataReady" class="--d-flex --flex-row --justify-content-start pb-3 --border-bottom pt-3">
            <h6 v-if="!isNarrow" class="plz-ff-title w-100 mt-2 ml-3 d-block">Избранные</h6>

<!--            <a href="#" class="w-auto ml-auto &#45;&#45;align-self-end mr-3 mt-2 text-body" title="свернуть">-->
<!--                <i class="fas fa-chevron-right"></i>-->
<!--            </a>-->

            <div class="plz-favorit-friends-list pb-2">
                <FavoriteFriendItem v-for="friend in favoritFriends"
                                    @PickFavorite="onPickFavorite"
                                    @UnPickFavorite="onUnPickFavorite"
                                    v-bind:friend="friend"
                                    v-bind:isNarrow="isNarrow"
                                    v-bind:key="friend.id">
                </FavoriteFriendItem>
            </div>
        </div>
        <Spinner v-else clazz="plz-favorit-friends-spinner d-flex flex-column align-items-center"></Spinner>

        <div id="linkedChatBlock" class="plz-linked-chat-block"
             :class="{ 'active-chat': isPickFavorite }">
            <div class="bg-danger">
                здесь будет город-чат
            </div>
        </div>
    </div>
</template>

<script>
import FavoriteFriendItem from './FavoriteFriendItem.vue';
import Spinner from '../common/Spinner.vue';

export default {
name: 'FavoriteFriends',
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
        showFavoritesBlock: true,
        isDataReady : false,
        isPickFavorite: false
    }
},

methods : {
    onPickFavorite(evData){
        window.console.log(evData, `onPickFavorite`);
        this.isPickFavorite = true;
    },

    onUnPickFavorite(evData){
        window.console.log(evData, `onUnPickFavorite`);
        this.isPickFavorite = false;
    },

    afterFavoritsLoad(){
        this.showFavoritesBlock = (this.$root.$auth.fm.size > 0);
        this.isDataReady = true;
        this.$forceUpdate();
    }
},

computed: {
    favoritFriends(){
        return this.$root.$auth.fm.asArray();
    }
},

created(){
    if (this.$root.$auth.fm.isLoad) {
        this.afterFavoritsLoad();
    }

    this.$root.$on([this.$root.$auth.fm.loadEventName, this.$root.$auth.fm.restoreEventName], ()=>{
        this.afterFavoritsLoad();
    });
}

}
</script>
