<template>
    <li class="plizi-sr-item-user media m-0 py-4 px-4">
        <div class="plizi-sr-item d-flex w-100 align-items-center">
            <router-link :to="`/user-`+srItem.id" tag="div" class="plizi-sr-item-pic mr-3 " >
                <img class="plizi-sr-item-img rounded-circle overflow-hidden" v-bind:src="srItem.userPic" v-bind:alt="srItem.fullName" />
                <span v-if="srItem.isOnline" class="plizi-sr-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-sr-item-isoffline"></span>
            </router-link>

            <div class="plizi-sr-item-body m-0 pr-5 ">
                <router-link :to="`/user-`+srItem.id" tag="div"  class="plizi-sr-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-sr-item-name my-0">
                        {{ srItem.fullName }}
                    </h6>
                </router-link>

                <div class="plizi-sr-item-body-bottom d-flex pr-5">
                    <p class="plizi-sr-item-desc p-0 my-0  d-inline ">

                        <IconLocation style="height: 14px;" />

                        <!-- TODO: @YZ нужна проверка городов и страны -->
                        <span v-if="srItem.location && srItem.city.title && srItem.country.title">
                            {{ srItem.city.title.ru +', '+  srItem.country.title.ru }}
                        </span>
                        <span v-else>
                            Не указано
                        </span>
                    </p>
                </div>
            </div>

            <button @click.prevent="goToDialogWithFriend()" type="button" class="plz-short-friend-is-active btn btn-link text-body mr-2 ml-auto">
                <IconSpinner v-if="isInRedirecting" />
                <IconMessageShort v-else />
            </button>

            <a class="text-body" @click="sendFriendshipInvitation(srItem.id, srItem.fullName)">
                <IconAddUser style="width: 24px; height: 24px;" />
            </a>

        </div>
    </li>
</template>

<script>
import IconLocation from '../icons/IconLocation.vue';
import IconMessage from '../icons/IconMessage.vue';
import IconMessageShort from '../icons/IconMessageShort.vue';
import IconSpinner from '../icons/IconSpinner.vue';
import IconAddUser from '../icons/IconAddUser.vue';

import DialogMixin from '../mixins/DialogMixin.js';
import FriendshipInvitationMixin from '../mixins/FriendshipInvitationMixin.js';

import PliziUser from '../classes/PliziUser.js';

export default {
name : 'SearchResultItem',
components: {IconMessageShort, IconAddUser, IconMessage, IconSpinner, IconLocation},
mixins: [FriendshipInvitationMixin, DialogMixin],
props : {
    srItem : PliziUser
},

data(){
    return {
        isInRedirecting: false
    }
},

methods: {
    goToDialogWithFriend(){
        this.isInRedirecting = true;
        this.openDialogWithFriend( this.srItem );
        this.$root.$router.push('/chats');
    },
}
}
</script>

