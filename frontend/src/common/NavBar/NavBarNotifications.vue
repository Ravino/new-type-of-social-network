<template>
    <div class="plz-top-watcher-item position-relative d-inline-block mr-2">

        <router-link to="/notifications" tag="a" class="btn btn-link my-auto text-body btn-sm" title="Уведомления">
            <IconBell />

            <span v-if="notificationsNumber>0"
                  class="counter-info" id="dropdownMenuLikes"
                  type="button"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{notificationsNumber}}
            </span>

            <div v-if="notificationsNumber>0"
                class=" notifications-likes-dropdown dropdown-menu dropdown-menu-right pt-3 pb-0 dropdown-white w-auto"
                 aria-labelledby="dropdownMenuLikes">
                <ul class="list-unstyled mb-0">
                    <NotificationItem v-for="(notifItem, notifIndex) in notificationsList"
                                      v-bind:key="notifIndex" v-bind:notification="notifItem">
                    </NotificationItem>
                </ul>
                <div class="notifications-likes-dropdown-footer border-top">
                    <a href="#" class="notifications-link d-block text-center pt-1 pb-3" > Посмотреть все</a>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import IconBell from '../../icons/IconBell.vue';
import NotificationItem from '../../components/NotificationItem.vue';

export default {
name : 'NavBarNotifications',
components : { IconBell, NotificationItem },

data(){
    return {
        notificationsNumber : 0
    }
},

methods : {
    updateNotifications(){
        //window.console.log(this.$root.$auth.notificationsNumber, `updateNotifications`);
        this.notificationsNumber = 0;

        // @TGA хак чтобы отображало актуальное кол-во
        setTimeout( () => {
            this.notificationsNumber = this.$root.$auth.notificationsNumber;
        }, 10 );
    }
},

computed: {
    notificationsList(){
        return this.$root.$auth.notifications;
    }
},

created(){
    this.$root.$on('notificationsLoad',  this.updateNotifications);
}
}
</script>
