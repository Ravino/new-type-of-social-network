import VueRouter from 'vue-router';

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

import CommunitiesListPage from '../pages/CommunitiesListPage.vue';
import CommunitiesManagePage from '../pages/CommunitiesManagePage.vue';
import CommunitiesPopularPage from '../pages/CommunitiesPopularPage.vue';
import CommunityPage from '../pages/CommunityPage.vue';
import Error404Page from '../pages/Error404Page.vue';

const routes = [
    {path: '/', redirect: '/login', isGuest: true},
    {path: '/', component: HomePage, name: 'HomePage', meta: {title: 'Plizi: Стартовая', isGuest: true}},
    {path: '/login', component: LoginPage, name: 'LoginPage', meta: {title: 'Plizi: Авторизация', isGuest: true}},
    {path: '/logout', component: LogoutPage, name: 'LogoutPage', meta: {title: 'Plizi: Выход', isGuest: true}},
    {path: '/password/update', component: UpdatePasswordPage, name: 'UpdatePasswordPage', meta: {title: 'Plizi: Обновление пароля', props: true, isGuest: true}},
// Auth
    {path: '/account', component: AccountPage, name: 'AccountPage', meta: {title: 'Plizi: Настройки аккаунта'}, props: true },
    {path: '/profile', component: ProfilePage, name: 'ProfilePage', meta: {title: 'Plizi: Домашняя'}, props: true},
    {path: '/chats', component: ChatsListPage, name: 'ChatsListPage', meta: {title: 'Plizi: Чаты'}, props: true},
    {path: '/search-results', component: SearchResultsPage, name: 'SearchResultsPage', meta: {title: 'Plizi: Результаты поиска'}, props: true },
    {path: '/user-:id', component: PersonalPage, name: 'PersonalPage', meta: {title: 'Plizi:'}, props: true},
    {path: '/friends', component: FriendsListPage, name: 'FriendsListPage', meta: {title: 'Plizi: мои друзья'}, props: true },
    {path: '/invitations', component: InvitationsPage, name: 'InvitationsPage', meta: {title: 'Plizi: приглашения дружбы'}, props: true },
    {path: '/friends-recent', component: FriendsRecentPage, name: 'FriendsRecentPage', meta: {title: 'Plizi: новые друзья'}, props: true },
    {path: '/notifications', component: NotificationsPage, name: 'NotificationsPage', meta: {title: 'Plizi: напоминания'}, props: true },
    {path: '/news', component: NewsPage, name: 'NewsPage', meta: {title: 'Plizi: Новости', props: true}},

    {path: '/communities', component: CommunitiesListPage, name: 'CommunitiesListPage', meta: {title: 'Plizi: Мои сообщества'}, props: true },
    {path: '/manage-communities', component: CommunitiesManagePage, name: 'CommunitiesManagePage', meta: {title: 'Plizi: Управление сообществами'}, props: true },
    {path: '/popular-communities', component: CommunitiesPopularPage, name: 'CommunitiesPopularPage', meta: {title: 'Plizi: Популярные сообщества'}, props: true },
    {path: '/community-:id', component: CommunityPage, name: 'CommunityPage', meta: {title: 'Plizi: Популярные сообщества'}, props: true },
    {path: '*', component: Error404Page, name: 'Error404Page', meta: {title: 'Page not found', isNotFound: true} },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});


function routerForcedLogout(next, to) {
    window.localStorage.removeItem('pliziJWToken');
    window.localStorage.removeItem('pliziUser');
    window.localStorage.removeItem('pliziChatChannel');
    window.localStorage.removeItem('pliziLastSearch');
    window.localStorage.removeItem('pliziFriends');
    window.localStorage.removeItem('pliziDialogs');
    window.localStorage.removeItem('pliziInvitations');
    window.localStorage.removeItem('pliziNotifications');

    window.localStorage.setItem('pliziRedirectTo', to.path);

    document.body.className = 'LoginPage';

    next({path: '/login', component: LoginPage, name: 'LoginPage'});
}


/**
 *
 * @param {Route} to
 * @param next
 */
function updateTitle(to, next){
    document.title = to.meta.title;
    next();

    document.body.className = to.name;
}


/**
 * @param {Route} to
 * @param {Route} from
 * @param next
 * @returns {Promise<void>}
 */
async function checkRouteAuth(to, from, next) {
    if (to.meta.isGuest)
        return updateTitle(to, next);

    await Vue.nextTick(); /** @TGA иначе загрузка из localStorage не срабатывает **/

    const gwt = window.localStorage.getItem('pliziJWToken');

    if ((gwt + '') !== 'null' && gwt !== '') {
        const tstUserData = window.app.$root.$auth.restoreData()

        if (tstUserData) {
            window.app.$root.$emit('AfterUserRestore', {
                user: tstUserData,
                token: gwt,
                save: true
            });
        }
        else {
            let tryToLoadUser = null;
            try {
                tryToLoadUser = await window.app.$root.$api.$users.getUser();
            }
            catch (e) {
                routerForcedLogout(next, to);
            }

            if (tryToLoadUser) {
                window.app.$root.$emit('AfterUserLoad', {
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
    else if (!to.meta.isNotFound) {
        routerForcedLogout(next, to);
    }

    updateTitle(to, next);
}


router.beforeEach(checkRouteAuth);

export default router;
