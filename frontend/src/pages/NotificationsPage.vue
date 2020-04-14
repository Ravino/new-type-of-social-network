<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="offset-2 col-8 bg-white-br20 p-4">
                    <div v-if="isNotificationsReady" class="plizi-notifications-list">
                        <div v-if="notificationsList  &&  notificationsList.length>0">
                            <div class="alert alert-info">
                                Список нотификаций
                            </div>
                        </div>
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
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';
import Spinner from '../common/Spinner.vue';

export default {
name: 'NotificationsPage',
components: {
    Spinner, AccountToolbarLeft,
    AccountToolbarRight
},
data() {
    return {
        notificationsList : [],
        isNotificationsReady : false
    }
},

methods: {
    async loadFriendsList() {
        let response = null;

        try {
            response = await this.$root.$api.notificationsList();
        }
        catch (e){
            if (e.status  &&  e.status>=400) {
                window.console.warn(e.detailMessage);
            }
            else {
                throw e;
            }
        }

        //window.console.warn( JSON.parse( JSON.stringify(response) ), `response` );

        if (response) {
            this.notificationsList = response;
            this.isNotificationsReady = true;
        }

        return true;
    },
},

beforeMount() {

},

async mounted(){
    await this.loadFriendsList();
}

}
</script>
