import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';


import FavoriteFriends from '../common/FavoriteFriends.vue';
import IconSearch from '../icons/IconSearch.vue';

import FriendsListHeader from '../common/FriendsListHeader.vue';

import PotentialFriends from '../common/PotentialFriends.vue';

import PliziUser from '../classes/PliziUser.js';
import PliziFriend from '../classes/PliziFriend.js';

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
        potentialList : [],

        possibleFriends: null,
        recommendedFriends: null,
    }
},

computed: {
    friendsList(){
        return this.$root.$auth.fm.list;
    },

    isFriendsLoaded(){
        return true;
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

            this.$root.$emit('loadPossibleFriends');
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

            this.$root.$emit('loadRecommendedFriends');
        }
    },
},

created(){
    this.loadPossibleFriends();
    this.loadRecommendedFriends();
},

};

export {FriendsListMixin as default}
