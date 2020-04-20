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
        invitationsNumber : 0
    }
},
methods : {
    updateInvitations(){
        //window.console.log(this.$root.$user.invitationsNumber, `updateInvitations`);

        this.invitationsNumber = 0;

        // @TGA хак чтобы отображало актуальное кол-во
        setTimeout( () => {
            this.invitationsNumber = this.$root.$user.invitationsNumber;
        }, 10 );
    }
},

computed: {
    //invitationsNumber(){
    //    /** @TGA без этого тупого добавления 0 автообновление не работает :( **/
    //    return (this.$root.$user.invitationsNumber + 1) - 1;
    //},
    //
    invitationsList(){
        return this.$root.$user.invitations;
    }
},

created(){
    this.$root.$on('invitationsLoad',  this.updateInvitations);
}

}
</script>
