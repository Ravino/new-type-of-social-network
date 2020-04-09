<template>
    <div class="row">
        <div class="col-5 px-0">
            <LoginForm ref="loginForm"></LoginForm>
        </div>

        <div class="col-7 pr-0 pb-0" style="padding-left: 24px;">
            <LastEntries @logInWithEntryItem="logInWithEntryItem"></LastEntries>
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
            return {}
        },
        methods: {
            logInWithEntryItem(entries) {
                if (entries && entries.isUser) {
                    this.$refs.loginForm.model.email = "user@mail.com";
                    this.$refs.loginForm.model.password = "secret";
                    this.$refs.loginForm.startLogin();
                }
            },
        },
        mounted() {
            this.$root.$emit('afterSuccessLogout', {redirect: false});
        },
    }
</script>

<style lang="scss" src="../styles/LoginPage.scss"></style>
