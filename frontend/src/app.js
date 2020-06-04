import Vue from 'vue';

if (process.env.NODE_ENV.toLowerCase() === 'development') {
    Vue.config.productionTip = false;
    Vue.config.silent = false;
    Vue.config.devtools = true;
}
else {
    Vue.config.productionTip = false;
    Vue.config.silent = true;
    Vue.config.devtools = false;
}

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

/** @link https://github.com/scaccogatto/vue-waypoint **/
import VueWaypoint from 'vue-waypoint';
Vue.use(VueWaypoint);

import './libs/extra';
import router from './router/router.js';
import './libs/filters.js';
import './libs/facebook.js';

window.Vue = Vue;

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
