<template>
    <div class="row">
        <div class="col-5 px-0">
            <LoginForm></LoginForm>
        </div>

        <div class="col-7 pr-0 pb-0" style="padding-left: 24px;">
            <LastEntries></LastEntries>
            <PliziMobile></PliziMobile>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import LastEntries from '../components/LastEntries.vue';
import PliziMobile from '../components/PliziMobile.vue';

export default {
name: 'LoginPage',
components: {LoginForm, LastEntries, PliziMobile},
data() {
    return {

    }
},

mounted() {
    this.$root.$emit('afterSuccessLogout', {});
}

}
</script>

<style>
    .loginPage-wrap {
        height: 100%;
        min-height: 800px;
    }
</style>
