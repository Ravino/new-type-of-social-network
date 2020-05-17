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
                        <div class="plz-community-header-bottom d-flex align-items-start align-items-sm-center justify-content-between py-3 px-4">
                            <div class="plz-community-header-details d-flex align-items-center">
                                <template v-if="isAuthor">
                                    <label for="communityPrimaryImage" class="community-primary-image mr-3 cursor-pointer">
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
                                <div class="plz-community-header-details-text">
                                    <h1 class="plz-community-header-title mb-1">{{communityData.name}}</h1>
                                    <p class="plz-community-header-desc mb-0">
                                        {{communityData.description}}
                                    </p>
                                </div>
                            </div>
                            <div class="plz-community-subscribe file-label d-flex align-items-center justify-content-between">
                                <button class="btn align-items-center justify-content-center d-flex w-75 border-right m-0">подписаться</button>
                                <button title="подписаться" class="btn align-items-center justify-content-center d-flex w-25">
                                    <span class="ps-dot"></span>
                                    <span class="ps-dot"></span>
                                    <span class="ps-dot"></span>
                                </button>
                            </div>
                        </div>

                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-sm-7 col-lg-8 col-xl-8 order-1 order-sm-0">
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

                    <div v-if="isDataReady" id="communityPostsBlock" class="pb-5 mb-4 --text-center">
                        <Post v-for="postItem in communityPosts"
                              :key="postItem.id"
                              :post="postItem"
                              :isCommunity="true"
                              :class="'mx-0'"
                              @onShare="onSharePost"
                              @onDeletePost="onDeletePost"
                              @onRestorePost="onRestorePost"
                              @onEditPost="onEditPost"></Post>
                    </div>
                    <Spinner v-else></Spinner>
                </div>

                <div class="col-12 col-sm-5 col-lg-4">
                    <CommunityManagedActionBlock :community="communityData" v-if="isAuthor"></CommunityManagedActionBlock>

                    <CommunityUserActionBlock v-bind:community="communityData"></CommunityUserActionBlock>

                    <CommunityFriendsInformer v-bind:community="communityData"></CommunityFriendsInformer>

                    <CommunityShortMembers v-if="isDataReady" v-bind:community="communityData"></CommunityShortMembers>

                    <div id="communityVideos" class="bg-white-br20 mb-5 mb-4 py-3 px-4">

                        <h6 class="plz-community-participants-title w-auto mb-4">Видео
                            <span class="plz-community-participants-subtitle ml-2">14</span>
                        </h6>

                        <div class="videos-item mb-4">
                            <div class="video mb-3">
                                <div class="video-wrap-pre">
                                    <img :src="avatarMedium" alt="image">
                                </div>
                                <button class="video__button" type="button" aria-label="Запустить видео">
                                    <svg width="68" height="48" viewBox="0 0 68 48"><path class="video__button-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path class="video__button-icon" d="M 45,24 27,14 27,34"></path></svg>
                                </button>
                            </div>
                            <router-link tag="a"
                                         :to="`/user-`+1"
                                         class="video-desc mb-0">Эдвард Бил приглашает тебя на открытие 6 сервера Sunrise (GTA 5 RP / gta5rp.com)
                            </router-link>
                        </div>
                        <div class="videos-item mb-4">
                            <div class="video mb-3">
                                <div class="video-wrap-pre">
                                    <img :src="avatarMedium" alt="image">
                                </div>
                                <button class="video__button" type="button" aria-label="Запустить видео">
                                    <svg width="68" height="48" viewBox="0 0 68 48"><path class="video__button-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path class="video__button-icon" d="M 45,24 27,14 27,34"></path></svg>
                                </button>
                            </div>
                            <router-link tag="a"
                                         :to="`/user-`+1"
                                         class="video-desc mb-0">Эдвард Бил приглашает тебя на открытие 6 сервера Sunrise (GTA 5 RP / gta5rp.com)
                            </router-link>
                        </div>

                        <div class="d-block text-center">
                            <router-link tag="a"
                                         class="plz-community-header-desc "
                                        to="#">
                                <small>Смотреть ещё</small>
                            </router-link>
                        </div>
                      </div>
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

import PliziCommunity from '../classes/PliziCommunity.js';
import PliziPost from '../classes/PliziPost.js';
import PliziCommunityAvatar from '../classes/Community/PliziCommunityAvatar.js';
import CommunityManagedActionBlock from "../common/Communities/CommunityManagedActionBlock";

export default {
name: 'CommunityPage',
props: {
    id : Number|String
},

components : {
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
},

data() {
    return {
        isDataReady: false,
        communityData: null,
        communityPosts: null,
        postEditModal: {
            isVisible: false,
        },
        postForEdit: null,
        postRepostModal: {
            isVisible: false,
        },
        postForRepost: null,
    }
},

computed: {
    isAuthor(){
        return this.communityData?.role === 'author';
    },

    filteredPosts(){
        return [];
    },
    authUser() {
        return this.$root.$auth.user;
    },
    canPost() {
        if (this.communityData) {
            return !!this.communityData.members.find((member) => {
                return member.id === this.authUser.id && (member.role === 'user' || member.role === 'author');
            });
        }
    },
    avatarMedium() {
        return this.communityData?.avatar?.image.medium.path || this.communityData?.primaryImage;
    },
    avatarThumb() {
        return this.communityData?.avatar?.image.thumb.path || this.communityData?.primaryImage;
    },
    headerImage() {
        return this.communityData?.headerImage.image.normal.path || 'images/community-header-bg.jpg';
    }
},

methods: {
    addNewPost(post) {
        this.communityPosts.unshift( new PliziPost( post ) );
    },
    startTimer( post ){
        setTimeout( () => {
            const postIndex = this.communityPosts.find( ( userPost ) => {
                return userPost.id === post.id;
            } );

            if ( post.deleted ){
                this.communityPosts.splice( postIndex, 1 );
            }
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
    ytShow() {

    },

    async onDeletePost(id) {
        let response;

        try{
            response = await this.$root.$api.$post.deletePost( id );
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response ){
            const post = this.communityPosts.find( ( post ) => {
                return post.id === id;
            } );

            post.deleted = true;

            this.startTimer( post );
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
            const post = this.communityPosts.find( ( post ) => {
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
        }
    },

    async getCommunityPosts() {
        let response = null;

        try {
            // TODO: тут нужно получать посты сообщества
            response = await this.$root.$api.$communities.posts(this.id);
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response !== null) {
            this.communityPosts = [];

            response.map((post) => {
                this.communityPosts.push(new PliziPost(post));
            });
        }
    },
},

async mounted() {
    await this.getCommunityInfo();
    await this.getCommunityPosts();
    window.scrollTo(0, 0);
},
    beforeRouteUpdate (to, from, next) {
        this.communityData = null;
        this.communityPosts = null;
        this.id = to.params.id;
        this.getCommunityInfo();
        this.getCommunityPosts();
        next();
        window.scrollTo(0, 0);
    },
}
</script>
