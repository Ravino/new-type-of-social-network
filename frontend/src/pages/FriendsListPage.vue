<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 pr-3">
                    <div class="p-4 bg-white-br20">
                        Новые друзья | <router-link tag="a" to="/invitations">Заявки в друзья</router-link> | <b>Новые друзья</b>
                    </div>
                </div>
                <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 bg-white-br20">
                    <div class="p-4">поиск друзей</div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 py-3"></div>
            </div>

            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 bg-white-br20">
                    <div class="p-4">
                        <div id="friendsListFilter" class="row">
                            <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
                                <nav class="nav profile-filter-links" role="tablist">
                                    <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='all' }" id="tabAllFriends" role="tab" @click.stop="friendsListSelect(`all`)">Все друзья</span>
                                    <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='online' }" id="tabOnlineFriends" role="tab" @click.stop="friendsListSelect(`online`)">Друзья онлайн</span>
                                </nav>

                                <button class="btn btn-link mx-1 px-1 btn-add-file" type="button">
                                    <span class="text-body">Найти друзей</span> <IconSearch />
                                </button>
                            </div>
                        </div>

                        <div v-if="isFriendsLoaded" class="plizi-friends-list">
                            <div v-if="friendsList  &&  friendsList.length>0" class="alert alert-light" >
                                <SearchResultItem v-for="(friendItem, friendIndex) in friendsList"
                                                  v-bind:key="friendIndex" v-bind:srItem="friendItem">
                                </SearchResultItem>
                            </div>
                            <div v-else class="alert alert-info">
                                У Вас ещё нет друзей!<br />
                                &quot;Молодой крАкодил хочет завести себе друзей&quot;?
                            </div>
                        </div>
                        <Spinner v-else></Spinner>
                    </div>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <h5>Возможные друзья</h5>
                    <h5>Рекомендуемые друзья</h5>
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
import PliziUser from '../classes/PliziUser.js';

export default {
name: 'FriendsListPage',
components: {
    IconSearch,
    AccountToolbarLeft, AccountToolbarRight, SearchResultItem, Spinner
},
data() {
    return {
        wMode : `all`,
        friendsList : [],
        isFriendsLoaded : false
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
            if (e.status  &&  e.status>=400) {
                window.console.warn(e.detailMessage);
            }
            else {
                throw e;
            }
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
}

}
</script>
