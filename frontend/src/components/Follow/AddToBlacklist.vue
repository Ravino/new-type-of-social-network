<template>
    <small @click="addToBlacklist" style="cursor: pointer;">
        <i class="fas fa-user-slash"></i>
    </small>
</template>

<script>
    import PliziUser from "../../classes/PliziUser.js";

    export default {
        name: "AddToBlacklist",
        props: {
            userData: PliziUser,
        },
        methods: {
            async addToBlacklist() {
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$users.blacklistAdd(this.userData.id);
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                return true;

            }
        }
    }
</script>

<style scoped>

</style>
