<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pl-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10 px-0">
            <div class="row">
                <CommunitiesListHeader></CommunitiesListHeader>
                <CommunityCreateBlock></CommunityCreateBlock>
            </div>

            <div class="row">
                <div class="col-sm-10 col-md-10 col-lg-8 col-xl-9 mb-4 px-4 py-0">
                    <div class="row" v-if="isCommunitiesLoaded">
                        <ul v-if="communitiesList  &&  communitiesList.length>0"
                            class="plizi-communities-list w-100 d-flex justify-content-between flex-wrap p-0">
                            <CommunityItem v-for="(comItem, comIndex) in communitiesList"
                                           v-bind:community="comItem"
                                           v-bind:canSubscribe="false"
                                           v-bind:key="comIndex">
                            </CommunityItem>
                        </ul>
                        <div v-else class="container px-2 ">
                            <div  class=" bg-white-br20 p-3">
                                <div  class="alert alert-info w-100 py-4 text-center m-0">
                                    Вы ещё не присодинились ни к одному сообществу.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div  v-else class="row">
                        <Spinner></Spinner>
                    </div>
                </div>

                <div class="col-3 mb-4  d-flex align-items-center pl-0">
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
import PliziCommunity from '../classes/PliziCommunity.js';

export default {
name : 'CommunitiesListPage',
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
}

}
</script>
