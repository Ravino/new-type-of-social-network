<template>
    <div  id="pageWrapper">
        <div v-if="!isAuthorized()" id="guestPageWrapper">
            <div class="--container-fluid container px-0 my-0 pt-3">

                <GuestNavBar></GuestNavBar>
                <main :id="containerID" role="main"
                      class="container-fluid pb-sm-5 pb-md-5">
                    <router-view></router-view>
                </main>
                <GuestFooter></GuestFooter>
            </div>
        </div>

        <div v-else id="authPageWrapper">
            <AuthNavBar></AuthNavBar>

            <div class="--container-fluid container px-0 my-0 pt-3 container-wide  mx-auto mt-4">
                <main :id="containerID" role="main"
                      class="container-fluid pb-sm-5 pb-md-5">
                    <router-view></router-view>
                </main>
                <AuthFooter></AuthFooter>
            </div>
        </div>
    </div>

</template>

<script>
import GuestNavBar from './common/GuestNavBar.vue';
import AuthNavBar from './common/AuthNavBar.vue';
import AuthFooter from './common/AuthFooter.vue';
import GuestFooter from './common/GuestFooter.vue';

import {HTTPer} from './httper/httper';
import PliziUzer from './classes/PliziUser.js';

export default {
name: 'App',
components: {GuestNavBar, AuthNavBar, AuthFooter, GuestFooter},
data () {
    return {
        containerID: `contentContainer` /** @TGA - просто хак чтобы phpStorm не ругался на одинаковый ID у элемента */
    }
},

methods: {
    afterSuccessLogin(evData) {
        if (evData.token !== ``) {
            this.$root.$isAuth = true;

            this.$store.dispatch('SET_GWT', evData.token);
            this.$store.dispatch('SET_CHAT_CHANNEL', evData.chatChannel);

            if (evData.redirect) {
                this.$router.push({ path: '/profile' });
            }
        }
    },

    afterSuccessLogout(evData) {
        this.$root.$isAuth = false;

        this.$store.dispatch('SET_GWT', ``);
        this.$store.dispatch('SET_CHAT_CHANNEL', ``);

        window.localStorage.removeItem('pliziJWToken');
        window.localStorage.removeItem('pliziUser');
        window.localStorage.removeItem('pliziChatChannel');

        if (evData.redirect) {
            this.$router.push({path: '/login'});
        }
    },


    sentNewChatMessageToAPI(evData) {
        const sendData = {
            body: evData.message.body,
            chat_id: evData.chatId
        };

        HTTPer.post('api/chat/send', sendData, this.$store.getters.getHTTPConfig)
            .then((response) => {
                if (response.status === 200) {
                    this.$root.$emit('addNewChatMessageToList', evData.message);
                }
            })
            .catch((error) => {
                if (400 === error.response.status) {
                    window.console.warn(error.response.status+': '+error.response.statusText+': ' +error.response.data.message);
                }
                else {
                    window.console.warn( error.toString() );
                }
            });
    },


    afterUserLoad(evData) {
        if (evData.token !== ``  &&  evData.user) {
            this.$root.$isAuth = true;

            if (evData.save) {
                this.$root.$user.saveUserData( evData.user, evData.token );

                this.$store.dispatch('SET_GWT', evData.token);
            }
        }
    },

    isAuthorized(){
        return this.$root.$isAuth;
    }
},

computed: {
    // isAuth: function () {
    //     return this.$root.$isAuth;
    // },
},

mounted() {

},

created(){
    this.$root.$user = new PliziUzer({});
},

beforeMount(){
    this.$root.$on('afterSuccessLogin',  this.afterSuccessLogin);

    this.$root.$on('afterSuccessLogout', this.afterSuccessLogout);

    this.$root.$on('sentNewChatMessageToAPI', this.sentNewChatMessageToAPI);

    this.$root.$on('afterUserLoad', this.afterUserLoad);
}

}
</script>

<style lang="scss" src="./styles/App.scss"></style>
