import PliziUzer from './PliziUser.js';

class PliziFriend extends PliziUzer{
    /**
     * TODO: временно  - потом сделать настоящие данные
     * @returns {number}
     */
    get commonFriendsNumber(){
        return Math.floor(Math.random() * 20);
    }
}

export { PliziFriend as default}
