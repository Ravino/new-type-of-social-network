<template>
    <li class="plizi-sr-item-user media m-0 py-4 px-4">
        <div class="plizi-sr-item d-flex w-100 align-items-center">

            <router-link :to="`/community-`+community.id" tag="a"
                         class="plizi-sr-item-pic mr-3">
                <img class="plizi-sr-item-img rounded-circle overflow-hidden"
                     :src="avatar" :alt="community.name" :title="community.name"/>
            </router-link>

            <div class="plizi-sr-item-body m-0 pr-5 ">
                <router-link :to="`/community-`+community.id" tag="a"
                             class="plizi-sr-item-top d-flex align-items-end justify-content-between mb-2">
                    <h6 class="plizi-community-item-name my-0">{{ community.name }}</h6>
                </router-link>

                <div class="plizi-sr-item-body-bottom d-flex pr-5">
                    <p v-if="community.description" class="plizi-community-item-desc p-0 mb-1">
                        <!--TODO @Veremey check this?-->
                        {{ community.description }}</p>
                    <p v-else-if="community.notice" class="plizi-community-item-notice p-0 my-0 text-secondary">
                        {{ community.notice }}</p>
                    <p v-else class="plizi-community-item-location p-0 my-0 text-secondary">
                        {{locationLabel}}</p>

                    <p class="plizi-community-item-members-number py-0 my-0 px-2">{{ community.totalMembers }}
                        участников </p><!--TODO @Veremey check this?-->


                    <div class="plizi-community-item-members-number py-0 my-0 px-2">
                        <div
                            class="plizi-community-item-body-friends d-flex flex-wrap align-items-center justify-content-between mb-2 mb-xl-0"
                            v-if="community.totalFriends">
                            <div class="plizi-community-item-body-friends-pics mr-3">
                                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle"
                                     v-for="friend in community.friends" :key="friend.id">
                                    <img :src="getAvatar(friend)" :alt="friend.profile.fullName"
                                         :title="friend.profile.fullName"/>
                                </div>
                            </div>
                            <p class="plizi-community-item-desc">{{community.totalFriends}} друзей</p>
                        </div>
                    </div>

                </div>
            </div>

            <button v-if="subscribeType === 'new'"
                    class="btn btn-primary plz-btn-outline rounded-pill ml-auto"
                    @click="subscribeInvite(community)">
                Подписаться
            </button>
            <button v-else-if="subscribeType === 'request'" type="button"
                    class="btn plz-btn-outline  plizi-community-btn rounded-pill"
                    @click="sendRequest(community)">
                Запрос
            </button>
            <button v-else-if="subscribeType === 'exists'" type="button"
                    class="btn btn-primary plz-btn-outline rounded-pill ml-auto"
                    @click="unsubscribeInvite(community)">
                Отписаться
            </button>
            <router-link :to="{name: 'CommunitySettingsPage', params: {id: community.id}}" v-else-if="subscribeType === 'author'"
                         type="button"
                         class="btn plz-btn-outline rounded-pill ml-auto">
                Управление
            </router-link>


        </div>

    </li>
</template>

<script>
    import IconLocation from '../../icons/IconLocation.vue';
    import IconMessage from '../../icons/IconMessage.vue';
    import IconMessageShort from '../../icons/IconMessageShort';
    import IconAddUser from '../../icons/IconAddUser.vue';

    import PliziCommunity from '../../classes/PliziCommunity.js';
    import CommunitiesSubscribeMixin from '../../mixins/CommunitiesSubscribeMixin.js';

    export default {
        name: 'CommunitySearchResultItem',
        components: {IconMessageShort, IconAddUser, IconMessage, IconLocation},
        mixins: [CommunitiesSubscribeMixin],
        props: {
            community: PliziCommunity,
        },
        computed: {
            avatar() {
                return this.community.avatar?.image.thumb.path || this.community.primaryImage;
            },
            subscribeType() {
                return this.getSubscribeType(this.community);
            },
            locationLabel() {
                const location = [];
                const country = this.community.location?.country.title.ru;
                if (country) {
                    location.push(country);
                }
                const region = this.community.location?.region.title.ru;
                if (region) {
                    location.push(region);
                }
                const city = this.community.location?.title.ru;
                if (city) {
                    location.push(city);
                }
                return location.join(', ');
            }
        },
        methods: {
            /**
             * @param {PliziMember} user
             */
            getAvatar(user) {
                return user.profile.avatar?.image.thumb.path || user.profile.userPic;
            },
        }
    }
</script>

