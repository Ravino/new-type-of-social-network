<template>
    <div class="container-fluid">
        <NavBar v-bind:is-auth="isAuth"></NavBar>

        <main id="contentContainer" role="main" class="container-fluid">
            <router-view></router-view>
        </main>

        <Footer></Footer>
    </div>
</template>

<script>
import NavBar from './common/NavBar.vue';
import Footer from './common/Footer.vue';

export default {
name: 'App',
components: {NavBar, Footer},
data () {
    return {
        isAuth: false,
        userData: null,
    }
},

methods: {
    async checkUser() {
        window.console.log(`checkUser`);
        let user = this.$store.getters.userData;
        window.console.log(user, '.getters.userData');

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
            this.$store.dispatch('SET_AUTH', true);

            this.$router.push({ path: '/account' });
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

<style>
body {
    background-color: #F7F8FC;

    /*background-image: url("/src/images/plizi-bg-exp.svg");*/
    /*background-size: auto auto;*/
    /*background-repeat: no-repeat;*/
    /*background-position: right 40px;*/
    /*background-attachment: scroll;*/
}

#contentContainer {
    margin-top: 70px;
    min-height: 200px;
}
</style>
