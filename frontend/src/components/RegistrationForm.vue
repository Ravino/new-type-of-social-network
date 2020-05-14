<template>
    <div id="" class="plz-registration-form-wrapper">
        <div class="text-center"><h5>Быстрая регистрация</h5></div>
        <div class="symbol-registration"></div>

        <form id="registrationForm" novalidate="novalidate">
            <div class="form-group"
                 :class="{ 'has-error': !!firstNameError, 'has-success': isSuccessFirstName }">
                <i class="icon icon-user"></i>
                <label for="firstName" class="d-none">Ваше имя</label>
                <input id="firstName"
                       class="lr-input form-control"
                       type="text"
                       ref="firstName"
                       placeholder="Ваше имя"
                       v-model="model.firstName"
                       :class="{ 'is-invalid': !!firstNameError, 'is-valid': isSuccessFirstName }"
                       @input="onInput('firstName')"
                       @blur="$v.model.firstName.$touch()"
                       @keydown="registrationKeyDownCheck($event)">

                <div class="invalid-feedback">
                    <p class="text-danger">{{ firstNameError }}</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': !!lastNameError, 'has-success': isSuccessLastName }">
                <i class="icon icon-user"></i>
                <label for="lastName" class="d-none">Ваша фамилия</label>
                <input id="lastName"
                       class="lr-input form-control"
                       type="text"
                       ref="lastName"
                       placeholder="Ваша фамилия"
                       v-model="model.lastName"
                       :class="{ 'is-invalid': !!lastNameError, 'is-valid': isSuccessLastName }"
                       @input="onInput('lastName')"
                       @blur="$v.model.lastName.$touch()"
                       @keydown="registrationKeyDownCheck($event)">

                <div class="invalid-feedback">
                    <p class="text-danger">{{ lastNameError }}</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': !!emailError, 'has-success': isSuccessEmail }">
                <i class="icon icon-letter"></i>
                <label for="userEmail" class="d-none">Ваш E-mail</label>
                <input id="userEmail"
                       class="lr-input form-control"
                       type="text"
                       ref="userEmail"
                       placeholder="Ваш E-mail"
                       v-model="model.email"
                       :class="{ 'is-invalid': !!emailError, 'is-valid': isSuccessEmail }"
                       @input="onInput('email')"
                       @blur="$v.model.email.$touch()"
                       @keydown="registrationKeyDownCheck($event)">

                <div class="invalid-feedback">
                    <p class="text-danger">{{ emailError }}</p>
                </div>
            </div>

            <div class="form-group"
                 :class="{ 'has-error': !!birthdayError, 'has-success': isSuccessBirthday }">
                <i class="icon icon-calendar"></i>
                <label for="userBirth" class="d-none">Дата рождения</label>
                <input id="userBirth"
                       class="lr-input form-control"
                       type="date"
                       ref="userBirth"
                       placeholder="Дата рождения"
                       pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
                       v-model="model.birthday"
                       :class="{ 'is-invalid': !!birthdayError, 'is-valid': isSuccessBirthday }"
                       @input="onInput('birthday')"
                       @blur="$v.model.birthday.$touch()"
                       @keydown="registrationKeyDownCheck($event)">

                <div class="invalid-feedback">
                    <p class="text-danger">{{ birthdayError }}</p>
                </div>
            </div>

            <div class="form-group">
                <button id="btnRegistration"
                        type="button"
                        :disabled="$v.$invalid"
                        @click="startRegistration()"
                        class="btn plz-btn plz-btn-primary">
                    Регистрация
                </button>
                <p v-if="isServerError && serverErrorText" class="text-danger text-center mt-3">
                    {{ serverErrorText }}
                </p>
            </div>
        </form>
    </div>
</template>

<script>
    import {required, minLength, maxLength, email} from 'vuelidate/lib/validators';
    import {isCorrectHumanName, isValidRegistrationBirthDay, notHaveSpace} from '../validators/validators.js';

    export default {
        name: 'RegistrationForm',
        computed: {
            isSuccessFirstName() {
                return (!this.$v.model.firstName.$invalid || !(!!this.serverRegMessages.firstName)) && !
                  !this.model.firstName;
            },
            firstNameError() {
                if (this.$v.model.firstName.$error) {
                    if (!this.$v.model.firstName.required) {
                        return 'Укажите как Вас зовут.';
                    } else if (!this.$v.model.firstName.minLength) {
                        return 'Врядли у Вас такое короткое имя?';
                    } else if (!this.$v.model.firstName.maxLength) {
                        return 'Слишком длинное имя.';
                    } else if (!this.$v.model.firstName.isCorrectHumanName) {
                        return 'Только буквы в имени.';
                    } else if (!this.$v.model.firstName.notHaveSpace) {
                        return 'Не должно быть пробелов.';
                    }
                } else if (this.serverRegMessages.firstName) {
                    return this.serverRegMessages.firstName;
                }

                return null;
            },
            isSuccessLastName() {
                return (!this.$v.model.lastName.$invalid || !(!!this.serverRegMessages.lastName)) &&
                  !!this.model.lastName;
            },
            lastNameError() {
                if (this.$v.model.lastName.$error) {
                    if (!this.$v.model.lastName.required) {
                        return 'Укажите свою фамилию.';
                    } else if (!this.$v.model.lastName.minLength) {
                        return 'Врядли у Вас такая короткая фамилия.';
                    } else if (!this.$v.model.lastName.maxLength) {
                        return 'Слишком длинная фамилия.';
                    } else if (!this.$v.model.lastName.isCorrectHumanName) {
                        return 'Только буквы в фамилии.';
                    } else if (!this.$v.model.lastName.notHaveSpace) {
                        return 'Не должно быть пробелов.';
                    }
                } else if (this.serverRegMessages.lastName) {
                    return this.serverRegMessages.lastName;
                }

                return null;
            },
            isSuccessEmail() {
                return (!this.$v.model.email.$invalid || !(!!this.serverRegMessages.email)) &&
                  !!this.model.email;
            },
            emailError() {
                if (this.$v.model.email.$error) {
                    if (!this.$v.model.email.required) {
                        return 'Укажите свой е-мейл.';
                    } else if (!this.$v.model.email.email) {
                        return 'Укажите корректный е-мейл.';
                    } else if (!this.$v.model.email.isDuplicateEmail) {
                        return this.serverRegMessages.email;
                    }
                } else if (this.serverRegMessages.email) {
                    return this.serverRegMessages.email;
                }

                return null;
            },
            isSuccessBirthday() {
                return (!this.$v.model.birthday.$invalid || !(!!this.serverRegMessages.birthday)) &&
                  !!this.model.birthday;
            },
            birthdayError() {
                if (this.$v.model.birthday.$error) {
                    if (!this.$v.model.birthday.isValidBirthday) {
                        return 'Укажите коррекнтую дату.';
                    }
                } else if (this.serverRegMessages.birthday) {
                    return this.serverRegMessages.birthday;
                }

                return null;
            },
        },
        data() {
            return {
                model: {
                    firstName: ``,
                    lastName: ``,
                    email: ``,
                    birthday: ``,
                },

                isServerError: false,
                serverErrorText: null,

                duplicateEmail: ``,

                serverRegMessages: {
                    firstName: ``,
                    lastName: ``,
                    email: ``,
                    birthday: ``,
                    other: ``,
                }
            }
        },

        validations() {
            return {
                model: {
                    firstName: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(50),
                        isCorrectHumanName,
                        notHaveSpace,
                    },
                    lastName: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(50),
                        isCorrectHumanName,
                        notHaveSpace,
                    },
                    email: {
                        required,
                        email,
                        isDuplicateEmail: (value) => {
                            if ((value + '') === '')
                                return true;

                            return value !== this.duplicateEmail;
                        },
                    },
                    birthday: {
                        isValidBirthday: (value) => {
                            if (!!value) {
                                return isValidRegistrationBirthDay(value);
                            }

                            return true;
                        },
                    },
                }
            };
        },

        methods: {
            async startRegistration() {
                this.$v.$touch();
                this.isServerError = false;
                this.serverErrorText = null;

                for (let [key, value] of Object.entries(this.serverRegMessages)) {
                    this.serverRegMessages[key] = ``;
                }

                let regData = {
                    email: this.model.email.trim(),
                    firstName: this.model.firstName.trim(),
                    lastName: this.model.lastName.trim(),
                    birthday: this.model.birthday.trim()
                };

                let regResponse = null;
                try {
                    regResponse = await this.$root.$api.register(regData);
                } catch (e) {
                    if (e.status === 422) {
                        this.processServerErrors(e, regData);
                    } else if (e.status >= 500) {
                        this.isServerError = true;
                        this.serverErrorText = 'Извините у нас возникла ошибка, попробуйте позже ещё раз.';
                    } else {
                        window.console.warn(e.message);
                    }
                }

                if (regResponse && regResponse.status === 201) {
                    this.$emit('successRegistration', this.model);
                }
            },

            processServerErrors(error, oldRegData) {
                // TODO: @tga довести до ума обработку ошибок
                this.isServerError = true;

                if (error.data && error.data.errors) {
                    if (error.data.errors.firstName) {
                        this.serverRegMessages.firstName = error.data.errors.firstName.join('<br />');
                    }

                    if (error.data.errors.lastName) {
                        this.serverRegMessages.lastName = error.data.errors.lastName.join('<br />');
                    }

                    if (error.data.errors.email) {
                        this.duplicateEmail = oldRegData.email.trim();
                        this.serverRegMessages.email = error.data.errors.email.join('<br />');
                        this.$refs.userEmail.focus();
                    }

                    if (error.data.errors.birthday) {
                        this.serverRegMessages.birthday = error.data.errors.birthday.join('<br />');
                    }
                }
            },

            registrationKeyDownCheck(ev) {
                if (13 === ev.keyCode)
                    return this.startRegistration();
            },

            onInput(fieldName) {
                this.serverRegMessages[fieldName] = null;
                this.$v.model[fieldName].$touch();
            },
        },

        mounted() {
            setTimeout(() => {
                this.$refs.firstName.focus();
            }, 100);
        },
    }
</script>
