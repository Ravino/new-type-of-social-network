<template>
    <li class="plizi-community-item-wrp bg-white-br20 media  py-4 px-4  mb-2">
        <div class="plizi-community-item d-flex flex-row align-items-start">

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
                    <p v-if="community.notice" class="plizi-community-item-notice p-0 my-0 text-secondary">{{ community.notice }}</p>
                    <p v-else class="plizi-community-item-location p-0 my-0 text-secondary">{{ community.location }}</p>

                    <p class="plizi-community-item-members-number p-0 my-0">участников <b>{{ community.totalUsers }}</b></p>
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
        this.subscribeOnCommunity(this.community);
    },

    unsubscribeInvite(){
        this.unsubscribeCommunity(this.community);
    },

    /**
     * @param {PliziCommunity} community
     * @returns {object|null}
     */
    async subscribeOnCommunity(community) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.subscribe(community.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        window.console.log(apiResponse, `apiResponse`);

        if (apiResponse) {
            if (apiResponse.status  &&  apiResponse.status===422) {
                this.$root.$alert(`Вы уже подписаны на ${community.name}`, 'bg-info', 3);
            }
            else {
                this.$root.$alert(`Вы успешно подписались на сообщество ${community.name}`, 'bg-success', 3);
            }
        }
        else {
            this.$root.$alert(`Не получилось подписаться на ${community.name}`, 'bg-warning', 3);
        }

        return true;
    },


    /**
     * @param {PliziCommunity} community
     * @returns {object|null}
     */
    async unsubscribeCommunity(community) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.unsubscribe(community.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.$root.$alert(`Вы успешно отписались от ${community.name}`, 'bg-success', 3);
        }
        else {
            this.$root.$alert(`Не получилось отписаться от ${community.name}`, 'bg-warning', 3);
        }

        return true;
    },
}
}
</script>

