<template>
    <li class="plizi-notification-item-user --media m-0 px-4 py-2">
        <div class="plizi-notification-item d-flex">
            <router-link :to="`/user-`+notification.senderID" tag="div" class="plizi-notification-item-pic mr-3">
                <img class="plizi-notification-item-img rounded-circle overflow-hidden"
                     v-bind:src="notification.senderPic" v-bind:alt="notification.senderFullName" />
            </router-link>

            <div class="plizi-notification-item-body m-0 pr-5">
                <div class="plizi-notification-item-top d-flex align-items-end justify-content-between">
                    <router-link :to="`/user-`+notification.id" tag="h6" class="plizi-notification-item-name my-0">
                        {{ notification.senderFullName }}
                    </router-link>
                </div>

                <div class="plizi-notification-item-top d-flex align-items-end justify-content-between">
                    {{notification.notifMessage}}
                </div>

                <div class="plizi-notification-item-body-bottom">
                    <p class="plizi-notification-item-desc p-0 my-0 d-inline-block">
                        <time :datetime="notification.createdAt" class="">
                            {{ notification.createdAt | lastMessageTime }}
                        </time>
                    </p>
                </div>
            </div>

            <div class="align-self-end ml-auto">
                <i class="fas fa-info-circle fa-3x"></i>
            </div>
        </div>
    </li>
</template>

<script>
import PliziNotification from '../classes/PliziNotification.js';

export default {
name : 'NotificationItem',
props : {
    notification : PliziNotification,
},
data(){
    return {
        isRead : false
    }
},

}
</script>

