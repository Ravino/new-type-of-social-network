<template>
    <div id="accountSettingsPrivacy" class="plz-account-settings-privacy bg-white-br20 plz-mb20 container-fluid">
        <form class="m-3 pb-2">
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12 d-sm-none d-md-none d-lg-flex d-xl-flex"><h6><b>Приватность</b></h6></div>
                <div class="col-12 d-sm-flex d-md-flex d-lg-none d-xl-none"><h6><b>Приватность</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="pageType"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Тип страницы</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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

            <div class="form-group row mb-0 border-bottom">
                <label for="writeMessagesPermissions"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">
                    Кто может оставлять сообщения
                </label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
            <div class="form-group row mb-0 border-bottom">
                <label for="writeMessagesPermissions"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Вас могут</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
            <div class="form-group row mb-0 border-bottom">
                <label for="writeMessagesPermissions"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">Раздел
                    сообщества</label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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

            <div class="form-group row mb-0 border-bottom">
                <label for="postWallPermissions"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">
                    Кто может оставлять записи на стене
                </label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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

            <div class="form-group row mb-0 border-bottom">
                <label for="viewFriendsPermissions"
                       class="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-form-label text-secondary">
                    Кто может видеть мой список друзей
                </label>
                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
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

<style lang="scss">
    .plz-account-settings-privacy {
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
    }
</style>
