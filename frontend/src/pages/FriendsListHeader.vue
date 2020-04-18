<template>
    <div class="row">
        <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 pr-3">
            <div class="p-4 bg-white-br20">
                Мои друзья |
                <router-link tag="a" to="/invitations">Заявки в друзья</router-link>
                | <b>Новые друзья</b>
            </div>
        </div>
        <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 bg-white-br20">
            <div class="p-4">поиск друзей</div>
        </div>
    </div>
</template>

<script>
export default {
name : 'FriendsListHeader'
}
</script>
