<template>
    <div  id="pageWrapper">
        <div v-if="!isAuthorized()" id="guestPageWrapper" class="d-flex flex-column justify-content-center">
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
                <AuthFooter v-if=" 'ChatsListPage'!==this.$root.$router.currentRoute.name "></AuthFooter>
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

            window.localStorage.setItem('pliziJWToken', evData.token);
            window.localStorage.setItem('pliziChatChannel', evData.chatChannel);

            this.$root.$api.token = evData.token;
            this.$root.$api.channel = evData.chatChannel;

            if (evData.redirect) {
                const redirTo = window.localStorage.getItem('pliziRedirectTo');
                if (redirTo &&  redirTo!=='') {
                    window.localStorage.removeItem('pliziRedirectTo');
                    this.$router.push({ path: redirTo });
                }
                else {
                    this.$router.push({ path: '/profile' });
                }
            }
        }
        else {
            window.console.warn('afterSuccessLogin: no token');
            this.$router.push({ path: '/login' });
        }
    },


    afterSuccessLogout(evData) {
        this.$root.$isAuth = false;

        this.$root.$user.cleanData();
        this.$root.$api.token = ``;
        this.$root.$api.channel = ``;

        window.localStorage.removeItem('pliziJWToken');
        window.localStorage.removeItem('pliziUser');
        window.localStorage.removeItem('pliziChatChannel');
        window.localStorage.removeItem('pliziLastSearch');
        window.localStorage.removeItem('pliziDialogs');

        if (evData.redirect) {
            this.$router.push({path: '/login'});
        }
    },


    async afterUserLoad(evData) {
        if (evData.token !== ``  &&  evData.user) {
            window.console.log(`afterUserLoad`);

            this.$root.$isAuth = true;
            this.$root.$lastSearch = window.localStorage.getItem('pliziLastSearch');

            this.$root.$api.token = evData.token;

            this.$root.$user.saveUserData( evData.user, evData.token );

            this.$root.$api.connectToChannel( evData.user.channel );

            // TODO: перенести отсюда - слишком часто будет вызываться
            this.loadInvitations();
            this.loadNotifications();

            await this.$root.$user.fm.load();
            await this.$root.$user.dm.load();
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


created(){
    this.$root.$api = new PliziAPI(this.$root);
    this.$root.$user = new PliziAuthUser({}, this.$root.$api);

    this.$root.$on('afterSuccessLogin',  this.afterSuccessLogin);

    this.$root.$on('afterSuccessLogout', this.afterSuccessLogout);

    this.$root.$on('AfterUserLoad', this.afterUserLoad);
    this.$root.$on('AfterUserRestore', this.afterUserLoad);

    this.$root.$on('searchStart', (evData) => {
        this.lastSearchText = evData.searchText;
    });

    this.$root.$on('api:Unauthorized', (evData) => {
        window.console.warn(evData, `api:Unauthorized!`);
        this.afterSuccessLogout( {redirect : true} );
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

    this.$root.$on('NewChatDialog', (evData)=>{
        this.$root.$user.dm.onAddNewDialog(evData);
    });
}

}
</script>

<style lang="scss" src="./styles/App.scss"></style>
