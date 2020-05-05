import PliziUzer from './PliziUser.js';

class PliziMember extends PliziUzer{
    /**
     * роль в этом сообществе (родитель этой сущности)
     * user - если просто подписчик, author - если он создал сообщество, иначе null
     * @type {null}
     * @private
     */
    _role = null;

    /**
     * @param {Object} usrData
     */
    constructor(usrData){
        super(usrData);
    }

    get role(){
        return this._role;
    }

    toJSON(){
        let res = super.toJSON();
        res.role = this.role;

        return res;
    }
}

export { PliziMember as default}
