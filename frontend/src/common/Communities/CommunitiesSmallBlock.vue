<template>
    <div id="recommendedCommunities" class="plz-potential-friends bg-white-br20">

        <div v-if="title" class="d-flex flex-row justify-content-start pb-3 --pt-5">
            <h6 class="plz-sf-title w-auto mt-3 ml-3">{{ title }}</h6>
        </div>

        <div class="plz-recommended-communities-list pb-2">
            <template v-if="communities.list">
                <RecommendedItem v-for="community in communities.list"
                                 :key="community.id"
                                 :community="community"/>
            </template>
           <template v-else>
               <RecommendedItem v-for="community in communities"
                                :key="community.id"
                                :community="community"/>
           </template>

        </div>

        <div v-if="footer" class="d-flex flex-row footer-link justify-content-start pb-3 --pt-5 border-top">
            <router-link :to="footer.path" tag="a" class="ml-4 mt-2">{{ footer.title }}</router-link>
        </div>
    </div>
</template>

<script>
    import RecommendedItem from "./RecommendedItem.vue";

    export default {
        name: 'CommunitiesSmallBlock',
        components: {RecommendedItem},
        props: {
          communities: Array,
            title: String,
            footer: Object
        },
        data() {
            return {
            };
        },
    }
</script>
