import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

//import Multiselect from 'vue-multiselect';

// register globally
//Vue.component('multiselect', Multiselect); // TODO: Узнать у @tga правильно ли так делать

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
 * ссылка на текущего авторизованного юзера
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziAuthUser}
 */
Vue.prototype.$user = null;

/**
 * текст последнего поиска
 * добавляем глобально, на использовать будем только от this.$root
 * @type {string}
 */
Vue.prototype.$lastSearch = ``;

/**
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziAPI}
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
//import { VueResponsiveComponents } from 'vue-responsive-components';
// Vue.use(VueResponsiveComponents);

import router from './router/router.js';
import { store } from './store/store.js'
import './libs/filters.js';

import './libs/facebook.js';

window.Vue = Vue;

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuelidate);

import App from './App.vue';

window.app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
