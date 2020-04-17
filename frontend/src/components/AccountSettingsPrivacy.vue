<template>
    <div id="accountSettingsPrivacy" class="plz-account-settings plz-account-settings-privacy bg-white-br20 plz-mb20 container-fluid">
        <form class="m-3 pb-2">
            <div class="plz-account-settings-header plz-account-settings-privacy-header form-group row border-bottom">
                <div class="col-12 d-sm-none d-md-none d-lg-flex d-xl-flex">
                    <h6
                    ><b>Приватность</b>
                    </h6>
                </div>
                <div class="col-12 d-sm-flex d-md-flex d-lg-none d-xl-none">
                    <h6>
                        <b>Приватность</b>
                    </h6>
                </div>
            </div>

            <div class="plz-account-settings-body plz-account-settings-privacy-body">
                <div class="form-group row border-bottom">
                    <label for="pageType"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Тип страницы
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <i v-if="Number(form.pageType) !== 1" class="fas fa-lock mr-2"></i>
                            <i v-else class="fas fa-unlock mr-2"></i>
                            <div class="w-100">
                                <select id="pageType"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.pageType, 'pageType')"
                                        v-model="form.pageType">
                                    <option value="1">Открытая</option>
                                    <option value="2">Закрытая (Только друзья)</option>
                                    <option value="3">Закрытая</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="writeMessagesPermissions"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Кто может оставлять сообщения
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <div class="w-100">
                                <select id="writeMessagesPermissions"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.writeMessagesPermissions, 'writeMessagesPermissions')"
                                        v-model="form.writeMessagesPermissions">
                                    <option value="1">Все</option>
                                    <option value="2">Только друзья</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <!-- TODO: поправить, когда будет понятно что это за поле -->
                <div class="form-group row border-bottom d-none">
                    <label for="writeMessagesPermissions"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Вас могут
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <div class="w-100">
                                <!--                            <select id="writeMessagesPermissions"-->
                                <!--                                    class="form-control border-0 pl-0"-->
                                <!--                                    @change="accountStartSaveData(form.writeMessagesPermissions, 'pageType')"-->
                                <!--                                    v-model="form.writeMessagesPermissions">-->
                                <!--                                <option value="1">Все</option>-->
                                <!--                                <option value="2">Только друзья</option>-->
                                <!--                            </select>-->
                                <select id="writeMessagesPermissions"
                                        class="form-control border-0 pl-0">
                                    <option selected>Добавить в друзья</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <!-- TODO: поправить, когда будет понятно что это за поле -->
                <div class="form-group row border-bottom d-none">
                    <label for="writeMessagesPermissions"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Раздел сообщества
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <i class="fas fa-lock d-inline-block mr-2"></i>
                            <div class="w-100">
                                <!--                            <select id="writeMessagesPermissions"-->
                                <!--                                    class="form-control border-0 pl-0"-->
                                <!--                                    @change="accountStartSaveData(form.writeMessagesPermissions, 'pageType')"-->
                                <!--                                    v-model="form.writeMessagesPermissions">-->
                                <!--                                <option value="1">Все</option>-->
                                <!--                                <option value="2">Только друзья</option>-->
                                <!--                            </select>-->
                                <select id="writeMessagesPermissions"
                                        class="form-control border-0 pl-0">
                                    <option selected>Закрыт</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="postWallPermissions"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Кто может оставлять записи на стене
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <i class="fas fa-lock d-inline-block mr-2"></i>
                            <div class="w-100">
                                <select id="postWallPermissions"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.postWallPermissions, 'postWallPermissions')"
                                        v-model="form.postWallPermissions">
                                    <option value="1">Только друзья</option>
                                    <option value="2">Только я</option>
                                    <option value="3">Все пользователи</option>
                                    <option value="4">Выбранные друзья из списка</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>

                <div class="form-group row border-bottom">
                    <label for="viewFriendsPermissions"
                           class="plz-account-settings-body-label plz-account-settings-privacy-body-label col-sm-6 col-md-6 col-lg-4 col-xl-4">
                        Кто может видеть мой список друзей
                    </label>
                    <div class="plz-account-settings-body-field plz-account-settings-privacy-body-field col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <div class="d-flex align-items-center w-75">
                            <div class="w-100">
                                <select id="viewFriendsPermissions"
                                        class="form-control border-0 pl-0"
                                        @change="accountStartSaveData(form.viewFriendsPermissions, 'viewFriendsPermissions')"
                                        v-model="form.viewFriendsPermissions">
                                    <option value="1">Все пользователи</option>
                                    <option value="2">Только друзья</option>
                                    <option value="3">Только друзья и друзья друзей</option>
                                </select>
                                <i class="fas fa-chevron-down ml-2 d-sm-none d-md-none d-lg-inline d-xl-inline"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'AccountSettingsPrivacy',
        computed: {
            userData: function () {
                return this.$root.$user;
            },
        },
        data() {
            return {
                form: {
                    pageType: this.$root.$user.privacySettings.pageType,
                    writeMessagesPermissions: this.$root.$user.privacySettings.writeMessagesPermissions,
                    postWallPermissions: this.$root.$user.privacySettings.postWallPermissions,
                    viewWallPermissions: this.$root.$user.privacySettings.viewWallPermissions,
                    viewFriendsPermissions: this.$root.$user.privacySettings.viewFriendsPermissions,
                },
            }
        },
        methods: {
            async accountStartSaveData(newValue, fieldName) {
                let response = null;

                response = await this.$root.$api.updateUserPrivacy({[fieldName]: newValue});

                // TODO: нужно получить и сохранить обновленные данные.
            },
        },
    }
</script>
