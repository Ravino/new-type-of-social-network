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

<style lang="scss">
$notificationUserPicSize: 48px;
$notificationTimeColor: #9A9A9A;
$notificationNameColor: #363636;
$notificationOnlineColor: #9FCD48;
$notificationOfflineColor: #CACAC9;


.plizi-notification-item-user {
    transition: .4s;

    .user-friend-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.plizi-notification-item {
    &-pic {
        display: inline-block;
        position: relative;
        height: $notificationUserPicSize;
        width: $notificationUserPicSize;

        img {
            display: inline-block;
            width: $notificationUserPicSize;
            height: $notificationUserPicSize;
        }
    }

    &-isonline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $notificationOnlineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-isoffline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $notificationOfflineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-body {
        &-top {
            time {
                font-size: 11px;
                color: $notificationTimeColor; // add color to var
            }

        }
    }

    &-name {
        font-size: 13px;
        font-weight: 600;
        color: $notificationNameColor;
        line-height: 20px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            color: $notificationTimeColor;
        }
    }

    &-desc {
        font-size: 12px;
        color: $notificationTimeColor;
    }

    &-details {
        font-size: 12px;
        color: $notificationNameColor;
    }

}
</style>
