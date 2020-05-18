import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import RecommendedCommunities from '../common/Communities/RecommendedCommunities.vue';
import CommunitiesListHeader from '../common/Communities/CommunitiesListHeader.vue';

import CommunityItem from '../common/Communities/CommunityItem.vue';
import CommunityCreateBlock from '../common/Communities/CommunityCreateBlock.vue';
import PliziCommunity from "../classes/PliziCommunity";

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

        recommendedCommunities: null,

        lazyLoadStarted: false,
        noMore: false,
        enabledLoader: true,
    }
},

computed: {

},

methods: {
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

    onScrollYPage(){
        if (window.scrollY >= (document.body.scrollHeight - document.documentElement.clientHeight - (document.documentElement.clientHeight/2) )){
            if (this.$route.name === 'CommunitiesManagePage') {
                this.lazyLoad('manage');
            } else if (this.$route.name === 'CommunitiesPopularPage') {
                this.lazyLoad('popular');
            } else {
                this.lazyLoad();
            }
        }
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

    async loadCommunities(limit = 10, offset = 0) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.userCommunities(limit, offset);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.enabledLoader = false;
            this.isCommunitiesLoaded = true;

            apiResponse.map( (pfItem)=> {
                this.communitiesList.push( new PliziCommunity(pfItem) );
            });

            return apiResponse.length;
        }

        return true;
    },

    async loadPopularCommunitites(limit = 10, offset = 0) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.loadCommunities(limit, offset);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.enabledLoader = false;
            this.isPopularCommunitiesLoaded = true;

            apiResponse.map( (pfItem)=> {
                this.popularCommunities.push( new PliziCommunity(pfItem) );
            });

            return apiResponse.length;
        }

        return true;
    },

    async loadManagedCommunities(limit = 10, offset = 0) {
        let apiResponse = null;
        this.isManagedCommunitiesLoaded = false;

        try {
            apiResponse = await this.$root.$api.$communities.loadManagedCommunities(limit, offset);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.enabledLoader = false;
            this.isManagedCommunitiesLoaded = true;

            apiResponse.map((pfItem) => {
                this.managedCommunities.push(new PliziCommunity(pfItem));
            });

            return apiResponse.length;
        }

        return true;
    },

    async lazyLoad(listName = null) {
        if (this.lazyLoadStarted) return;
        if (this.noMore) return;

        this.enabledLoader = true;
        this.lazyLoadStarted = true;

        let oldSize, added;

        if (listName === 'manage') {
            oldSize = this.managedCommunities.length;
            added = await this.loadPopularCommunitites(10, oldSize++);
        } else if (listName === 'popular') {
            oldSize = this.popularCommunities.length;
            added = await this.loadManagedCommunities(10, oldSize++);
        } else {
            oldSize = this.communitiesList.length;
            added = await this.loadCommunities(10, oldSize++);
        }

        if (added === 0) {
            this.noMore = true;
        }

        this.lazyLoadStarted = false;
        this.onScrollYPage();
    },
},

};

export {CommunitiesListMixin as default}
