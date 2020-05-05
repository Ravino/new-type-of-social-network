import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

/** @link https://www.npmjs.com/package/vue-textarea-autosize **/
//import TextareaAutosize from 'vue-textarea-autosize';
//Vue.use(TextareaAutosize);

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
        clazz : clazz ||  ``,
        timeOut : timeOut ||  0,
    });
};

// @TGA пока не нужно
//
//import { VueResponsiveComponents } from 'vue-responsive-components';
// Vue.use(VueResponsiveComponents);

import router from './router/router.js';
//import store from './store/store.js'
import './libs/filters.js';

import './libs/facebook.js';

window.Vue = Vue;

Vue.config.productionTip = false;

Vue.config.silent = false;

Vue.config.devtools = true;

import App from './App.vue';

delete window.app;

window.app = new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
