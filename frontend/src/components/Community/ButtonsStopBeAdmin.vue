<template>
    <a class="text-body" @click.stop="doClick">
        stop be admin
    </a>
</template>

<script>
    import PliziMember from "../../classes/PliziMember.js";

    export default {
        name: "ButtonsStopBeAdmin",
        props: {
            srItem: PliziMember,
            communityId: String,
        },
        methods: {
            async doClick() {
                let apiResponse;

                try {
                    apiResponse = await this.$root.$api.$communities.stopBeAdmin(this.communityId, this.srItem.id);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    this.srItem.role = 'user';
                    this.$root.$alert('Пользователь удален из администраторов сообщества', 'bg-info', 3);
                }
            }
        },
    }
</script>
