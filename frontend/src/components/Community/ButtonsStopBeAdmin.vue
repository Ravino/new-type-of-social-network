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
            srItem: PliziMember
        },
        methods: {
            doClick() {
                this.$root.$alert('stop be admin', 'bg-info', 3);
            }
        },
    }
</script>
