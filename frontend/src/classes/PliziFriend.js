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
        this._mutualFriendsCount = +usrData.mutualFriendsCount;
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
