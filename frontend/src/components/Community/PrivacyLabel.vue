<template>
    <p class="plizi-community-privacy-label mb-0"
       :class="{'text-red' : privacyLabel == 'Закрытое',
                'text-blue' : privacyLabel == 'Приватное', }">
        {{privacyLabel}} сообщество
    </p>
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
                        return 'Открытое';
                }
            },
        }
    }
</script>
