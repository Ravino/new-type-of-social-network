<template>
    <div id="loginForm" class="card bg-light h-100">
        <div class="card-body">
            <form novalidate="novalidate">
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
                    <button id="btnLogin" type="button" class="btn btn-primary btn-block w-75 m-auto rounded-pill">Войти</button>
                    <br />
                    <button id="btnRegistration" type="button" class="btn btn-outline-primary btn-block w-75 m-auto rounded-pill">Регистрация</button>
                </div>

                <div class="form-group text-center">
                    <h6 class=""><b>Импорт аккаунта</b></h6>
                    <div class="mb-2">Импортируйте свой аккаунт из списка следюущих социальных сетей</div>
                    <div class="d-flex justify-content-center --justify-content-around">
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
export default {
name: 'Login',
data () {
    return {
    }
},

methods: {
}

}
</script>


<style lang="scss">
    .btnRegistration {
        margin-top: 10px;
    }
</style>
