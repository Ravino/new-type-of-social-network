<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-8 col-xl-8">
            <div class="row">
                <CommunitiesListHeader></CommunitiesListHeader>

                <div class="col-sm-8 col-md-8 col-lg-12 col-xl-12 bg-white-br20">
                    <div v-if="isPopularCommunitiesLoaded" class="row plizi-communities-list ">
                        <ul v-if="popularCommunities  &&  popularCommunities.length>0" class="d-block w-100 p-0">
                            <transition-group name="slide-fade" :duration="700">
                                список популярных сообществ тут
                            </transition-group>
                        </ul>
                        <div v-else class="alert alert-success p-5 w-100 text-center">
                            Нет ни одного популярного сообщества.
                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>
        </div>

        <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <RecommendedCommunities></RecommendedCommunities>
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
        isPopularCommunitiesLoaded: true,
        popularCommunities: []
    }
},

methods : {

},

}
</script>
