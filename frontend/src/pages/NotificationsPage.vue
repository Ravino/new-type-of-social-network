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
                            <NotificationItem v-for="notifItem in notificationsList"
                                              v-bind:notification="notifItem"
                                              v-bind:key="notifItem.id">
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
import NotificationItem from '../common/NotificationItem.vue';

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
        return this.$root.$auth.nm.asArray();
    }
},

methods : {
    async markNotificationsAsRead(){
        window.console.log(`markNotificationsAsRead`);
        const idsList = this.$root.$auth.nm.idsList;

        if (!idsList)
            return;

        if (idsList.length <= 0)
            return;

        window.console.log(`markNotificationsAsRead 22`);
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$notifications.markAsRead(idsList);
        }
        catch (e){
            window.console.warn(e.detailMessage  || e);
        }

        /**
         * @see http://vm1095330.hl.had.pm:8082/docs/#/User/markNotificationsAsRead
         * TODO: метод api/user/notifications/mark/read НЕ возвращает список нотификаций как описано в доке
         */
        if (apiResponse) {
            window.console.log(apiResponse, `apiResponse`);

            idsList.map((remId)=>{
                this.$root.$auth.nm.delete(remId);
            });

            //apiResponse.map( (notifItem) => {
            //    this.$root.$auth.nm.add( notifItem );
            //});

            this.storeData();

            if (this.$root.$auth.nm.updateEventName) {
                this.$root.$emit(this.$root.$auth.nm.updateEventName);
            }
        }
    }
},

mounted(){
    this.$root.$once(this.$root.$auth.nm.loadEventName, this.markNotificationsAsRead);
    this.$root.$once(this.$root.$auth.nm.restoreEventName, this.markNotificationsAsRead);
}
}
</script>
