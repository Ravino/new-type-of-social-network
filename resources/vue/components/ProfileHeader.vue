<template>
    <!--    h280-->
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-4">
            <div class="plz-profile-userpic-wrapper bg-white-br20">
                <img :src="user.userPic" :alt="user.firstname +` `+ user.lastname" class="plz-br20-top" />
                <div class="plz-profile-userpic-footer">
                    <div class="plz-profile-userpic-edit">
                        <span>РЕдактировать</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8 px-0 py-4 plz-profile-userdetails">
            <div class="w-100 bg-white-br20 px-4 pb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h2 class="plz-user-name">{{user.firstname}} {{user.lastname}}</h2>
                   <span  class="online">В сети</span> <!--  v-if="user.isOnline"-->

                </div>

                <table class="plz-user-profile-details table table-borderless mt-2">
                    <tbody>
                    <tr>
                        <td scope="row" class="">Дата рождения:</td>
                        <td class="">{{user.birthday}}</td>
                    </tr>
                    <tr>
                        <td scope="row" class="">Город:</td>
                        <td class=""><i class="fas fa-map-marker-alt"></i> {{user.country}}, {{user.city}}</td>
                    </tr>
                    <tr>
                        <td scope="row" class="">Семейное положение:</td>
                        <td class="">{{user.family}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="plz-profile-userdetails-footer d-flex justify-content-around">
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-1">
                    <span class="numbers-top ">12K</span>
                    <span class="numbers-bottom">Подписчиков </span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-1">
                    <span class="numbers-top ">456</span>
                    <span class="numbers-bottom">Дузей</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-1">
                    <span class="numbers-top ">1 784</span>
                    <span class="numbers-bottom">Фотографий</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-1">
                    <span class="numbers-top ">62</span>
                    <span class="numbers-bottom">Видео</span>
                </div>
                <div class="plz-profile-userdetails-numbers text-center pt-4 px-1">
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

<style>
    .plz-profile-userpic-wrapper {
        width: 245px;
        max-width: 245px;
        min-width: 245px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
    }

    .plz-profile-userpic-edit {
        display: block;
        height: 34px;
        margin: 16px;
        line-height: 32px;
        padding: 0;
        border: 2px solid #f0f0f0;
        border-radius: 20px;
        text-align: center;
    }
    .plz-profile-userpic-edit span {
        text-transform: uppercase;
        color: #6f7487;
        text-align: center;
        font-family: OpenSans-Bold, sans-serif;
    }
    .plz-user-profile-details td {
        color: #515151;
    }
    .plz-profile-userdetails {
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
    }
    .plz-profile-userdetails .online{
        position: relative;
        font-family: OpenSans, sans-serif;
        margin: 0;
        color: #acacac
    }
    .plz-profile-userdetails .online:after {
        content: '';
        position: absolute;
        top: 50%;
        left: -20px;
        display: inline-block;
        vertical-align: top;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        background-color: #9fcd48;
        transform: translateY(-60%);
    }
    .plz-user-name {
        font-size: 16px;
        color: #4e4e4d;
        font-family: OpenSans-Bold, sans-serif;
        font-weight: bold;
    }

    .plz-user-profile-details td {
        font-weight: normal;
        text-align: left;
        color: #9A9A9A;
        width: auto;
        padding: 5px 0;
    }
    .plz-user-profile-details td:last-child {
        color: #515151;
    }
    .plz-profile-userdetails .bg-white-br20 {
        border-bottom: 2px solid #f0f0f0;
    }
    .plz-profile-userdetails-numbers {
        display: inline-block;
        text-align: center;
    }

    .numbers-top {
        display: block;
        font-family: OpenSans-Semibold, sans-serif;
        font-size: 24px;
        color: #363636;
        font-weight: bold;
    }
    .numbers-bottom {
        display: block;
        font-family: OpenSans, sans-serif;
        font-size: 13px;
        color: #9a9a9a;
    }

</style>
