<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0 --bg-danger">

            <div class="container">
                <ProfileHeader v-bind:user="userData"></ProfileHeader>

                <ProfilePhotos v-bind:user="userData" v-bind:photos="userPhotos"></ProfilePhotos>

                <ProfileWhatsNew></ProfileWhatsNew>

                <ProfileFilter></ProfileFilter>

                <ProfilePost v-for="(postData, postIndex) in userPosts"
                             v-bind:key="postIndex" v-bind:post="postData" v-bind:user="userData">
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
name: 'AccountPage',
components: { AccountToolbarLeft, FavoritFriends, ShortFriends,
    ProfileHeader, ProfilePhotos, ProfileWhatsNew, ProfileFilter, ProfilePost
},
data() {
    return {
        userPosts: userProfilePosts,

        userPhotos: [
            { path: '/images/user-photos/user-photo-01.png', },
            { path: '/images/user-photos/user-photo-02.png', },
            { path: '/images/user-photos/user-photo-03.png', },
            { path: '/images/user-photos/user-photo-04.png', },
            { path: '/images/user-photos/user-photo-01.png', },
            { path: '/images/user-photos/user-photo-03.png', },
        ],

        userData: {
            id: -1,
            isOnline: false,
            userPic: `/images/user-main-photo.png`,
            firstname: `Ксения`,
            lastname: `Евгеньевна`,
            sex: `m`,
            family: `В активном поиске`,
            birthday: `1990-05-09`,
            city: `Москва`,
            country: `Россия`,
            created_at: `2020-03-31 13:16:41`,
            updated_at: `2020-03-31 13:16:41`,
            profile: null,

            subscribersNumber: Math.floor(Math.random() * 10000),
            friendsNumber: Math.floor(Math.random() * 3000),
            photosNumber: Math.floor(Math.random() * 10000),
            videosNumber: Math.floor(Math.random() * 100),
            audiosNumber: Math.floor(Math.random() * 5000),
        },
    }
},


methods : {
    loadRealData() {
        //TODO: заменить потом на простой вызов строкой ниже
        // this.userData = this.$store.dispatch('GET_USER');

        let no = Object.keys( JSON.parse( JSON.stringify(this.userData) ) );
        let realData = JSON.parse(JSON.stringify( this.$store.getters.userData ));

        no.map(oKey => {
            if (realData[oKey]) {
                this.userData[oKey] = realData[oKey];
            }
        });
    },

    wallPostsSelectHandler(evData){
        window.console.log(evData.wMode, `wallPostsSelectHandler`);
    }
},

beforeMount() {
    this.loadRealData();
},

mounted() {
    this.$root.$on('wallPostsSelect', this.wallPostsSelectHandler);
}

}
</script>

