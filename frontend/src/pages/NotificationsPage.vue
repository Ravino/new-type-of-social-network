<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="offset-2 col-8 bg-white-br20 p-4">
                    <div v-if="isNotificationsReady" class="plizi-notifications-list">
                        <ul v-if="notificationsList  &&  notificationsList.length>0" class="list-unstyled mb-0">
                            <NotificationItem v-for="(notifItem, notifIndex) in notificationsList"
                                              v-bind:key="notifIndex" v-bind:notification="notifItem">
                            </NotificationItem>
                        </ul>
                        <div v-else class="">
                            <div class="alert alert-info">
                                Пока нет никаких нотификаций
                            </div>
                        </div>
                    </div>
                    <Spinner v-else v-bind:clazz="`d-flex flex-row`"></Spinner>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import Spinner from '../common/Spinner.vue';
import NotificationItem from '../components/NotificationItem.vue';

export default {
name: 'NotificationsPage',
components: {
    AccountToolbarLeft, FavoriteFriends,
    Spinner, NotificationItem
},
data() {
    return {
        isNotificationsReady : true
    }
},

computed: {
    notificationsList(){
        return this.$root.$auth.notifications;
    }
},


}
</script>
