import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

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
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziUser}
 */
Vue.prototype.$user = null;

/**
 * добавляем глобально, на использовать будем только от this.$root
 * @type {PliziAPI}
 */
Vue.prototype.$api = null;

// @TGA пока не нужно
// import { VueResponsiveComponents } from 'vue-responsive-components';
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
