<template>
    <div class="plz-top-watcher-item position-relative d-inline-block mr-2">

        <div class="btn btn-link my-auto text-body btn-sm cursor-pointer" title="Уведомления">
            <span data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenuLikes" @click="onShowNotifications">
                <IconBell />
                <span v-if="$root.$auth.nm.size>0" class="counter-info">
                    {{$root.$auth.nm.size}}
                </span>
            </span>

            <div v-if="notificationsNumber>0"
                class="notifications-likes-dropdown dropdown-menu dropdown-menu-right pt-3 pb-0 dropdown-white w-auto"
                 aria-labelledby="dropdownMenuLikes">
                <ul class="list-unstyled mb-0">
                    <NotificationItem v-for="notifItem in notificationsList"
                                      v-bind:notification="notifItem"
                                      v-bind:key="notifItem.id">
                    </NotificationItem>
                </ul>
                <div class="notifications-likes-dropdown-footer border-top">
                    <router-link to="/notifications" tag="a" class="notifications-link d-block text-center pt-1 pb-3">Посмотреть все</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconBell from '../../icons/IconBell.vue';
import NotificationItem from '../NotificationItem.vue';

export default {
name : 'NavBarNotifications',
components : { IconBell, NotificationItem },

data(){
    return {
        //notificationsNumber : 0
    }
},

methods : {
    onShowNotifications(){
        window.console.info(`onShowNotifications`);

        if (this.$root.$auth.nm.size <= 0)
            return;

        window.console.dir(this.$root.$auth.nm.idsList, 'getIdsList'); // эти ID-шники помечаем как прочитанные
    },

    updateNotifications(){
        this.$forceUpdate();
    }
},

computed: {
    notificationsNumber(){
        this.$root.$auth.nm.size;
    },

    notificationsList(){
        return this.$root.$auth.nm.asArray();
    }
},

created(){
    this.$root.$on(this.$root.$auth.nm.restoreEventName,  this.updateNotifications);
    this.$root.$on(this.$root.$auth.nm.loadEventName,  this.updateNotifications);
    this.$root.$on(this.$root.$auth.nm.updateEventName,  this.updateNotifications);
}
}
</script>
