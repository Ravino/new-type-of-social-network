<template>
    <div id="profileHeader" class="row plz-profile-header mb-4">
        <div
            class="d-flex align-items-stretch offset-1 col-10 offset-sm-3 col-sm-6 offset-md-4 col-md-4 offset-lg-0 col-lg-4 col-xl-3 pl-lg-0 mb-4 mb-lg-0">
            <div class="plz-profile-userpic-container d-flex flex-column  bg-white-br20 overflow-hidden">
                <div
                    class="plz-profile-userpic-wrapper overflow-hidden position-relative d-flex align-items-center justify-content-center mx-auto m-lg-0">
                    <img ref="userAvatar" :src="userAvatar" :alt="userData.fullName"/>
                    <label v-if="isOwner===true" for="userAvatarFile"
                           class="user-avatar-file-label m-0 cursor-pointer"></label>
                    <input id="userAvatarFile" ref="userAvatarFile" type="file" @change="uploadUserAvatar()"
                           class="d-none"/>
                </div>

                <div v-if="isOwner===true" class="plz-profile-userpic-footer mt-auto">
                    <div class="plz-profile-userpic-edit file-label d-flex align-items-center justify-content-between">

                        <router-link tag="a"
                                     class="btn align-items-center justify-content-center d-flex w-75 border-right m-0"
                                     to="/account">Редактировать </router-link>

                        <button class="btn dropdown-menu-btn align-items-center justify-content-center d-flex w-25"
                                id="configurationMenuUser"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                title="опции">
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right py-3 px-3" aria-labelledby="configurationMenuUser">
                            <div class="nav-item ">
                                <router-link tag="a" class="dropdown-item px-0 py-1" to="/account">Настройки </router-link>
                            </div>
                            <div class="nav-item">
                                <router-link tag="a" class="dropdown-item px-0 py-1" to="/black-list">Чёрный список</router-link>
                            </div>
                            <div class="nav-item">
                                <router-link tag="a" class="dropdown-item px-0 py-1" to="/friends">Друзья </router-link>
                            </div>
                            <div class="nav-item ">
                                <router-link tag="a" class="dropdown-item px-0 py-1" to="/communities">Сообщества </router-link>
                            </div>
                        </div>

                    </div>

                </div>

                <div v-else class="plz-profile-userpic-footer mt-auto">
                    <div class="plz-profile-userpic-edit file-label d-flex align-items-center justify-content-between">
                        <button v-bind:style="{ width: fullWidth }"
                                class="btn align-items-center justify-content-center d-flex w-75 border-right m-0"
                                @click="showPersonalMsgDialog()">Написать
                        </button>

                        <button class="btn dropdown-menu-btn align-items-center justify-content-center d-flex w-25"
                                id="configurationMenuUser"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                title="опции">
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                        </button>

                        <div class="dropdown-menu dropdown-menu-right py-3 " aria-labelledby="configurationMenuUser">
                            <div class="nav-item ">
                                <p v-if="isCanAddToFriends"
                                    class="dropdown-item px-0 py-1 m-0 px-3"
                                    @click="sendFriendshipInvitation(userData.id, userData.fullName)"
                                    title="Добавить в друзья" >Добавить в друзья</p>
                                <p v-else
                                    class="dropdown-item px-0 py-1 m-0 px-3"
                                    @click="sendFriendshipInvitation(userData.id, userData.fullName)"
                                    title="Удалить из друзей" >Удалить из друзей</p>
                            </div>
                            <div class="nav-item">
                                <p class="dropdown-item px-0 py-1 m-0 px-3" v-if="!userData.stats.isFollow"
                                   @click="follow" title="Подписаться">Подписаться </p>
                                <p class="dropdown-item px-0 py-1 m-0 px-3" v-else
                                   @click="unFollow" title="Отписаться">Отписаться </p>
                            </div>
                            <div class="nav-item">
                                <p class="dropdown-item px-0 py-1 m-0 px-3" v-if="!userData.stats.isFollow"
                                   @click="addToBlacklist"  title="Добавить в чёрный список">Добавить в чёрный список </p>
                                <p class="dropdown-item px-0 py-1 m-0 px-3" v-if="isAddedToBlacklist === false"
                                    @click="addToBlacklist"  title="Добавить в чёрный список">Удалить с чёрного списка </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-12  col-lg-8 col-xl-9 px-0 py-4 plz-profile-userdetails">
            <div class="w-100 bg-white-br20 px-3 px-md-5 pb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="plz-user-name">
                        {{userData.fullName}}
                        <ButtonsFollow :userData="userData"></ButtonsFollow>
                    </h2>
                    <span v-if="userData.isOnline" class="online">В сети</span>
                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr v-if="!!userData.profile.birthday">
                        <td class="">Дата рождения:</td>
                        <td class="">
                            {{ userData.profile.birthday | toLongDate }}
                        </td>
                    </tr>
                    <tr>
                        <td class="">Город:</td>
                        <td class="">
                            <template v-if="userData.country && userData.city.title">
                                <IconLocation/>
                                {{userData.country.title.ru}}, {{userData.city.title.ru}}
                            </template>
                            <template v-else>
                                Не указано
                            </template>
                        </td>
                    </tr>
                    <tr v-if="!!userData.relationshipId">
                        <td class="">Семейное положение:</td>
                        <td class="">
                            {{userData.family}}
                            <template v-if="!!userData.profile.relationshipUser">
                                {{ userData.profile.relationshipUserText }}
                                <router-link
                                    :to="{ name: 'PersonalPage', params: { id: userData.profile.relationshipUser.id } }">
                                    {{ userData.profile.relationshipUser.profile.firstName }}
                                    {{ userData.profile.relationshipUser.profile.lastName }}
                                </router-link>
                            </template>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="plz-profile-userdetails-footer d-flex justify-content-around px-2 px-md-4">
                <div v-if="usrFollowersNumber > 0" class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-4 px-md-4">
                    <span class="numbers-top" v-html="sBeaty(usrFollowersNumber)"></span>
                    <span class="numbers-bottom">Подписчиков</span>
                </div>
                <div v-else class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-5 px-md-4">
                    <span class="numbers-bottom">Нет подписчиков</span>
                </div>
                <div v-if="usrFriendsNumber > 0" class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-4 px-md-4">
                    <span class="numbers-top" v-html="sBeaty(usrFriendsNumber)"></span>
                    <span class="numbers-bottom">Друзей</span>
                </div>
                <div v-else class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-5 px-md-4">
                    <span class="numbers-bottom">Нет друзей</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-4 px-md-4">
                    <span class="numbers-top" v-html="sBeaty(userData.photosNumber)"></span>
                    <span class="numbers-bottom">Фотографий</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-2 px-2 pt-md-4 px-md-4">
                    <span class="numbers-top" v-html="sBeaty(userData.videosNumber)"></span>
                    <span class="numbers-bottom">Видео</span>
                </div>
                <!--
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeaty(userData.audiosNumber)"></span>
                    <span class="numbers-bottom">Аудио</span>
                </div>
                -->
            </div>
        </div>
    </div>
</template>

<script>
    import IconAddUser from '../icons/IconAddUser.vue';
    import IconLocation from '../icons/IconLocation.vue';

    import FriendshipInvitationMixin from '../mixins/FriendshipInvitationMixin';

    import PliziUser from '../classes/PliziUser.js';
    import PliziAuthUser from '../classes/PliziAuthUser.js';
    import PliziAvatar from '../classes/User/PliziAvatar.js';


    export default {
        name: 'ProfileHeader',
        components: { IconLocation, IconAddUser},
        mixins: [FriendshipInvitationMixin],
        props: {
            userData: PliziUser | PliziAuthUser,
            isOwner: Boolean,
            isAddedToBlacklist: false,
        },
        computed: {
            fullWidth: function () {
                return this.isCanAddToFriends ? 'full-width' : '100%';

            },
            isCanAddToFriends() {
                return !(!!this.$root.$auth.frm.get(this.userData.id));
            },
            usrFriendsNumber() {
                // return (this.isOwner) ? this.userData.stats.totalFriendsCount : this.userData.friendsNumber;
                return this.userData.stats.totalFriendsCount;
            },

            usrFollowersNumber() {
                return this.userData.stats.followCount;
            },

            userAvatar() {
                return this.userData.avatar?.image?.medium.path || this.userData.userPic;
            }
        },

        methods: {
            sBeaty(param) {
                return this.$options.filters.statsBeauty(param);
            },

            // showProfileOptionsModal() {
            //     this.$root.$emit('showProfileOptionsModal', {user: this.userData, src: this.$route.name});
            // },

            showPersonalMsgDialog() {
                this.$emit('ShowPersonalMsgModal', {user: this.userData, src: this.$route.name});
            },

            async uploadUserAvatar() {
                if (this.isOwner !== true)
                    return;

                const formData = this.getFormData();

                if (!formData) {
                    return;
                }

                const {size} = formData.get('image');

                if (size > 2000000) {
                    this.showErrorOnLargeFile();
                    return;
                }

                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.userProfileImage(formData);
                } catch (e) {
                    if (e.status === 422) {
                        this.showErrorOnLargeFile();
                        return;
                    }

                    window.console.warn(e.detailMessage);
                }

                if (apiResponse !== null) {
                    this.$root.$auth.user.userPic = apiResponse.data.path;
                    this.$root.$auth.user.avatar = new PliziAvatar(apiResponse.data);
                    this.$refs.userAvatar.src = this.$root.$auth.user.avatar?.image?.medium.path || this.$root.$auth.user.userPic;
                    this.$root.$auth.storeUserData();
                    this.$root.$emit('updateUserAvatar', {userPic: this.$root.$auth.user.userPic});
                }
            },

            /**
             * @returns {boolean|FormData}
             */
            getFormData() {
                const fName = this.$refs.userAvatarFile.value;
                const fExt = fName.split('.').pop().toLowerCase();
                const allowExts = ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'];

                if (!allowExts.includes(fExt)) {
                    this.$alert(`<h4 class="text-white">Ошибка</h4><div class="alert alert-danger">
Недопустимое расширение у файла <b>${fName}</b><br />
Допустимы только: <b class="text-success">${allowExts.join(', ')}</b>
</div>`, `bg-danger`, 30);
                    return false;
                }

                const formData = new FormData();
                formData.append('image', this.$refs.userAvatarFile.files[0]);
                formData.append('tag', 'primary');
                this.$refs.userAvatarFile.value = '';

                return formData;
            },

            showErrorOnLargeFile() {
                this.$alert(`<h4 class="text-white">Ошибка</h4>
                <div class="alert alert-danger">
                    Превышен максимальный размер файла.
                    <br />
                    Максимальный размер файла:
                    <b class="text-success">2 MB</b>
                </div>`,
                    `bg-danger`,
                    30
                );
            },

            async follow() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$users.follow(this.userData.id);
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                if (apiResponse) {
                    if (apiResponse.status && apiResponse.status === 422) {
                        this.$root.$alert(apiResponse.message, 'bg-info', 3);
                    } else {
                        this.userData.stats.isFollow = true;
                        this.userData.stats.followCount = this.userData.stats.followCount + 1;
                        this.$root.$alert(apiResponse.message, 'bg-success', 3);
                    }
                } else {
                    this.$root.$alert(`Не получилось подписаться`, 'bg-warning', 3);
                }

                return true;

            },

            async unFollow() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$users.unFollow(this.userData.id);
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                if (apiResponse) {
                    if (apiResponse.status && apiResponse.status === 422) {
                        this.$root.$alert(apiResponse.message, 'bg-info', 3);
                    } else {
                        this.userData.stats.isFollow = false;
                        this.userData.stats.followCount = this.userData.stats.followCount - 1;
                        this.$root.$alert(apiResponse.message, 'bg-success', 3);
                    }
                } else {
                    this.$root.$alert(`Не получилось отписаться`, 'bg-warning', 3);
                }

                return true;

            },
            async getBlacklist() {
                let apiResponse = null;
                let res = null;

                try {
                    apiResponse = await this.$root.$api.$users.blacklistGet();
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                res = apiResponse.filter(user => user.id === this.userData.id);

                if (res.length) {
                    this.isAddedToBlacklist = true;
                    console.log('user is in the blacklist');
                }
            },
            async addToBlacklist() {
                if (this.isAddedToBlacklist === false) {
                    let apiResponse = null;
                    try {
                        apiResponse = await this.$root.$api.$users.blacklistAdd(this.userData.id);
                    } catch (e) {
                        if (e.status === 422) {
                            (console.log('выбранный пользователь уже добавлен в ваш черный список'));
                            this.isAddedToBlacklist = true;
                            return;
                        }
                        window.console.warn(e.detailMessage);
                    }

                    this.isAddedToBlacklist = true;
                    this.$root.$alert(`Вы добавили пользователя в черный список`, 'bg-success', 3);
                } else {
                    this.$root.$alert(`Пользователь уже внесен в черный список`, 'bg-warning', 3);
                }
                return true;
            }
        },

        async mounted() {
            await this.getBlacklist();
        },
    }
</script>
