<template>
    <div id="" class="plz-registration-form-wrapper">
        <div class="text-center">
            <h5>Быстрая регистрация</h5>
        </div>
        <div class="symbol-registration"></div>

        <form id="registrationForm" novalidate="novalidate">
            <div class="form-group"
                 :class="{ 'has-error': $v.model.firstName.$error, 'has-success': !$v.model.firstName.$invalid }">
                <i class="icon icon-user"></i>
                <label for="firstName" class="d-none">Ваше имя</label>
                <input v-model="model.firstName"
                       :class="{ 'is-invalid': $v.model.firstName.$error, 'is-valid': !$v.model.firstName.$invalid }"
                       @blur="$v.model.firstName.$touch()" @keydown="registrationKeyDownCheck($event)"
                       type="text" class="lr-input form-control" id="firstName" ref="firstName" placeholder="Ваше имя"/>

                <div v-show="$v.model.firstName.$error" class="invalid-feedback">
                    <p v-if="!$v.model.firstName.required" class="text-danger">Укажите как Вас зовут</p>
                    <p v-if="!$v.model.firstName.minLength" class="text-danger">Врядли у Вас такое короткое имя?</p>
                    <p v-if="!$v.model.firstName.maxLength" class="text-danger">Слишком длинное имя</p>
                    <p v-if="!$v.model.firstName.isCorrectHumanName" class="text-danger">Только буквы в имени</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': $v.model.lastName.$error, 'has-success': !$v.model.lastName.$invalid }">
                <i class="icon icon-user"></i>
                <label for="lastName" class="d-none">Ваша фамилия</label>
                <input v-model="model.lastName"
                       :class="{ 'is-invalid': $v.model.lastName.$error, 'is-valid': !$v.model.lastName.$invalid }"
                       @blur="$v.model.lastName.$touch()" @keydown="registrationKeyDownCheck($event)"
                       type="text" class="lr-input form-control" id="lastName" ref="lastName"
                       placeholder="Ваша фамилия"/>

                <div v-show="$v.model.lastName.$error" class="invalid-feedback">
                    <p v-if="!$v.model.lastName.required" class="text-danger">Укажите свою фамилию</p>
                    <p v-if="!$v.model.lastName.minLength" class="text-danger">Врядли у Вас такая короткая фамилия</p>
                    <p v-if="!$v.model.lastName.maxLength" class="text-danger">Слишком длинная фамилия</p>
                    <p v-if="!$v.model.lastName.isCorrectHumanName" class="text-danger">Только буквы в фамилии</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': $v.model.email.$error, 'has-success': !$v.model.email.$invalid }">
                <i class="icon icon-letter"></i>
                <label for="userEmail" class="d-none">Ваш E-mail</label>
                <input v-model="model.email"
                       :class="{ 'is-invalid': $v.model.email.$error, 'is-valid': !$v.model.email.$invalid }"
                       @blur="$v.model.email.$touch()" @keydown="registrationKeyDownCheck($event)"
                       type="text" class="lr-input form-control" id="userEmail" placeholder="Ваш E-mail"/>

                <div v-show="$v.model.email.$error" class="invalid-feedback">
                    <p v-if="!$v.model.email.required" class="text-danger">Укажите свой е-мейл</p>
                    <p v-if="!$v.model.email.email" class="text-danger">Укажите корректный е-мейл</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': $v.model.birthDate.$error, 'has-success': !$v.model.birthDate.$invalid }">
                <i class="icon icon-calendar"></i>
                <label for="userBirth" class="d-none">Дата рождения</label>
                <input v-model="model.birthDate"
                       type="date"
                       id="userBirth"
                       class="lr-input form-control"
                       :class="{ 'is-invalid': $v.model.birthDate.$error, '&#45;&#45;is-valid': !$v.model.birthDate.$invalid }"
                       pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
                       @blur="$v.model.birthDate.$touch()"
                       @keydown="birthDateKeyDown($event)"
                       placeholder="Дата рождения">

                <div v-show="$v.model.birthDate.$error" class="invalid-feedback">
                    <p v-if="!$v.model.birthDate.isValidDMY" class="text-danger">Укажите дату в формате ДД.MM.ГГГГ</p>
                </div>
            </div>
            <div class="form-group">
                <button id="btnRegistration"
                        type="button"
                        :disabled="$v.$invalid"
                        @click="startRegistration()"
                        class="btn plz-btn plz-btn-primary"
                        :class="[isSuccessRegistration ? 'plz-btn-success' : 'plz-btn-primary']">
                    {{ isSuccessRegistration ? 'Успешно' : 'Регистрация' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import moment from 'moment';
    import {HTTPer} from '../httper/httper.js';

    import {required, minLength, maxLength, email} from 'vuelidate/lib/validators';
    import {isCorrectHumanName, isValidRegistrationBirthDay} from '../validators/validators.js';

    export default {
        name: 'RegistrationForm',
        data() {
            return {
                model: {
                    firstName: ``,
                    lastName: ``,
                    email: ``,
                    birthDate: ``,
                },

                isServerError: false,
                serverErrorText: '',
                isSuccessRegistration: false,
            }
        },

        validations() {
            return {
                model: {
                    firstName: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(100),
                        isCorrectHumanName
                    },
                    lastName: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(100),
                        isCorrectHumanName
                    },
                    email: {
                        required,
                        email
                    },
                    birthDate: {
                        isValidRegistrationBirthDay
                    },
                }
            };
        },

        mounted() {
            setTimeout(() => {
                this.$refs.firstName.focus();
            }, 100);
        },

        methods: {
            startRegistration() {
                this.$v.$touch();

                // let bDay = this.model.birthDate.trim();
                // bDay = (`` === bDay) ? null : moment(bDay, 'DD.MM.YYYY').format('YYYY-MM-DD');

                let regData = {
                    email: this.model.email.trim(),
                    firstname: this.model.firstName.trim(),
                    lastname: this.model.lastName.trim(),
                    birthday: this.model.birthDate.trim()
                };
                window.console.info('Форма отправлена');
                window.console.dirxml(regData);

                this.isServerError = false;

                HTTPer.post('api/register', regData)
                    .then((response) => {
                        // TODO: @tga довести до ума обработку положительного ответа
                        // this.$root.$emit('hideRegistrationModal', {});

                        window.console.log(response);
                        if (response.status === 201) {
                            // this.$root.$emit('afterSuccessRegistration', response.data);
                            this.isSuccessRegistration = true;

                            setTimeout(() => {
                                this.$root.$emit('hideRegistrationModal', response.data);
                            }, 2000);
                        }
                    })
                    .catch((error) => {
                        if (400 === error.response.status) {
                            // TODO: @tga довести до ума обработку ошибок
                            // this.$root.$emit('hideRegistrationModal', {});

                            window.console.clear();
                            window.console.log(error.response.data);

                            this.isServerError = true;
                            this.serverErrorText = error.response.data.error;
                            window.console.warn(error.response.status + ': ' + error.response.statusText + ': ' + error.response.data.message);
                            this.$refs.email.focus();
                        } else {
                            window.console.warn(error.toString());
                        }
                    });
            },

            registrationKeyDownCheck(ev) {
                if (13 === ev.keyCode)
                    return this.startRegistration();
            },

            birthDateKeyDown(ev) {
                // let value = this.model.birthDate;
                // value = value.replace(/[,-\/\\]/g, '.');
                // this.model.birthDate = value;

                this.registrationKeyDownCheck(ev);
            }
        }

    }
</script>
