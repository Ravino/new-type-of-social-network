<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8">
            <AccountSettingsMain v-bind:user="userData" v-bind:isReady="dataReady"></AccountSettingsMain>
            <AccountSettingsPrivacy></AccountSettingsPrivacy>
            <AccountSettingsSecurity></AccountSettingsSecurity>
        </div>

        <div class="d-sm-none d-md-none d-lg-block d-xl-block col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <AccountSettingsSideMenu></AccountSettingsSideMenu>
        </div>

        <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';

import AccountSettingsMain from '../components/AccountSettingsMain.vue';
import AccountSettingsPrivacy from '../components/AccountSettingsPrivacy.vue';
import AccountSettingsSecurity from '../components/AccountSettingsSecurity.vue';

import AccountSettingsSideMenu from '../components/AccountSettingsSideMenu.vue';

import {HTTPer} from '../httper/httper.js';

export default {
name: 'AccountPage',
components: { AccountToolbarLeft,
    AccountSettingsMain, AccountSettingsPrivacy, AccountSettingsSecurity,
    AccountSettingsSideMenu,
    AccountToolbarRight
},
data() {
    return {
        // userData: {
        //     user_id: -1,
        //     firstname: ``,
        //     lastname: ``,
        //     sex: ``,
        //     birthday: ``,
        //     city: ``,
        //     created_at: ``,
        //     updated_at: ``,
        // },
        // TODO: временно! удалить после вёрстки

        userData: {
            user_id: -1,
            firstname: `Владислав`,
            lastname: `Браташ`,
            sex: `m`,
            birthday: `2001-05-09`,
            city: `Москва`,
            created_at: ``,
            updated_at: ``,
        },
        // TODO: временно! удалить после вёрстки
        // dataReady: false,
        // gwToken: ``
        dataReady: true,
        gwToken: `tmp`
    }
},

methods: {
    getUserData(){
        let config = {
            headers: {
                Authorization: `Bearer ${this.gwToken}`
            },
        };

        HTTPer.get('api/user', config)
            .then( (response) => {
                window.localStorage.setItem('pliziUser', JSON.stringify(response.data.data));
                this.userData = response.data.data;
                this.dataReady = true;
            })
            .catch((error) => window.console.log(error.response));
    },

    checkUserData() {
        let user = window.localStorage.getItem('pliziUser');

        if (typeof user === 'undefined'  ||  ''===user  || null===user  || {}===user)
            return false;

        user = JSON.parse(user);
        this.userData = user;
        this.dataReady = true;

        return true;
    }
},

// TODO: временно! удалить после вёрстки
mounted() {
    this.$root.$emit('afterSuccessLogin', { 'token': `tmp` });
},

// TODO: временно! раскомментить после вёрстки
// async mounted() {
//     if (!this.checkUserData()) {
//         await this.getUserData();
//     }
// },
//
// beforeMount() {
//     let gwt = window.localStorage.getItem('pliziJWToken');
//     if (typeof gwt === 'undefined'  ||  ''===gwt  || null===gwt) {
//         this.$router.push({ path: '/login' });
//         return;
//     }
//
//     this.gwToken = gwt;
// }

}
</script>
