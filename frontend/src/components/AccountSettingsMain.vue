<template>
    <div id="accountSettingsMain" class="plz-account-settings-main bg-white-br20 plz-mb20 container-fluid">
        <form class="m-3 pb-2">
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12 d-sm-none d-md-none d-lg-flex d-xl-flex"><h6><b>Основные</b></h6></div>
                <div class="col-12 d-sm-flex d-md-flex d-lg-none d-xl-none"><h6><b>Основная информация</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="firstName"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Имя</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input type="text"
                           id="firstName"
                           v-model="model.firstName"
                           :class="[isEdit.firstName ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `firstName`)"
                           @blur="finishFieldEdit(`firstName`)"
                           :readonly="!isEdit.firstName"/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button type="button"
                            class="btn btn-link text-body"
                            :class="[isEdit.firstName ? 'text-primary' : 'text-body']"
                            @click="[isEdit.firstName ? finishFieldEdit('firstName') : startFieldEdit('firstName')]">
                        {{ isEdit.firstName ? 'Сохранить' : 'Изменить' }}
                    </button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="lastName"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Фамилия</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input id="lastName"
                           type="text"
                           v-model="model.lastName"
                           :class="[isEdit.lastName ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `lastName`)"
                           @blur="finishFieldEdit(`lastName`)"
                           :readonly="!isEdit.lastName"/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button type="button"
                            class="btn btn-link text-body"
                            :class="[isEdit.lastName ? 'text-primary' : 'text-body']"
                            @click="[isEdit.lastName ? finishFieldEdit('lastName') : startFieldEdit('lastName')]">
                        {{ isEdit.lastName ? 'Сохранить' : 'Изменить' }}
                    </button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Пол</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="w-50">
                        <select class="form-control border-0 pl-0"
                                @change="accountStartSaveData(model.sex, 'sex')"
                                v-model="model.sex">
                            <option value="n">Не указано</option>
                            <option value="m">Мужской</option>
                            <option value="f">Женский</option>
                        </select>
                        <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">
                    Семейной положение
                </label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="w-50">
                        <select class="form-control border-0 pl-0"
                                @change="accountStartSaveData(model.relationshipId, 'relationshipId')"
                                v-model="model.relationshipId">
                            <option value="null">В активном поиске</option>
                            <option value="1">В браке</option>
                            <option value="2">Не в браке</option>
                        </select>
                        <i class="fas fa-chevron-down ml-2"></i>
                    </div>
                </div>
                <div class="col-3 d-sm-none d-md-none"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="birthday" class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Дата
                    рождения</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input id="birthday"
                           type="date"
                           :value="model.birthday | toYMD"
                           :class="[isEdit.birthday ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `birthday`)"
                           @blur="finishFieldEdit(`birthday`)"
                           @input="model.birthday = $event.target.value"
                           :readonly="!isEdit.birthday"/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button type="button"
                            class="btn btn-link text-body"
                            :class="[isEdit.birthday ? 'text-primary' : 'text-body']"
                            @click="[isEdit.birthday ? finishFieldEdit('birthday') : startFieldEdit('birthday')]">
                        {{ isEdit.birthday ? 'Сохранить' : 'Изменить' }}
                    </button>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-sm-none d-md-none d-lg-flex d-xl-flex">
                <label for="city" class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Месторасположение</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
                    <i class="fas fa-map-marker-alt"></i>
                    <input id="location"
                           type="text"
                           class="ml-1"
                           v-model="model.location"
                           :class="[isEdit.location ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `location`)"
                           @blur="finishFieldEdit(`location`)"
                           :readonly="!isEdit.location"/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button type="button"
                            class="btn btn-link text-body"
                            :class="[isEdit.location ? 'text-primary' : 'text-body']"
                            @click="[isEdit.location ? finishFieldEdit('location') : startFieldEdit('location')]">
                        {{ isEdit.location ? 'Сохранить' : 'Изменить' }}
                    </button>
                </div>
            </div>

            <!--            location для мелких-->
            <div class="form-group row mb-0 border-bottom d-sm-block d-md-block d-lg-none d-xl-none">
                <label class="col-12 col-form-label text-secondary">Контакты</label>
            </div>

            <div class="form-group row mb-0 border-bottom d-lg-none d-xl-none">
                <label for="country" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Страна</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input type="text" readonly class="form-control-plaintext d-inline-block w-50" id="country"
                           ref="country" value="Россия"/>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-lg-none d-xl-none">
                <label for="city" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Город</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input v-model="userData.city" type="text" readonly
                           class="form-control-plaintext d-inline-block w-50" id="city" ref="city"/>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import PliziAPI from "../classes/PliziAPI";

    export default {
        name: 'AccountSettingsMain',

        data() {
            return {
                model: {
                    firstName: this.$root.$user.firstName,
                    lastName: this.$root.$user.lastName,
                    sex: this.$root.$user.sex,
                    relationshipId: this.$root.$user.relationshipId,
                    birthday: this.$root.$user.birthday,
                    location: this.$root.$user.country + ', ' + this.$root.$user.city,
                },

                isEdit: {
                    firstName: false,
                    lastName: false,
                    birthday: false,
                    location: false,
                }
            }
        },

        methods: {
            startFieldEdit(fieldName) {
                this.isEdit[fieldName] = true;
            },

            finishFieldEdit(fieldName) {
                setTimeout(() => {
                    this.isEdit[fieldName] = false;
                    this.accountStartSaveData(this.model[fieldName], fieldName);
                }, 100);
            },

            async accountStartSaveData(newValue, fieldName) {
                let formData = {};

                if (fieldName === 'location') {
                    let location = newValue.split(',');

                    formData.country = location[0].trim();
                    formData.city = location[1].trim();
                } else {
                    formData[fieldName] = newValue.trim();
                    this.isEdit[fieldName] = false;

                    if (fieldName === 'relationshipId' && newValue === 'null') {
                        newValue = null;
                    }
                }

                this.isEdit[fieldName] = false;

                let response = null;

                try {
                    response = await this.$root.$api.updateUser(formData);
                } catch (e) {
                    if (e.status && e.status === 401) {
                        this.$root.$emit('afterSuccessLogout', {});
                    } else {
                        throw e;
                    }
                }

                if (response.status === 201) {
                    this.$root.$user.updateData(fieldName, newValue);

                    if (fieldName === `firstName` || fieldName === `lastName`) {
                        this.$root.$emit('updateUserName', {
                            firstName: this.$root.$user.firstName,
                            lastName: this.$root.$user.lastName
                        });
                    }
                }

                const gwt = this.$store.getters.gwToken;
                const tryToLoadUser = await (new PliziAPI(gwt)).getUser();

                window.app.$root.$emit('afterUserLoad', {
                    user: tryToLoadUser,
                    token: gwt,
                    save: true
                });
            }
        },

        computed: {
            userData: function () {
                return this.$root.$user;
            },
        }
    }
</script>

<style lang="scss">
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        color: #212529 !important;
    }

    select + i {
        float: right;
        margin-top: -25px;
        margin-right: 5px;
        pointer-events: none;
        background-color: #fff;
        padding-right: 5px;
    }
</style>
