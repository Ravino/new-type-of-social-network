import PliziFriend from '../classes/PliziFriend.js';
import moment from "moment";

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

    lastFriendActivity(fItem){
        const sexTitle = this.getSexTitle(fItem.sex);

        let now = moment();
        let yesterday = moment().subtract(1, 'days');
        let lmt = moment.unix(fItem.lastActivity);

        // если был сегодня
        if (now.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')) {
            return sexTitle+' сегодня в '+lmt.format('HH:mm');
        }

        // если был вчера
        if (yesterday.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')) {
            return sexTitle+' вчера в '+lmt.format('HH:mm');
        }

        // сообщение было в течение последних 7 дней
        let lastWeek = moment().subtract(7, 'days');
        if ( +lmt.format('X') >= +lastWeek.format('X')) {
            let dow = lmt.format('dddd');
            return sexTitle+' '+dow.charAt(0).toUpperCase() + dow.slice(1);
        }

        return sexTitle+' '+lmt.format('DD.MM.YY');
    },

    getSexTitle(sex){
        if ( `m` === sex )
            return `был`;

        if ( `f` === sex )
            return `была`;

        return `был(а)`;
    }
}

};

export {FriendItemMixin as default}
