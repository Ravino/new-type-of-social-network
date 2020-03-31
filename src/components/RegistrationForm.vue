<template>
    <div id="loginForm" class="card bg-light h-100">
        <div class="card-body">
            <div class="card-title text-center">
                <h5>Быстрая регистрация</h5>
            </div>

            <form id="registrationForm" novalidate="novalidate">
                <div class="form-group" :class="{ 'has-error': $v.model.name.$error, 'has-success': !$v.model.name.$invalid }">
                    <label for="userName" class="d-none">Ваше имя</label>
                    <input v-model="model.name"
                           :class="{ 'is-invalid': $v.model.name.$error, 'is-valid': !$v.model.name.$invalid }"
                           @blur="$v.model.name.$touch()" @keydown="registrationKeyDownCheck($event)"
                           type="text" class="form-control" id="userName" placeholder="Ваше имя" />

                    <div v-show="$v.model.name.$error" class="invalid-feedback">
                        <p v-if="!$v.model.name.required" class="text-danger">Укажите как Вас зовут</p>
                        <p v-if="!$v.model.name.minLength" class="text-danger">Врядли у Вас такое короткое имя?</p>
                        <p v-if="!$v.model.name.maxLength" class="text-danger">Слишком длинное имя</p>
                        <p v-if="!$v.model.name.isCorrectFullName" class="text-danger">Только буквы в имени фамилии</p>
                        <p v-if="!$v.model.name.isFirstNameAndLastName" class="text-danger">Укажите и имя и фамилию!</p>
                    </div>
                </div>

                <div class="form-group" :class="{ 'has-error': $v.model.email.$error, 'has-success': !$v.model.email.$invalid }">
                    <label for="userEmail" class="d-none">Ваш E-mail</label>
                    <input v-model="model.email"
                           :class="{ 'is-invalid': $v.model.email.$error, 'is-valid': !$v.model.email.$invalid }"
                           @blur="$v.model.email.$touch()" @keydown="registrationKeyDownCheck($event)"
                           type="text" class="form-control" id="userEmail" placeholder="Ваш E-mail" />

                    <div v-show="$v.model.email.$error" class="invalid-feedback">
                        <p v-if="!$v.model.email.required" class="text-danger">Укажите свой е-мейл</p>
                        <p v-if="!$v.model.email.email" class="text-danger">Укажите корректный е-мейл</p>
                    </div>
                </div>

                <div class="form-group" :class="{ 'has-error': $v.model.birthDate.$error, 'has-success': !$v.model.birthDate.$invalid }">
                    <label for="userBirth" class="d-none">Дата рождения</label>
                    <input v-model="model.birthDate"
                        type="text" class="form-control" id="userBirth" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
                           :class="{ 'is-invalid': $v.model.birthDate.$error, 'is-valid': !$v.model.birthDate.$invalid }"
                           @blur="$v.model.birthDate.$touch()" @keydown="birthDateKeyDown($event)"
                           placeholder="Дата рождения" />

                    <div v-show="$v.model.birthDate.$error" class="invalid-feedback">
                        <p v-if="!$v.model.birthDate.required" class="text-danger">Укажите дату своего рождения</p>
                        <p v-if="!$v.model.birthDate.isValidDMY" class="text-danger">Укажите дату в формате ДД.MM.ГГГГ</p>
                    </div>
                </div>

                <div class="form-group">
                    <button id="btnRegistration" type="button" :disabled="$v.$invalid" @click="startRegistration()" class="btn btn-primary btn-block w-75 m-auto rounded-pill">Регистрация</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { isCorrectFullName, isFirstNameAndLastName, isValidDMY } from '../validators/validators.js';
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
name: 'RegistrationForm',
data () {
    return {
        model : {
            name: ``,
            email: ``,
            birthDate: ``
        }
    }
},

validations() {
    return {
        model : {
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(250),
                isCorrectFullName,
                isFirstNameAndLastName
            },
            email: {
                required,
                email
            },
            birthDate: {
                required,
                isValidDMY
            },
        }
    };
},

methods: {
    startRegistration() {
        this.$v.$touch();

        window.console.info('Форма отправлена');
        let tmp = {
            name: this.model.name.trim(),
            email: this.model.email.trim(),
            birthDate: this.model.birthDate.trim()
        };
        window.console.dir(tmp);
    },

    registrationKeyDownCheck(ev) {
        if (13 === ev.keyCode)
            return this.startRegistration();
    },

    birthDateKeyDown(ev) {
        let value = this.model.birthDate;
        value = value.replace(/[,-\/\\]/g, '.');
        this.model.birthDate = value;

        this.registrationKeyDownCheck(ev);
    }
}

}
</script>


<style>
#registrationForm {
    margin-top: 80px;
}
</style>
