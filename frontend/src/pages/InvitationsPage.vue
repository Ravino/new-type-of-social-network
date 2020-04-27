<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">

            <FriendsListHeader></FriendsListHeader>

            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 bg-white-br20">

                    <div v-if="isDataReady" class="plizi-search-results-list">
                        <ul v-if="invitations  &&  (invitations.length > 0)" class="list-unstyled mb-0">
                            <InvitationItem v-for="(invItem, invIndex) in invitations"
                                            v-bind:key="invIndex" v-bind:invitation="invItem">
                            </InvitationItem>
                        </ul>
                        <div class="p-3" v-else>
                            <div class="alert alert-info text-center">
                                Нет приглашений подружиться.
                            </div>
                        </div>
                    </div>
                    <Spinner v-else v-bind:clazz="`d-flex flex-row`"></Spinner>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <PotentialFriends :blockName="`Возможные друзья`" :friends="shuffle(potentialList)"></PotentialFriends>
                    <PotentialFriends :blockName="`Рекомендуемые друзья`" :friends="shuffle(potentialList)"></PotentialFriends>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>
    </div>
</template>

<script>
import FriendsListMixin from '../mixins/FriendsListMixin.js';

import InvitationItem from '../components/InvitationItem.vue';

export default {
name: 'InvitationsPage',
components: { InvitationItem },
mixins : [FriendsListMixin],
data() {
    return {
        isDataReady : true,
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
