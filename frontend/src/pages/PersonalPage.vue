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
                <ProfileFilter v-if="(filteredPosts && filteredPosts.length > 1) || filterMode !== 'all'"
                               :first-name="profileData.firstName"
                               @wallPostsSelect="wallPostsSelectHandler"/>

                <template v-if="filteredPosts && filteredPosts.length > 0">
                    <Post v-for="postItem in filteredPosts"
                          :key="postItem.id"
                          :post="postItem"
                          @onShare="onSharePost"></Post>
                </template>
                <div v-else>
                    <div class="alert alert-info w-100 p-5 text-center">
                        Пользователь {{ profileData.firstName }} не создал ни одной записи.
                    </div>
                </div>

            </div>

            <NewPersonalMessageModal v-if="isShowMessageDialog"
                                     :user="profileData"/>
        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoriteFriends></FavoriteFriends>
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
import PostRepostModal from '../common/Post/PostRepostModal.vue';

import PliziUser from '../classes/PliziUser.js';
import PliziPost from '../classes/PliziPost.js';

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
        userId: this.id,
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
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.getUser(this.userId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.profileData = new PliziUser(apiResponse.data);
            this.isDataReady = true;
            this.getPosts();
        }
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

    handlePersonalMessage(evData){
        this.sendMessageToUser(evData);
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
            response = await this.$root.$api.$post.getPostsByUserId(this.profileData.id);
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
    window.scrollTo(0, 0);

    this.$root.$on('hidePersonalMsgModal', ()=>{
        this.isShowMessageDialog = false;
    });

    this.$root.$on('showPersonalMsgModal', ()=>{
        this.isShowMessageDialog = true;
    });

    this.$root.$on('sendPersonalMessage', this.handlePersonalMessage);
},

beforeRouteUpdate (to, from, next) {
    this.profileData = null;
    this.userPosts = null;
        this.userId = to.params.id;
        this.getUserInfo();
        next();
        window.scrollTo(0, 0);
    },
}
</script>

