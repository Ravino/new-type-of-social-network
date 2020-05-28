<template>
    <div class="row">
        <div class="col-12 col-md-1 ">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-12 col-md-11 col-lg-9 col-xl-10">
            <div class="row">
                <div class="col-12">
                    <div v-if="isDataReady" id="communityHeader"
                         class="plz-community-header bg-white-br20 mb-4 text-left overflow-hidden">
                        <div class="plz-community-header-pic position-relative overflow-hidden">
                            <img :src="headerImage" alt="image">
                        </div>
                        <div class="plz-community-header-bottom d-flex flex-wrap align-items-start justify-content-between py-3 px-4">
                            <div class="plz-community-header-details d-flex align-items-start flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-start">
                                <template v-if="isAuthor">
                                    <label for="communityPrimaryImage" class="community-primary-image cursor-pointer plz-community-header-logo position-relative mb-2 mb-sm-0 mx-0 mr-sm-3">
                                        <img ref="communityAvatar" :src="avatarMedium" :alt="communityData.name" />
                                    </label>

                                    <input id="communityPrimaryImage" ref="communityPrimaryImage" type="file"
                                           @change="uploadPrimaryImage()"
                                           class="d-none" />
                                </template>
                                <template v-else>
                                    <div class="plz-community-header-logo position-relative mr-3">
                                        <img ref="communityAvatar" :src="avatarThumb" :alt="communityData.name" />
                                    </div>
                                </template>
                                <div class="plz-community-header-details-text pt-2">
                                    <h1 class="plz-community-header-title mb-2">
                                        {{communityData.name}}
                                    </h1>
                                    <PrivacyLabel :community="communityData"></PrivacyLabel>
                                    <p class="plz-community-header-desc mb-0">
                                        {{communityData.notice}}
                                    </p>
                                </div>
                            </div>
                            <div class="plz-community-subscribe file-label d-flex align-items-center mt-4 justify-content-between mx-auto mx-md-0">

                                <button v-if="subscribeType === 'new'"
                                        class="btn align-items-center justify-content-center d-flex w-75 border-right m-0"
                                        @click="subscribeInvite(communityData)">
                                    подписаться
                                </button>
                                <button v-else-if="subscribeType === 'request'"
                                        class="btn align-items-center justify-content-center d-flex w-75 border-right m-0"
                                        @click="sendRequest(communityData)">
                                    запрос
                                </button>
                                <button v-else-if="subscribeType === 'exists'"
                                        class="btn align-items-center justify-content-center d-flex w-75 border-right m-0"
                                        @click="unsubscribeInvite(communityData)">
                                    отписаться
                                </button>
                                <router-link :to="{name: 'CommunitySettingsPage', params: {id: communityData.id}}"
                                             v-else-if="subscribeType === 'author'"
                                             class="btn align-items-center justify-content-center d-flex w-75 border-right m-0">
                                    управление
                                </router-link>

                                <button title="опции"
                                        class="btn align-items-center justify-content-center d-flex w-25"
                                        type="button"
                                        id="CommunityOptions"
                                        data-toggle="dropdown"
                                        data-offset="0,5"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                    <span class="ps-dot"></span>
                                    <span class="ps-dot"></span>
                                    <span class="ps-dot"></span>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right py-3"
                                     aria-labelledby="CommunityOptions" >
                                    <CommunityAuthorOptions  v-if="isAuthor" v-bind:community="communityData" ></CommunityAuthorOptions>
                                    <CommunityUserOptions v-else v-bind:community="communityData" ></CommunityUserOptions>
                                </div>
                            </div>

                        </div>
                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>

            <div class="row">
                <div class="col-12 --col-sm-7 col-lg-8 col-xl-8 order-1 order-lg-0">
                    <div v-if="isDataReady"
                         id="communityInfoBlock"
                         class="plz-community-info-block bg-white-br20 py-3 px-4 mb-4 text-left">
                        <h4 class="plz-community-header-title">Информация</h4>

                        <p class="plz-community-info-desc">{{communityData.description}}</p>
                        <p><a :href="communityData.website" target="_blank" class="plz-community-info-desc">{{communityData.website}}</a></p>
                    </div>
                    <Spinner v-else></Spinner>

                    <CommunityEditor v-if="canPost"
                                     :community-id="communityData.id"
                                     :class="'mx-0 '"
                                     @addNewPost="addNewPost"/>

                    <div v-if="posts && posts.length > 0" id="communityPostsBlock" class="pb-5 mb-4 --text-center">
                        <Post v-for="postItem in posts"
                              :key="postItem.id"
                              :post="postItem"
                              :isCommunity="true"
                              :class="'mx-0'"
                              @onShare="onSharePost"
                              @onDeletePost="onDeletePost"
                              @onRestorePost="onRestorePost"
                              @onEditPost="onEditPost"
                              @openVideoModal="openVideoModal"
                              @onShowUsersLikes="openLikeModal"/>
                    </div>

                    <div v-else-if="!hasAccess"  class="row plz-post-item mb-4 bg-white-br20 p-4">
                        <div class="alert alert-info w-100 p-5 text-center mb-0">
                            У Вас нет доступа.
                            <p v-if="subscribeType === 'request'">
                                Отправьте
                                <a href="#" @click.stop="sendRequest(communityData)">запрос</a>
                                на вступление в сообщество
                            </p>
                        </div>
                    </div>

                    <div v-else-if="!isStarted"  class="row plz-post-item mb-4 bg-white-br20 p-4">
                        <div class="alert alert-info w-100 p-5 text-center mb-0">
                            Извините, но сейчас нечего показывать.
                        </div>
                    </div>

                    <template v-if="isStarted">
                        <div class="row plz-post-item mb-4 bg-white-br20 p-4">
                            <div class="w-100 p-5 text-center mb-0">
                                <SmallSpinner/>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="col-12 --col-sm-5 col-lg-4 order-0 order-lg-1">
<!--               TODO @tga мы этот блок можем удалить? -->
<!--                    <CommunityManagedActionBlock :community="communityData" v-if="isAuthor"></CommunityManagedActionBlock>-->
 <!--               TODO @tga мы этот блок можем удалить? -->
                    <CommunityUserActionBlock v-if="!isAuthor" v-bind:community="communityData"></CommunityUserActionBlock>

                    <CommunityFriendsInformer v-bind:community="communityData"></CommunityFriendsInformer>

                    <CommunityShortMembers v-if="isDataReady" v-bind:community="communityData"></CommunityShortMembers>

                    <CommunityVideoBlock v-if="hasAccess"
                             :avatarMedium="avatarMedium"
                             :communityId="parseInt(id)"
                             @openVideoModal="openVideoModal"/>
                </div>
            </div>
        </div>

        <div class="col-sm-2  col-lg-2 col-xl-1 d-none d-lg-block">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>

        <PostEditModal v-if="postEditModal.isVisible"
                       :post="postForEdit"
                       @hidePostEditModal="hidePostEditModal"/>

        <PostRepostModal v-if="postRepostModal.isVisible"
                         :community="communityData"
                         :post="postForRepost"
                         @hidePostRepostModal="hidePostRepostModal"/>

        <PostLikeModal v-if="postLikeModal.isVisible"
                       :users="postLikeModal.content.users"
                       @hideLikeModal="hideLikeModal"/>

        <PostVideoModal v-if="postVideoModal.isVisible"
                        :videoLink="postVideoModal.content.videoLink"
                        @hideVideoModal="hideVideoModal"/>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import Spinner from '../common/Spinner.vue';
import Post from '../common/Post/Post.vue';
import PostEditModal from '../common/Post/PostEditModal.vue';

import CommunityUserActionBlock from '../common/Communities/CommunityUserActionBlock.vue';
import CommunityFriendsInformer from '../common/Communities/CommunityFriendsInformer.vue';
import CommunityShortMembers from '../common/Communities/CommunityShortMembers.vue';
import CommunityEditor from '../common/Communities/CommunityEditor.vue';
import PostRepostModal from '../common/Post/PostRepostModal.vue';
import PostLikeModal from '../common/Post/PostLikeModal.vue';
import SmallSpinner from "../common/SmallSpinner.vue";
import IconYoutube from "../icons/IconYoutube.vue";

import PrivacyLabel from "../components/Community/PrivacyLabel.vue";

import CommunityManagedActionBlock from "../common/Communities/CommunityManagedActionBlock.vue";
import CommunityAuthorOptions from "../common/Communities/CommunityAuthorOptions.vue";
import CommunityUserOptions from "../common/Communities/CommunityUserOptions.vue";
import CommunityVideoBlock from "../components/Community/CommunityVideoBlock.vue";
import PostVideoModal from "../common/Post/PostVideoModal.vue";

import LazyLoadPosts from '../mixins/LazyLoadPosts.js';
import CommunitiesSubscribeMixin from '../mixins/CommunitiesSubscribeMixin.js';
import HotCommunitiesMixin from '../mixins/HotCommunitiesMixin.js';

import PliziCommunity from '../classes/PliziCommunity.js';
import PliziPost from '../classes/PliziPost.js';
import PliziCommunityAvatar from '../classes/Community/PliziCommunityAvatar.js';
import PliziUser from '../classes/PliziUser.js';

export default {
name: 'CommunityPage',
props: {
    id : Number|String
},
mixins: [CommunitiesSubscribeMixin, LazyLoadPosts, HotCommunitiesMixin],
components : {
    CommunityUserOptions,
    CommunityAuthorOptions,
    PostVideoModal,
    CommunityVideoBlock,
    CommunityManagedActionBlock,
    CommunityShortMembers,
    CommunityFriendsInformer,
    CommunityUserActionBlock,
    Spinner,
    AccountToolbarLeft,
    FavoriteFriends,
    Post,
    PostEditModal,
    CommunityEditor,
    PostRepostModal,
    PostLikeModal,
    SmallSpinner,
    PrivacyLabel,
},

data() {
    return {
        isDataReady: false,
        communityData: null,
        posts: [],
        postEditModal: {
            isVisible: false,
        },
        postForEdit: null,
        postRepostModal: {
            isVisible: false,
        },
        postForRepost: null,
        postLikeModal: {
            isVisible: false,
            content: {
                users: [],
            },
        },
        postVideoModal: {
            isVisible: false,
            content: {
                videoLink: null,
            },
        },
    }
},

computed: {
    isAuthor(){
        return this.communityData?.role === 'author';
    },

    subscribeType() {
        return this.getSubscribeType(this.communityData);
    },

    filteredPosts(){
        return [];
    },

    canPost() {
        /**
         * @todo check privacy
         */
        return this.communityData && this.communityData.role !== null;
    },
    avatarMedium() {
        return this.communityData?.avatar?.image.medium.path || this.communityData?.primaryImage;
    },
    avatarThumb() {
        return this.communityData?.avatar?.image.thumb.path || this.communityData?.primaryImage;
    },
    headerImage() {
        return this.communityData?.headerImage?.image.normal.path || 'images/community-header-bg.jpg';
    },
    hasAccess() {
        // Opened
        if (this.communityData?.privacy === 1) {
            return true;
        }
        return !!this.communityData?.role;
    }
},

methods: {
    addNewPost(post) {
        this.posts.unshift( new PliziPost( post ) );
    },
    startTimer(post){
        setTimeout( () => {
            let postIndex = this.posts.findIndex(item => item.id === post.id);

            this.posts.splice( postIndex, 1 );
        }, 5000 );
    },
    onEditPost( post ){
        this.postEditModal.isVisible = true;
        this.postForEdit = post;
    },
    hidePostEditModal(){
        this.postEditModal.isVisible = false;
        this.postForEdit = null;
    },

    ytInit(){
        let video = document.getElementsByClassName('video');

        let videoWrap;
        for (let i = 0; i < video.length; i++) {
            videoWrap = video[i].getElementsByClassName('video_wrap');
            console.log(videoWrap);
        }
    },

    /**
     * @returns {boolean|FormData}
     */
    getFormData(){
        const fName = this.$refs.communityPrimaryImage.value;
        const fExt = fName.split('.').pop().toLowerCase();
        const allowExts = ['png', 'jpg', 'jpeg', 'bmp', 'webp', 'gif'];

        if ( ! allowExts.includes(fExt) ) {
            this.$alert(`<h4 class="text-white">Ошибка</h4>
<div class="alert alert-danger">
Недопустимое расширение у файла <b>${fName}</b><br />
Допустимы только: <b class="text-success">${allowExts.join( ', ' )}</b>
</div>`, `bg-danger`, 30);
            return false;
        }

        const formData = new FormData();
        formData.append('file', this.$refs.communityPrimaryImage.files[0]);
        formData.append('id', this.communityData.id);
        this.$refs.communityPrimaryImage.value = '';

        return formData;
    },

    showErrorOnLargeFile() {
        this.$alert(`<h4 class="text-white">Ошибка</h4>
                <div class="alert alert-danger">
                    Превышен максимальный размер файла.
                    <br />
                    Максимальный размер файла:
                    <b class="text-success">2 MB</b>
                </div>`,
          `bg-danger`,
          30
        );
    },

    onSharePost(post){
        this.postRepostModal.isVisible = true;
        this.postForRepost = post;
    },

    hidePostRepostModal() {
        this.postRepostModal.isVisible = false;
        this.postForRepost = null;
    },

    hideLikeModal() {
        this.postLikeModal.isVisible = false;
        this.postLikeModal.content.users = null;
    },

    async openLikeModal(postId) {
        this.postLikeModal.isVisible = true;
        await this.getUsersLikes(postId);
    },

    async getUsersLikes(postId, limit = 20, offset = 0) {
        let response = null;

        try{
            response = await this.$root.$api.$post.getUsersLikes(postId, limit, offset);
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response !== null ){
            response.map((post) => {
                this.postLikeModal.content.users.push(new PliziUser(post));
            });

            return response.length;
        }
    },

    async onDeletePost(id) {
        let response;

        try{
            response = await this.$root.$api.$post.deletePost( id );
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response ){
            const post = this.posts.find( ( post ) => {
                return post.id === id;
            } );

            post.deleted = true;

            this.startTimer(post);
        }
    },

    async onRestorePost(id) {
        let response;

        try{
            response = await this.$root.$api.$post.restorePost( id );
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response ){
            const post = this.posts.find( ( post ) => {
                return post.id === id;
            } );

            post.deleted = false;
        }
    },

    async uploadPrimaryImage(){
        if (!this.isAuthor)
            return;

        const formData = this.getFormData();

        if (!formData) {
            return;
        }

        const { size } = formData.get('file');

        if (size > 2000000) {
            this.showErrorOnLargeFile();
            return;
        }

        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.updatePrimaryImage(formData);
        } catch (e) {
            if (e.status === 422) {
                this.showErrorOnLargeFile();
                return;
            }

            window.console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.communityData.avatar = new PliziCommunityAvatar(apiResponse.data);
        }
    },

    async getCommunityInfo() {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.getCommunity(this.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.communityData = new PliziCommunity(apiResponse);
            this.isDataReady = true;
            document.title = `Plizi: ${this.communityData?.name}`;
            setTimeout(() => {
                const getPosts = async () => {
                    await this.getPosts();
                };
                if (!this.hasAccess) {
                    this.noMore = true;
                    return;
                }
                getPosts();
                this.noMore = false;
            }, 100);
        }
    },

    async getPosts(limit = 50, offset = 0) {
        let response = null;
        this.isStarted = true;

        try {
            response = await this.$root.$api.$communities.posts(this.id, limit, offset);
        } catch (e) {
            this.isStarted = false;
        }

        if (response !== null) {
            this.isStarted = false;
            response.map((post) => {
                this.posts.push(new PliziPost(post));
            });

            return response.length;
        }
    },

    openVideoModal(evData) {
        if (evData.videoLink) {
            this.postVideoModal.isVisible = true;
            this.postVideoModal.content.videoLink = evData.videoLink;
        }
    },

    hideVideoModal() {
        this.postVideoModal.isVisible = false;
    },

    onNeedAddCommunityToHot(){
        this.keyUpdater++;
        const comm = this.communityData || null;
        this.addCommunityToFavorites( this.$route.params.id, comm );

        if (this.$refs  &&  this.$refs.hotCommunitiesBlock) {
            this.$refs.hotCommunitiesBlock.$forceUpdate();
        }
    }
},

created(){
    this.$root.$on('NeedAddCommunityToHot', this.onNeedAddCommunityToHot);
},

async mounted() {
    await this.getCommunityInfo();
    window.scrollTo(0, 0);
},

beforeRouteUpdate (to, from, next) {
    this.communityData = null;
    this.posts = null;
    next();
    this.id = to.params.id;
    this.getCommunityInfo();
    window.scrollTo(0, 0);
},

}
</script>
