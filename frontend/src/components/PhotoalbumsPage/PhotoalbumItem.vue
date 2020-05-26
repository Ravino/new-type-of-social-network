<template>
    <div class="photoalbum-item d-flex">
        <div>
            <router-link :to="`/community-`+album.id" tag="a"
                         class="">
                <img class="" src="../../images/noavatar-256.png" :alt="album.title" :title="album.title"/>
            </router-link>

            <div class="plizi-community-item-body">
                <router-link :to="`/community-`+album.id" tag="a"
                         class="plizi-community-item-top d-flex align-items-end justify-content-between mb-2  " >
                    <h6 class="plizi-community-item-name my-0">
                        {{ album.title }}
                    </h6>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
import IconLocation from '../../icons/IconLocation.vue';
import IconMessage from '../../icons/IconMessage.vue';
import IconMessageShort from '../../icons/IconMessageShort';
import IconAddUser from '../../icons/IconAddUser.vue';

import PliziCommunity from '../../classes/PliziCommunity.js';
import CommunitiesSubscribeMixin from '../../mixins/CommunitiesSubscribeMixin.js';
import PrivacyLabel from "../Community/PrivacyLabel.vue";

export default {
name : 'PhotoalbumItem',
components: {PrivacyLabel, IconMessageShort, IconAddUser, IconMessage, IconLocation},
mixins: [CommunitiesSubscribeMixin],
props : {
    album : Object,
},
computed: {
    // avatar() {
    //     return this.community.avatar?.image.thumb.path || this.community.primaryImage;
    // },
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

