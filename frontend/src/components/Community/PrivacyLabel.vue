<template>
    <mark><small class="text-muted">{{privacyLabel}}</small></mark>
</template>

<script>
    import PliziCommunity from '../../classes/PliziCommunity.js';

    export default {
        name: "PrivacyLabel",
        props: {
            community: PliziCommunity
        },
        computed: {
            privacyLabel() {
                switch (this.community?.privacy) {
                    case 1:
                        return 'Открытое';
                    case 2:
                        return 'Закрытое';
                    case 3:
                        return 'Приватное';
                    default:
                        return '';
                }
            },
        }
    }
</script>
