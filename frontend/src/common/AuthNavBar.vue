<template>
    <header id="authHeader" class="fixed-top">
        <nav class="auth-navbar navbar navbar-expand-lg container container-wide mx-auto">
        <div class="w-100 ">
            <div class="row w-100 px-0 mr-0">
                <div class="d-flex align-items-center col-sm-1 col-md-1 col-lg-1 col-xl-1 py-lg-0 p-xl-0 ">
                    <router-link :to="{name: 'NewsPage'}" tag="a" class="navbar-brand w-100 d-block text-center mx-auto h-auto my-0">
                        <IconPliziLogo />
                    </router-link>
                </div>

                <div class="col-sm-4 col-md-6 col-lg-5 offset-lg-1 d-sm-none d-md-block d-lg-block d-xl-block pl-0">
                    <NavBarSearch></NavBarSearch>
                </div>
                <!--
                <div id="playerWrapper" class="plz-top-player col-lg-2 col-xl-2 d-sm-none d-md-none d-lg-block d-xl-block text-center ">
                    <NavBarPlayer></NavBarPlayer>
                </div>
                -->

                <div id="watcherWrapper" class="plz-top-watcher col-sm-4 col-md-4 col-lg-2 w-auto ml-auto text-center">
                    <NavBarWatcher></NavBarWatcher>
                </div>

                <NavBarUserMenu></NavBarUserMenu>
            </div>
        </div>
    </nav>
    </header>
</template>

<script>
import IconPliziLogo from '../icons/IconPliziLogo.vue';

import NavBarSearch from './NavBar/NavBarSearch.vue';
import NavBarPlayer from './NavBar/NavBarPlayer.vue';
import NavBarWatcher from './NavBar/NavBarWatcher.vue';
import NavBarUserMenu from './NavBar/NavBarUserMenu.vue';

export default {
name: 'AuthNavBar',
components : { IconPliziLogo, NavBarSearch, NavBarPlayer, NavBarWatcher, NavBarUserMenu },
props: {
},

}
</script>
