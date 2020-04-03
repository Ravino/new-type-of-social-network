<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 --bg-danger">

            <div class="container-fluid">
                <ProfileHeader v-bind:user="userData"></ProfileHeader>

                <ProfilePhotos v-bind:user="userData" v-bind:photos="userPhotos"></ProfilePhotos>

                <ProfileWhatsNew></ProfileWhatsNew>

                <ProfileFilter></ProfileFilter>

                <ProfilePost v-for="(postData, postIndex) in userPosts" v-bind:key="postIndex" v-bind:post="postData" v-bind:user="userData">
                </ProfilePost>
            </div>

        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
            <FavoritFriends></FavoritFriends>
            <ShortFriends v-bind:user="userData"></ShortFriends>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoritFriends from '../common/FavoritFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';
// import AccountToolbarRight from '../common/AccountToolbarRight.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileWhatsNew from '../components/ProfileWhatsNew.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import ProfilePost from '../components/ProfilePost.vue';

import {HTTPer} from '../httper/httper.js';
import {userProfilePosts} from '../data/userProfilePosts.js';

export default {
name: 'AccountPage',
components: { AccountToolbarLeft, FavoritFriends, ShortFriends,
    ProfileHeader, ProfilePhotos, ProfileWhatsNew, ProfileFilter, ProfilePost
},
data() {
    return {
        userPosts: [
            {
                postText: `Я не могу сказать, что я отношусь к категории гордых людей, я скорее всего с категории взаимных. Для меня важно чувствовать необходимость, теплое отношение и заботу.`,
                dtLabel : `2019-07-23 18:32:00`,
                isMine: false,
                visitsNumber: 3483,
                commentsNumber: 12,
                sharesNumber: 8,
                likesNumber: 74,
                dislikesNumber: 26,
                images : []
            },
        ],

        userPhotos: [
            { path: '/images/user-photos/user-photo-01.png', },
            { path: '/images/user-photos/user-photo-02.png', },
            { path: '/images/user-photos/user-photo-03.png', },
            { path: '/images/user-photos/user-photo-04.png', },
            { path: '/images/user-photos/user-photo-01.png', },
            { path: '/images/user-photos/user-photo-03.png', },
        ],

        userData: {
            user_id: -1,
            firstname: `Владислав`,
            lastname: `Браташ`,
            sex: `m`,
            birthday: `1990-05-09`,
            city: `Москва`,
            country: `Россия`,
            created_at: `2020-03-31 13:16:41`,
            updated_at: `2020-03-31 13:16:41`,
            subscribersNumber: 122000,
            friendsNumber: 459,
            photosNumber: 1784,
            videosNumber: 62,
            audiosNumber: 3221,
        },
        dataReady: true,
        gwToken: `test`,

    }
},

methods: {
    getUserData(){
        let config = {
            headers: {
                Authorization: `Bearer ${this.gwToken}`
            },
        };

        HTTPer.get('api/user', config)
            .then( (response) => {
                window.localStorage.setItem('pliziUser', JSON.stringify(response.data.data));
                this.userData = response.data.data;
                this.dataReady = true;
            })
            .catch((error) => window.console.log(error.response));
    },

    checkUserData() {
        let user = window.localStorage.getItem('pliziUser');

        if (typeof user === 'undefined'  ||  ''===user  || null===user  || {}===user)
            return false;

        user = JSON.parse(user);
        this.userData = user;
        this.dataReady = true;

        return true;
    }
},

mounted() {
    window.console.info('Mounted');
    window.console.log(userProfilePosts);
    // if (!this.checkUserData()) {
    //     await this.getUserData();
    // }
},

beforeMount() {
    // let gwt = window.localStorage.getItem('pliziJWToken');
    // if (typeof gwt === 'undefined'  ||  ''===gwt  || null===gwt) {
    //     this.$router.push({ path: '/login' });
    //     return;
    // }
    //
    // this.gwToken = gwt;
}

}
</script>

