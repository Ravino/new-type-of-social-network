<template>
    <li class="plizi-community-item-wrp bg-white-br20 media m-0 py-4 px-4 w-50 mb-2">
        <div class="plizi-community-item w-50 d-flex flex-row align-items-start">

            <router-link :to="`/community-`+community.id" tag="a" class="plizi-sr-item-pic mr-3 d-">
                <img class="plizi-community-item-img rounded-circle overflow-hidden"
                     v-bind:src="community.primaryImage" v-bind:alt="community.name" />
            </router-link>

            <div class="plizi-sr-item-body m-0 pr-5">
                <router-link :to="`/community-`+community.id" tag="a"
                         class="plizi-community-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-community-item-name my-0 text-success">{{ community.name }}</h6>
                </router-link>

                <div class="plizi-community-item-body-middle">
                    <p class="plizi-community-item-desc p-0 mb-1">
                        {{ community.description }}</p>
<!--                    <p class="plizi-community-item-notice p-0 mb-1">-->
<!--                        {{ community.notice }}</p>-->
                    <p class="plizi-community-item-location p-0 my-0">
                        {{ community.location }}</p>
                </div>

                <div class="plizi-community-item-body-bottom mt-2">
                    <button v-if="canSubscribe" type="button" class="btn plz-btn-outline rounded-pill" @click="subscribeInvite()">
                        Подписаться
                    </button>
                    <button v-else type="button" class="btn btn-outline-danger rounded-pill" @click="unsubscribeInvite()">
                        Отписаться
                    </button>
                </div>
            </div>

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
    community : PliziCommunity,
    canSubscribe: Boolean
},

methods: {
    subscribeInvite(){
        this.$root.$alert('Падписка!', 'bg-info', 3);
    },

    unsubscribeInvite(){
        this.$root.$alert('Атписка!', 'bg-danger', 3);
    },
}
}
</script>

