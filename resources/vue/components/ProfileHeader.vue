<template>
        <!--    h280-->
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-md-3 pl-0">
            <div class="plz-profile-userpic-container h-100 bg-white-br20 overflow-hidden">
                <div class="plz-profile-userpic-wrapper ">
                    <img :src="user.userPic"
                         :alt="user.firstname +` `+ user.lastname"
                         class="plz-br20-top" />
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
                    <h2 class="plz-user-name">{{user.firstname}} {{user.lastname}}</h2>
                    <span class="online">В сети</span> <!--  v-if="user.isOnline"-->
                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr>
                        <td class="">Дата рождения:</td>
                        <td class="">{{user.birthday}}</td>
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
                    <span class="numbers-top ">12K</span>
                    <span class="numbers-bottom">Подписчиков </span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top ">456</span>
                    <span class="numbers-bottom">Дузей</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top ">1 784</span>
                    <span class="numbers-bottom">Фотографий</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top ">62</span>
                    <span class="numbers-bottom">Видео</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-4">
                    <span class="numbers-top ">3К</span>
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
}

}
</script>

