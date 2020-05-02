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
                            <div class="plz-account-settings-body-action ">
                                <button type="button"
                                        id="password"
                                        class="btn btn-link pl-0"
                                        data-toggle="modal"
                                        :data-target="`#${modalID}`">Изменить
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </form>
        <Modal :modalId="modalID"
               :vertically="true"
               class="modal">
            <template v-slot:header>
                <div class="modal-header">
                    <h5 class="modal-title" :id="modalID">Обновление пароля</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </template>
            <form>
                <div class="form-group">
                    <label for="old_password">Старый пароль</label>
                    <input type="password"
                           class="form-control"
                           :class="{'is-invalid': oldPasswordError}"
                           id="old_password"
                           @input="oldPasswordError ? formErrors.oldPassword = null : null"
                           v-model="passwords.oldPassword">
                    <div v-if="oldPasswordError" class="invalid-feedback">
                        {{ oldPasswordError }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="new_password">Новый пароль</label>
                    <input type="password"
                           class="form-control"
                           :class="{'is-invalid': newPasswordError}"
                           id="new_password"
                           @input="newPasswordError ? formErrors.newPassword = null : null"
                           v-model="passwords.newPassword">
                    <div v-if="newPasswordError" class="invalid-feedback">
                        {{ newPasswordError }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="new_password_confirmation">Подтвердите новый пароль</label>
                    <input type="password"
                           class="form-control"
                           :class="{'is-invalid': newPasswordConfirmationError}"
                           id="new_password_confirmation"
                           @input="newPasswordConfirmationError ? formErrors.newPasswordConfirmation = null : null"
                           v-model="passwords.newPasswordConfirmation">
                    <div v-if="newPasswordConfirmationError" class="invalid-feedback">
                        {{ newPasswordConfirmationError }}
                    </div>
                </div>
                <div v-if="isFormSuccess" class="text-success mb-3">
                    {{ formSuccess }}
                </div>
                <button type="submit"
                        class="btn btn-primary btn-submit"
                        @click.prevent="changePassword">
                    Обновить
                </button>
            </form>
        </Modal>
    </div>
</template>

<script>
    import Modal from './Modal.vue';

    export default {
        name: 'AccountSettingsSecurity',
        components: {
            Modal,
        },
      computed: {
        oldPasswordError() {
          return this.formErrors && this.formErrors.oldPassword ? this.formErrors.oldPassword[0] : null;
        },
        newPasswordError() {
          return this.formErrors && this.formErrors.newPassword ? this.formErrors.newPassword[0] : null;
        },
        newPasswordConfirmationError() {
          return this.formErrors && this.formErrors.newPasswordConfirmation ?
            this.formErrors.newPasswordConfirmation[0] : null;
        },
        isFormSuccess() {
          return !!this.formSuccess;
        },
      },
        data() {
            return {
                form: {
                    twoFactorAuthEnabled: this.$root.$user.privacySettings.twoFactorAuthEnabled,
                    smsConfirm: this.$root.$user.privacySettings.smsConfirm,
                },
                modalID: 'modal-' + Math.floor(Math.random() * 1000),
                passwords: {
                    oldPassword: null,
                    newPassword: null,
                    newPasswordConfirmation: null,
                },
              formErrors: null,
              formSuccess: null,
            }
        },
        methods: {
            async accountStartSaveData(newValue, fieldName) {
                let response = null;

                try {
                    response = await this.$root.$api.updateUserPrivacy({[fieldName]: newValue});
                } catch (e) {
                    console.log(e.detailMessage);
                }

                if (response) {
                    this.$root.$user.updateData(response);
                }
            },
          async changePassword() {
            this.formErrors = null;
            this.formSuccess = null;

            let response = null;

            try {
              response = await this.$root.$api.changePassword({
                oldPassword: this.passwords.oldPassword,
                newPassword: this.passwords.newPassword,
                newPasswordConfirmation: this.passwords.newPasswordConfirmation,
              });
            } catch (e) {
              this.formErrors =  e.data.errors;
              console.log(e.detailMessage);
            }

            if (response) {
              this.formSuccess = response.message;
            }
          },
        },
    }
</script>

<style lang="scss">
    .modal {
        .btn-submit {
            background-color: #1554F7 !important;
        }
    }
</style>
