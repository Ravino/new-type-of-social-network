<template>
    <span class="pl-2" v-if="!userData.stats.isFriend">
        <AddFollow :userData="userData" v-if="!userData.stats.isFollow"></AddFollow>
        <SubFollow :userData="userData" v-else-if="!userData.isOwner"></SubFollow>
        <AddToBlacklist :userData="userData"></AddToBlacklist>
    </span>
</template>

<script>
    import PliziUser from "../../classes/PliziUser.js";
    import PliziAuthUser from "../../classes/PliziAuthUser.js";
    import SubFollow from "./SubFollow.vue";
    import AddFollow from "./AddFollow.vue";
    import AddToBlacklist from "./AddToBlacklist.vue";

    export default {
        name: "ButtonsFollow",
        components: {AddToBlacklist, AddFollow, SubFollow},
        props: {
            userData: PliziUser | PliziAuthUser,
        },
    }
</script>

<style scoped>

</style>
