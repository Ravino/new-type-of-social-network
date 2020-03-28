<template>
    <div id="loginForm" class="card bg-light h-100">
        <div class="card-body">
            <div class="card-title text-center">
                <h5>Быстрая регистрация</h5>
            </div>

            <form id="registrationForm" novalidate="novalidate">
                <div class="form-group">
                    <label for="userName" class="d-none">Ваше имя</label>
                    <input type="text" class="form-control" id="userName" placeholder="Ваше имя" />
                    <small id="userNameError" class="form-text text-danger">Какие-то ошибки валидации</small>
                </div>

                <div class="form-group">
                    <label for="userEmail" class="d-none">Ваш E-mail</label>
                    <input type="email" class="form-control" id="userEmail" placeholder="Ваш E-mail" />
                    <small id="userEmailError" class="form-text text-danger">Какие-то ошибки валидации</small>
                </div>

                <div class="form-group">
                    <label for="userBirth" class="d-none">Дата рождения</label>
                    <input type="email" class="form-control" id="userBirth" placeholder="Дата рождения" />
                    <small id="userBirthError" class="form-text text-danger">Какие-то ошибки валидации</small>
                </div>

                <div class="form-group">
                    <button id="btnRegistration" type="button" class="btn btn-primary btn-block w-75 m-auto rounded-pill">Регистрация</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
name: 'RegistrationForm',
data () {
    return {
    }
},

methods: {
}

}
</script>


<style>
#registrationForm {
    margin-top: 80px;
}
</style>
