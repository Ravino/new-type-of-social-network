<template>
    <div id="loginForm" class="card bg-light h-100">
        <div class="card-body">
            <form novalidate="novalidate">
                <div class="form-group" :class="{ 'has-error': $v.model.email.$error, 'has-success': !$v.model.email.$invalid }">
                    <label for="userEmail" class="d-none">Ваш E-mail</label>
                    <input v-model="model.email"
                           :class="{ 'is-invalid': $v.model.email.$error, 'is-valid': !$v.model.email.$invalid }"
                           @blur="$v.model.email.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="text" class="form-control" id="userEmail" placeholder="Ваш E-mail" />

                    <div v-show="$v.model.email.$error" class="invalid-feedback">
                        <p v-if="!$v.model.email.required" class="text-danger">Укажите свой е-мейл</p>
                        <p v-if="!$v.model.email.email" class="text-danger">Укажите корректный е-мейл</p>
                    </div>
                </div>

                <div class="form-group" :class="{ 'has-error': $v.model.password.$error, 'has-success': !$v.model.password.$invalid }">
                    <label for="password" class="d-none">Пароль</label>
                    <input v-model="model.password"
                           :class="{ 'is-invalid': $v.model.password.$error, 'is-valid': !$v.model.password.$invalid }"
                           @blur="$v.model.password.$touch()" @keydown="loginKeyDownCheck($event)"
                           type="password" class="form-control" id="password" placeholder="Пароль" />

                    <div v-show="$v.model.password.$error" class="invalid-feedback">
                        <p v-if="!$v.model.password.required" class="text-danger">Укажите свой пароль</p>
                        <p v-if="!$v.model.password.minLength" class="text-danger">Пароль не может быть короче <b>четырех</b> символов</p>
                        <p v-if="!$v.model.password.maxLength" class="text-danger">Слишком длинный пароль</p>
                    </div>
                </div>

                <div class="form-group">
                    <button id="btnLogin" type="button"
                            @click="startLogin()" :disabled="$v.$invalid"
                            class="btn-login btn btn-primary btn-block w-75 m-auto rounded-pill">Войти</button>
                    <br />
                    <button id="btnRegistration" type="button" class="btn-registration btn btn-outline-primary btn-block w-75 m-auto rounded-pill" @click="openRegistrationModal()">Регистрация</button>
                </div>

                <div class="form-group text-center">
                    <h6 class=""><b>Импорт аккаунта</b></h6>
                    <div class="mb-2">Импортируйте свой аккаунт из списка следующих социальных сетей</div>
                    <div class="d-flex justify-content-center">
                        <div class="mx-3"><a href="#twitter" title="Twitter" class="border bordered-50">
                            <i class="fab fa-twitter"></i></a>
                        </div>
                        <div class="mx-3"><a href="#vk" title="VKontakte" class="border bordered-50">
                            <i class="fab fa-vk"></i></a>
                        </div>
                        <div class="mx-3"><a href="#fb" title="Facebook" class="border bordered-50">
                            <i class="fab fa-facebook-f"></i></a>
                        </div>
                        <div class="mx-3"><a href="#instagram" title="Instagram" class="border bordered-50">
                            <i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
name: 'LoginForm',
data() {
    return {
        model : {
            email: ``,
            password: ``
        }
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
            },

        }
    };
},


methods: {
    startLogin() {
        this.$v.$touch();

        window.console.info('Форма отправлена');
        let tmp = {
            email: this.model.email.trim(),
            password: this.model.password.trim()
        };
        window.console.dir(tmp);
    },

    loginKeyDownCheck(ev) {
        if (13 === ev.keyCode)
            return this.startLogin();
    },

    openRegistrationModal() {
        window.console.warn('openRegistrationModal');
    },
}

}
</script>


<style>
.btn-primary.btn-registration {
    margin-top: 10px;
}

.btn-primary.disabled, .btn-primary:disabled {
    cursor: not-allowed;
}
</style>
