import PliziFriend from '../classes/PliziFriend.js';

const FriendItemMixin = {

props : {
    friend : PliziFriend,
},

data(){
    return {
        isInRedirecting: false
    }
},

methods: {
    goToDialogWithFriend(){
        this.isInRedirecting = true;
        this.openDialogWithFriend( this.friend.id );
    },

    getSexTitle(fItem){
        if (`m` === fItem.sex)
            return `был давно`;

        if (`f` === fItem.sex)
            return `была давно`;

        return `был(а) давно`;
    }
}

};

export {FriendItemMixin as default}
