<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0 --bg-danger">
            <div class="container">
                <ProfileHeader v-if="isDataReady" v-bind:user-data="profileData"></ProfileHeader>
                <Spinner v-else></Spinner>

                <ProfilePhotos v-bind:photos="userPhotos"/>
                <ProfileFilter :first-name="profileData.firstName"
                               @wallPostsSelect="wallPostsSelectHandler"/>
                <Post v-for="postItem in filteredPosts"
                      :key="postItem.id"
                      :post="postItem"
                      @onShare="onSharePost"/>
            </div>

            <NewPersonalMessageModal v-if="isShowMessageDialog"
                                     :user="profileData"/>
        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoriteFriends></FavoriteFriends>
            <ShortFriends></ShortFriends>
        </div>

        <PostRepostModal v-if="postRepostModal.isVisible"
                         :user="profileData"
                         :post="postForRepost"
                         @hidePostRepostModal="hidePostRepostModal"/>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';
import Spinner from '../common/Spinner.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import Post from '../common/Post/Post.vue';
import NewPersonalMessageModal from '../components/NewPersonalMessageModal.vue';
import PostRepostModal from "../common/Post/PostRepostModal.vue";

import PliziUser from '../classes/PliziUser.js';
import PliziPost from "../classes/PliziPost";

export default {
name: 'PersonalPage',
props: {
    id : Number|String
},

components: {
    Spinner,
    AccountToolbarLeft, FavoriteFriends, ShortFriends,
    ProfileHeader, NewPersonalMessageModal,
    Post,
    ProfilePhotos,
    ProfileFilter,
    PostRepostModal,
},

    computed: {
        filteredPosts(){
            switch (this.filterMode) {
                case 'user':
                    return this.userPosts.filter(post => post.checkIsMinePost(this.profileData.id));
            }

            return this.userPosts;
        },
    },

data() {
    return {
        profileData: {},
        isDataReady: false,
        isShowMessageDialog: false,
        userPosts: null,
        userPhotos: [
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-02.png',},
            {path: '/images/user-photos/user-photo-03.png',},
            {path: '/images/user-photos/user-photo-04.png',},
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-03.png',},
        ],
        filterMode: `all`,
        postRepostModal: {
            isVisible: false,
        },
        postForRepost: null,
    }
},

methods: {
    async getUserInfo() {
        let profile = null;

        try {
            profile = await this.$root.$api.infoUser(this.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (profile) {
            this.profileData = new PliziUser();
            this.profileData.saveUserData(profile);
            this.isDataReady = true;
        }
    },

    handlePersonalMessage(evData){
        this.sendMessageToUser(evData);
    },
    wallPostsSelectHandler(evData) {
        this.filterMode = evData.wMode;
    },
    onSharePost(post) {
        this.postRepostModal.isVisible = true;
        this.postForRepost = post;
    },
    hidePostRepostModal() {
        this.postRepostModal.isVisible = false;
        this.postForRepost = null;
    },

    async sendMessageToUser(msg){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.privateMessageSend(msg.receiverId, msg.message.postText, msg.message.attachments);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse != null &&  apiResponse.data) {
            let newMsg = apiResponse.data;

            const eventData = {
                chatId : newMsg.chatId,
                message : newMsg
            }

            try {
                this.$root.$emit('newMessageInDialog', eventData);
            } catch (e){

            }
        }
        else {
            window.console.info(apiResponse);
        }
    },
    async getPosts() {
        let response = null;

        try {
            response = await this.$root.$api.$post.getPosts();
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response !== null) {
            this.userPosts = [];

            response.map((post) => {
                this.userPosts.push(new PliziPost(post));
            });
        }
    },
},

mounted() {
    this.getUserInfo();
    this.getPosts();

    this.$root.$on('hidePersonalMsgModal', ()=>{
        this.isShowMessageDialog = false;
    });

    this.$root.$on('showPersonalMsgModal', ()=>{
        this.isShowMessageDialog = true;
    });

    this.$root.$on('sendPersonalMessage', this.handlePersonalMessage);
}
}
</script>

