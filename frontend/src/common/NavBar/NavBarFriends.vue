<template>
    <div class="plz-top-watcher-item position-relative d-inline-block">

        <router-link to="/friends" tag="a" class="btn btn-link my-auto text-body btn-sm ">
            <IconFriends />
        </router-link>

        <span v-if="invitationsNumber>0" class="counter-info" id="dropdownMenuFriends"
              type="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{invitationsNumber}}
        </span>

        <div  v-if="invitationsNumber>0"
              class="invitations-dropdown dropdown-menu dropdown-menu-right py-3  dropdown-white w-auto"
              aria-labelledby="dropdownMenuFriends">

            <ul class="list-unstyled mb-0">
                <InvitationItem v-for="(invItem, invIndex) in invitationsList"
                                  v-bind:key="invIndex" v-bind:invitation="invItem">
                </InvitationItem>
            </ul>

            <div class="invitations-dropdown-footer border-top">
                <router-link to="/invitations" tag="a" class="invitations-link d-block text-center pt-1 pb-3">Посмотреть все</router-link>
            </div>
        </div>

    </div>
</template>

<script>
import IconFriends from '../../icons/IconFriends.vue';
import InvitationItem from '../../components/InvitationItem.vue';

export default {
name : 'NavBarFriends',
components : { IconFriends, InvitationItem },
data(){
    return {

    }
},
methods : {
    updateInvitations(){
        window.console.log(`updateInvitations`);
        this.$forceUpdate();
    }
},

computed: {
    invitationsNumber(){
        return this.$root.$auth.im.size;
    },

    invitationsList(){
        return this.$root.$auth.im.asArray();
    }
},

created(){
    this.$root.$on(this.$root.$auth.im.restoreEventName,  this.updateInvitations);
    this.$root.$on(this.$root.$auth.im.loadEventName,  this.updateInvitations);
    this.$root.$on(this.$root.$auth.im.updateEventName,  this.updateInvitations);
}

}
</script>
