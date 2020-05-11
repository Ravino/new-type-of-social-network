<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div v-if="isDataReady" id="communityHeader" class="plz-community-header bg-white-br20 py-5 mb-5 text-left pl-3">
                        <h1 class="tx-3 text-white">{{communityData.name}}</h1>
                        <p class="text-white">
                            {{communityData.description}}
                        </p>

                        <template v-if="isAuthor">
                            <label for="communityPrimaryImage" class="community-primary-image mr-3 cursor-pointer">
                                <img ref="communityAvatar" :src="communityData.primaryImage" :alt="communityData.name" />
                            </label>

                            <input id="communityPrimaryImage" ref="communityPrimaryImage" type="file" @change="uploadPrimaryImage()" class="d-none" />
                        </template>
                        <template v-else>
                            <div class="community-primary-image mr-3">
                                <img ref="communityAvatar" :src="communityData.primaryImage" :alt="communityData.name" />
                            </div>
                        </template>

                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <div v-if="isDataReady" id="communityInfoBlock" class="community-info-block bg-white-br20 p-5 mb-5 text-left">
                        <p>{{communityData.description}}</p>
                        <p><a :href="communityData.website" target="_blank" class="text-dark">{{communityData.website}}</a></p>
                    </div>
                    <Spinner v-else></Spinner>

                    <CommunityEditor v-if="canPost"
                                     :community-id="communityData.id"
                                     :class="'mx-0'"
                                     @addNewPost="addNewPost"/>

                    <div v-if="isDataReady" id="communityPostsBlock" class="pb-5 mb-5 --text-center">
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

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <CommunityUserActionBlock v-bind:community="communityData"></CommunityUserActionBlock>

                    <CommunityFriendsInformer v-bind:community="communityData"></CommunityFriendsInformer>

                    <CommunityShortMembers v-if="isDataReady" v-bind:community="communityData"></CommunityShortMembers>

                    <div id="communityVideos" class="bg-white-br20 py-5 text-center">
                        видосики
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>

        <PostEditModal v-if="postEditModal.isVisible"
                       :post="postForEdit"
                       @hidePostEditModal="hidePostEditModal"/>
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

import PliziCommunity from '../classes/PliziCommunity.js';
import PliziPost from '../classes/PliziPost.js';

export default {
name: 'CommunityPage',
props: {
    id : Number|String
},

components : {
    CommunityShortMembers,
    CommunityFriendsInformer,
    CommunityUserActionBlock,
    Spinner,
    AccountToolbarLeft,
    FavoriteFriends,
    Post,
    PostEditModal,
    CommunityEditor,
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
    }
},

computed: {
    isAuthor(){
        return this.communityData.role === 'author';
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

        const { size } = formData.get('image');

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
            window.console.log(apiResponse, `apiResponse`);

            /** TODO: @TGA сохранить изменения **/
            //this.$root.$auth.user.userPic = apiResponse.data.path;
            //this.$root.$auth.user.avatar = new PliziAvatar(apiResponse.data);
            //this.$refs.userAvatar.src = this.$root.$auth.user.avatar?.image?.medium.path || this.$root.$auth.user.userPic;
            //this.$root.$auth.storeUserData();
            //this.$root.$emit('UpdateCommunityAvatar', {userPic: this.$root.$auth.user.userPic});
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
        formData.append('image', this.$refs.communityPrimaryImage.files[0]);
        formData.append('tag', 'primary');
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

    onSharePost(evData){
        this.$alert(`Тут будет шэйринг поста`, `bg-info`, 3);
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
    this.isDataReady = true;
}
}
</script>
