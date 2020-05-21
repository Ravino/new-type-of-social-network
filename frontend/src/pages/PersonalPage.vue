<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 pl-0"
             :class="calcCentralBlockClass()"
             v-bind:key="`CentralColumn-`+$root.$friendsKeyUpdater">

            <div class="container">
                <ProfileHeader v-if="isDataReady"
                               @ShowPersonalMsgModal="onShowPersonalMsgModal"
                               v-bind:userData="profileData"></ProfileHeader>
                <Spinner v-else></Spinner>

                <ProfilePhotos v-bind:photos="userPhotos"/>
                <ProfileFilter v-if="(filteredPosts && filteredPosts.length > 1) || filterMode !== 'all'"
                               v-bind:firstName="profileData.firstName"
                               @wallPostsSelect="wallPostsSelectHandler"/>

                <template v-if="filteredPosts && filteredPosts.length > 0">
                    <Post v-for="postItem in filteredPosts"
                          :key="`userPost-`+postItem.id"
                          :post="postItem"
                          @onShare="onSharePost"></Post>
                </template>

                <div v-else-if="!isStarted"  class="row plz-post-item mb-4 bg-white-br20 p-4">
                    <div class="alert alert-info w-100 p-5 text-center mb-0">
                        Пользователь {{ profileData.firstName }} не создал ни одной записи.
                    </div>
                </div>

                <template v-if="isStarted">
                    <div class="row plz-post-item mb-4 bg-white-br20 p-4">
                        <div class="w-100 p-5 text-center mb-0">
                            <SmallSpinner />
                        </div>
                    </div>
                </template>
            </div>

            <NewPersonalMessageModal v-if="isShowMessageDialog"
                                     @HidePersonalMsgModal="onHidePersonalMsgModal"
                                     @SendPersonalMessage="handlePersonalMessage"
                                     v-bind:user="profileData"></NewPersonalMessageModal>

            <PostRepostModal v-if="postRepostModal.isVisible"
                             v-bind:user="profileData"
                             v-bind:post="postForRepost"
                             @hidePostRepostModal="hidePostRepostModal"></PostRepostModal>
        </div>

        <div v-if="$root.$auth.fm.size>0" class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0"
             v-bind:key="`RightColumn-`+$root.$favoritesKeyUpdater">

            <FavoriteFriends></FavoriteFriends>
        </div>

    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';
import Spinner from '../common/Spinner.vue';
import SmallSpinner from '../common/SmallSpinner.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import Post from '../common/Post/Post.vue';

import NewPersonalMessageModal from '../components/NewPersonalMessageModal.vue';
import PostRepostModal from '../common/Post/PostRepostModal.vue';

import DialogMixin from '../mixins/DialogMixin.js';
import LazyLoadPosts from '../mixins/LazyLoadPosts.js';

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
    SmallSpinner,
},
mixins: [DialogMixin, LazyLoadPosts],

data() {
    return {
        userId: this.id,
        profileData: {},
        isDataReady: false,
        isShowMessageDialog: false,
        posts: [],
        userPhotos: [
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-02.png',},
            {path: '/images/user-photos/user-photo-03.png',},
            {path: '/images/user-photos/user-photo-04.png',},
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-03.png',},
        ],
        filterMode: 'all',
        postRepostModal: {
            isVisible: false,
        },
        postForRepost: null,
        lazyLoadStarted: false,
        noMorePost: false,
        enabledPostLoader: true,
    }
},

computed: {
    filteredPosts(){
        switch (this.filterMode) {
            case 'user':
                return this.posts.filter(post => post.checkIsMinePost(this.profileData.id));
        }

        return this.posts;
    },
},

methods: {
    calcCentralBlockClass(){
        window.console.log(`calcCentralBlockClass`);
        return {
            'col-lg-8 col-xl-8' : (this.$root.$auth.fm.size > 0), // есть фавориты
            'col-lg-11 col-xl-11' : (this.$root.$auth.fm.size === 0), // нет фаворитов
        };
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

    async handlePersonalMessage(evData){
        this.onHidePersonalMsgModal();

        this.$root.$once('NewChatDialog', (dlgData) => {
            this.sendPrivateMessageToUser(dlgData, evData.message);
        });

        await this.openDialogWithFriend( {
            id : this.profileData.id,
            fullName : this.profileData.fullName
        } );
    },


    async sendPrivateMessageToUser( chatData, msgData ){
        const sendData = {
            chatId: chatData.id,
            body: msgData.postText,
            attachments: msgData.attachments,
            event: 'new.message'
        };
        this.$root.$api.sendToChannel(sendData);
    },


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
            await this.getPosts();
        }
    },

    /**
     * @deprecated
     * @param msg
     * @returns {Promise<void>}
     */
    async sendMessageToUserOld(msg){
        await this.$root.$api.$chat.privateMessageSend(msg.receiverId, msg.message.postText, msg.message.attachments);
    },

    async getPosts(limit = 50, offset = 0) {
        if ( !(this.profileData &&  this.profileData.id))
            return;

        let response = null;
        this.isStarted = true;

        try {
            response = await this.$root.$api.$post.getPostsByUserId(this.profileData.id, limit, offset);
        } catch (e) {
            this.isStarted = false;
            console.warn(e.detailMessage);
        }

        if (response !== null) {
            this.isStarted = false;
            response.map((post) => {
                this.posts.push(new PliziPost(post));
            });

            return response.length;
        }
    },

    onHidePersonalMsgModal(){
        this.isShowMessageDialog = false;
    },

    onShowPersonalMsgModal(){
        this.isShowMessageDialog = true;
    }
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
},

async beforeRouteUpdate( to, from, next ){
    this.profileData = null;
    this.posts = null;
    this.userId = to.params.id;
    next();
    await this.getUserInfo();
    window.scrollTo( 0, 0 );
},
}
</script>

