import PliziCommunity from "../classes/PliziCommunity";

const CommunitiesSubscribeMixin = {
    methods: {
        /**
         * @param {PliziCommunity} community
         * @returns {string}
         */
        getSubscribeType(community) {
            const role = community.role;
            if (!role) {
                return 'new';
            }
            if (role === 'author') {
                return 'author';
            }
            return 'exists';
        },

        /**
         * @param {PliziCommunity} community
         */
        subscribeInvite(community) {
            this.subscribeOnCommunity(community);
        },
        /**
         * @param {PliziCommunity} community
         */
        unsubscribeInvite(community) {
            this.unsubscribeCommunity(community);
        },

        /**
         * @param {PliziCommunity} community
         * @returns {object|null}
         */
        async subscribeOnCommunity(community) {
            let apiResponse = null;

            try {
                apiResponse = await this.$root.$api.$communities.subscribe(community.id);
            } catch (e) {
                window.console.warn(e.detailMessage);
                throw e;
            }

            if (apiResponse) {
                if (apiResponse.status && apiResponse.status === 422) {
                    this.$root.$alert(`Вы уже подписаны на ${community.name}`, 'bg-info', 3);
                } else {
                    this.$root.$alert(`Вы успешно подписались на сообщество ${community.name}`, 'bg-success', 3);
                }
            } else {
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
            } catch (e) {
                window.console.warn(e.detailMessage);
                throw e;
            }

            if (apiResponse) {
                this.$root.$alert(`Вы успешно отписались от ${community.name}`, 'bg-success', 3);
            } else {
                this.$root.$alert(`Не получилось отписаться от ${community.name}`, 'bg-warning', 3);
            }

            return true;
        },
    },

};

export {CommunitiesSubscribeMixin as default}
