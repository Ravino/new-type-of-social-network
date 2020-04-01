<template>
    <div class="row pt-5">
        <div class="col-4 offset-1">
            <LoginForm></LoginForm>
        </div>

        <div class="col-6">
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
