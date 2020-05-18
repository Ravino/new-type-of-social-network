import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import RecommendedCommunities from '../common/Communities/RecommendedCommunities.vue';
import CommunitiesListHeader from '../common/Communities/CommunitiesListHeader.vue';

import CommunityItem from '../common/Communities/CommunityItem.vue';
import CommunityCreateBlock from '../common/Communities/CommunityCreateBlock.vue';
import PliziCommunity from "../classes/PliziCommunity.js";

const CommunitiesListMixin = {
components: {
    AccountToolbarLeft,
    Spinner,
    CommunitiesListHeader,
    CommunityItem,
    CommunityCreateBlock,
    RecommendedCommunities,
    FavoriteFriends,
},

data() {
    return {
        isCommunitiesLoaded: false,
        communitiesList: [],

        isPopularCommunitiesLoaded: true,
        popularCommunities: [],

        isManagedCommunitiesLoaded: false,
        managedCommunities: [],

        recommendedCommunities: null
    }
},
mounted() {
    this.$root.$on('communitySearchStart', this.searchProcess);
},
beforeDestroy() {
    this.$root.$off('communitySearchStart', this.searchProcess);
},
computed: {

},

methods: {
    async searchProcess(e) {
        if (e.list === 'my') {
            return this.loadCommunities(e.searchText);
        }
        if (e.list === 'owner') {
            return this.loadManagedCommunities(e.searchText);
        }
        return this.loadPopularCommunitites(e.searchText);
    },
    isSubscribed(commID){
        if (! this.popularCommunities)
            return true;

        const ret = !!this.popularCommunities.find( (commItem) => {
            //window.console.info(commItem.id, commItem.name);
            return commItem.id===commID;
        });
        //window.console.log(ret, commID);

        return ret;
    },

    /**
     * @TEST
     * @returns {Promise<boolean>}
     */
    async getCommunities() {
        window.console.warn(`getCommunities`);

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.getCommunity(40);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        window.console.log(apiResponse);

        if (apiResponse) {

        }

        return true;
    },

    async loadCommunities() {
        const searchText = this.$root.$lastCommunitiesSearch.my;
        let apiResponse = null;

        this.communitiesList = null;

        try {
            apiResponse = await this.$root.$api.$communities.userCommunities(searchText);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.communitiesList = [];

        if (apiResponse) {
            this.isCommunitiesLoaded = true;

            apiResponse.map( (pfItem)=> {
                this.communitiesList.push( new PliziCommunity(pfItem) );
            });
        }

        return true;
    },

    async loadPopularCommunitites() {
        const searchText = this.$root.$lastCommunitiesSearch.popular;
        let apiResponse = null;

        this.popularCommunities = null;

        try {
            apiResponse = await this.$root.$api.$communities.loadCommunities(searchText);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.popularCommunities = [];

        if (apiResponse) {
            this.isPopularCommunitiesLoaded = true;
            apiResponse.map( (pfItem)=> {
                this.popularCommunities.push( new PliziCommunity(pfItem) );
            });
        }

        return true;
    },

    async loadManagedCommunities() {
        const searchText = this.$root.$lastCommunitiesSearch.owner;
        let apiResponse = null;
        this.isManagedCommunitiesLoaded = false;

        this.managedCommunities = null;

        try {
            apiResponse = await this.$root.$api.$communities.loadManagedCommunities(searchText);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.managedCommunities = [];

        if (apiResponse) {
            this.isManagedCommunitiesLoaded = true;
            apiResponse.map((pfItem) => {
                this.managedCommunities.push(new PliziCommunity(pfItem));
            });
        }

        return true;
    },
},

};

export {CommunitiesListMixin as default}
