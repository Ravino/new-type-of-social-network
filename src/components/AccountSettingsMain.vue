<template>
    <div id="accountSettingsMain" class="--card bg-light container-fluid mb-5 border">
        <form class="m-3 pb-2">
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12 d-sm-none d-md-none"><h6><b>Основные</b></h6></div>
                <div class="col-12 d-lg-none d-xl-none"><h6><b>Основная информацтя</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="firstName" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Имя</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <input v-model="user.firstname" type="text" :readonly="true" class="form-control-plaintext" id="firstName" ref="firstName" />
                </div>
                <div class="col-3 d-sm-none d-md-none">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="lastName" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Фамилия</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <input v-model="user.lastname" type="text" readonly class="form-control-plaintext" id="lastName" ref="lastName"  />
                </div>
                <div class="col-3 d-sm-none d-md-none">
                    <button type="button" class="btn btn-link text-body">Сохранить</button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Пол</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <span v-if="this.user.sex==='m'" class="form-control-plaintext d-inline-block w-auto">Мужской</span>
                    <span v-if="this.user.sex==='f'" class="form-control-plaintext d-inline-block w-auto">Женский</span>
                    <span v-if="this.user.sex==='n'" class="form-control-plaintext d-inline-block w-auto">Не указано</span>
                    <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Семейной положение</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <span class="form-control-plaintext d-inline-block w-auto">В активном поиске</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3 d-sm-none d-md-none"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="birthDate" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Дата рождения</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <input type="text" readonly class="form-control-plaintext" id="birthDate" ref="birthDate" :value="user.birthday | toLongDate" />
                </div>
                <div class="col-3 d-sm-none d-md-none">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-sm-none d-md-none">
                <label for="location" class="col-4 col-form-label text-secondary">Месторасположение</label>
                <div class="col-5">
                    <i class="fas fa-map-marker-alt d-inline-block mr-2"></i>
                    <input v-model="user.city" type="text" readonly class="form-control-plaintext d-inline-block w-50" id="location" ref="location" />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

<!--            location для мелких-->
            <div class="form-group row mb-0 border-bottom d-lg-none d-xl-none">
                <label class="col-12 col-form-label text-secondary">Контакты</label>
            </div>

            <div class="form-group row mb-0 border-bottom d-lg-none d-xl-none">
                <label for="country" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Страна</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <input type="text" readonly class="form-control-plaintext d-inline-block w-50" id="country" ref="country" value="Россия" />
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-lg-none d-xl-none">
                <label for="city" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Город</label>
                <div class="col-5 col-sm-6 col-md-6">
                    <input v-model="user.city" type="text" readonly class="form-control-plaintext d-inline-block w-50" id="city" ref="city" />
                </div>
            </div>

        </form>
    </div>
</template>

<script>
export default {
name: 'AccountSettingsMain',
props: {
    user: Object,
    isReady: Boolean
},
data () {
    return {
    }
},


methods: {
},

beforeUpdate() {

}

}
</script>
