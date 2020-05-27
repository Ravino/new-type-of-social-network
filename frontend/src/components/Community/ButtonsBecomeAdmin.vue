<template>
    <a class="text-body" @click.stop="doClick">
        become admin
    </a>
</template>

<script>
    import PliziMember from "../../classes/PliziMember.js";

    export default {
        name: "ButtonsBecomeAdmin",
        props: {
            srItem: PliziMember,
            communityId: String,
        },
        methods: {
            async doClick() {
                let apiResponse;

                try {
                    apiResponse = await this.$root.$api.$communities.becomeAdmin(this.communityId, this.srItem.id);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    this.srItem.role = 'admin';
                    this.$root.$alert('Пользователь назначен администратором сообщества', 'bg-info', 3);
                }
            }
        },
    }
</script>
