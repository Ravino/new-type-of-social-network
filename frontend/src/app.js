import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

/**
 * для кроссбраузерности эмоджиков в частности для хрома в win7
 * @link https://www.npmjs.com/package/vue-twemoji **/
import vuetwemoji from 'vue-twemoji'
Vue.use(vuetwemoji, {
    baseUrl: 'https://twemoji.maxcdn.com/',
    extension: '.png', //.svg, .png
    className: 'twemoji', //custom className for image output
    size: '16x16' //image size
});

/** @link https://vue-multiselect.js.org/#sub-getting-started **/
import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);

/**
 * для упрощения получения доступа к дефолтному аватару
 * @type {string}
 */
Vue.prototype.$defaultAvatarPath = `/images/noavatar-256.png`;

/**
 * глобальный флаг авторизации
 * @type {boolean}
 */
Vue.prototype.$isAuth = false;

/**
 * ссылка на текущую авторизацию
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziAuth|PliziAuthClass}
 */
Vue.prototype.$auth = null;

/**
 * текст последнего поиска
 * добавляем глобально, на использовать будем только от this.$root
 * @type {string}
 */
Vue.prototype.$lastSearch = ``;

/**
 * текст последнего поиска сообществ
 * добавляем глобально, на использовать будем только от this.$root
 * @type {Object}
 */
Vue.prototype.$lastCommunitiesSearch = {
    popular: '',
    my: '',
    owner: '',
};

/**
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziAPI|PliziAPIClass}
 */
Vue.prototype.$api = null;

/**
 * функция которая будет показывать наш стилизованный Alert
 * @param {string} message - сообщение которое будем показывать (можно HTML-код)
 * @param {string} clazz - CSS-класс (например bg-info, bg-warning, bg-danger, bg-success, bg-light, bg-white)
 * @param {number} timeOut - кол-во секунд, через которое закроется алерт
 */
Vue.prototype.$alert = function(message, clazz, timeOut){
    this.$root.$emit('alertModal', {
        message : message ||  ``,
        clazz : ``,
        timeOut : timeOut ||  0,
    });
};

Vue.prototype.$notify = function(message, clazz = ''){
    this.$root.$emit('NewAppNotification', {
        type : `app.notification`,
        message : message ||  ``,
        clazz : ``,
    });
};

Vue.prototype.$friendsKeyUpdater = 0;
Vue.prototype.$favoritesKeyUpdater = 0;
Vue.prototype.$dialogsKeyUpdater = 0;
Vue.prototype.$invitationsKeyUpdater = 0;
Vue.prototype.$notificationsKeyUpdater = 0;
Vue.prototype.$messagesKeyUpdater = 0;
Vue.prototype.$communitiesKeyUpdater = 0;

/**
 * это временный костыль
 * @type {PliziMessagesCollection}
 */
Vue.prototype.$messagesList = null;

Vue.prototype.$isXS = () => {
    return window.innerWidth <= 575;
};

Vue.prototype.$isSM = () => {
    return window.innerWidth >= 576  &&  window.innerWidth <= 767;
};

Vue.prototype.$isMD = () => {
    return window.innerWidth >= 768  &&  window.innerWidth <= 991;
};

Vue.prototype.$isLG = () => {
    return window.innerWidth >= 992  &&  window.innerWidth <= 1199;
};

Vue.prototype.$isXL = () => {
    return window.innerWidth >= 1200;
};

import router from './router/router.js';
import './libs/filters.js';

import './libs/facebook.js';

window.Vue = Vue;

Vue.config.productionTip = false;

Vue.config.silent = false;

Vue.config.devtools = true;

import App from './App.vue';

delete window.app;

if ( (self.parent && !(self.parent===self)) && (self.parent.frames.length!==0)){
    self.parent.location = document.location;
}
else {
    window.app = new Vue( {
        router,
        render : h => h( App ),
    } ).$mount( '#app' );
}
