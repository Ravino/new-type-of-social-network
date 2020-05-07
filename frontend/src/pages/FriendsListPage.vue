<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">

            <FriendsListHeader></FriendsListHeader>

            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 bg-white-br20">
                    <div id="friendsListFilter" class="row border-bottom px-4">
                        <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
                            <nav class="nav profile-filter-links" role="tablist">
                                <span class="nav-link position-relative py-3 px-1 mr-4"
                                      :class="{ 'active': wMode==='all' }" id="tabAllFriends" role="tab"
                                      @click.stop="friendsListSelect(`all`)">Все друзья</span>
                                <span class="nav-link position-relative py-3 px-1 mr-4"
                                      :class="{ 'active': wMode==='online' }" id="tabOnlineFriends" role="tab"
                                      @click.stop="friendsListSelect(`online`)">Друзья онлайн</span>
                            </nav>
                        </div>
                    </div>

                    <div v-if="isFriendsLoaded" class="row plizi-friends-list ">
                        <ul v-if="allMyFriends  &&  allMyFriends.length>0" class="d-block w-100 p-0">
                            <transition-group name="slide-fade" :duration="700">
                                <FriendListItem v-for="(friendItem, frIndex) in friendsListFilter"
                                                v-bind:key="frIndex"
                                                v-bind:friend="friendItem">
                                </FriendListItem>
                            </transition-group>
                        </ul>
                        <div v-else class="alert alert-info w-100 p-5 text-center">
                            Вы пока ещё ни с кем не подружились.
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
import PliziCollection from "../classes/PliziCollection";

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
    }
},

computed : {
    friendsListFilter(){
        if ( this.wMode === 'all' ){
            return this.allMyFriends.asArray();
        }

        let ret = [];

        if ( this.wMode === 'online' ){
            this.allMyFriends.asArray().map( frItem => {
                if ( frItem.isOnline === true ){
                    ret.push( frItem );
                }
            } );
        }

        return ret;
    },
},


methods : {
    friendsListSelect( wm ){
        this.wMode = wm;
    },

    async loadMyFriends() {
        window.console.log(`loadMyFriends`);

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
},

async mounted() {
    await this.loadMyFriends();
}

}
</script>
