import PliziUzer from './PliziUser.js';

class PliziFriend extends PliziUzer{

    /**
     * кол-во общих друзей
     * @type {number}
     * @private
     */
    _mutualFriendsCount = null;


    constructor(usrData) {
        super(usrData);

        if (typeof usrData.data === `undefined`) {
            usrData = { data : usrData };
        }
        this._mutualFriendsCount = +usrData.data.mutualFriendsCount;
    }

    get mutualFriendsCount(){
        return this._mutualFriendsCount;
    }

    toJSON() {
        let retData = super.toJSON();
        retData.data.mutualFriendsCount = this._mutualFriendsCount;
    }
}

export { PliziFriend as default}
