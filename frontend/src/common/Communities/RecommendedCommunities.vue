<template>
    <div id="recommendedCommunities" class="plz-potential-friends">

        <div class="d-flex flex-row justify-content-start pb-3 --pt-5">
            <h6 class="plz-sf-title w-auto mt-2 ml-3">Рекомендуемые</h6>
        </div>

        <div class="plz-recommended-communities-list pb-2">
            <RecommendedItem v-for="community in communities" :community="community"></RecommendedItem>
        </div>
    </div>
</template>

<script>
    import PliziCommunity from "../../classes/PliziCommunity.js";
    import RecommendedItem from "./RecommendedItem.vue";

    export default {
        name: 'RecommendedCommunities',
        components: {RecommendedItem},
        data() {
            return {
                isDataReady: false,
                communities: [],
            };
        },
        methods: {
            async getList() {
                this.isDataReady = false;
                this.communities = [];
                let apiResponse = null;

                try {
                    apiResponse = await this.$root.$api.$communities.recommended()
                } catch (e) {
                    window.console.warn(e.detailMessage);
                }

                if (apiResponse !== null) {
                    this.communities = [];

                    apiResponse.list.map((srItem) => {
                        this.communities.push(new PliziCommunity(srItem));
                    });

                    this.isDataReady = true;
                }
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>
