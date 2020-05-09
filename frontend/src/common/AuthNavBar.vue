<template>
    <header id="authHeader" class="fixed-top"
            :class="{ 'page-has-offset-top' : isShowNavBarShadow }">
        <nav class="auth-navbar navbar navbar-expand-lg container container-wide mx-auto">
            <div class="row w-100 px-0 mr-0">
                <div class="d-flex align-items-center col-sm-1 col-md-1 col-lg-1 col-xl-1 py-lg-0 p-xl-0 ">
                    <router-link v-if="isGotoLogin" :to="`/logout`" tag="a"
                                 class="navbar-brand w-100 d-block text-center mx-auto h-auto my-0">
                        <IconPliziLogo />
                    </router-link>
                    <router-link v-else :to="{name: 'NewsPage'}" tag="a"
                                 class="navbar-brand w-100 d-block text-center mx-auto h-auto my-0">
                        <IconPliziLogo />
                    </router-link>
                </div>

                <div class="col-sm-4 col-md-6 col-lg-5 offset-xl-1 d-none d-md-flex align-items-center pl-xl-0">
                    <NavBarSearch></NavBarSearch>
                </div>
                <!--<div id="playerWrapper" class="plz-top-player col-lg-2 col-xl-2 d-sm-none d-md-none d-lg-block d-xl-block text-center ">
                    <NavBarPlayer></NavBarPlayer>
                </div>-->
                <div id="watcherWrapper" class="plz-top-watcher col-6 col-sm-4 col-lg-3 col-xl-2 w-auto m-auto ml-md-auto mr-md-0 text-center">
                    <div class="--btn-block mt-2 d-inline-block">
                        <NavBarNotifications></NavBarNotifications>

                        <NavBarMessages></NavBarMessages>

                        <NavBarFriends></NavBarFriends>
                    </div>
                </div>

                <NavBarUserMenu></NavBarUserMenu>
            </div>
        </nav>
    </header>
</template>

<script>
import IconPliziLogo from '../icons/IconPliziLogo.vue';

import NavBarSearch from './NavBar/NavBarSearch.vue';
import NavBarPlayer from './NavBar/NavBarPlayer.vue';

import NavBarNotifications from './NavBar/NavBarNotifications.vue';
import NavBarMessages from './NavBar/NavBarMessages.vue';
import NavBarFriends from './NavBar/NavBarFriends.vue';

import NavBarUserMenu from './NavBar/NavBarUserMenu.vue';

export default {
name: 'AuthNavBar',
components : { IconPliziLogo, NavBarSearch, NavBarPlayer,
    NavBarNotifications, NavBarMessages, NavBarFriends,
    NavBarUserMenu
},
props: {
    showShadow: {
        type: Boolean,
        required: false,
        default: false
    }
},

data(){
    return {
        isShowNavBarShadow: false
    }
},

computed : {
    isGotoLogin(){
        return !!window.isTarga;
    },
},

created(){
    window.addEventListener('scroll', ()=>{
        this.isShowNavBarShadow = (window.scrollY > 80  &&  'ChatsListPage'!==this.$root.$router.currentRoute.name);
    });
}
}
</script>
