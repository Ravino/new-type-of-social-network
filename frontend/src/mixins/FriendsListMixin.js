import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';


import FavoriteFriends from '../common/FavoriteFriends.vue';
import IconSearch from '../icons/IconSearch.vue';

import FriendsListHeader from '../components/FriendsListHeader.vue';

import PotentialFriends from '../common/PotentialFriends.vue';

import PliziUser from '../classes/PliziUser.js';
import PliziFriend from "../classes/PliziFriend.js";

const FriendsListMixin = {
components: {
    IconSearch,
    AccountToolbarLeft,
    FavoriteFriends,
    Spinner,
    FriendsListHeader, PotentialFriends,
},

data() {
    return {
        isFriendsLoaded : false,
        potentialList : [],

        possibleFriends: null,
        recommendedFriends: null,
    }
},

computed: {
    friendsList(){
        return this.$root.$user.fm.list;
    }
},

methods: {

    /**
     * @param a
     * @returns {*}
     */
    shuffle(a){
        if(a) {
            a = a.map( iA => iA);

            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
        }

        return a;
    },

    /**
     * @deprecated
     * @returns {Promise<boolean>}
     */
    async loadPotentialsList() {
        this.isFriendsLoaded = true;

        let apiResponse = null;

        this.potentialList = null;

        try {
            apiResponse = await this.$root.$api.friendsPotential();
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.potentialList = [];

        if (apiResponse) {
            apiResponse.map( (pfItem)=> {
                if (! this.$root.$user.fm.checkIsFriend(pfItem.id)) {
                    this.potentialList.push( new PliziUser({ data : pfItem} ) );
                }
            });
        }

        return true;
    },

    /**
     * Получение возможных друзей.
     * @returns {object[]|null}
     */
    async loadPossibleFriends() {
        let response;

        try {
            response = await this.$root.$api.$friend.getPossibleFriends();
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response) {
            this.possibleFriends = [];

            response.map((possibleFriend) => {
                this.possibleFriends.push(new PliziFriend(possibleFriend));
            });
        }
    },

    /**
     * Получение рекомендуемых друзей.
     * @returns {object[]|null}
     */
    async loadRecommendedFriends() {
        let response;

        try {
            response = await this.$root.$api.$friend.getRecommendedFriends();
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response) {
            this.recommendedFriends = [];

            response.map((recommendedFriend) => {
                this.recommendedFriends.push(new PliziFriend(recommendedFriend));
            });
        }
    },
},

created(){
    this.$root.$on('friendsIsLoad', this.loadPotentialsList);
},

};

export {FriendsListMixin as default}
