<template>
    <div class="modal show recover-pass-modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true"
         style="display: block; background-color: rgba(0, 0, 0, .7);" @click.stop="hideRecoverPassModal">
        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div class="modal-body">
                    <div id="" class="plz-recover-pass-form-wrapper ">
                        <div class="text-center"><h5>Восстановление пароля</h5></div>
                        <img class="mb-4 mt-2 mx-auto" src="../images/icons/icon-recoverPass.png" alt="">

                        <form id="recoverPass" novalidate="novalidate" @submit.prevent="sendForm">
                            <div class="form-group">

                                <label for="recoverPassInput" class="d-none">Ваш email или телефон </label>
                                <input type="text"
                                       id="recoverPassInput"
                                       class="lr-input form-control"
                                       :class="{ 'is-invalid': errors && errors['email'] }"
                                       v-model="form.email"
                                       @input="errors = null"
                                       ref="recoverPassInput"
                                       placeholder="Введите mail или номер телефона"/>
                                <div v-show="errors && errors['email']" class="invalid-feedback">
                                    <p class="text-danger">{{ errors && errors['email'][0] }}</p>
                                </div>
                            </div>

                            <button id="recoverPassBtn"
                                    type="submit"
                                    class="btn-login btn plz-btn plz-btn-primary mt-4">
                                Восстановить
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'RecoverPassModal',
        props: {
            regModalVisible: Boolean,
        },
        data() {
            return {
                isSuccessRegistration: false,
                form: {
                    email: null,
                },
                errors: null,
            }
        },
        methods: {
            fillUserCredentialsInLoginForm(user) {
                this.$emit('successRegistration', user);
            },
            hideRecoverPassModal() {
                this.$root.$emit('hideRecoverPassModal', {});

                if (this.user) {
                    this.fillUserCredentialsInLoginForm(this.user);
                }
            },
            successRegistration(user) {
                this.isSuccessRegistration = true;
                this.user = user;

                setTimeout(() => {
                    this.hideRecoverPassModal();
                }, 60000);
            },
            async sendForm() {
                let response;

                try {
                    response = await this.$root.$api.recoveryPassword(this.form.email);
                } catch (e) {
                    if (e.status === 422) {
                        this.errors = e.data.errors;
                    }
                }
            },
        }
    }
</script>

<style lang="scss">
    .successRegistration {
        i {
            font-size: 3rem;
            color: #3D51DE;
        }
    }
</style>
