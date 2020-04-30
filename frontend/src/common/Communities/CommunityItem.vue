<template>
    <li class="plizi-community-item-wrp media m-0 py-4 px-4">
        <div class="plizi-community-item d-flex w-100 align-items-center">

            <router-link :to="`/community-`+community.id" tag="div" class="plizi-sr-item-pic mr-3 " >
                <img class="plizi-community-item-img rounded-circle overflow-hidden"
                     v-bind:src="community.primaryImage" v-bind:alt="community.name" />
            </router-link>

            <div class="plizi-sr-item-body m-0 pr-5">
                <router-link :to="`/community-`+community.id" tag="div"
                         class="plizi-community-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-community-item-name my-0 text-danger">{{ community.name }}</h6>
                </router-link>

                <div class="plizi-community-item-body-bottom pr-5">
                    <p class="plizi-community-item-desc p-0 my-0">
                        {{ community.description }}</p>
                    <p class="plizi-community-item-notice p-0 my-0">
                        {{ community.notice }}</p>
                    <p class="plizi-community-item-location p-0 my-0">
                        {{ community.location }}</p>
                </div>
            </div>

            <button type="button" class="btn plz-btn-primary" @click="subscribeInvite()">
                Подписаться
            </button>

        </div>
    </li>
</template>

<script>
import IconLocation from '../../icons/IconLocation.vue';
import IconMessage from '../../icons/IconMessage.vue';
import IconMessageShort from '../../icons/IconMessageShort';
import IconAddUser from '../../icons/IconAddUser.vue';

import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name : 'CommunityItem',
components: {IconMessageShort, IconAddUser, IconMessage, IconLocation},

props : {
    community : PliziCommunity
},

methods: {
    subscribeInvite(){
        this.$root.$alert('Падписка!', 'bg-info', 3);
    }
}
}
</script>

