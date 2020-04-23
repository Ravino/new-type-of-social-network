class PliziAttachmentThumb {

    /**
     * ширина картинки в пикселях
     * @type {number}
     * @private
     */
    _width = null;

    /**
     * высота картинки в пикселях
     * @type {number}
     * @private
     */
    _height = null;

    /**
     * путь к картинке на S3
     * @type {string}
     * @private
     */
    _path = null;

    constructor(inputData){
        this._width = inputData.width;
        this._height = inputData.height;
        this._path = inputData.path;
    }

    toJSON(){
        return {
            width: this._width,
            height: this._height,
            path : this._path
        };
    }
}

export { PliziAttachmentThumb as default}
