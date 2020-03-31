import Vue from 'vue';
window.Vue = Vue;

import VueRouter from 'vue-router';
Vue.config.productionTip = false;
Vue.use(VueRouter);

import moment from 'moment';

moment.locale('ru');

Vue.filter('toHM', (dateValue) => {
    return moment(dateValue).format('HH:mm');
});

Vue.filter('toLongDate', (dateValue) => {
    return moment(dateValue).format('DD MMMM YYYY г.');
});

Vue.filter('lastMessageTime', (messageDT) => {
    let now = moment();
    let yesterday = moment().subtract(1, 'days');
    let lmt = moment(messageDT);

    // если сообщение было сегодня или вчера
    if (now.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')  ||  yesterday.format('YYYY-MM-DD')===lmt.format('YYYY-MM-DD')) {
        return lmt.format('HH:mm');
    }

    // сообщение было в течение последних 7 дней
    let lastWeek = moment().subtract(7, 'days');
    if ( +lmt.format('X') >= +lastWeek.format('X')) {
        let dow = lmt.format('dd');
        return dow.charAt(0).toUpperCase() + dow.slice(1);
    }

    return lmt.format('DD.MM.YY');
});


import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

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
