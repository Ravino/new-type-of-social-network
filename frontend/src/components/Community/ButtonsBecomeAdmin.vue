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
            srItem: PliziMember
        },
        methods: {
            doClick() {
                this.$root.$alert('become admin', 'bg-info', 3);
            }
        },
    }
</script>
