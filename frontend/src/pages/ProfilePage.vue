<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0 --bg-danger">

            <div class="container">
                <ProfileHeader v-bind:user-data="userData"></ProfileHeader>

                <ProfilePhotos v-bind:photos="userPhotos"></ProfilePhotos>

                <ProfileWhatsNew></ProfileWhatsNew>

                <ProfileFilter @wallPostsSelect="wallPostsSelectHandler"></ProfileFilter>

                <ProfilePost v-for="(postData, postIndex) in userPosts"
                             v-bind:key="postIndex" v-bind:post="postData">
                </ProfilePost>
            </div>

        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoritFriends></FavoritFriends>
            <ShortFriends v-bind:user="userData"></ShortFriends>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoritFriends from '../common/FavoritFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileWhatsNew from '../components/ProfileWhatsNew.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import ProfilePost from '../components/ProfilePost.vue';

import userProfilePosts from '../data/userProfilePosts.js';

export default {
name: 'ProfilePage',
components: {
    AccountToolbarLeft, FavoritFriends, ShortFriends,
    ProfileHeader, ProfilePhotos, ProfileWhatsNew, ProfileFilter, ProfilePost
},
data() {
    return {
        userPosts: userProfilePosts,

        userPhotos: [
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-02.png',},
            {path: '/images/user-photos/user-photo-03.png',},
            {path: '/images/user-photos/user-photo-04.png',},
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-03.png',},
        ],
    }
},
computed: {
    userData: function () {
        return this.$root.$user;
    },
},
methods: {
    wallPostsSelectHandler(evData) {
        window.console.log(evData.wMode, `wallPostsSelectHandler`);

        this.getFilteredPosts(evData.wMode);
    },
    getFilteredPosts(wMode) {
        let type;

        switch (wMode) {
            case 'my':
                type = 'isMine';
                break;

            case 'archive':
                type = 'isArchived';
                break;

            default:
                type = 'all';
                break;
        }

        if (type === 'all') {
            this.userPosts = userProfilePosts;
        } else {
            this.userPosts = userProfilePosts.filter(post => post[type]);
        }
    },
},
mounted() {
    this.$root.$on('wallPostsSelect', this.wallPostsSelectHandler);
}

}
</script>

