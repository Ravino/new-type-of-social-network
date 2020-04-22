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
                                <span class="nav-link position-relative py-3 px-1 mr-4" :class="{ 'active': wMode==='all' }" id="tabAllFriends" role="tab" @click.stop="friendsListSelect(`all`)">Все друзья</span>
                                <span class="nav-link position-relative py-3 px-1 mr-4" :class="{ 'active': wMode==='online' }" id="tabOnlineFriends" role="tab" @click.stop="friendsListSelect(`online`)">Друзья онлайн</span>
                            </nav>
                        </div>
                    </div>

                    <div v-if="isFriendsLoaded" class="row plizi-friends-list py-4">
                        <ul v-if="friendsList  &&  friendsList.length>0" class="d-block w-100 p-0" >
                            <SearchResultItem v-for="(friendItem, friendIndex) in friendsListFilter"
                                              v-bind:key="friendIndex" v-bind:srItem="friendItem">
                            </SearchResultItem>
                        </ul>
                        <div v-else class="alert alert-info">
                            У Вас ещё нет друзей!<br />
                            &quot;Молодой крАкодил хочет завести себе друзей&quot;?
                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <PotentialFriends :blockName="`Возможные друзья`" :friends="friendsList"></PotentialFriends>
                    <PotentialFriends :blockName="`Рекомендуемые друзья`" :friends="friendsList"></PotentialFriends> <!-- TODO раньше использовалось значение :friends="potentialList" -->
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';
import Spinner from '../common/Spinner.vue';
import IconSearch from '../icons/IconSearch.vue';

import SearchResultItem from '../components/SearchResultItem.vue';
import FriendsListHeader from '../components/FriendsListHeader.vue';

import PotentialFriends from '../common/PotentialFriends.vue';

import PliziUser from '../classes/PliziUser.js';

export default {
name: 'FriendsListPage',
components: {
    FriendsListHeader, PotentialFriends,
    IconSearch,
    AccountToolbarLeft, AccountToolbarRight, SearchResultItem, Spinner
},
data() {
    return {
        wMode : `all`,
        friendsList : [],
        isFriendsLoaded : false,
        potentialList : []
    }
},

methods: {
    async loadFriendsList() {
        let apiResponse = null;

        this.friendsList = null;
        this.isFriendsLoaded = false;

        try {
            apiResponse = await this.$root.$api.friendsList();
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.friendsList = [];

        if (apiResponse) {
            apiResponse.map( (srItem)=> {
                this.friendsList.push( new PliziUser({ data : srItem} ) );
            });

            this.isFriendsLoaded = true;
        }

        return true;
    },


    async loadPotentialsList() {
        let apiResponse = null;

        this.potentialList = null;

        try {
            apiResponse = await this.$root.$api.friendsPotential();
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.potentialList = [];

        if (apiResponse) {
            apiResponse.map( (srItem)=> {
                this.potentialList.push( new PliziUser({ data : srItem} ) );
            });
        }

        return true;
    },


    friendsListSelect(wm){
        this.wMode = wm;
    }
},

computed: {
    friendsListFilter(wm){
        if (this.wMode === 'all')
            return this.friendsList;

        let ret = [];

        if (this.wMode==='online') {
            this.friendsList.map( frItem => {
                if (frItem.isOnline === true) {
                    ret.push(frItem);
                }
            });
        }

        return ret;
    }
},

async mounted(){
    await this.loadFriendsList();
    await this.loadPotentialsList();
}

}
</script>
