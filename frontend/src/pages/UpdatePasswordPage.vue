<template>
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-center">
                <div class="card w-75">
                    <div class="card-header">Обновление пароля</div>

                    <div class="card-body">
                        <form method="POST" @submit.prevent="send">
                            <input type="hidden" name="token" v-model="form.token">

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Ваш E-mail</label>

                                <div class="col-md-6">
                                    <input id="email"
                                           type="email"
                                           class="form-control"
                                           name="email"
                                           v-model="form.email"
                                           :class="{'is-invalid': errors && errors['email']}"
                                           @input="errors && errors['email'] ? errors['email'] = null : null"
                                           autocomplete="email"
                                           required
                                           autofocus>
                                    <div v-if="errors && errors['email']" class="invalid-feedback">
                                        <p class="text-danger">{{ errors['email'][0] }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Ваш пароль</label>

                                <div class="col-md-6">
                                    <input id="password"
                                           type="password"
                                           class="form-control"
                                           name="password"
                                           v-model="form.password"
                                           :class="{'is-invalid': errors && errors['password']}"
                                           @input="errors && errors['password'] ? errors['password'] = null : null"
                                           autocomplete="new-password"
                                           required>
                                    <div v-if="errors && errors['password']" class="invalid-feedback">
                                        <p class="text-danger">{{ errors['password'][0] }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">
                                    Подтвердите пароль
                                </label>

                                <div class="col-md-6">
                                    <input id="password-confirm"
                                           type="password"
                                           class="form-control"
                                           name="password_confirmation"
                                           v-model="form.password_confirmation"
                                           autocomplete="new-password"
                                           required>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Обновить пароль
                                    </button>
                                </div>
                            </div>

                            <div v-if="successMessage" class="text-center mt-3">
                                <p class="text-success">{{ successMessage }}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpdatePasswordPage",
        data() {
            return {
                form: {
                    token: this.getParam('token'),
                    email: this.getParam('email'),
                    password: null,
                    password_confirmation: null,
                },
                errors: null,
                successMessage: null,
            }
        },
        methods: {
            getParam(param) {
                let params = new URLSearchParams(location.search);

                return params.get(param);
            },
            async send() {
                let response;
                this.errors = null;

                try {
                    response = await this.$root.$api.resetPassword(this.form);
                } catch (e) {
                    if (e.status === 422) {
                        this.errors = e.data.errors;
                    }
                }

                if (response) {
                    this.successMessage = response.message;

                    setTimeout(() => {
                        this.$router.push({name: 'LoginPage'});
                    }, 3000);
                }
            },
        },
    }
</script>

<style scoped>

</style>
