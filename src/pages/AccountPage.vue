<template>
    <div class="row">
        <div class="col-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-8">
            <AccountSettingsMain v-bind:user="userData" v-bind:isReady="dataReady"></AccountSettingsMain>
            <AccountSettingsPrivacy></AccountSettingsPrivacy>
            <AccountSettingsSecurity></AccountSettingsSecurity>
        </div>

        <div class="col-2">
            <AccountSettingsSideMenu></AccountSettingsSideMenu>
        </div>

        <div class="col-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../components/AccountToolbarLeft.vue';

import AccountSettingsMain from '../components/AccountSettingsMain.vue';
import AccountSettingsPrivacy from '../components/AccountSettingsPrivacy.vue';
import AccountSettingsSecurity from '../components/AccountSettingsSecurity.vue';

import AccountToolbarRight from '../components/AccountToolbarRight.vue';
import AccountSettingsSideMenu from '../components/AccountSettingsSideMenu.vue';

import router from '../router/router.js';
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
        userData: {
            user_id: -1,
            firstname: ``,
            lastname: ``,
            sex: ``,
            birthday: ``,
            city: ``,
            created_at: ``,
            updated_at: ``,
        },
        dataReady: false,
        gwToken: ``
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

async mounted() {
    if (!this.checkUserData()) {
        await this.getUserData();
    }
},

beforeMount() {
    let gwt = window.localStorage.getItem('pliziJWToken');
    if (typeof gwt === 'undefined'  ||  ''===gwt  || null===gwt) {
        router.push({ path: '/login' });
        return;
    }

    this.gwToken = gwt;
}

}
</script>
