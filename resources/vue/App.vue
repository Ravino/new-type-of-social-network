<template>

    <div class="--container-fluid container px-0 my-0 pt-3"
         :class="{ 'container-wide  mx-auto mt-4' : isAuth }">
        <!--   :class="{ 'container-fluid' : isAuth, 'container': !isAuth }" add class CONTAINER-->

        <GuestNavBar v-if="!isAuth"></GuestNavBar>
        <AuthNavBar v-else ></AuthNavBar>

        <main id="contentContainer" role="main"
              class="container-fluid pb-sm-5 pb-md-5 pr-4">
            <router-view></router-view>
        </main>

        <GuestFooter v-if="!isAuth"></GuestFooter>
        <AuthFooter v-else ></AuthFooter>

    </div>

</template>

<script>
import GuestNavBar from './common/GuestNavBar.vue';
import AuthNavBar from './common/AuthNavBar.vue';
import AuthFooter from './common/AuthFooter.vue';
import GuestFooter from './common/GuestFooter.vue';

import {HTTPer} from './httper/httper';

export default {
name: 'App',
components: {GuestNavBar, AuthNavBar, AuthFooter, GuestFooter},
data () {
    return {
        isAuth: false,
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

        //TODO: @tga уюедиться, что корректно работает в Vuex и убрать отсюда
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
                    window.console.log('success');

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
},


mounted() {
    this.$root.$on('afterSuccessLogin',  this.afterSuccessLogin);

    this.$root.$on('afterSuccessLogout', this.afterSuccessLogout);

    this.$root.$on('sentNewChatMessageToAPI', this.sentNewChatMessageToAPI);
}
}
</script>

<style lang="scss" src="./styles/App.scss"></style>
