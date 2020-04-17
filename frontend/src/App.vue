<template>
    <div  id="pageWrapper">
        <div v-if="!isAuthorized()" id="guestPageWrapper">
            <div class="--container-fluid container px-0 my-0 pt-3">

                <GuestNavBar></GuestNavBar>
                <main :id="containerID" role="main"
                      class="container-fluid pb-sm-5 pb-md-5">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </main>
                <GuestFooter></GuestFooter>
            </div>
        </div>

        <div v-else id="authPageWrapper">
            <AuthNavBar></AuthNavBar>

            <div class="--container-fluid container my-0 pt-3 container-wide mx-auto mt-4">
                <main :id="containerID" role="main"
                      class="container-fluid pb-sm-5 pb-md-5">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </main>
                <AuthFooter></AuthFooter>
            </div>

            <AlertModal v-if="mainModalVisible"
                        v-bind:alertMessage="mainModalMessage"
                        v-bind:alertClass="mainModalClass"
                        v-bind:alertTimeout="mainModalTimeOut"
            ></AlertModal>
        </div>
    </div>

</template>

<script>
import GuestNavBar from './common/GuestNavBar.vue';
import AuthNavBar from './common/AuthNavBar.vue';
import AuthFooter from './common/AuthFooter.vue';
import GuestFooter from './common/GuestFooter.vue';
import AlertModal from './components/AlertModal.vue';

import PliziAPI from './classes/PliziAPI.js';
import PliziAuthUser from './classes/PliziAuthUser.js';

export default {
name: 'App',
components: {
    GuestNavBar, AuthNavBar, AuthFooter, GuestFooter, AlertModal
},
data () {
    return {
        containerID : `contentContainer`, /** @TGA - просто хак, чтобы phpStorm не ругался на одинаковый ID у элемента */
        lastSearchText: ``,

        mainModalVisible : false,
        mainModalTitle   : '',
        mainModalMessage : '',
        mainModalClass   : '',
        mainModalTimeOut : 0
    }
},

methods: {
    afterSuccessLogin(evData) {
        if (evData.token  &&  (evData.token+'').trim() !== ``) {
            this.$root.$isAuth = true;

            this.$store.dispatch('SET_GWT', evData.token);
            this.$store.dispatch('SET_CHAT_CHANNEL', evData.chatChannel);

            this.$root.$api.token = evData.token;

            if (evData.redirect) {
                this.$router.push({ path: '/profile' });
            }
        }
        else {
            window.console.warn('afterSuccessLogin: no token');
            this.$router.push({ path: '/login' });
        }
    },


    afterSuccessLogout(evData) {
        this.$root.$isAuth = false;

        this.$store.dispatch('SET_GWT', ``);
        this.$store.dispatch('SET_CHAT_CHANNEL', ``);
        this.$store.dispatch('SET_LAST_SEARCH', ``);

        this.$root.$user.cleanData();
        this.$root.$api.token = ``;

        window.localStorage.removeItem('pliziJWToken');
        window.localStorage.removeItem('pliziUser');
        window.localStorage.removeItem('pliziChatChannel');
        window.localStorage.removeItem('pliziLastSearch');

        if (evData.redirect) {
            this.$router.push({path: '/login'});
        }
    },


    // TODO: @TGA тут времененно, для отладки
    handlePersonalMessage(evData){
        window.console.log(evData, `handlePersonalMessage`);
    },


    afterUserLoad(evData) {
        if (evData.token !== ``  &&  evData.user) {
            window.console.log(`afterUserLoad`);

            this.$root.$isAuth = true;
            this.$root.$api.token = evData.token;

            this.$root.$lastSearch = this.$store.getters.lastSearch;

            this.$root.$user.saveUserData( evData.user, evData.token );

            // TODO: перенести отсюда - слишком часто будет вызываться
            this.loadInvitations();
            this.loadNotifications();
        }
    },


    /**
     * загружает инвайты для навбара
     */
    async loadInvitations(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.invitationsList();
        }
        catch (e) {
            window.console.warn(e.detailMessage);
        }

        if (apiResponse !== null) {
            this.$root.$user.invitationsLoad(apiResponse);
            this.$root.$emit('invitationsLoad', {});
        }
    },


    async loadNotifications() {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.notificationsList();
        }
        catch (e){
            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.$root.$user.notificationsLoad(apiResponse);
            this.$root.$emit('notificationsLoad', {});
        }

        return true;
    },


    isAuthorized(){
        return this.$root.$isAuth;
    },

},

computed: {
},

mounted() {
},

created(){
    this.$root.$on('afterSuccessLogin',  this.afterSuccessLogin);

    this.$root.$on('afterSuccessLogout', this.afterSuccessLogout);

    this.$root.$on('afterUserLoad', this.afterUserLoad);

    this.$root.$on('searchStart', (evData) => {
        this.lastSearchText = evData.searchText;
    });

    // TODO: @TGA тут времененно, для отладки
    this.$root.$on('sendPersonalMessage', this.handlePersonalMessage);

    this.$root.$on('api:Unauthorized', (evData) => {
        window.console.warn(evData, `api:Unauthorized!`);
        this.afterSuccessLogout();
    });

    this.$root.$on('alertModal', (evData) => {
        this.mainModalMessage = evData.message;
        this.mainModalClass = evData.clazz || ``;
        this.mainModalTimeOut = evData.timeOut ? (evData.timeOut >>> 0) : 0;
        this.mainModalVisible = true;
    });
    this.$root.$on('hideAlertModal', () => {
        this.mainModalVisible = false;
    });

    this.$root.$api = new PliziAPI(this.$root, ``);
    this.$root.$user = new PliziAuthUser({});
},

beforeMount(){

}

}
</script>

<style lang="scss" src="./styles/App.scss"></style>
