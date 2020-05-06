<template>
    <div id="accountSettingsSecurity"
         class="plz-account-settings plz-account-settings-security bg-white-br20 plz-mb20 container-fluid">
        <form class="plz-account-settings-form pb-0 px-3 mb-0">
            <div class="plz-account-settings-header plz-account-settings-security-header row border-bottom">
                <div class="d-flex">
                    <h6>Безопасность</h6>
                </div>
            </div>

            <div class="plz-account-settings-body plz-account-settings-security-body">
                <div class="form-group row border-bottom">
                    <label for="twoFactorAuthEnabled"
                           class="plz-account-settings-body-label plz-account-settings-security-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Двухэтапная аутентификация
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-security-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75 position-relative pl-4">
                            <i v-if="Number(form.twoFactorAuthEnabled) === 1" class="fas fa-check mr-2"></i>
                            <div class="w-100 position-relative ml-n2">
                                <select id="twoFactorAuthEnabled"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.twoFactorAuthEnabled, 'twoFactorAuthEnabled')"
                                        v-model="form.twoFactorAuthEnabled">
                                    <option value="0">Выключена</option>
                                    <option value="1">Включена</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="smsConfirm"
                           class="plz-account-settings-body-label plz-account-settings-security-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Подтверждение через SMS
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-security-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75 position-relative pl-4">
                            <i v-if="Number(form.smsConfirm) === 1" class="fas fa-check mr-2"></i>
                            <div class="w-100  position-relative ml-n2">
                                <select id="smsConfirm"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.smsConfirm, 'smsConfirm')"
                                        v-model="form.smsConfirm">
                                    <option value="0">Выключено</option>
                                    <option value="1">Включено</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="password"
                           class="plz-account-settings-body-label plz-account-settings-security-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">Пароль</label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-security-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75 position-relative ">
                            <div class="plz-account-settings-body-action pl-1 ">
                                <button type="button"
                                        id="password"
                                        class="btn btn-link"
                                        @click="openChangePasswordModal">
                                    Изменить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </form>
        <ChangePasswordModal v-if="changePasswordModal.isVisible"
                             @hideModal="hideChangePasswordModal"/>
    </div>
</template>

<script>
    import ChangePasswordModal from "./ChangePasswordModal.vue";

    export default {
        name: 'AccountSettingsSecurity',
        components: {
            ChangePasswordModal
        },
        data() {
            return {
                form: {
                    twoFactorAuthEnabled: this.$root.$auth.user.privacySettings.twoFactorAuthEnabled,
                    smsConfirm: this.$root.$auth.user.privacySettings.smsConfirm,
                },
                changePasswordModal: {
                    isVisible: false,
                },
            }
        },
        methods: {
            openChangePasswordModal() {
                this.changePasswordModal.isVisible = true;
            },
            hideChangePasswordModal() {
                this.changePasswordModal.isVisible = false;
            },

            async accountStartSaveData(newValue, fieldName) {
                let response = null;

                try {
                    response = await this.$root.$api.updateUserPrivacy({[fieldName]: newValue});
                } catch (e) {
                    console.log(e.detailMessage);
                }

                if (response) {
                    this.$root.$auth.user.updateAuthUser({profile: response});
                    this.$root.$auth.storeUserData();
                }
            },

        },
    }
</script>
