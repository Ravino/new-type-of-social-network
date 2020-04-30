import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import RecommendedCommunities from '../common/RecommendedCommunities.vue';
import CommunitiesListHeader from '../common/CommunitiesListHeader.vue';

const CommunitiesListMixin = {
components: {
    AccountToolbarLeft,
    Spinner,
    CommunitiesListHeader,
    FavoriteFriends,
    RecommendedCommunities
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
    this.$root.$on('friendsIsLoad', this.loadPotentialsList);

    this.$root.$on('loadPossibleFriends', this.loadPossibleFriends);
    this.$root.$on('loadRecommendedFriends', this.loadRecommendedFriends);
},

};

export {CommunitiesListMixin as default}
