<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-11 col-lg-9 col-xl-10 ">
                <div class="row">
                    <CommunitiesListHeader></CommunitiesListHeader>
                    <CommunityCreateBlock></CommunityCreateBlock>
                </div>

                <div class="row">
                    <div class="col-12 col-lg-8 col-xl-9 mb-4 px-4 py-0">
                        <div class="row" v-if="isManagedCommunitiesLoaded">
                            <ul v-if="managedCommunities  &&  managedCommunities.length>0"
                                class="plizi-communities-list w-100 d-flex justify-content-between flex-wrap p-0">
                                <CommunityItem v-for="(comItem, comIndex) in managedCommunities"
                                               :community="comItem"
                                               :canSubscribe="false"
                                               :key="comIndex">
                                </CommunityItem>
                            </ul>
                            <div v-else class="container px-2 ">
                                <div  class=" bg-white-br20 p-3">
                                    <div  class="alert alert-info w-100 py-4 text-center m-0">
                                        У Вас нет сообществ для модерации.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-else class="row">
                            <Spinner></Spinner>
                        </div>
                    </div>

                    <div class="col-12 col-lg-4 col-xl-3  mb-4  d-flex pl-3 pl-lg-0 ">
                        <RecommendedCommunities></RecommendedCommunities>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-xl-1 d-none d-lg-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
    </div>
</template>

<script>
    import CommunitiesListMixin from '../mixins/CommunitiesListMixin.js';

    export default {
        name: 'CommunitiesManagePage',
        components: {},
        mixins: [CommunitiesListMixin],

        data() {
            return {}
        },
        methods: {},
        mounted() {
            this.loadManagedCommunities();
        }
    }
</script>
