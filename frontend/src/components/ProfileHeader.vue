<template>
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-md-3 pl-0">
            <div class="plz-profile-userpic-container h-100 bg-white-br20 overflow-hidden">
                <div class="plz-profile-userpic-wrapper">
                    <img ref="userAvatar" :src="userData.userPic" :alt="userData.fullName" class="plz-br20-top" />

                    <div v-if="isOwner===true" class="plz-profile-userpic-footer">
                        <label for="userAvatarFile" class="plz-profile-userpic-edit file-label d-flex align-items-center justify-content-between">
                            <span class="align-items-center justify-content-center d-flex w-75 border-right">Редактировать</span>
                            <span class="align-items-center justify-content-center d-flex w-25">
                                <span class="ps-dot"></span>
                                <span class="ps-dot"></span>
                                <span class="ps-dot"></span>
                            </span>
                        </label>
                        <input id="userAvatarFile" ref="userAvatarFile" type="file" @change="uploadUserAvatar()" />
                    </div>

                    <div v-else class="plz-profile-userpic-footer">
                        <div class="plz-profile-userpic-edit d-flex align-items-center justify-content-between overflow-hidden d-flex m-0 p-0">
                            <button class="btn align-items-center justify-content-center d-flex w-75 border-right" @click="showPersonalMsgDialog()">Написать</button>
                            <button class="btn align-items-center justify-content-center d-flex w-25" @click="sendFriendshipInvitation()" title="добавить в друзья">
                                <i class="fas fa-user-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-9 px-0 py-4 plz-profile-userdetails">
            <div class="w-100 bg-white-br20 px-5 pb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="plz-user-name">{{userData.fullName}}</h2>
                    <span v-if="userData.isOnline" class="online">В сети</span>
                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr>
                        <td class="">Дата рождения:</td>
                        <td class="">{{userData.birthday | toLongDate}}</td>
                    </tr>
                    <tr>
                        <td class="">Город:</td>
                        <td class=""><i class="fas fa-map-marker-alt"></i> {{userData.country}}, {{userData.city}}</td>
                    </tr>
                    <tr>
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
                    <span class="numbers-top" v-html="sBeaty(userData.friendsNumber)"></span>
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
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeaty(userData.audiosNumber)"></span>
                    <span class="numbers-bottom">Аудио</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'ProfileHeader',
props: {
    userData: Object,
    isOwner : false
},
data() {
    return {
    }
},

methods: {
    sBeaty(param){
        return this.$options.filters.statsBeauty(param);
    },


    showPersonalMsgDialog(){
        this.$root.$emit('showPersonalMsgModal', { user: this.userData, src : this.$route.name });
    },


    async sendFriendshipInvitation(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.sendFriendshipInvitation(this.userData.id);
        }
        catch (e) {
            window.console.warn(e.detailMessage);
            return;
        }

        if (apiResponse !== null) {
            if (apiResponse.status === 200) {
                this.$alert(`<h6>Приглашение дружить</h6>
<div class="alert alert-info">
    Приглашение дружбы для <b class="friend-name">${this.userData.fullName}</b> отправлено!
</div>`, `bg-success`, 10);
            }

            if (apiResponse.status === 422) {
                this.$alert(`<h6>Приглашение дружить</h6>
<div class="alert alert-info">${apiResponse.message}.</div>`, `bg-info`, 10);
            }
        }
    },


    async uploadUserAvatar(){
        if (this.isOwner!==true)
            return;

        const formData = this.getFormData();

        if (! formData)
            return;

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.userProfileImage(formData);
        }
        catch (e) {
            window.console.warn(e.detailMessage);
        }

        if (apiResponse !== null) {
            this.$root.$user.userPic = apiResponse.data.path;
            this.$refs.userAvatar.src = this.$root.$user.userPic;
            this.$root.$emit('updateUserAvatar', {userPic: this.$root.$user.userPic});
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
        const imageFile = document.querySelector('#userAvatarFile');
        formData.append('image', imageFile.files[0]);
        formData.append('tag', 'primary');

        return formData;
    }
}

}
</script>

<style scoped lang="scss">
input[type="file"] {
    display: none;
}
</style>
