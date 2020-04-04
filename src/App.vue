<template>

    <div class="container-fluid px-0 my-0 pt-3">
        <GuestNavBar v-if="!isAuth"></GuestNavBar>
        <AuthNavBar v-if="isAuth" v-bind:is-auth="isAuth"></AuthNavBar>

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
    async checkUser() {
        let user = this.$store.getters.userData;

        if (user &&  user.firstname) {
            this.isAuth = true;
            return true;
        }

        user = await this.$store.dispatch('GET_USER', {});
        if (user  &&  user.firstname) {
            this.isAuth = true;
            return true;
        }

        return false;
    }
},

async beforeMount() {
    await this.checkUser();
},

mounted() {
    this.$root.$on('afterSuccessLogin', (evData) => {
        if (evData.token !== ``) {
            this.isAuth = true;

            this.$store.dispatch('SET_GWT', evData.token);
            this.$store.dispatch('SET_CHAT_CHANNEL', evData.chatChannel);
            this.$store.dispatch('SET_AUTH', true);

            this.$router.push({ path: '/profile' });
        }
    });

    this.$root.$on('afterSuccessLogout', () => {
        this.isAuth = false;

        this.$store.dispatch('SET_GWT', ``);
        this.$store.dispatch('SET_AUTH', false);

        window.localStorage.removeItem('pliziJWToken');
        window.localStorage.removeItem('pliziUser');

        this.$router.push({ path: '/login' });
    });
}
}
</script>

<style src="./styles/App.css"></style>
