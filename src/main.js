import Vue from 'vue';
window.Vue = Vue;

import VueRouter from 'vue-router';
Vue.config.productionTip = false;
Vue.use(VueRouter);

// import moment from 'moment';
// import Vuelidate from 'vuelidate';
// Vue.use(Vuelidate);

import router from './router/router.js';

import App from './App.vue';

// new Vue({
//     el: '#app',
//     render: h => h(App)
// });

window.app = new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app');
