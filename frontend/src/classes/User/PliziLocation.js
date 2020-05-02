import PliziRegion from './PliziRegion.js';

class PliziLocation {

    /**
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * @type {{ru: string, en: string, ua: string}}
     * @private
     */
    _title = {
        ru : '',
        ua : '',
        en : '',
    }

    /**
     * @type {PliziRegion}
     * @private
     */
    _region = null;

    /**
     * @type {PliziRegion}
     * @private
     */
    _country = null;

    get id(){
        return this._id;
    }

    get title(){
        return this._title;
    }

    get region(){
        return this._region;
    }

    get country(){
        return this._country;
    }

    constructor( inputData ){
        this._id = inputData.id;
        this._title = inputData.title;
        this._region = new PliziRegion( inputData.region );
        this._country = new PliziRegion( inputData.country );
    }

    toJSON(){
        return {
            id: this.id,
            title: this.title,
            region: this.region.toJSON(),
            country: this.country.toJSON()
        }
    }
}

export {PliziLocation as default}
