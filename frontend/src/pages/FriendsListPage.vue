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

                    <div v-if="isFriendsLoaded" class="row plizi-friends-list ">
                        <ul v-if="friendsList  &&  friendsList.length>0" class="d-block w-100 p-0" >
                            <FriendListItem v-for="friendItem in friendsListFilter"
                                            v-bind:key="friendItem.id"
                                            v-bind:srItem="friendItem">
                            </FriendListItem>
                        </ul>
                        <div v-else class="alert alert-info">
                            У Вас ещё нет друзей!<br />
                            &quot;Молодой крАкодил хочет завести себе друзей&quot;?
                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <PotentialFriends :blockName="`Возможные друзья`" :friends="shuffle(potentialList)"></PotentialFriends>
                    <PotentialFriends :blockName="`Рекомендуемые друзья`" :friends="shuffle(potentialList)"></PotentialFriends>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import FriendsMixin from '../mixins/FriendsMixin.js';
import FriendListItem from '../components/FriendListItem.vue';

export default {
name: 'FriendsListPage',
components: {
    FriendListItem
},
mixins : [FriendsMixin],
data() {
    return {
        wMode : `all`,
    }
},

methods: {

    friendsListSelect(wm){
        this.wMode = wm;
    }
},

computed: {
    friendsListFilter(){
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
    },
}

}
</script>
