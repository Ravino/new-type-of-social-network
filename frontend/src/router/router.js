import VueRouter from 'vue-router';

import store from '../store/store.js';

import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import UpdatePasswordPage from '../pages/UpdatePasswordPage';
import LogoutPage from '../pages/LogoutPage.vue';

import NewsPage from '../pages/NewsPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import PersonalPage from '../pages/PersonalPage.vue';
import AccountPage from '../pages/AccountPage.vue';
import ChatsListPage from '../pages/ChatsListPage.vue';
import SearchResultsPage from '../pages/SearchResultsPage.vue';
import FriendsListPage from '../pages/FriendsListPage.vue';
import InvitationsPage from '../pages/InvitationsPage.vue';
import FriendsRecentPage from '../pages/FriendsRecentPage.vue';
import NotificationsPage from '../pages/NotificationsPage.vue';

import PliziAPI from '../classes/PliziAPI.js';
import PliziAuthUser from '../classes/PliziAuthUser.js';

const routes = [
    {path: '/', redirect: '/login', isGuest: true},
    {path: '/', component: HomePage, name: 'HomePage', meta: {title: 'Plizi: Стартовая', isGuest: true}},
    {path: '/login', component: LoginPage, name: 'LoginPage', meta: {title: 'Plizi: Авторизация', isGuest: true}},
    {path: '/logout', component: LogoutPage, name: 'LogoutPage', meta: {title: 'Plizi: Выход', isGuest: true}},
    {path: '/password/update', component: UpdatePasswordPage, name: 'UpdatePasswordPage', meta: {title: 'Plizi: Обновление пароля', props: true, isGuest: true}},
// Auth
    {path: '/account', component: AccountPage, name: 'AccountPage', meta: {title: 'Plizi: Настройки аккаунта'}, props: true },
    {path: '/profile', component: ProfilePage, name: 'ProfilePage', meta: {title: 'Plizi: Домашняя'}, props: true},
    {path: '/chats-list', component: ChatsListPage, name: 'ChatsListPage', meta: {title: 'Plizi: Чаты'}, props: true},
    {path: '/search-results', component: SearchResultsPage, name: 'SearchResultsPage', meta: {title: 'Plizi: Результаты поиска'}, props: true },
    {path: '/user-:id', component: PersonalPage, name: 'PersonalPage', meta: {title: 'Plizi:'}, props: true},
    {path: '/friends', component: FriendsListPage, name: 'FriendsListPage', meta: {title: 'Plizi: Ваши друзья'}, props: true },
    {path: '/invitations', component: InvitationsPage, name: 'InvitationsPage', meta: {title: 'Plizi: приглашения дружбы'}, props: true },
    {path: '/friends-recent', component: FriendsRecentPage, name: 'FriendsRecentPage', meta: {title: 'Plizi: новые друзья'}, props: true },
    {path: '/notifications', component: NotificationsPage, name: 'NotificationsPage', meta: {title: 'Plizi: напоминания'}, props: true },
    {path: '/news', component: NewsPage, name: 'NewsPage', meta: {title: 'Plizi: Новости', props: true}},
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});


function routerForcedLogout(next, to) {
    store.dispatch('SET_GWT', ``);
    store.dispatch('SET_CHAT_CHANNEL', ``);
    store.dispatch('SET_LAST_SEARCH', ``);

    window.localStorage.removeItem('pliziJWToken');
    window.localStorage.removeItem('pliziUser');
    window.localStorage.removeItem('pliziChatChannel');
    window.localStorage.removeItem('pliziLastSearch');

    window.localStorage.setItem('pliziRedirectTo', to.path);

    document.body.className = 'LoginPage';

    next({path: '/login', component: LoginPage, name: 'LoginPage'});
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param next
 * @returns {Promise<void>}
 */
async function checkRouteAuth(to, from, next) {
    if (!to.meta.isGuest) {
        const gwt = store.getters.gwToken;

        await Vue.nextTick(); /** @TGA иначе загрузка из localStorage не срабатывает **/

        if ((gwt + '') !== 'null' && gwt !== '') {
            const tstUser = new PliziAuthUser();
            const tstUserData = tstUser.restoreData();

            window.console.log(tstUserData, `tstUserData`);

            if (tstUserData) {
                window.app.$root.$emit('afterUserLoad', {
                    user: tstUserData,
                    token: gwt,
                    save: true
                });
            }
            else {
                let tryToLoadUser = null;
                try {
                    tryToLoadUser = await (new PliziAPI()).getUser(gwt);
                }
                catch (e) {
                    routerForcedLogout(next, to);
                }

                if (tryToLoadUser) {
                    window.app.$root.$emit('afterUserLoad', {
                        user: tryToLoadUser,
                        token: gwt,
                        save: true
                    });
                }
                else {
                    routerForcedLogout(next, to);
                }
            }
        }
        else {
            routerForcedLogout(next, to);
        }
    }

    document.title = to.meta.title;
    next();

    document.body.className = to.name;
}


router.beforeEach(checkRouteAuth);

export default router;
