<template>
    <div id="accountSettingsMain"
         class="plz-account-settings plz-account-settings-main bg-white-br20 plz-mb20 container-fluid">
        <form class="plz-account-settings-form pb-2 px-3">
            <div class="plz-account-settings-header row plz-account-settings-main-header border-bottom">
                <div class="d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <h6 class="title-settings mb-0">Основные</h6>
                </div>
                <div class="d-sm-flex d-md-flex d-lg-none d-xl-none">
                    <h6 class="title-settings"><b>Основная информация</b></h6>
                </div>
            </div>

            <div class="plz-account-settings-body plz-account-settings-main-body">
                <div class="form-group row border-bottom">
                    <label for="firstName"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Имя
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                    <div
                        class="plz-account-settings-body-action plz-account-settings-main-body-action col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.firstName}"
                                @click="[isEdit.firstName ? finishFieldEdit('firstName') : startFieldEdit('firstName')]">
                            {{ isEdit.firstName ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="lastName"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">Фамилия</label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
                    <div
                        class="plz-account-settings-body-action plz-account-settings-main-body-action col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.firstName}"
                                @click="[isEdit.lastName ? finishFieldEdit('lastName') : startFieldEdit('lastName')]">
                            {{ isEdit.lastName ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="userSex"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">Пол</label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
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

                <div class="form-group row border-bottom">
                    <label for="relationship"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Семейной положение
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="w-75">
                            <select id="relationship" class="form-control border-0 pl-0"
                                    @change="accountStartSaveData(model.relationshipId, 'relationshipId')"
                                    v-model="model.relationshipId">
                                <option value="null" selected>В активном поиске</option>
                                <option value="1">В браке</option>
                                <option value="2">Не в браке</option>
                            </select>
                            <i class="fas fa-chevron-down ml-2"></i>
                        </div>
                    </div>
                    <div class="col-3 d-sm-none d-md-none"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="birthday"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Дата рождения
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                        <div v-if="!isEdit.birthday" class="form-control-plaintext border-bottom-0">
                            {{ model.birthday | toYMD }}
                        </div>
                        <input v-if="isEdit.birthday"
                               id="birthday"
                               type="date"
                               class="form-control w-75"
                               :value="model.birthday | toYMD"
                               @keyup.enter="accountStartSaveData($event.target.value, `birthday`)"
                               @blur="finishFieldEdit(`birthday`)"
                               @input="model.birthday = $event.target.value"
                               ref="birthday"/>
                    </div>
                    <div
                        class="plz-account-settings-body-action plz-account-settings-main-body-action col-2 d-sm-none d-md-none d-lg-flex d-xl-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.birthday}"
                                @click="[isEdit.birthday ? finishFieldEdit('birthday') : startFieldEdit('birthday')]">
                            {{ isEdit.birthday ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <label for="location"
                           class="plz-account-settings-body-label plz-account-settings-main-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Месторасположение
                    </label>
                    <div
                        class="plz-account-settings-body-field plz-account-settings-main-body-field col-sm-8 col-md-8 col-lg-8 col-xl-8 d-flex align-items-center">
                        <i class="fas fa-map-marker-alt"></i>
                        <multiselect id="location"
                                     class="w-75 ml-1 border-0 form-control p-0"
                                     v-model="model.location"
                                     :options="geoLocations"
                                     :showLabels="false"
                                     @select="accountStartSaveData"
                                     track-by="title"
                                     label="title"
                                     placeholder="Выберите местоположение"
                                     :custom-label="locationLabel"
                                     @search-change="getLocations">
                            <template slot="noOptions">Результатов нет.</template>
                            <template slot="noResult">Такого города не существует.</template>
                        </multiselect>
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
            </div>
        </form>
    </div>
</template>

<script>
    /**
     * @link https://vue-multiselect.js.org/#sub-getting-started
     */
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'AccountSettingsMain',
        components: {Multiselect},
        computed: {
            userData: function () {
                return this.$root.$user;
            },
            geoLocations() {
                let geolocation = [];

                if (!this.locations) return;

                this.locations.forEach((item) => {
                    geolocation.push({
                        id: item.id,
                        title: {
                            ru: item.title.ru,
                            ua: item.title.ua,
                            en: item.title.en,
                        },
                        region: item.region,
                        country: item.country,
                    });
                });

                return geolocation;
            },
        },
        data() {
            return {
                model: {
                    firstName: this.$root.$user.firstName,
                    lastName: this.$root.$user.lastName,
                    sex: this.$root.$user.sex,
                    relationshipId: this.$root.$user.relationshipId,
                    birthday: this.$root.$user.birthday,
                    location: this.$root.$user.city.id ? {
                        id: this.$root.$user.city.id,
                        title: {
                            ru: this.$root.$user.city.title,
                        },
                        region: {
                            id: this.$root.$user.region.id,
                            title: {
                                ru: this.$root.$user.region.title,
                            },
                        },
                        country: {
                            id: this.$root.$user.country.id,
                            title: {
                                ru: this.$root.$user.country.title,
                            },
                        },
                    } : null,
                },

                isEdit: {
                    firstName: false,
                    lastName: false,
                    birthday: false,
                    location: false,
                },
                locations: [],
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
                this.isEdit[fieldName] = true;

                const inpRef = this.getRef(fieldName);

                if (inpRef) {
                    inpRef.focus();
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            },
            finishFieldEdit(fieldName) {
                const inpRef = this.getRef(fieldName);

                setTimeout(() => {
                    this.isEdit[fieldName] = false;

                    if (inpRef) {
                        inpRef.blur();
                        this.accountStartSaveData(this.model[fieldName], fieldName);
                    } else {
                        window.console.warn(`Ошибка редактирования поля`);
                    }
                }, 100);
            },
            formatFormData(newValue, fieldName) {
                let formData = {};

                if (fieldName === 'location') {
                    formData = {geoCityId: newValue.id};
                } else {
                    for (let prop in formData) {
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

                try {
                    response = await this.$root.$api.updateUser(formData);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (response !== null) {
                    this.$root.$user.updateData(response);

                    if (fieldName === `firstName` || fieldName === `lastName`) {
                        this.$root.$emit('updateUserName', {
                            firstName: this.$root.$user.firstName,
                            lastName: this.$root.$user.lastName
                        });
                    }
                }
            },
            async getLocations(location) {
                let response;

                try {
                    response = await this.$root.$api.getLocationsByInput(location);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (response) {
                    this.locations = response;
                }
            },
            locationLabel({title, region, country}) {
                if (title) {
                    return `${country.title.ru}, ${region.title.ru}, ${title.ru}`;
                }
            },
        },
    }
</script>
