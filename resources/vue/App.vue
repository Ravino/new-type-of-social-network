<template>

    <div class="container-fluid px-0 my-0 pt-3">
        <GuestNavBar v-if="!isAuth"></GuestNavBar>
        <AuthNavBar v-else ></AuthNavBar>

        <main id="contentContainer" role="main" class="container-fluid pb-sm-5 pb-md-5">
            <router-view></router-view>
        </main>

        <Footer></Footer>
    </div>

</template>

<script>
// import NavBar from './common/NavBar.vue';
import GuestNavBar from './common/GuestNavBar.vue';
import AuthNavBar from './common/AuthNavBar.vue';
import Footer from './common/Footer.vue';

export default {
name: 'App',
components: {GuestNavBar, AuthNavBar, Footer},
data () {
    return {
        isAuth: true,
        userData: null,
    }
},

methods: {
    afterSuccessLogin(evData) {
        if (evData.token !== ``) {
            this.isAuth = true;

            this.$store.dispatch('SET_GWT', evData.token);
            this.$store.dispatch('SET_CHAT_CHANNEL', evData.chatChannel);
            this.$store.dispatch('SET_AUTH', true);

            if (evData.redirect) {
                this.$router.push({ path: '/profile' });
            }
        }
    },

    afterSuccessLogout(evData) {
        this.isAuth = false;

        this.$store.dispatch('SET_GWT', ``);
        this.$store.dispatch('SET_AUTH', false);
        this.$store.dispatch('SET_CHAT_CHANNEL', ``);
        this.$store.dispatch('SET_USER', null);

        //TODO: @tga что корректно работает в Vuex и убрать отсюда
        window.localStorage.removeItem('pliziJWToken');
        window.localStorage.removeItem('pliziUser');
        window.localStorage.removeItem('pliziChatChannel');

        if (evData.redirect) {
            this.$router.push({path: '/login'});
        }
    }
},


mounted() {
    this.$root.$on('afterSuccessLogin',  this.afterSuccessLogin);

    this.$root.$on('afterSuccessLogout', this.afterSuccessLogout);
}
}
</script>

<style lang="scss" src="./styles/App.scss"></style>
