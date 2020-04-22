<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8">
            <AccountSettingsMain></AccountSettingsMain>
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
        components: {
            AccountToolbarLeft,
            AccountSettingsMain, AccountSettingsPrivacy, AccountSettingsSecurity,
            AccountSettingsSideMenu,
            AccountToolbarRight
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style lang="scss">
    .plz-account-settings {
        padding: 29px 30px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);

        .plz-account-settings-form {
            .form-group {
                margin-bottom: 0;
                padding: 20px 0;
            }

            .plz-account-settings-header {
                padding-bottom: 27px;

                h6 {
                    color: #363636;
                    font-size: 14pt;
                }
            }

            .plz-account-settings-body {
                .form-group {
                    .plz-account-settings-body-label {
                        margin-bottom: 0;
                        display: flex;
                        align-items: center;
                        color: #9a9a9a;
                        font-size: 13pt;
                    }

                    .plz-account-settings-body-field {
                        display: flex;

                        i {
                            margin-right: 7px;
                        }

                        .form-control, .form-control-plaintext {
                            color: #363636;
                            font-size: 13pt;

                            .multiselect__tags {
                                border: none;
                            }

                            .multiselect__option--highlight {
                                background: #576DF6;
                            }
                        }

                        select {
                            -webkit-appearance: none;
                            -moz-appearance: none;
                            -o-appearance: none;
                            color: #212529 !important;
                        }

                        select + i {
                            float: right;
                            margin-top: -25px;
                            margin-right: 5px;
                            pointer-events: none;
                            background-color: #fff;
                            padding-right: 5px;
                        }
                    }

                    .plz-account-settings-body-action {
                        button {
                            color: #9a9a9a;
                            font-size: 13pt;
                        }
                    }
                }
            }
        }
    }
</style>
