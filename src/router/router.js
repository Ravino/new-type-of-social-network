import VueRouter from 'vue-router';

import LoginPage from '../pages/LoginPage.vue';
import AccountPage from '../pages/AccountPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import ChatPage from '../pages/ChatPage.vue';

let routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage, name: 'LoginPage', meta: {title: 'Логин'} },
    { path: '/registration', component: RegistrationPage, name: 'RegistrationPage', meta: {title: 'Регистрация'}, props: true },
    { path: '/account', component: AccountPage, name: 'AccountPage', meta: {title: 'Настройки аккаунта'}, props: true },
    { path: '/chat', component: ChatPage, name: 'ChatPage', meta: {title: 'Чат'}, props: true },
];

let router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
