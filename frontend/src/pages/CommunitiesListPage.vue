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
                    <div v-if="isCommunitiesLoaded" class="row plizi-communities-list ">
                        <ul v-if="communitiesList  &&  communitiesList.length>0" class="d-block w-100 p-0">
                            <transition-group name="slide-fade" :duration="700">
                                <CommunityItem v-for="(comItem, comIndex) in communitiesList"
                                               v-bind:community="comItem"
                                               v-bind:key="comIndex">
                                </CommunityItem>
                            </transition-group>
                        </ul>
                        <div v-else class="alert alert-info">
                            Вы ещё не присодинились ни к одному сообществу.
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

    async loadMyCommunitites() {
        let apiResponse = null;

        this.communitiesList = null;

        try {
            /** TODO: @TGA заменить на загрузку своих сообществ **/
            apiResponse = await this.$root.$api.$communities.getCommunities();
            //apiResponse = await this.$root.$api.$communities.userCommunities(this.$root.$user.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.communitiesList = [];

        if (apiResponse) {
            window.console.log(apiResponse, `apiResponse`);

            this.isCommunitiesLoaded = true;

            apiResponse.map( (pfItem)=> {
                this.communitiesList.push( new PliziCommunity(pfItem) );
            });
        }

        return true;
    },
},

mounted(){
    this.loadMyCommunitites();
}

}
</script>
