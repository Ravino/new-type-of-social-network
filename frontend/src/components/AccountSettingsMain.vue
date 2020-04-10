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
                    <input v-show="isEdit.firstName" v-model="model.firstName" type="text"
                           @keyup.enter.stop="accountStartSaveData($event.target.value, `firstName`)"
                           @blur="accountFieldBlur($event, `firstName`)"
                           class="form-control" id="firstName" ref="firstName"/>
                    <input v-show="!isEdit.firstName" v-model="userData.firstName" type="text" readonly
                           class="form-control-plaintext" ref="firstNameDisplay"/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button v-show="isEdit.firstName" type="button" class="btn btn-link text-primary"
                            @click.stop.prevent="finishFieldEdit(`firstName`)">
                        Сохранить
                    </button>
                    <button v-show="!isEdit.firstName" type="button" class="btn btn-link text-body"
                            @click.stop.prevent="startFieldEdit(`firstName`)">
                        Изменить
                    </button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="lastName"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Фамилия</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input v-show="isEdit.lastName" v-model="model.lastName" type="text"
                           @keydown="accountKeyDownCheck($event, `lastName`)"
                           @blur="accountFieldBlur($event, `lastName`)"
                           class="form-control" id="lastName" ref="lastName"/>
                    <input v-show="!isEdit.lastName"
                           v-model="userData.lastName"
                           type="text"
                           class="form-control-plaintext"
                           ref="lastNameDisplay"
                           readonly/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button v-show="isEdit.lastName"
                            type="button"
                            class="btn btn-link text-body"
                            @click.stop.prevent="startFieldEdit(`lastName`)">
                        <span>Сохранить</span>
                    </button>
                    <button v-show="!isEdit.lastName"
                            type="button"
                            class="btn btn-link text-body"
                            @click.stop.prevent="startFieldEdit(`lastName`)">
                        Изменить
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
                                @change="accountStartSaveData(model.relationship, 'relationship')"
                                v-model="model.relationship">
                            <option value="0">В активном поиске</option>
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
                    <input v-show="isEdit.birthday"
                           v-model="model.birthday"
                           @keydown="accountKeyDownCheck($event, `birthday`)"
                           @blur="accountFieldBlur($event, `birthday`)"
                           type="date"
                           id="birthday"
                           class="form-control-plaintext"
                           ref="birthday"/>
                    <input v-show="!isEdit.birthday"
                           :value="userData.birthday | toYMD"
                           type="date"
                           class="form-control-plaintext"
                           ref="birthdayDisplay"
                           readonly/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button v-show="isEdit.birthday"
                            type="button"
                            class="btn btn-link text-body"
                            @click.stop.prevent="finishFieldEdit(`birthday`)">
                        Сохранить
                    </button>
                    <button v-show="!isEdit.birthday"
                            type="button"
                            class="btn btn-link text-body"
                            @click.stop.prevent="startFieldEdit(`birthday`)">
                        Изменить
                    </button>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom d-sm-none d-md-none d-lg-flex d-xl-flex">
                <label for="city" class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Месторасположение</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center">
                    <i class="fas fa-map-marker-alt"></i>
                    <input v-show="isEdit.city"
                           v-model="model.city"
                           @keydown="accountKeyDownCheck($event, `city`)"
                           @blur="accountFieldBlur($event, `city`)"
                           type="text"
                           id="location"
                           class="form-control-plaintext w-75 ml-1"
                           ref="city"/>
                    <input v-show="!isEdit.city"
                           v-model="userData.city"
                           type="text"
                           class="form-control-plaintext w-75 ml-1"
                           ref="cityDisplay"
                           readonly/>
                </div>
                <div class="col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <button v-show="isEdit.city"
                            type="button"
                            class="btn btn-link text-body"
                            @click="finishFieldEdit(`city`)">
                        Сохранить
                    </button>
                    <button v-show="!isEdit.city"
                            type="button"
                            class="btn btn-link text-body"
                            @click.stop.prevent="startFieldEdit(`city`)">
                        Изменить
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

            <!--            <div class="form-group row mb-0 &#45;&#45;border-bottom d-lg-none d-xl-none">-->
            <!--                <label for="city" class="col-4 col-sm-6 col-md-6 col-form-label text-secondary">Город</label>-->
            <!--                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">-->
            <!--                    <input v-model="userData.city" type="text" readonly-->
            <!--                           class="form-control-plaintext d-inline-block w-50" id="city" ref="city"/>-->
            <!--                </div>-->
            <!--            </div>-->

        </form>
    </div>
</template>

<script>
    import {HTTPer} from "../httper/httper";

    export default {
        name: 'AccountSettingsMain',

        data() {
            return {
                model: {
                    firstName: ``,
                    lastName: ``,
                    birthday: '',
                    city: '',
                    sex: this.$root.$user.originalSex,
                    relationship: this.$root.$user.relationship,
                },

                isEdit: {
                    firstName: false,
                    lastName: false,
                    birthday: false,
                    city: false,
                }
            }
        },

        methods: {
            startFieldEdit(fieldName) {
                this.isEdit[fieldName] = true;

                const inpRef = this.getRef(fieldName);
                if (inpRef) {
                    this.model[fieldName] = this.$root.$user[fieldName];
                    setTimeout(() => {
                        inpRef.focus();
                    }, 100);
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            },

            finishFieldEdit(fieldName) {
                this.isEdit[fieldName] = false;
                const inpRef = this.getRef(fieldName);

                if (inpRef) {
                    this.accountStartSaveData(inpRef.value.trim(), fieldName);
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            },

            // TODO: перенести потом в глобал
            getRef(refKey) {
                for (let [key, value] of Object.entries(this.$refs)) {
                    if (refKey === key)
                        return value;
                }

                return null;
            },

            accountKeyDownCheck(ev, fieldName) {
                if (13 === ev.keyCode) {
                    this.isEdit[fieldName] = false;
                    this.accountStartSaveData(ev.target.value, fieldName)
                }
            },

            accountFieldBlur(ev, fieldName) {
                this.finishFieldEdit(fieldName);
            },

            accountStartSaveData(newValue, fieldName) {
                newValue = newValue.trim();

                this.isEdit[fieldName] = false;

                const gwt = this.$store.getters.gwToken;
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${gwt}`,
                    }
                };

                HTTPer.patch('/api/user', {
                    [fieldName]: newValue,
                }, headers)
                    .then((response) => {
                        if (response.status === 201) {
                            this.$root.$user.updateData(fieldName, newValue);

                            if (fieldName === `firstName` || fieldName === `lastName`) {
                                this.$root.$emit('updateUserName', {
                                    firstName: this.$root.$user.firstName,
                                    lastName: this.$root.$user.lastName
                                });
                            }
                        }
                    })
                    .catch((error) => {
                        if (error.response.status >= 400) {
                            window.console.log(error.response.data);
                            window.console.warn(error.response.status + ': ' + error.response.statusText + ': ' + error.response.data.message);
                        } else {
                            window.console.warn(error.toString());
                        }
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
