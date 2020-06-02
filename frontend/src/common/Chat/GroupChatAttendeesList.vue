<template>
    <div class="d-flex align-items-center h-100">
        <ChatHeaderAttendeeItem v-for="attItem in currentDialog.attendees"
                                v-bind:attendee="attItem"
                                v-bind:keyUpdater="keyUpdater"
                                v-bind:key="'chatHeaderAttendeeItem-'+attItem.id+'-'+keyUpdater">
        </ChatHeaderAttendeeItem>

        <ChatHeaderAttendeePlus @ShowAddAttendeeModal="onShowAttendeesModal"></ChatHeaderAttendeePlus>
    </div>
</template>
<script>
import ChatHeaderAttendeeItem from './ChatHeaderAttendeeItem.vue';
import ChatHeaderAttendeePlus from './ChatHeaderAttendeePlus.vue';

import PliziDialog from '../../classes/PliziDialog.js';

export default {
name : 'GroupChatAttendeesList',
components : { ChatHeaderAttendeeItem, ChatHeaderAttendeePlus },
props : {
    currentDialog : PliziDialog,
    keyUpdater: Number
},

methods: {
    onShowAttendeesModal(){
        this.$emit('ShowAddAttendeeModal', {});
    }
}

}
</script>
