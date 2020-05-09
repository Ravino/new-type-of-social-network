<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">

            <FriendsListHeader @filterSearch="filterSearch"></FriendsListHeader>

            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 bg-white-br20">
                    <div id="friendsListFilter" class="row border-bottom px-4">
                        <div class="col-12 d-flex align-items-center justify-content-between px-0">
                            <nav class="nav profile-filter-links" role="tablist">
                                <span class="nav-link position-relative py-3 px-1 mr-4"
                                      :class="{ 'active': wMode==='all' }" id="tabAllFriends" role="tab"
                                      @click.stop="friendsListSelect(`all`)">Все друзья</span>
                                <span class="nav-link position-relative py-3 px-1 mr-4"
                                      :class="{ 'active': wMode==='online' }" id="tabOnlineFriends" role="tab"
                                      @click.stop="friendsListSelect(`online`)">Друзья онлайн</span>
                                <span class="nav-link position-relative py-3 px-1 mr-4"
                                      :class="{ 'active': wMode==='favorites' }" id="tabFavoritesFriends" role="tab"
                                      @click.stop="friendsListSelect(`favorites`)">Избранные</span>
                            </nav>
                        </div>
                    </div>

                    <div v-if="isFriendsLoaded" class="row plizi-friends-list ">
                        <ul v-if="allMyFriends  &&  friendsListFilter.length>0" class="d-block w-100 p-0">
                            <transition-group name="slide-fade" :duration="700">
                                <FriendListItem v-for="(friendItem, frIndex) in friendsListFilter"
                                                v-bind:key="friendItem.id"
                                                v-bind:friend="friendItem">
                                </FriendListItem>
                            </transition-group>
                        </ul>
                        <div v-else class="alert alert-info w-100 p-5 text-center">
                            <p v-if="wMode==='all'">Вы ещё ни с кем не подружились.</p>
                            <p v-if="wMode==='online'">Сейчас все друзья оффлайн.</p>
                            <p v-if="wMode==='favorites'">Вы никого не добавили в Избранные.</p>
                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <PotentialFriends v-if="possibleFriends && possibleFriends.length"
                                      :blockName="`Возможные друзья`"
                                      :friends="shuffle(possibleFriends)"></PotentialFriends>
                    <PotentialFriends v-if="recommendedFriends && recommendedFriends.length"
                                      :blockName="`Рекомендуемые друзья`"
                                      :friends="shuffle(recommendedFriends)"></PotentialFriends>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>
    </div>
</template>

<script>
import FriendsListMixin from '../mixins/FriendsListMixin.js';
import FriendListItem from '../components/FriendListItem.vue';
import PliziFriend from '../classes/PliziFriend.js';
import PliziCollection from "../classes/PliziCollection.js";

export default {
name : 'FriendsListPage',
components : {
    FriendListItem
},

mixins : [FriendsListMixin],

data(){
    return {
        allMyFriends: null,
        isFriendsLoaded: false,
        wMode : `all`,
        removedFriendID : -1,
        searchTerm: '',
    }
},

computed : {
    friendsListFilter(){
        let ret = [];

        if (this.wMode === 'all'){
            ret = this.allMyFriends.asArray();
        }

        if (this.wMode === 'online'){
            this.allMyFriends.asArray().map(frItem => {
                if (frItem.isOnline === true){
                    ret.push(frItem);
                }
            });
        }

        if (this.wMode === 'favorites'){
            this.allMyFriends.asArray().map(frItem => {
                if ( this.$root.$auth.fm.checkIsFavorite( frItem.id )){
                    ret.push(frItem);
                }
            });
        }

        /** @TGA как-то оно нелогично тут смотрится **/
        if (this.searchTerm.length > 2) {
            const searchTerm = this.searchTerm.toLocaleLowerCase();

            ret = ret.filter(friend => friend.fullName.toLowerCase().includes(searchTerm));
        }

        return ret;
    },
},


methods : {
    friendsListSelect( wm ){
        this.wMode = wm;
    },

    async loadMyFriends() {
        let apiResponse;

        try {
            apiResponse = await this.$root.$api.$friend.friendsList();
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.allMyFriends = new PliziCollection(apiResponse, PliziFriend);
            this.isFriendsLoaded = true;
        }
    },

    filterSearch({ searchTerm }) {
        this.searchTerm = searchTerm;
    }
},

created(){
    if ('#favorites' === this.$route.hash) {
        this.wMode = 'favorites';
    }
},

    async mounted() {
    await this.loadMyFriends();
}

}
</script>
