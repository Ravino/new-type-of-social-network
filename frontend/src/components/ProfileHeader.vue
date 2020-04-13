<template>
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-md-3 pl-0">
            <div class="plz-profile-userpic-container h-100 bg-white-br20 overflow-hidden">
                <div class="plz-profile-userpic-wrapper">
                    <img ref="userAvatar" :src="userData.userPic" :alt="userData.fullName" class="plz-br20-top" />

                    <div v-if="isOwner===true" class="plz-profile-userpic-footer">
                        <label for="userAvatarFile" class="plz-profile-userpic-edit d-flex align-items-center justify-content-between">
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
                        <div class="plz-profile-userpic-edit d-flex align-items-center justify-content-between overflow-hidden d-flex m-0 p-0"
                               @click="showPersonalMsgDialog()">
                            <button class="btn align-items-center justify-content-center d-flex w-75 border-right">Написать</button>
                            <button class="btn align-items-center justify-content-center d-flex w-25">
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
import {HTTPer} from '../httper/httper.js';

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

    uploadUserAvatar(){
        if (this.isOwner!==true)
            return;

        const fName = this.$refs.userAvatarFile.value;
        const fExt = fName.split('.').pop().toLowerCase();
        const allowExts = ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'];

        if ( ! allowExts.includes(fExt) ) {
            // TODO: @TGA добавить потом сюда модальное окно для этой ошибки
            window.console.warn(`Недопустимое расширение у файла ${fName}\r\nДопустимы только: ${allowExts.join(', ')}`);
            return;
        }

        const formData = new FormData();
        const imagefile = document.querySelector('#userAvatarFile');
        formData.append('image', imagefile.files[0]);
        formData.append('tag', 'primary');

        const gwt = this.$store.getters.gwToken;
        const headers = {
            headers : {
                'Authorization': `Bearer ${gwt}`,
                'Content-Type' : 'multipart/form-data'
            }
        };

        HTTPer.post('/api/user/profile/image', formData, headers)
            .then((response) => {
                if (response.status === 200) {
                    this.$root.$user.userPic = response.data.path;

                    this.$refs.userAvatar.src = this.$root.$user.userPic;

                    this.$root.$emit('updateUserAvatar', {userPic: this.$root.$user.userPic});
                }
            })
            .catch((error) => {
                if (error.response.status >= 400) {
                    window.console.clear();
                    window.console.log(error.response.data);
                    window.console.warn(error.response.status + ': ' + error.response.statusText + ': ' + error.response.data.message);
                }
                else {
                    window.console.warn(error.toString());
                }
            });
    },

},

//computed : {
//    userData() {
//        return this.$root.$user;
//    },
//}

}
</script>

<style scoped lang="scss">
input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
</style>
