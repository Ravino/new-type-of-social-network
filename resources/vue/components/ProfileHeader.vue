<template>
        <!--    h280-->
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-md-3 pl-0">
            <div class="plz-profile-userpic-container h-100 bg-white-br20 overflow-hidden">
                <div class="plz-profile-userpic-wrapper ">
                    <img :src="user.userPic" :alt="user.fullName" class="plz-br20-top" />
                    <div class="plz-profile-userpic-footer">
                        <a class="plz-profile-userpic-edit d-flex align-items-center justify-content-between">
                            <span class="align-items-center justify-content-center d-flex w-75 border-right">Редактировать</span>
                            <span class="align-items-center justify-content-center d-flex w-25">
                                <span class="ps-dot"></span>
                                <span class="ps-dot"></span>
                                <span class="ps-dot"></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-9 px-0 py-4 plz-profile-userdetails">
            <div class="w-100 bg-white-br20 px-5 pb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h2 class="plz-user-name">{{user.fullName}}</h2>
                    <span v-if="user.isOnline" class="online">В сети</span>
                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr>
                        <td class="">Дата рождения:</td>
                        <td class="">{{user.birthday | toLongDate}}</td>
                    </tr>
                    <tr>
                        <td class="">Город:</td>
                        <td class=""><i class="fas fa-map-marker-alt"></i> {{user.country}}, {{user.city}}</td>
                    </tr>
                    <tr>
                        <td class="">Семейное положение:</td>
                        <td class="">{{user.family}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="plz-profile-userdetails-footer d-flex justify-content-around px-4">
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeady(user.subscribersNumber)"></span>
                    <span class="numbers-bottom">Подписчиков</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeady(user.friendsNumber)"></span>
                    <span class="numbers-bottom">Друзей</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeady(user.photosNumber)"></span>
                    <span class="numbers-bottom">Фотографий</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeady(user.videosNumber)"></span>
                    <span class="numbers-bottom">Видео</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top" v-html="sBeady(user.audiosNumber)"></span>
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
    user: Object
},
data () {
    return {
    }
},

methods: {
    sBeady(param){
        // return Vue.filter('statsBeauty')(param);
        return this.$options.filters.statsBeauty(param);
    }
},

}
</script>

