<template>
    <div class="">
        <router-link :to="`/user-`+attendee.id" tag="div" class="media-pic border rounded-circle mr-3 cursor-pointer">
            <img :src="attendee.userPic" v-bind:alt="attendee.firstName" />

            <span v-if="attendee.isOnline" class="user-friend-isonline" :title="attendee.firstName + ' онлайн'"></span>
            <span v-else class="user-friend-isoffline"></span>
        </router-link>
    </div>
</template>

<script>
import PliziAttendee from '../../classes/PliziAttendee.js';

export default {
name : 'ChatHeaderAttendeeItem',
props : {
    attendee : PliziAttendee
}
}
</script>
