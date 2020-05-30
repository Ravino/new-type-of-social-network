<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1  px-0 px-md-3">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-11 pr-0 px-0 px-md-3"
                 :class="calcCentralBlockClass()"
                 v-bind:key="`CentralColumn-`+$root.$friendsKeyUpdater">

                <div class="container">
                    <ProfileHeader v-if="isDataReady" ref="personalProfileHeader"
                                   @ShowPersonalMsgModal="onShowPersonalMsgModal"
                                   :isInBlacklist="profileData.stats.isInBlacklist"
                                   :userData="profileData">
                    </ProfileHeader>
                    <Spinner v-else></Spinner>

                    <ProfilePhotos v-bind:photos="userPhotos"/>
                    <ProfileFilter v-if="(filteredPosts && filteredPosts.length > 1) || filterMode !== 'all'"
                                   v-bind:firstName="profileData.firstName"
                                   @wallPostsSelect="wallPostsSelectHandler"/>

                    <template v-if="filteredPosts && filteredPosts.length > 0">
                        <Post v-for="postItem in filteredPosts"
                              :key="`userPost-`+postItem.id"
                              :post="postItem"
                              @onShare="onSharePost"
                              @onShowUsersLikes="openLikeModal"></Post>
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

                <PostLikeModal v-if="postLikeModal.isVisible"
                               :postId="postLikeModal.content.postId"
                               @hideLikeModal="hideLikeModal"/>
            </div>

            <div v-if="$root.$auth.fm.size>0" class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0 d-none d-xl-block"
                 v-bind:key="`RightColumn-`+$root.$favoritesKeyUpdater">

                <FavoriteFriends></FavoriteFriends>
            </div>

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
import PostLikeModal from '../common/Post/PostLikeModal.vue';

import DialogMixin from '../mixins/DialogMixin.js';
import LazyLoadPosts from '../mixins/LazyLoadPosts.js';
import BlackListMixin from '../mixins/BlackListMixin.js';

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
    PostLikeModal,
},
mixins: [DialogMixin, LazyLoadPosts, BlackListMixin],
data() {
    return {
        userId: null,
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
        postLikeModal: {
            isVisible: false,
            content: {
                postId: null,
            },
        },
    }
},

watch: {
    $route: 'afterRouteUpdate' // при изменениях маршрута запрашиваем данные снова
},

computed: {
    filteredPosts(){
        if (this.filterMode === 'user') {
            return this.posts.filter(post => post.checkIsMinePost(this.profileData.id));
        }

        return this.posts;
    },
},

methods: {
    async afterRouteUpdate(ev){
        this.userId = ev.params.id;
        this.posts = [];
        this.isStarted = true;
        await this.getUserInfo();
        await this.getPosts();
        window.scrollTo(0, 0);
    },

    calcCentralBlockClass(){
        return {
            'col-lg-8 col-xl-8'   : (this.$root.$auth.fm.size > 0), // есть фавориты
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

    onHidePersonalMsgModal(){
        this.isShowMessageDialog = false;
    },

    onShowPersonalMsgModal(){
        this.isShowMessageDialog = true;
    },

    hideLikeModal() {
        this.postLikeModal.isVisible = false;
        this.postLikeModal.content.postId = null;
    },

    openLikeModal(postId) {
        this.postLikeModal.isVisible = true;
        this.postLikeModal.content.postId = postId;
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
            this.isStarted = false;
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.profileData = new PliziUser(apiResponse.data);
            this.isDataReady = true;
        }
    },

    async getPosts(limit = 50, offset = 0) {
        if ( !(this.profileData &&  this.profileData.id))
            return;

        let response = null;

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
},

created(){
    this.userId = this.id;

    this.$root.$on( this.$root.$auth.frm.updateEventName,()=>{
        if (this.$refs  && this.$refs.personalProfileHeader){
            this.$refs.personalProfileHeader.$forceUpdate();
        }
    });
},


async mounted() {
    this.isStarted = true;
    await this.getUserInfo();
    await this.getPosts();
    window.scrollTo(0, 0);
},

/**
 * @TGA закоменченное ниже - ошибка но пусть пока будет
 */
// async beforeRouteUpdate( to, from, next ){
//    this.profileData = null;
//    this.posts = null;
//    this.userId = to.params.id;
//    next();
//     this.isStarted = true;
//     await this.getUserInfo();
//     await this.getPosts();
//    window.scrollTo( 0, 0 );
// },
}
</script>

