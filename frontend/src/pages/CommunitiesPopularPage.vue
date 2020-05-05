<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <CommunitiesListHeader></CommunitiesListHeader>
                <CommunityCreateBlock></CommunityCreateBlock>
            </div>

            <div class="row">
                <div class="col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <div v-if="isPopularCommunitiesLoaded" class="plizi-communities-list">
                        <ul v-if="popularCommunities  &&  popularCommunities.length>0" class="d-flex flex-column --w-100 p-0">
                                <CommunityItem v-for="(comItem, comIndex) in popularCommunities"
                                               v-bind:community="comItem"
                                               v-bind:canSubscribe="isSubscribed(comItem.id)"
                                               v-bind:key="comIndex">
                                </CommunityItem>
                        </ul>
                        <div v-else class="alert alert-success p-5 w-100 text-center">
                            Нет ни одного популярного сообщества.
                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <RecommendedCommunities></RecommendedCommunities>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>
    </div>
</template>

<script>
import CommunitiesListMixin from '../mixins/CommunitiesListMixin.js';

export default {
name : 'CommunitiesPopularPage',
components : {
},
mixins: [CommunitiesListMixin],

data(){
    return {

    }
},

methods : {

},

mounted(){
    this.loadCommunities();
    this.loadPopularCommunitites();
}

}
</script>
