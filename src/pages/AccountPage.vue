<template>
    <div class="row">
        <div class="col-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-8">
            <AccountSettingsMain></AccountSettingsMain>
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
    }
}
</script>
