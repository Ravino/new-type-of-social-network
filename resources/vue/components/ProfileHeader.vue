<template>
    <!--    h280-->
    <div id="profileHeader" class="row plz-profile-header">
        <div class="col-4">
            <div class="plz-profile-userpic-wrapper bg-white-br20">
                <img :src="user.userPic" :alt="user.firstname +` `+ user.lastname" class="plz-br20-top" />
            </div>
        </div>
        <div class="col-8 pr-0 pl-1">
            <div class="w-100 bg-white-br20">
                <h2 class="plz-user-name">{{user.firstname}} {{user.lastname}}</h2>
                <img v-if="user.isOnline" src="/images/companion-is-online.png" alt="в сети" />

                <table class="plz-user-profile-details table table-borderless">
                    <tbody>
                    <tr>
                        <th scope="row" class="">Дата рождения</th>
                        <td class="">{{user.birthday}}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="">Город</th>
                        <td class=""><i class="fas fa-map-marker-alt"></i> {{user.country}}, {{user.city}}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="">Семейное положение</th>
                        <td class="">{{user.family}}</td>
                    </tr>
                    </tbody>
                </table>
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
    }

    .plz-user-profile-details th, .plz-user-profile-details td {
        font-weight: normal;
        text-align: left;
        color: #9A9A9A;
        width: auto;
    }

    .plz-user-profile-details td {
        color: #515151;
    }
</style>
