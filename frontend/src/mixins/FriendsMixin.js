import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import Spinner from '../common/Spinner.vue';


import FavoriteFriends from '../common/FavoriteFriends.vue';
import IconSearch from '../icons/IconSearch.vue';

import FriendsListHeader from '../components/FriendsListHeader.vue';

import PotentialFriends from '../common/PotentialFriends.vue';

import PliziUser from '../classes/PliziUser.js';

const FriendsMixin = {
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
        potentialList : []
    }
},

computed: {
    friendsList(){
        return this.$root.$user.fm.list;
    }
},

methods: {

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
},

created(){
    this.$root.$on('friendsIsLoad', this.loadPotentialsList);
},

};

export {FriendsMixin as default}
