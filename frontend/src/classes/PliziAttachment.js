import PliziAttachmentThumbsObj from './Attachment/PliziAttachmentThumbsObj.js';
import PliziAttachmentThumb from './Attachment/PliziAttachmentThumb.js';

class PliziAttachment{
    /**
     * ID аттачмента
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * оригинальное имя файла
     * @type {string}
     * @private
     */
    _originalName = null;

    /**
     * путь на S3
     * @type {string}
     * @private
     */
    _url = null;

    /**
     * MIME-TYPE
     * @type {string}
     * @private
     */
    _mimeType = null;

    /**
     * размер в байтах
     * @type {number}
     * @private
     */
    _size = null;

    /**
     * миниатюры, если аттачмент картинка
     * @type {PliziAttachmentThumbsObj|null}
     * @private
     */
    _image = null;

    constructor( inputData ){
        this._id = inputData.id;
        this._originalName = inputData.originalName;
        this._url = inputData.url;
        this._mimeType = inputData.mimeType;
        this._size = inputData.size;
        this._image = (inputData.image) ? new PliziAttachmentThumbsObj(inputData.image) : null;
    }

    toJSON(){
        return {
            id: this._id,
            originalName: this._originalName,
            url: this._url,
            mimeType: this._mimeType,
            size: this._size,
            image : (this._image) ? this._image.toJSON() : null
        }
    }

    get id(){
        return this._id;
    }

    get originalName(){
        return this._originalName;
    }

    get url(){
        return this._url;
    }

    get mimeType(){
        return this._mimeType;
    }

    get size(){
        return this._size;
    }

    get image(){
        return this._image;
    }

    /**
     * @returns {PliziAttachmentThumb}
     */
    get original(){
        return (this._image) ? this.image.original : null;
    }

    /**
     * @returns {PliziAttachmentThumb}
     */
    get normal(){
        return (this._image) ? this.image.normal : null;
    }

    /**
     * @returns {PliziAttachmentThumb}
     */
    get medium(){
        return (this._image) ? this.image.medium : null;
    }

    /**
     * @returns {PliziAttachmentThumb}
     */
    get thumb(){
        return (this._image) ? this.image.thumb : null;
    }
}

export { PliziAttachment as default}
