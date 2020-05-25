import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import RecommendedCommunities from '../common/Communities/RecommendedCommunities.vue';
import CommunitiesListHeader from '../common/Communities/CommunitiesListHeader.vue';

import CommunityItem from '../common/Communities/CommunityItem.vue';
import CommunityCreateBlock from '../common/Communities/CommunityCreateBlock.vue';
import PliziCommunity from "../classes/PliziCommunity.js";
import {debounce} from "../utils/Debonce.js";

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

            searchString: '',
        }
    },
    mounted() {
        this.$root.$on('communitySearchStart', this.searchProcess);
        window.addEventListener('scroll', this.onScrollYPage);
        this.searchString = window.localStorage.getItem('lastCommunitiesSearch_' + this.list) || '';
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.onScrollYPage);
        next();
    },
    beforeDestroy() {
        this.$root.$off('communitySearchStart', this.searchProcess);
    },
    computed: {},

    methods: {
        async searchProcess(e) {
            this.noMore = false;
            this.searchString = e.searchText;
            if (e.list === 'my') {
                return this.loadCommunities();
            }
            if (e.list === 'owner') {
                return this.loadManagedCommunities();
            }
            return this.loadPopularCommunitites();
        },
        isSubscribed(commID) {
            if (!this.popularCommunities)
                return true;

            const ret = !!this.popularCommunities.find((commItem) => {
                //window.console.info(commItem.id, commItem.name);
                return commItem.id === commID;
            });
            //window.console.log(ret, commID);

            return ret;
        },

        onScrollYPage: debounce(function () {
            if (window.scrollY >= (document.body.scrollHeight - document.documentElement.clientHeight - (document.documentElement.clientHeight / 2))) {
                if (this.$route.name === 'CommunitiesManagePage') {
                    this.lazyLoad('manage');
                } else if (this.$route.name === 'CommunitiesPopularPage') {
                    this.lazyLoad('popular');
                } else {
                    this.lazyLoad();
                }
            }
        }, 100),

        async loadCommunities(limit = 10, offset = 0) {
            this.enabledLoader = true;
            const searchText = this.searchString;
            let apiResponse = null;
            if (offset === 0) {
                this.isCommunitiesLoaded = false;
            }

            try {
                apiResponse = await this.$root.$api.$communities.userCommunities(searchText, limit, offset);
            } catch (e) {
                window.console.warn(e.detailMessage);
                throw e;
            }
            this.isCommunitiesLoaded = true;
            return this.processApiResponce(offset, apiResponse, 'communitiesList');
        },

        async loadPopularCommunitites(limit = 10, offset = 0) {
            this.enabledLoader = true;
            const searchText = this.searchString;
            let apiResponse = null;
            if (offset === 0) {
                this.isPopularCommunitiesLoaded = false;
            }

            try {
                apiResponse = await this.$root.$api.$communities.loadCommunities(searchText, limit, offset);
            } catch (e) {
                window.console.warn(e.detailMessage);
                throw e;
            }
            this.isPopularCommunitiesLoaded = true;
            return this.processApiResponce(offset, apiResponse, 'popularCommunities');
        },

        async loadManagedCommunities(limit = 10, offset = 0) {
            this.enabledLoader = true;
            const searchText = this.searchString;
            let apiResponse = null;
            if (offset === 0) {
                this.isManagedCommunitiesLoaded = false;
            }

            try {
                apiResponse = await this.$root.$api.$communities.loadManagedCommunities(searchText, limit, offset);
            } catch (e) {
                window.console.warn(e.detailMessage);
                throw e;
            }
            this.isManagedCommunitiesLoaded = true;
            return this.processApiResponce(offset, apiResponse, 'managedCommunities');
        },

        processApiResponce(offset, apiResponse, list) {
            if (apiResponse) {
                this.enabledLoader = false;
                this.isCommunitiesLoaded = true;

                if (offset === 0) {
                    this[list] = [];
                }
                apiResponse.map((pfItem) => {
                    this[list].push(new PliziCommunity(pfItem));
                });

                return apiResponse.length;
            }

            return 0;
        },

        async lazyLoad(listName = null) {
            if (this.lazyLoadStarted) return;
            if (this.noMore) return;

            this.enabledLoader = true;
            this.lazyLoadStarted = true;

            let oldSize, added;

            if (listName === 'manage') {
                oldSize = this.managedCommunities.length;
                added = await this.loadManagedCommunities(10, oldSize++);
            } else if (listName === 'popular') {
                oldSize = this.popularCommunities.length;
                added = await this.loadPopularCommunitites(10, oldSize++);
            } else {
                oldSize = this.communitiesList.length;
                added = await this.loadCommunities(10, oldSize++);
            }

            if (added === 0) {
                this.noMore = true;
            }

            this.lazyLoadStarted = false;
        },
    },

};

export {CommunitiesListMixin as default}
