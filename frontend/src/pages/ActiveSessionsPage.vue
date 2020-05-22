<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-9 col-xl-9 px-0 px-md-3">
                <div id="activeSessions" class="container-fluid bg-white-br20 plz-mb20">
                    <div class="row">
                        <ul v-if="activeSessions && activeSessions.length" class="list-group">
                            <li v-for="(activeSession, index) in activeSessions" class="list-group-item">{{ activeSession.ip }} - {{ activeSession.userAgent }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0  px-0 px-md-3">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
    </div>
</template>

<script>
    import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
    import FavoriteFriends from '../common/FavoriteFriends.vue';

    export default {
        name: "ActiveSessionsPage",
        components: {
            AccountToolbarLeft,
            FavoriteFriends,
        },
        data() {
            return {
                activeSessions: [],
            }
        },
        methods: {
            async getActiveSessions() {
                let response;

                try {
                    response = await this.$root.$api.$users.getActiveSessions();
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (response) {
                    this.activeSessions = response;
                }
            }
        },
        async mounted() {
            await this.getActiveSessions();
        },
    }
</script>

<style scoped>

</style>
