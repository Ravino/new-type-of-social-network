<template>
    <div class="d-flex align-items-start mb-3">
        <div class="mr-3 position-relative">
            <div class="media-pic border rounded-circle ">
                <img :src="companion.userPic" v-bind:alt="companion.fullName" />
            </div>

            <template v-if="isTyper">
                <div class="writing"><span></span><span></span><span></span></div>
            </template>
            <template v-else>
                <span v-if="companion.isOnline"
                      class="user-friend-isonline" :title="companion.fullName + ' онлайн'"></span>
                <span v-else class="user-friend-isoffline"></span>
            </template>
        </div>

        <div class="media-body mr-auto w-auto">
            <h6 class="chatHeader-title align-self-start mt-2 pb-0 mb-0 text-body">
                {{companion.fullName}}
            </h6>
            <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">
                {{ companion.lastActivity | lastEventTime }}
            </p>
        </div>

        <div class="align-self-end ml-5 mt-0">
            <button type="button" class="btn btn-link border-0" @click.prevent="onRemoveAttendeeClick">
                <IconUserX  style="height: 20px" />
            </button>
        </div>
    </div>
</template>

<script>
import IconUserX from '../../icons/IconUserX.vue';

import PliziAttendee from '../../classes/PliziAttendee.js';

export default {
name : 'ChatAttendeeItem',
props : {
    companion : PliziAttendee,
},
components: {IconUserX},

data(){
    return {
        typingTimeout: null,
        isTyper: false
    }
},

methods : {
    onRemoveAttendeeClick(){
        this.$emit( 'RemoveAttendeeFromChat', {
            userId : this.companion.id,
            fullName: this.companion.fullName
        });
    },

    onCompanionTyping(evData) {
        if (this.companion.id !== evData.user.id)
            return;

        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.isTyper = true;

        this.typingTimeout = setTimeout(() => {
            this.isTyper = false;
        }, 2000);
    }
},

mounted(){
    this.$root.$on('userIsTyping', this.onCompanionTyping);
}
}
</script>
