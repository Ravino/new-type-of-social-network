<template>
    <small @click="addToBlacklist" class="cursor-pointer ml-2" title="Добавить в чёрный список">
        <i v-if="!isAddedToBlacklist" class="fas fa-user-slash text-danger"></i>
        <i v-else class="fas fa-user-slash text-black-50"></i>
    </small>
</template>

<script>
    import PliziUser from "../../classes/PliziUser.js";

    export default {
        name: "AddToBlacklist",
        props: {
            userData: PliziUser,
            isAddedToBlacklist: Boolean
        },
        data() {
            return {
                isAddedToBlacklistInner: false
            }
        },
        methods: {
            checkIfAdded() {
                this.$emit('checkIfAdded', this.isAddedToBlacklistInner);
            },
            async addToBlacklist() {
                let apiResponse = null;
                try {
                    apiResponse = await this.$root.$api.$users.blacklistAdd(this.userData.id);
                } catch (e) {
                    if (e.status === 422) {
                        (console.log('выбранный пользователь уже добавлен в ваш черный список'));
                        this.isAddedToBlacklistInner = true;
                        this.checkIfAdded();
                        return;
                    }
                    window.console.warn(e.detailMessage);
                }
                this.isAddedToBlacklistInner = true;
                this.checkIfAdded();
                return true;
            }

        }
    }
</script>

<style scoped>

</style>
