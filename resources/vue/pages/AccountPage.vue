<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8">
            <AccountSettingsMain v-bind:user="userData"></AccountSettingsMain>
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

export default {
name: 'AccountPage',
components: { AccountToolbarLeft,
    AccountSettingsMain, AccountSettingsPrivacy, AccountSettingsSecurity,
    AccountSettingsSideMenu,
    AccountToolbarRight
},
data() {
    return {
    }
},

computed: {
    userData: function () {
        return this.$root.$user;
    },
}

}
</script>
