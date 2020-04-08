import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

Vue.prototype.$defaultAvatarPath = `/images/noavatar-256.png`;

import { VueResponsiveComponents } from 'vue-responsive-components';
Vue.use(VueResponsiveComponents);

import moment from 'moment';

import router from './router/router.js';
import { store } from './store/store.js'
import './libs/facebook';

window.Vue = Vue;

Vue.config.productionTip = false;
Vue.use(VueRouter);

moment.locale('ru');

Vue.filter('toHM', (dateValue) => {
    return moment(dateValue).format('HH:mm');
});

Vue.filter('toLongDate', (dateValue) => {
    return moment(dateValue).format('DD MMMM YYYY г.');
});

Vue.filter('toFullDateTime', (dateValue) => {
    return moment(dateValue).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('toDMYHM', (dateValue) => {
    return moment(dateValue).format('DD.MM.YYYY HH:mm');
});

Vue.filter('lastMessageTime', (messageDT) => {
    let now = moment();
    let yesterday = moment().subtract(1, 'days');
    let lmt = moment.unix(messageDT);

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

Vue.filter('statsBeauty', (sValue) => {
    if (sValue >= 2000) {
        const res = Math.floor(sValue / 1000);
        return `${res}&nbsp;К`;
    }

    return sValue;
});

Vue.filter('toBR', (text) => {
    return text.replace(/\n/g, '<br />');
});

Vue.use(Vuelidate);

import App from './App.vue';

window.app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
