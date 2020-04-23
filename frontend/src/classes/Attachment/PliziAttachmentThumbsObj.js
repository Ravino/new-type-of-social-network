import PliziAttachmentThumb from './PliziAttachmentThumb.js';

class PliziAttachmentThumbsObj {

    /**
     * оригинальная картинка
     * @type {PliziAttachmentThumb}
     * @private
     */
    _original = null;

    /**
     * нормальный размер
     * @type {PliziAttachmentThumb}
     * @private
     */
    _normal = null;

    /**
     * средний размер
     * @type {PliziAttachmentThumb}
     * @private
     */
    _medium = null;

    /**
     * иконка
     * @type {PliziAttachmentThumb}
     * @private
     */
    _thumb = null;


    constructor( inputData ){
        this._original = inputData.original;
        this._normal = inputData.normal;
        this._medium = inputData.medium;
        this._thumb = inputData.thumb;
    }

    toJSON(){
        return {
            original: this._original.toJSON(),
            normal: this._normal.toJSON(),
            medium: this._medium.toJSON(),
            thumb: this._thumb.toJSON()
        }
    }

    get original(){
        return this._original;
    }

    get normal(){
        return this._normal;
    }

    get medium(){
        return this._medium;
    }

    get thumb(){
        return this._thumb;
    }
}

export { PliziAttachmentThumbsObj as default}
