<template>
    <div class="row">
        <div class="col-12 col-lg-5 px-0 mb-3 mb-lg-0">
            <LoginForm ref="loginForm"></LoginForm>
        </div>

        <div class="col-12 col-lg-7 pr-0 pl-0 pl-lg-3 pb-0" >
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
            logInWithEntryItem(entry) {
                if (! entry)
                    return;

                if (entry.isUser) {
                    this.$refs.loginForm.model.email = entry.email;
                    this.$refs.loginForm.model.password = `secret`;
                    this.$refs.loginForm.startLogin();
                }
                else {
                    this.$refs.loginForm.openRegistrationModal();
                }
            },
        },
        mounted() {
            this.$root.$emit('afterSuccessLogout', {redirect: false});
        },
    }
</script>
