import VueRouter from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import AccountPage from '../pages/AccountPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import ChatPage from '../pages/ChatPage.vue';

let routes = [
    // { path: '/', redirect: '/login' },
    { path: '/', component: HomePage, name: 'HomePage', meta: {title: 'Plizi: Стартовая'} },
    { path: '/login', component: LoginPage, name: 'LoginPage', meta: {title: 'Plizi: Авторизация'} },
    { path: '/registration', component: RegistrationPage, name: 'RegistrationPage', meta: {title: 'Plizi: Регистрация'}, props: true },
    { path: '/account', component: AccountPage, name: 'AccountPage', meta: {title: 'Plizi: Настройки аккаунта'}, props: true },
    { path: '/chat', component: ChatPage, name: 'ChatPage', meta: {title: 'Plizi: Чат'}, props: true },
];

let router = new VueRouter({
    // mode: 'history', // @tga - временно
    base: process.env.BASE_URL,
    routes: routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
