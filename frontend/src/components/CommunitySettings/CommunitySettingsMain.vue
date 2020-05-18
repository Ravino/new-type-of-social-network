<template>
    <div id="communitySettingsMain"
         class="plz-account-settings bg-white-br20 plz-mb20 container-fluid">
        <div class="plz-account-settings-form pb-0 px-3 mb-0">
            <div class="plz-account-settings-header row border-bottom">
                <div class="d-flex">
                    <h6 class="title-settings mb-0">Основные</h6>
                </div>
            </div>

            <div class="plz-account-settings-body ">

                <div class="form-group row border-bottom">
                    <label for="name"
                           class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4 ">
                        Название
                    </label>
                    <div class="plz-account-settings-body-field order-1 order-sm-0 col-12 col-sm-5 col-lg-6 ">
                        <input type="text"
                               id="name"
                               class="w-100 w-sm-75"
                               v-model="model.name"
                               :class="[isEdit.name ? 'form-control' : 'form-control-plaintext', { 'is-invalid': !!nameError, 'is-valid': isSuccessName }]"
                               @input="inputFieldEdit($event, 'name')"
                               @keyup.enter="accountStartSaveData($event.target.value, `name`)"
                               @blur="finishFieldEdit(`name`)"
                               :readonly="!isEdit.name"
                               ref="name">

                        <div class="invalid-feedback">
                            <p class="text-danger">{{ nameError }}</p>
                        </div>
                    </div>
                    <div class="plz-account-settings-body-action col-6 col-sm-3 col-lg-2 d-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.name}"
                                @click="[isEdit.name ? finishFieldEdit('name') : startFieldEdit('name')]">
                            {{ isEdit.name ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="description"
                           class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4 ">
                        Описание
                    </label>
                    <div class="plz-account-settings-body-field order-1 order-sm-0 col-12 col-sm-5 col-lg-6 ">
                        <textarea type="text"
                                  id="description"
                                  class="w-100 w-sm-75"
                                  :class="[isEdit.description ? 'form-control' : 'form-control-plaintext', { 'is-invalid': !!descriptionError,
                                                                                                                'is-valid': isSuccessDescription }]"
                                  v-model="model.description"
                                  placeholder="Добавьте описание"
                                  @blur="finishFieldEdit(`description`)"
                                  :readonly="!isEdit.description"
                                  ref="description">
                        </textarea>

                        <div class="invalid-feedback">
                            <p class="text-danger">{{ descriptionError }}</p>
                        </div>
                    </div>
                    <div class="plz-account-settings-body-action col-6 col-sm-3 col-lg-2 d-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.description}"
                                @click="[isEdit.description ? finishFieldEdit('description') : startFieldEdit('description')]">
                            {{ isEdit.description ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="headerImage"
                           class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4 ">
                        Обложка сообщества
                    </label>
                    <div class="plz-account-settings-body-field order-1 order-sm-0 col-12 col-sm-5 col-lg-6 ">

                        <label for="headerImage" class="community-primary-image mr-3 cursor-pointer">
                            <img ref="headerImage" :src="headerImage" :alt="community.name"
                                 class="img-thumbnail rounded" style="width: 242px;height: 63px;"/>
                        </label>

                        <input id="headerImage" ref="headerImage" type="file"
                               @change="uploadImage()"
                               class="d-none"/>

                        <div class="invalid-feedback">
                            <p class="text-danger">{{ nameError }}</p>
                        </div>
                    </div>
                    <div class="plz-account-settings-body-action col-6 col-sm-3 col-lg-2 d-flex">
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="url"
                           class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4 ">
                        Адрес старницы
                    </label>
                    <div class="plz-account-settings-body-field order-1 order-sm-0 col-12 col-sm-5 col-lg-6 ">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">http://plizi.com/</span>
                        </div>
                        <input type="text"
                               id="url"
                               class="w-100 w-sm-75"
                               v-model="model.url"
                               :class="[isEdit.url ? 'form-control' : 'form-control-plaintext', { 'is-invalid': !!urlError, 'is-valid': isSuccessUrl }]"
                               @input="inputFieldEdit($event, 'url')"
                               @keyup.enter="accountStartSaveData($event.target.value, 'url')"
                               @blur="finishFieldEdit('url')"
                               :readonly="!isEdit.url"
                               ref="url">

                        <div class="invalid-feedback">
                            <p class="text-danger">{{ urlError }}</p>
                        </div>
                    </div>
                    <div class="plz-account-settings-body-action col-6 col-sm-3 col-lg-2 d-flex">
                        <button type="button"
                                class="btn btn-link"
                                :class="{'text-primary': isEdit.url}"
                                @click="[isEdit.url ? finishFieldEdit('url') : startFieldEdit('url')]">
                            {{ isEdit.url ? 'Сохранить' : 'Изменить' }}
                        </button>
                    </div>
                </div>

                <div class="form-group row border-bottom">
                    <div class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4 ">
                        Верификация
                    </div>
                    <div class="plz-account-settings-body-field order-1 order-sm-0 col-12 col-sm-5 col-lg-6 ">
                        <a href="#" @click.stop="onRequestClick">Подать заявку</a>
                    </div>
                    <div class="plz-account-settings-body-action col-6 col-sm-3 col-lg-2 d-flex">
                    </div>
                </div>

                <div class="form-group row border-bottom d-flex ">
                    <label for="location"
                           class="plz-account-settings-body-label col-6 col-sm-4 col-lg-4">
                        Месторасположение
                    </label>
                    <div
                        class="plz-account-settings-body-field order-1 order-sm-0 col-12 pl-4 col-6 col-lg-8  d-flex align-items-center">
                        <i class="fas fa-map-marker-alt"></i>
                        <multiselect id="location"
                                     class="w-100 w-sm-75 ml-1 border-0 form-control p-0 position-relative"
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

            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators';
    import PliziCommunity from "../../classes/PliziCommunity";
    import {isCorrectSlug} from '../../validators/validators.js';
    import lodash from 'lodash';
    import PliziCommunityAvatar from "../../classes/Community/PliziCommunityAvatar";

    export default {
        name: 'CommunitySettingsMain',
        props: {
            community: PliziCommunity,
        },
        computed: {
            headerImage() {
                return this.community.headerImage?.image.thumb.path || '/images/community-header-bg.jpg';
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

            isSuccessName() {
                return (!this.$v.model.name.$invalid || !(!!this.serverRegMessages.name)) && !
                    !this.model.name;
            },
            nameError() {
                if (this.$v.model.name.$error) {
                    if (!this.$v.model.name.required) {
                        return 'Укажите название сообщества.';
                    } else if (!this.$v.model.name.minLength) {
                        return 'Врядли у Вас такое короткое название?';
                    } else if (!this.$v.model.name.maxLength) {
                        return 'Слишком длинное название.';
                    }
                } else if (this.serverRegMessages.name) {
                    return this.serverRegMessages.name;
                }

                return null;
            },

            isSuccessDescription() {
                return (!this.$v.model.description.$invalid || !(!!this.serverRegMessages.description)) && !
                    !this.model.description;
            },
            descriptionError() {
                if (this.$v.model.description.$error) {
                    if (!this.$v.model.name.maxLength) {
                        return 'Слишком длинное описание.';
                    }
                } else if (this.serverRegMessages.name) {
                    return this.serverRegMessages.name;
                }

                return null;
            },

            isSuccessUrl() {
                return (!this.$v.model.url.$invalid || !(!!this.serverRegMessages.url)) && !
                    !this.model.url;
            },
            urlError() {
                if (this.$v.model.url.$error) {
                    if (!this.$v.model.url.minLength) {
                        return 'Врядли у Вас такой короткий адрес?';
                    } else if (!this.$v.model.url.maxLength) {
                        return 'Слишком длинный адрес.';
                    } else if (!this.$v.model.url.isCorrectSlug) {
                        return 'Только латиница, цифры, подчеркивание и дефис.';
                    }
                } else if (this.serverRegMessages.url) {
                    return this.serverRegMessages.url;
                }

                return null;
            },
        },
        data() {
            return {
                model: {
                    name: this.community.name,
                    description: this.community.description || '',
                    url: this.community.url,
                    location: this.community.location,
                },
                isEdit: {
                    name: false,
                    description: false,
                    url: false,
                    location: false,
                },
                isSend: {
                    name: false,
                    description: false,
                    url: false,
                    location: false,
                },
                serverRegMessages: {
                    name: null,
                    description: null,
                    url: null,
                },
                locations: [],
            }
        },
        validations() {
            return {
                model: {
                    name: {
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(50),
                    },
                    description: {
                        maxLength: maxLength(500),
                    },
                    url: {
                        minLength: minLength(2),
                        maxLength: maxLength(50),
                        isCorrectSlug,
                    },
                }
            };
        },
        methods: {
            getRef(refKey) {
                for (let [key, value] of Object.entries(this.$refs)) {
                    if (refKey === key)
                        return value;
                }
                return null;
            },
            startFieldEdit: lodash.debounce(function (fieldName) {
                this.isEdit[fieldName] = true;

                const inpRef = this.getRef(fieldName);

                if (inpRef) {
                    inpRef.focus();
                } else {
                    window.console.warn(`Ошибка редактирования поля`);
                }
            }, 50),
            finishFieldEdit: lodash.debounce(function (fieldName) {
                this.$v.model[fieldName].$touch();
                const inpRef = this.getRef(fieldName);

                setTimeout(() => {
                    this.isEdit[fieldName] = false;

                    if (inpRef) {
                        inpRef.blur();

                        if (!this.isSend[fieldName])
                            this.accountStartSaveData(this.model[fieldName], fieldName);
                    } else {
                        window.console.warn(`Ошибка редактирования поля`);
                    }
                }, 100);
            }, 50),
            formatFormData(newValue, fieldName) {
                let formData = {};
                if (fieldName === 'location') {
                    formData = {location: newValue.id};
                } else {
                    formData[fieldName] = newValue;
                }
                return formData;
            },
            inputFieldEdit($event, fieldName) {
                this.serverRegMessages[fieldName] = null;
                this.$v.model[fieldName].$touch();
            },
            locationLabel({title, region, country}) {
                if (title) {
                    if (region) {
                        return `${country.title.ru}, ${region ? region.title.ru : null}, ${title.ru}`;
                    }

                    return `${country.title.ru}, ${title.ru}`;
                }
            },
            async accountStartSaveData(newValue, fieldName) {
                this.isSend[fieldName] = true;
                if (!!this[`${fieldName}Error`]) {
                    this.model[fieldName] = this.community[fieldName];
                    return;
                }
                this.isEdit[fieldName] = false;

                let formData = this.formatFormData(newValue, fieldName);
                let response = null;

                try {
                    response = await this.$root.$api.$communities.update(this.community.id, formData);
                } catch (e) {
                    console.warn(e.detailMessage);
                    if (e.status === 422) {
                        const inpRef = this.getRef(fieldName);

                        if (inpRef) {
                            inpRef.focus();
                        }
                        this.isEdit[fieldName] = true;
                        this.serverRegMessages[fieldName] = e.data?.errors[fieldName][0];
                    }
                }

                if (response !== null) {
                    setTimeout(() => {
                        this.isSend[fieldName] = false;
                    }, 2000);
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

            /**
             * @returns {boolean|FormData}
             */
            getFileFormData() {
                const fName = this.$refs.headerImage.value;
                const fExt = fName.split('.').pop().toLowerCase();
                const allowExts = ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'];

                if (!allowExts.includes(fExt)) {
                    this.$alert(`<h4 class="text-white">Ошибка</h4>
<div class="alert alert-danger">
Недопустимое расширение у файла <b>${fName}</b><br />
Допустимы только: <b class="text-success">${allowExts.join(', ')}</b>
</div>`, `bg-danger`, 30);
                    return false;
                }

                const formData = new FormData();
                formData.append('file', this.$refs.headerImage.files[0]);
                formData.append('id', this.community.id);
                this.$refs.headerImage.value = '';

                return formData;
            },

            async uploadImage() {
                const formData = this.getFileFormData();

                if (!formData) {
                    return;
                }

                const {size} = formData.get('file');

                if (size > 2000000) {
                    this.showErrorOnLargeFile();
                    return;
                }

                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$communities.updateHeaderImage(formData);
                } catch (e) {
                    if (e.status === 422) {
                        this.showErrorOnLargeFile();
                        return;
                    }

                    window.console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    this.community.headerImage = new PliziCommunityAvatar(apiResponse.data);
                }
            },

            onRequestClick() {
                this.$root.$alert(`Заявка`, 'bg-info', 3);
            }
        },
    }
</script>
