import PliziMember from './PliziMember.js';
import PliziCommunityAvatar from './Community/PliziCommunityAvatar';

class PliziCommunity {
    /**
     * путь к дефолтной аватарке, которую показываем если нет своей
     * @type {string}
     * @private
     */
    __defaultAvatarPath = '/images/plizi-noPrimaryImage-256.png';

    /**
     * @type {number}
     * @private
     */
    _id = null;

    /**
     * @type {string}
     * @private
     */
    _name = null;

    /**
     * описание сообщества
     * @type {string}
     * @private
     */
    _description = null;

    /**
     * это кратенькая подсказка под название сообщества в списке сообществ
     * @type {string}
     * @private
     */
    _notice = null;

    /**
     * @type {string}
     * @private
     */
    _location = null;

    /**
     * @type {string}
     * @private
     */
    _primaryImage = null;

    /**
     * это кусок URL'а внутри Plizi
     * если тут значение "supergroup" то адрес сообщества будет https://plizi.com/supergroup
     * @type {string}
     * @private
     */
    _url = null;

    /**
     * адрес сайта - https://supergroup.com/ или другая фигня
     * @type {string}
     * @private
     */
    _website = null;

    /**
     * кол-во участников сообщества
     * @type {number}
     * @private
     */
    _totalMembers = null;

    /**
     * роль текущего (залогиненного юзера в этом сообществе)
     * user - если просто подписчик, author - если он создал сообщество, иначе null
     * @type {null}
     * @private
     */
    _role = null;

    /**
     * небольшой список участников
     * @type {PliziMember[]}
     * @private
     */
    _members = null;

    /**
     * Аватарка
     * @type {PliziCommunityAvatar|null}
     * @private
     */
    _avatar = null;

    constructor(inputData){
        this._id = inputData.id;
        this._name = inputData.name;
        this._description = inputData.description;
        this._location = inputData.location;
        this._notice = inputData.notice;
        this._primaryImage = inputData.primaryImage;
        this._url = inputData.url;
        this._website = inputData.website;

        this._avatar = inputData.avatar ? new PliziCommunityAvatar(inputData.avatar) : null;

        this._role = inputData.role;
        this._totalMembers = inputData.totalMembers;

        if (inputData.members) {
            this._members = [];

            inputData.members.list.map( (mItem) => {
                this._members.push(new PliziMember(mItem));
            });
        }
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    get description(){
        return this._description;
    }

    get location(){
        return this._location;
    }

    get notice(){
        return this._notice;
    }

    get primaryImage(){
        if (this._primaryImage)
            return this._primaryImage;

        return this.__defaultAvatarPath;
    }

    get url(){
        return this._url;
    }

    get website(){
        return this._website;
    }

    get totalMembers(){
        return this._totalMembers;
    }

    get role(){
        return this._role;
    }

    get members(){
        return this._members;
    }

    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        this._avatar = value;
    }

    toJSON(){
        let mmbrs = null;

        if (this.members) {
            mmbrs = {
                list: this.members.map( mItem => mItem.toJSON() )
            };
        }

        return {
            id: this.id,
            name: this.name,
            notice: this.notice,
            primaryImage: this._primaryImage,
            url: this.url,
            website: this.website,
            location: this.location,
            role: this.role,
            totalMembers: this.totalMembers,
            avatar: this._avatar ? this._avatar.toJSON() : null,
            members: mmbrs
        };
    }
}

export { PliziCommunity as default}
