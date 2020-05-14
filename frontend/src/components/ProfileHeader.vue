<template>
    <div id="profileHeader" class="row plz-profile-header mb-4">
        <div class="offset-1 col-10 offset-sm-3 col-sm-6 offset-md-4 col-md-4 offset-lg-0 col-lg-4 col-xl-3 pl-lg-0 mb-4 mb-lg-0">
            <div class="plz-profile-userpic-container d-flex flex-column  bg-white-br20 overflow-hidden">
                <div class="plz-profile-userpic-wrapper overflow-hidden position-relative d-flex align-items-center justify-content-center mx-auto m-lg-0">
                    <img ref="userAvatar" :src="userAvatar" :alt="userData.fullName" />
                </div>

                <div v-if="isOwner===true" class="plz-profile-userpic-footer mt-auto">
                    <div class="plz-profile-userpic-edit file-label d-flex align-items-center justify-content-between">
                        <label for="userAvatarFile" class="btn align-items-center justify-content-center d-flex w-75 border-right m-0">Редактировать</label>

                        <button class="btn align-items-center justify-content-center d-flex w-25" @click="showProfileOptionsModal()" title="опции">
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                            <span class="ps-dot"></span>
                        </button>
                    </div>
                    <input id="userAvatarFile" ref="userAvatarFile" type="file" @change="uploadUserAvatar()" class="d-none" />
                </div>

                <div v-else class="plz-profile-userpic-footer">
                    <div class="plz-profile-userpic-edit d-flex align-items-center justify-content-between overflow-hidden d-flex m-0 p-0">
                        <button class="btn align-items-center justify-content-center d-flex w-75 border-right" @click="showPersonalMsgDialog()">Написать</button>
                        <button class="btn align-items-center justify-content-center d-flex w-25" @click="sendFriendshipInvitation(userData.id, userData.fullName)" title="добавить в друзья">
                            <IconAddUser/>
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-12  col-lg-8 col-xl-9 px-0 py-4 plz-profile-userdetails">
            <div class="w-100 bg-white-br20 px-5 pb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="plz-user-name">{{userData.fullName}}</h2>
                    <span v-if="userData.isOnline" class="online">В сети</span>
                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr>
                        <td class="">Дата рождения:</td>
                        <td class="">
                            <template v-if="userData.profile.birthday">
                                {{ userData.profile.birthday | toLongDate }}
                            </template>
                            <template v-else>
                                Не указано
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td class="">Город:</td>
                        <td class="">
                            <template v-if="userData.country && userData.city.title">
                                <IconLocation />
                                {{userData.country.title.ru}}, {{userData.city.title.ru}}
                            </template>
                            <template v-else>
                                Не указано
                            </template>
                        </td>
                    </tr>
                    <tr v-if="!!userData.relationshipId">
                        <td class="">Семейное положение:</td>
                        <td class="">{{userData.family}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="plz-profile-userdetails-footer d-flex justify-content-around px-4">
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeaty(userData.subscribersNumber)"></span>
                    <span class="numbers-bottom">Подписчиков</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeaty(usrFriendsNumber)"></span>
                    <span class="numbers-bottom">Друзей</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeaty(userData.photosNumber)"></span>
                    <span class="numbers-bottom">Фотографий</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
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
import IconLocation from '../icons/IconLocation';

import PliziUser from '../classes/PliziUser.js';
import PliziAuthUser from '../classes/PliziAuthUser.js';
import PliziAvatar from '../classes/User/PliziAvatar';
import FriendshipInvitationMixin from '../mixins/FriendshipInvitationMixin';

export default {
name: 'ProfileHeader',
components: {IconLocation, IconAddUser},
mixins: [FriendshipInvitationMixin],
props: {
    userData: PliziUser|PliziAuthUser,
    isOwner : Boolean
},
data() {
    return {
    }
},
computed: {
    usrFriendsNumber(){
        return (this.isOwner) ? this.userData.stats.totalFriendsCount : this.userData.friendsNumber;
    },
    userAvatar() {
        return this.userData.avatar?.image?.medium.path || this.userData.userPic;
    }
},
methods: {
    sBeaty(param){
        return this.$options.filters.statsBeauty(param);
    },


    showProfileOptionsModal(){
        this.$root.$emit('showProfileOptionsModal', { user: this.userData, src : this.$route.name });
    },


    showPersonalMsgDialog(){
        this.$root.$emit('showPersonalMsgModal', { user: this.userData, src : this.$route.name });
    },

    async uploadUserAvatar(){
        if (this.isOwner!==true)
            return;

        const formData = this.getFormData();

        if (!formData) {
            return;
        }

        const { size } = formData.get('image');

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
    getFormData(){
        const fName = this.$refs.userAvatarFile.value;
        const fExt = fName.split('.').pop().toLowerCase();
        const allowExts = ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'];

        if ( ! allowExts.includes(fExt) ) {
            this.$alert(`<h4 class="text-white">Ошибка</h4><div class="alert alert-danger">
Недопустимое расширение у файла <b>${fName}</b><br />
Допустимы только: <b class="text-success">${allowExts.join( ', ' )}</b>
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
    }
}

}
</script>
