import PliziUzer from './PliziUser.js';

import PliziUserStats from './User/PliziUserStats.js';
import PliziUserPrivacySettings from './User/PliziUserPrivacySettings.js';

class PliziAuthUser extends PliziUzer{
    /**
     * статистика
     * @type {PliziUserStats}
     * @private
     */
    _stats = null;

    /**
     * @type {PliziUserPrivacySettings}
     * @private
     */
    _privacySettings = null;

    /**
     * @type {string}
     * @private
     */
    _email = ``;

    constructor(inputData){
        super(inputData);

        //this._stats = new PliziUserStats(null);
        //this._privacySettings = new PliziUserPrivacySettings(null);
    }

    /**
     * загружаем тут данные которые пришли от метода api/user или из localStorage
     * @param {Object} inputData
     */
    updateAuthUser(inputData){
        this.updateUserData(inputData);

        this._email = (inputData.email) ? (inputData.email+``).trim() : ``;

        if (inputData.stats) {
            this._stats = new PliziUserStats(inputData.stats);
        }

        if (inputData.privacySettings) {
            this._privacySettings = new PliziUserPrivacySettings(inputData.privacySettings);
        }
    }

    /**
     * @returns {string}
     */
    get email(){
        return this._email;
    }

    /**
     * ссылка на статистику
     * @returns {PliziUserStats}
     */
    get stats(){
        return this._stats;
    }

    /**
     * @returns {PliziUserPrivacySettings}
     */
    get privacySettings() {
        return this._privacySettings;
    }

    cleanData(){
        window.console.warn(`PliziAuthUser::cleanData`);
    }

    toString(){
        return JSON.stringify( this.toJSON() );
    }

    toJSON() {
        let res = super.toJSON();
        delete res.mutualFriendsCount;
        res.email = this._email;
        res.privacySettings = this.privacySettings.toJSON();
        res.stats = this.stats.toJSON();

        return res;
    }
}

export { PliziAuthUser as default}
