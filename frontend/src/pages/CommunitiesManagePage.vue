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
                <div class="bg-white-br20 col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <div v-if="isManagedCommunitiesLoaded" class="row plizi-communities-list ">
                        <ul v-if="managedCommunities  &&  managedCommunities.length>0" class="d-block w-100 p-0">
                            <transition-group name="slide-fade" :duration="700">
                                список модерируемых сообществ тут
                            </transition-group>
                        </ul>
                        <div v-else class="alert alert-info p-5 text-center w-100">
                            У Вас нет сообществ для модерации.
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
name : 'CommunitiesManagePage',
components : {
},
mixins: [CommunitiesListMixin],

data(){
    return {
        isManagedCommunitiesLoaded: true,
        managedCommunities: []
    }
},

methods : {

},

}
</script>
