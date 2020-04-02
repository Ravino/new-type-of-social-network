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
        isAuth: false,
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
}

body.LoginPage {
    background-image: url("/images/plizi-bg-exp.svg");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center 40px;
    background-attachment: scroll;
}

body.LoginPage > .container-fluid {
    max-width: 1008px;
}

#contentContainer {
    margin-top: 70px;
    min-height: 200px;
}

.btn.disabled, .btn:disabled {
    opacity: 1.0;
}

.icon-40 {
    display: block;
    float: right;
    width: 40px;
    max-width: 40px;
    height: 40px;
    max-height: 40px;
    margin: 0.8rem 10px 0px 0px;
}

.icon-40 > img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
}

.bg-white-br20 {
    background-color: white;
    border-radius: 20px;
}

.form-control.lr-input {
    border-radius: 0px;
    width: 278px;
    max-width: 278px;
    margin-left: auto;
    margin-right: auto;
    border-width: 0px 0px 1px 0px;
    border-color: black;
    background-color: transparent;
}

.form-control.lr-input:focus {
    /*box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.6);*/
    box-shadow: none;
    outline: 0 none;
}

.btn.plz-btn {
    display: block;
    margin: 0px auto;

    width: 278px;
    max-width: 278px;
    min-width: 278px;
    height: 40px;
    min-height: 40px;
    max-height: 40px;
    line-height: 40px;
    border-radius: 20px;
    padding: 0px;
    text-align: center;

    box-shadow: none;
    outline: 0 none;
    transition: none;
}

.btn.plz-btn-primary {
    background-color: #3D51DE;
    color: white;
}

.btn.plz-btn-outline {
    color: #3D51DE;
    background-color: white;
}

</style>
