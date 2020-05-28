<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-9 col-xl-8  px-0 px-md-3">
                <BlackListUsers
                    v-bind:blockedUsers="blockedUsers"
                    v-bind:isBlacklistDataReady="isBlacklistDataReady"></BlackListUsers>
            </div>

            <div class="d-none d-xl-block col-sm-2 col-md-2 col-lg-2 col-xl-2  px-0 px-md-3">
                <BlackListSideMenu></BlackListSideMenu>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0  px-0 px-md-3">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';

import BlackListUsers from '../components/AccountSettings/BlackListUsers.vue';

import BlackListSideMenu from "../components/AccountSettings/BlackListSideMenu";
import PliziBlackListItem from "../classes/PliziBlackListItem";
import PliziCollection from "../classes/PliziCollection";

export default {
    name: 'BlackList',
    components: {
        BlackListSideMenu,
        AccountToolbarLeft, BlackListUsers,
        FavoriteFriends
    },
    data() {
        return {
            blockedUsers: (new PliziCollection()),
            isBlacklistDataReady : false
        }
    },
    methods: {
        async getBlacklist() {
            let apiResponse = null;

            try {
                apiResponse = await this.$root.$api.$users.blacklistGet();
            }
            catch (e){
                window.console.warn(e.detailMessage);
                throw e;
            }
            console.log(apiResponse);

            if (apiResponse) {
                this.blockedUsers.receive(apiResponse,PliziBlackListItem);
                // console.dir(this.blockedUsers.asArray());
                this.isBlacklistDataReady = true;
            }
        },
    },
    async mounted() {
        await this.getBlacklist();
    },
}
</script>

