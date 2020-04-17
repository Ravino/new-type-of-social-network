<template>
    <div class="plz-top-watcher-item position-relative d-inline-block">

        <router-link to="/notifications" tag="a" class="btn btn-link my-auto text-body btn-sm" title="Уведомления">
            <IconBell />
        </router-link>

        <span v-if="notificationsNumber>0" class="counter-info" id="dropdownMenuLikes"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{notificationsNumber}}
        </span>

        <div v-if="notificationsNumber>0"
            class="dropdown-menu dropdown-menu-right py-3  dropdown-white w-auto" aria-labelledby="dropdownMenuLikes">
            <ul class="list-unstyled mb-0">
                <NotificationItem v-for="(notifItem, notifIndex) in notificationsList"
                                  v-bind:key="notifIndex" v-bind:notification="notifItem">
                </NotificationItem>
            </ul>
        </div>
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
        //window.console.log(this.$root.$user.notificationsNumber, `updateNotifications`);
        this.notificationsNumber = 0;

        // @TGA хак чтобы отображало актуальное кол-во
        setTimeout( () => {
            this.notificationsNumber = this.$root.$user.notificationsNumber;
        }, 10 );
    }
},

computed: {
    notificationsList(){
        return this.$root.$user.notifications;
    }
},

created(){
    this.$root.$on('notificationsLoad',  this.updateNotifications);
}
}
</script>
