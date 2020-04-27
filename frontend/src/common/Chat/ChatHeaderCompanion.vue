<template>
    <div class="d-flex align-items-center h-100">
        <router-link :to="`/user-`+companion.id" tag="div" class="media-pic border rounded-circle mr-3 cursor-pointer">
            <img :src="companion.userPic" v-bind:alt="companion.firstName"/>

            <span v-if="companion.isOnline" class="user-friend-isonline" :title="companion.firstName + ' онлайн'"></span>
            <span v-else class="user-friend-isoffline"></span>
        </router-link>

        <div class="media-body">
            <router-link :to="`/user-`+companion.id" tag="h6"
                         class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body cursor-pointer">
                {{companion.fullName}}
            </router-link>
            <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">
                {{ companion.lastActivity | lastEventTime }}
            </p>
        </div>
    </div>
</template>

<script>
import PliziAttendee from '../../classes/PliziAttendee.js';

export default {
name : 'ChatHeaderCompanion',
props : {
    companion : PliziAttendee
}
}
</script>
