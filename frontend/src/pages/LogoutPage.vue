<template>
    <div class="alert alert-info">Выходим...</div>
</template>

<script>
export default {
name: 'LogoutPage',
data() {
    return {

    }
},

beforeMount() {
    this.$root.$isAuth = false;

    window.localStorage.removeItem('pliziJWToken');
    window.localStorage.removeItem('pliziUser');
    window.localStorage.removeItem('pliziChatChannel');

    this.$router.push({path: '/login'});
},


}
</script>
