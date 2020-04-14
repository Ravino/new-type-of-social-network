<template>
    <div class="modal show recover-pass-modal" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true"
         style="display: block; background-color: rgba(0, 0, 0, .7);" @click.stop="hideRecoverPassModal">
        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div class="modal-body">
                    <div id="" class="plz-recover-pass-form-wrapper ">
                        <div class="text-center"><h5>Восстановление пароля</h5></div>
                        <img class="mb-4 mt-2 mx-auto" src="../images/icons/icon-recoverPass.png" alt="">

                        <form id="recoverPass" novalidate="novalidate">
                            <div class="form-group">

                                <label for="recoverPassInput" class="d-none">Ваш email или телефон </label>
                                <input type="text" class="lr-input form-control" id="recoverPassInput" ref="recoverPassInput"
                                       placeholder="Введите mail или номер телефона" />

                            </div>

                            <button id="recoverPassBtn" type="button" class="btn-login btn plz-btn plz-btn-primary mt-4">Восстановить </button>

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
        components: {
        },
        data() {
            return {
                isSuccessRegistration: false,
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
