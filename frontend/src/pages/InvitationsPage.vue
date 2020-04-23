<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10 bg-white-br20 p-4">

            <div v-if="isDataReady" class="plizi-search-results-list">
                <ul v-if="invitations  &&  (invitations.length > 0)" class="list-unstyled mb-0">
                    <InvitationItem v-for="(invItem, invIndex) in invitations"
                                    v-bind:key="invIndex" v-bind:invitation="invItem">
                    </InvitationItem>
                </ul>
                <div v-else>

                    <div class="alert alert-info text-center">
                        Нет приглашений подружиться.
                    </div>
                </div>
            </div>
            <Spinner v-else v-bind:clazz="`d-flex flex-row`"></Spinner>

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

import InvitationItem from '../components/InvitationItem.vue';

import PliziUser from '../classes/PliziUser.js';

export default {
name: 'InvitationsPage',
components: {
    AccountToolbarLeft, AccountToolbarRight,
    InvitationItem, Spinner
},
data() {
    return {
        isDataReady : true
    }
},

computed: {
    invitations() {
        return this.$root.$user.invitations;
    },
},

methods: {
    removeFromInvitations(invit){
        this.$root.$user.invitationRemove(invit);
    }
},

mounted(){
    this.$root.$on('invitationAccept', (evData)=>{
        setTimeout(()=>{
            this.removeFromInvitations(evData);
        }, 3*1000);
    });

    this.$root.$on('invitationDecline', (evData)=>{
        setTimeout(()=>{
            this.removeFromInvitations(evData);
        }, 3*1000);
    });
},

}
</script>
