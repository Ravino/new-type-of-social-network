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
                           class="w-75"
                           v-model="model.firstName"
                           :class="[isEdit.firstName ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `firstName`)"
                           @blur="finishFieldEdit(`firstName`)"
                           :readonly="!isEdit.firstName"
                           ref="firstName"/>
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
                           class="w-75"
                           v-model="model.lastName"
                           :class="[isEdit.lastName ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `lastName`)"
                           @blur="finishFieldEdit(`lastName`)"
                           :readonly="!isEdit.lastName"
                           ref="lastName"/>
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
                <label for="userSex"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Пол</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="w-75">
                        <select id="userSex" class="form-control border-0 pl-0"
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
                <label for="relationship" class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">
                    Семейной положение
                </label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div class="w-75">
                        <select id="relationship" class="form-control border-0 pl-0"
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
                           class="w-75"
                           :value="model.birthday | toYMD"
                           :class="[isEdit.birthday ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `birthday`)"
                           @blur="finishFieldEdit(`birthday`)"
                           @input="model.birthday = $event.target.value"
                           :readonly="!isEdit.birthday"
                           ref="birthday"/>
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
                <label for="location" class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Месторасположение</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
                    <i class="fas fa-map-marker-alt"></i>
                    <input id="location"
                           type="text"
                           class="w-75 ml-1"
                           v-model="model.location"
                           :class="[isEdit.location ? 'form-control' : 'form-control-plaintext']"
                           @keyup.enter="accountStartSaveData($event.target.value, `location`)"
                           @blur="finishFieldEdit(`location`)"
                           :readonly="!isEdit.location"
                           ref="location"/>
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
                           ref="country"/>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-lg-none d-xl-none">
                <label for="city" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Город</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input type="text" readonly
                           class="form-control-plaintext d-inline-block w-50" id="city" ref="city"/>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
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
            getRef(refKey) {
                for (let [key, value] of Object.entries(this.$refs)) {
                    if (refKey === key)
                        return value;
                }
                return null;
            },
            startFieldEdit(fieldName) {
                // FIXME: @TGA после клика [редактировать] поля не получают фокус
                // вот потому $refs и нужен был :)
                this.isEdit[fieldName] = true;

                const inpRef = this.getRef(fieldName);

                if (inpRef) {
                    setTimeout(() => {
                        inpRef.focus();
                    }, 100);
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            },
            finishFieldEdit(fieldName) {
                const inpRef = this.getRef(fieldName);

                setTimeout(() => {
                    this.isEdit[fieldName] = false;
                }, 100);

                if (inpRef) {
                    this.accountStartSaveData(this.model[fieldName], fieldName);
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            },
            formatFormData(newValue, fieldName) {
                let formData = {};

                if (fieldName === 'location') {
                    let [country, city] = newValue.split(',');

                    formData = {country, city};
                } else {
                    for(let prop in formData) {
                        if (prop !== 'birthday') {
                            formData[prop] = formData[prop].trim();
                        }
                    }

                    if (fieldName === 'relationshipId' && newValue === 'null') {
                        newValue = null;
                    }

                    formData[fieldName] = newValue;
                }

                return formData;
            },
            async accountStartSaveData(newValue, fieldName) {
                this.isEdit[fieldName] = false;

                let formData = this.formatFormData(newValue, fieldName);
                let response = null;

                response = await this.$root.$api.updateUser(formData);

                window.console.log(response);
                // FIXME: @TGA никогда не выполнится - посмотри, что выводит console.log() строкой выше
                // там поля status нету, потому ты ниже и делаешь запрос к $api.getUser(), а потом бросаешь afterUserLoad
                if (response !== null) {
                    this.$root.$user.updateData(response.data);
                //
                //     if (fieldName === `firstName` || fieldName === `lastName`) {
                //         this.$root.$emit('updateUserName', {
                //             firstName: this.$root.$user.firstName,
                //             lastName: this.$root.$user.lastName
                //         });
                //     }
                }

                // FIXME: @TGA эти две строки делаются проще - смотри ниже (и PliziAPI подключать ещё раз не надо)
                //const gwt = this.$store.getters.gwToken;
                //const tryToLoadUser = await (new PliziAPI(gwt)).getUser();

                // const updatedUser = await this.$root.$api.getUser();

                // FIXME: @TGA - это лишний запрос к БД
                // в response у тебя уже есть обновлённые данные юзера - их прислал сервер
                // надо просто обновить ими данные юзера
                // и кстати не факт что tryToLoadUser у тебя будет корректен - может истечь жизнь токена
                // window.app.$root.$emit('afterUserLoad', {
                //     user: updatedUser,
                //     token: this.$root.$api.token,
                //     save: true
                // });
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
