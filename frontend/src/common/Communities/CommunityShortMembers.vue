<template>
    <div v-if="isFriendsInCommunity" id="communityParticipants" class="bg-white-br20 py-5 text-center mb-5">

        <div class="d-flex flex-row justify-content-start">
            <h6 class="plz-sf-title w-auto pl-2">Участники
                <span class="plz-sf-subtitle ml-2">{{community.totalMembers}}</span>
            </h6>
        </div>

        <div class="plz-short-friends-list pb-2" >
            <CommunityShortMemberItem v-for="fmItem in friendsMembers"
                              v-bind:member="fmItem"
                              v-bind:key="fmItem.id"></CommunityShortMemberItem>
        </div>

        <div class="text-center">
            <router-link tag="a" class="text-black-50" :to="`/members-`+community.id">Смотреть ещё</router-link>
        </div>

    </div>
</template>

<script>
import CommunityShortMemberItem from './CommunityShortMemberItem.vue';
import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name: 'CommunityShortMembers',
components : { CommunityShortMemberItem },
props: {
    community: PliziCommunity
},

data () {
    return {
    }
},

computed : {
    friendsMembers(){
        return (this.community ? this.community.members : []);
    },

    isFriendsInCommunity(){
        return (this.community && this.community.totalMembers>0);
    },
}

}
</script>


