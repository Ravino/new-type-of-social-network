<template>
    <div id="loginForm" class="bg-white-br20 plz-login-form h-100">
        <div class="card-body">
            <form novalidate="novalidate">
                <div class="form-group" :class="{ 'has-error': $v.model.email.$error, 'has-success': !$v.model.email.$invalid, 'has-error': isServerError }">
                    <label for="userEmail" class="d-none">Ваш E-mail</label>
                    <input v-model="model.email" ref="email"
                           :class="{ '--is-invalid': $v.model.email.$error, '--is-valid': !$v.model.email.$invalid }"
                           @blur="$v.model.email.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="text" class="lr-input lr-input-email form-control" id="userEmail" placeholder="Ваш E-mail" />

                    <div v-show="$v.model.email.$error" class="invalid-feedback">
                        <p v-if="!$v.model.email.required" class="text-danger">Укажите свой е-мейл</p>
                        <p v-if="!$v.model.email.email" class="text-danger">Укажите корректный е-мейл</p>
                    </div>
                </div>

                <div class="form-group" :class="{ 'has-error': $v.model.password.$error, 'has-success': !$v.model.password.$invalid }">
                    <label for="password" class="d-none">Пароль</label>
                    <input v-model="model.password" ref="password"
                           :class="{ '--is-invalid': $v.model.password.$error, '--is-valid': !$v.model.password.$invalid }"
                           @blur="$v.model.password.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="password" class="lr-input lr-input-password form-control" id="password" placeholder="Пароль" />

                    <div v-show="$v.model.password.$error" class="invalid-feedback">
                        <p v-if="!$v.model.password.required" class="text-danger">Укажите свой пароль</p>
                        <p v-if="!$v.model.password.minLength" class="text-danger">Пароль не может быть короче <b>четырех</b> символов</p>
                        <p v-if="!$v.model.password.maxLength" class="text-danger">Слишком длинный пароль</p>
                    </div>
                </div>

                <div v-if="isServerError" class="form-group has-error">
                    <p class="text-danger text-center">Неверный пароль или имя пользоваля</p>
                </div>

                <div class="form-group">
                    <button id="btnLogin" type="button"
                            @click="startLogin()" :disabled="$v.$invalid"
                            class="btn-login btn plz-btn plz-btn-primary">Войти</button>
                    <button id="btnRegistration" type="button"
                            class="btn-registration btn plz-btn plz-btn-outline" @click="openRegistrationModal()">Регистрация</button>
                </div>

                <div class="plz-import-socnet form-group text-center">
                    <h6 class="">Импорт аккаунта</h6>
                    <div class="plz-import-socnet-text">Импортируйте свой аккаунт из списка следующих социальных сетей</div>
                    <div class="plz-import-socnet-btns d-flex justify-content-center">
                        <div class="mx-3"><a href="#twitter" title="Twitter" class="plz-socnet-btn">
                            <i class="fab fa-twitter fa-2x mt-2"></i></a>
                        </div>
                        <div class="mx-3"><a href="#vk" title="VKontakte" class="plz-socnet-btn">
                            <i class="fab fa-vk fa-2x mt-2"></i></a>
                        </div>
                        <div class="mx-3"><a href="#fb" title="Facebook" class="plz-socnet-btn">
                            <i class="fab fa-facebook-f fa-2x mt-2"></i></a>
                        </div>
                        <div class="mx-3"><a href="#instagram" title="Instagram" class="plz-socnet-btn">
                            <i class="fab fa-instagram fa-2x mt-2"></i></a>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <RegistrationModal v-if="isRegistrationModalShow" v-bind:reg-modal-visible="isRegistrationModalShow"></RegistrationModal>
    </div>
</template>

<script>
    import RegistrationModal from './RegistrationModal.vue';
    import {HTTPer} from '../httper/httper.js';
    import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';
    export default {
        name: 'LoginForm',
        components: {
            RegistrationModal
        },
        data() {
            return {
                model : {
                    email: ``,
                    password: ``
                },
                isRegistrationModalShow: true,
                isServerError: false,
                serverErrorText: ''
            }
        },
        validations() {
            return {
                model : {
                    email: {
                        required,
                        email
                    },
                    password: {
                        required,
                        minLength: minLength(4),
                        maxLength: maxLength(50)
                    }
                }
            };
        },
        mounted() {
            setTimeout(()=>{
                this.$refs.email.focus();
            }, 100);
            this.$root.$on('hideRegistrationModal', (evData) => {
                this.isRegistrationModalShow = false;
            });
        },
        methods: {
            startLogin() {
                this.$v.$touch();
                let loginData = {
                    email: this.model.email.trim(),
                    password: this.model.password.trim()
                };
                this.isServerError = false;
                HTTPer.post('api/login', loginData)
                    .then((response) => {
                        if (response.status === 200  &&  response.statusText.toUpperCase()==='OK'  &&  response.data  &&  response.data.token  &&  response.data.token!=='') {
                            this.$root.$emit('afterSuccessLogin', { 'token': response.data.token, 'chatChannel':response.data.channel });
                        }
                    })
                    .catch((error) => {
                        if (400 === error.response.status) {
                            this.isServerError = true;
                            this.serverErrorText = error.response.data.error;
                            window.console.warn(error.response.status+': '+error.response.statusText+': ' +error.response.data.message);
                            this.$refs.password.focus();
                        }
                        else {
                            window.console.warn( error.toString() );
                        }
                    });
            },
            loginKeyDownCheck(ev) {
                if (13 === ev.keyCode)
                    return this.startLogin();
            },
            openRegistrationModal() {
                // this.$router.push({ path: '/registration' });
                this.isRegistrationModalShow = true;
            },
        },
    }
</script>


<style>
.plz-login-form {
    width: 420px;
    max-width: 420px;
    min-width: 420px;
    margin-right: 24px;
}

.lr-input-email, .lr-input-password {
    background-image: url("/images/icons/input-email.png");
    background-position: 8px center;
    background-repeat: no-repeat;
    padding-left: 40px;
}

.lr-input-password {
    background-image: url("/images/icons/input-name.png");
}

.btn.plz-btn.btn-login {
    margin-top: 27px;
}

.btn.plz-btn.btn-registration {
    margin-top: 20px;
}

.btn-primary.disabled, .btn-primary:disabled {
    cursor: not-allowed;
}

.plz-import-socnet {
    margin-top: 35px;
}

.plz-import-socnet > h6 {
    font-weight: bold;
    text-transform: uppercase;
}

.plz-import-socnet .plz-import-socnet-text {
    color: #9A9A9A;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 25px;
    margin-bottom: 40px;
}

.plz-import-socnet .plz-import-socnet-btns {

}

.plz-import-socnet .plz-import-socnet-btns .plz-socnet-btn {
    display: block;
    width: 48px;
    min-width: 48px;
    max-width: 48px;
    height: 48px;
    min-height: 48px;
    max-height: 48px;
    text-align: center;
    border: 1px solid #989898;
    border-radius: 48px;
}

.plz-import-socnet .plz-import-socnet-btns .plz-socnet-btn > i.fab {
    color: #989898;
}

</style>
