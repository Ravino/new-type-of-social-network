import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import RecommendedCommunities from '../common/Communities/RecommendedCommunities.vue';
import CommunitiesListHeader from '../common/Communities/CommunitiesListHeader.vue';

import CommunityItem from '../common/Communities/CommunityItem.vue';
import CommunityCreateBlock from '../common/Communities/CommunityCreateBlock.vue';

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

        recommendedCommunities: null
    }
},

computed: {
},

methods: {


},

created(){
},

};

export {CommunitiesListMixin as default}
