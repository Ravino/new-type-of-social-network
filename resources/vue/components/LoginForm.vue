<template>
    <div id="loginForm" class="bg-white-br20 plz-login-form h-100">
        <div class="card-body">
            <form novalidate="novalidate">
                <div class="form-group"
                     :class="{ 'has-error': $v.model.email.$error, 'has-success': !$v.model.email.$invalid, 'has-error': isServerError }">
                    <label for="userEmail" class="d-none">Ваш E-mail</label>
                    <input v-model="model.email" ref="email"
                           :class="{ '--is-invalid': $v.model.email.$error, '--is-valid': !$v.model.email.$invalid }"
                           @blur="$v.model.email.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="text" class="lr-input lr-input-email form-control" id="userEmail"
                           placeholder="Ваш E-mail"/>

                    <div v-show="$v.model.email.$error" class="invalid-feedback">
                        <p v-if="!$v.model.email.required" class="text-danger">Укажите свой е-мейл</p>
                        <p v-if="!$v.model.email.email" class="text-danger">Укажите корректный е-мейл</p>
                    </div>
                </div>

                <div class="form-group"
                     :class="{ 'has-error': $v.model.password.$error, 'has-success': !$v.model.password.$invalid }">
                    <label for="password" class="d-none">Пароль</label>
                    <input v-model="model.password" ref="password"
                           :class="{ '--is-invalid': $v.model.password.$error, '--is-valid': !$v.model.password.$invalid }"
                           @blur="$v.model.password.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="password" class="lr-input lr-input-password form-control" id="password"
                           placeholder="Пароль"/>

                    <div v-show="$v.model.password.$error" class="invalid-feedback">
                        <p v-if="!$v.model.password.required" class="text-danger">Укажите свой пароль</p>
                        <p v-if="!$v.model.password.minLength" class="text-danger">Пароль не может быть короче <b>четырех</b>
                            символов</p>
                        <p v-if="!$v.model.password.maxLength" class="text-danger">Слишком длинный пароль</p>
                    </div>
                </div>

                <div v-if="isServerError" class="form-group has-error">
                    <p class="text-danger text-center">Неверный пароль или имя пользоваля</p>
                </div>

                <div class="form-group">
                    <button id="btnLogin" type="button"
                            @click="startLogin()" :disabled="$v.$invalid"
                            class="btn-login btn plz-btn plz-btn-primary">Войти
                    </button>
                    <button id="btnRegistration" type="button"
                            class="btn-registration btn plz-btn plz-btn-outline" @click="openRegistrationModal()">
                        Регистрация
                    </button>
                </div>

                <div class="plz-import-socnet form-group text-center">
                    <h6 class="">Импорт аккаунта</h6>
                    <div class="plz-import-socnet-text">Импортируйте свой аккаунт из списка следующих социальных сетей
                    </div>
                    <div class="plz-import-socnet-btns d-flex justify-content-center">
                        <div class="mx-3">
                            <a href="#twitter"
                               title="Twitter"
                               class="plz-socnet-btn"
                               @click.prevent="loginWithSocial('twitter')">
                                <i class="fab fa-twitter fa-2x mt-2"></i>
                            </a>
                        </div>
                        <div class="mx-3">
                            <a href="#vk"
                               title="VKontakte"
                               class="plz-socnet-btn"
                               @click.prevent="loginWithSocial('vkontakte')">
                                <i class="fab fa-vk fa-2x mt-2"></i>
                            </a>
                        </div>
                        <div class="mx-3">
                            <a href="#fb"
                               title="Facebook"
                               class="plz-socnet-btn"
                               @click.prevent="loginWithSocial('facebook')">
                                <i class="fab fa-facebook-f fa-2x mt-2"></i>
                            </a>
                        </div>
                        <div class="mx-3">
                            <a href="#instagram"
                               title="Instagram"
                               class="plz-socnet-btn"
                               @click.prevent="loginWithSocial('instagram')">
                                <i class="fab fa-instagram fa-2x mt-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <RegistrationModal v-if="isRegistrationModalShow"
                           v-bind:reg-modal-visible="isRegistrationModalShow"
                           @successRegistration="successRegistration"></RegistrationModal>
    </div>
</template>

<script>
    import RegistrationModal from './RegistrationModal.vue';
    import {HTTPer} from '../httper/httper.js';
    import {email, maxLength, minLength, required} from 'vuelidate/lib/validators';
    import client_ids from '../libs/social_networks_client_ids';

    export default {
        name: 'LoginForm',
        components: {
            RegistrationModal
        },
        data() {
            return {
                model: {
                    email: ``,
                    password: ``
                },
                isRegistrationModalShow: false,
                isServerError: false,
                serverErrorText: ''
            }
        },
        validations() {
            return {
                model: {
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
            setTimeout(() => {
                this.$refs.email.focus();
            }, 100);
            this.$root.$on('hideRegistrationModal', (evData) => {
                this.isRegistrationModalShow = false;
            });

            let params = new URLSearchParams(document.location.search.substring(1));
            let state = params.get('state');

            switch (state) {
                case 'instagram':
                    this.getInstagramToken(params);
                    break;
                case 'vk':
                    this.getVKToken(params);
                    break;
            }
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
                        if (response.status === 200 && response.statusText.toUpperCase() === 'OK' && response.data && response.data.token && response.data.token !== '') {
                            this.$root.$emit('afterSuccessLogin', {
                                token: response.data.token,
                                chatChannel: response.data.channel,
                                redirect: true
                            });
                        }
                    })
                    .catch((error) => {
                        if (400 === error.response.status) {
                            this.isServerError = true;
                            this.serverErrorText = error.response.data.error;
                            window.console.warn(error.response.status + ': ' + error.response.statusText + ': ' + error.response.data.message);
                            this.$refs.password.focus();
                        } else {
                            window.console.warn(error.toString());
                        }
                    });
            },
            loginKeyDownCheck(ev) {
                if (13 === ev.keyCode)
                    return this.startLogin();
            },
            openRegistrationModal() {
                this.isRegistrationModalShow = true;
            },
            loginWithSocial(provider) {
                switch (provider) {
                    case 'facebook':
                        this.socialFacebook(provider);
                        break;
                    case 'instagram':
                        this.socialInstagram(provider);
                        break;
                    case 'vkontakte':
                        this.socialVK(provider);
                        break
                }
            },
            socialFacebook(provider) {
                let self = this;

                FB.getLoginStatus(function (response) {
                    if (!response.authResponse) {
                        FB.login(function (response) {
                            if (response.authResponse) {
                                self.saveToken(provider, response.authResponse.accessToken);
                            }
                        });
                    } else {
                        self.saveToken(provider, response.authResponse.accessToken);
                    }
                });
            },
            socialInstagram(provider) {
                let url = {
                    domain: "https://api.instagram.com/oauth/authorize",
                    client_id: `client_id=${client_ids.instagram}`,
                    scope: "scope=user_profile",
                    response_type: "response_type=code",
                    state: 'state=instagram',
                };

                window.location.href = `${url.domain}?${url.client_id}&redirect_uri=${client_ids.redirect_uri}&${url.scope}&${url.response_type}&${url.state}`;
            },
            socialVK(provider) {
                let url = {
                    domain: "https://oauth.vk.com/authorize",
                    client_id: `client_id=${client_ids.vk}`,
                    display: "display=page",
                    response_type: "response_type=token",
                    state: "state=vk",
                };

                window.location.href = `${url.domain}?${url.client_id}&redirect_uri=${client_ids.redirect_uri}&${url.display}&${url.response_type}&${url.state}`;
            },
            saveToken(provider, token) {
                HTTPer.post(`/api/sociallogin/${provider}`, {
                    token: token,
                }).then(response => {
                    console.log(response);
                });
            },
            getInstagramToken(params) {
                let code = params.get("code");

                if (code) {
                    this.saveToken('instagram', code);
                }
            },
            getVKToken(params) {
                let access_token = params.get("access_token");

                if (access_token) {
                    this.saveToken('vkontakte', access_token);
                }
            },
            successRegistration(user) {
                let password_input = document.querySelector('#password');

                this.model.email = user.email;
                password_input.focus();
            },
        },
    }
</script>
