<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-11 col-xl-8 pl-0 pr-0 pr-xl-3">
                <div class="container">
                    <ProfileHeader v-bind:userData="userData" v-bind:isOwner="true"></ProfileHeader>

                    <ProfilePhotos v-bind:photos="userPhotos"></ProfilePhotos>

                    <WhatsNewBlock @addNewPost="addNewPost"></WhatsNewBlock>

                    <ProfileFilter v-if="userPosts && userPosts.length > 1"
                                   @wallPostsSelect="wallPostsSelectHandler"></ProfileFilter>

                    <template v-if="userPosts && userPosts.length > 0">
                        <Post v-for="postItem in filteredPosts"
                              :key="postItem.id"
                              :post="postItem"
                              @onDeletePost="onDeletePost"
                              @onRestorePost="onRestorePost"
                              @onEditPost="onEditPost"
                              @openVideoModal="openVideoModal">
                        </Post>
                    </template>

                    <div v-else  class="row plz-post-item mb-4 bg-white-br20 p-4">
                        <div class="alert alert-info w-100 p-5 text-center mb-0">
                            Вы не создали ни одной записи.
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0 d-none d-lg-block">
                <FavoriteFriends :isNarrow="false"></FavoriteFriends>
                <ShortFriends v-bind:friends="allFriends"></ShortFriends>
            </div>

            <PostEditModal v-if="postEditModal.isVisible"
                           :post="postForEdit"
                           @hidePostEditModal="hidePostEditModal"/>

            <PostVideoModal v-if="postVideoModal.isVisible"
                            :videoLink="postVideoModal.content.videoLink"
                            @hideVideoModal="hideVideoModal"/>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';

import Post from '../common/Post/Post.vue';
import WhatsNewBlock from '../common/WhatsNewBlock.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import PostEditModal from '../common/Post/PostEditModal.vue';
import PostVideoModal from '../common/Post/PostVideoModal.vue';

import PliziPost from '../classes/PliziPost.js';
import ShortFriendsMixin from '../mixins/ShortFriendsMixin.js';

export default {
name: 'ProfilePage',
components: {
    AccountToolbarLeft, FavoriteFriends, ShortFriends,
    ProfileHeader, ProfilePhotos, WhatsNewBlock, ProfileFilter, Post,
    PostEditModal,
    PostVideoModal,
},
mixins: [ShortFriendsMixin],
data() {
    return {
        userPosts: [],
        //allMyFriends: null,
        filterMode: `all`,

        userPhotos: [
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-02.png',},
            {path: '/images/user-photos/user-photo-03.png',},
            {path: '/images/user-photos/user-photo-04.png',},
            {path: '/images/user-photos/user-photo-01.png',},
            {path: '/images/user-photos/user-photo-03.png',},
        ],
        postEditModal: {
            isVisible: false,
        },
        postForEdit: null,
        postVideoModal: {
            isVisible: false,
            content: {
                videoLink: null,
            },
        },
        lazyLoadStarted: false,
        noMorePost: false,
    }
},

computed : {
    userData(){
        return this.$root.$auth.user;
    },

    allFriends(){
        return this.$root.$auth.frm.asArray();
    },

    /**
     * @returns {PliziPost[]}
     */
    filteredPosts(){
        switch ( this.filterMode ){
            case 'my':
                return this.userPosts.filter( post => post.checkIsMinePost( this.$root.$auth.user.id ) );

            case 'archive':
                return this.userPosts.filter( post => post.isArchivePost );
        }

        return this.userPosts;
    }
},

methods : {
    wallPostsSelectHandler( evData ){
        this.filterMode = evData.wMode;
    },

    openVideoModal( evData ){
        if ( evData.videoLink ){
            this.postVideoModal.isVisible = true;
            this.postVideoModal.content.videoLink = evData.videoLink;
        }
    },

    hideVideoModal(){
        this.postVideoModal.isVisible = false;
    },

    addNewPost( post ){
        this.userPosts.unshift( new PliziPost( post ) );
    },

    startTimer( post ){
        setTimeout( () => {
            const postIndex = this.userPosts.find( ( userPost ) => {
                return userPost.id === post.id;
            } );

            if ( post.deleted ){
                this.userPosts.splice( postIndex, 1 );
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

    onScrollYPage(){
        if (window.scrollY >= (document.body.scrollHeight - document.documentElement.clientHeight - (document.documentElement.clientHeight/2) )){
            this.lazyLoadPost();
        }
    },

    async getPosts(limit = 50, offset = 0){
        let response = null;

        try{
            response = await this.$root.$api.$post.getPosts(limit, offset);
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response !== null ){
            response.map( ( post ) => {
                this.userPosts.push( new PliziPost( post ) );
            } );

            return response.length;
        }
    },

    async lazyLoadPost() {
        if (this.lazyLoadStarted) return;
        if (this.noMorePost) return;

        this.lazyLoadStarted = true;
        let oldSize = this.userPosts.length;
        let added = await this.getPosts(10, oldSize++);

        if (added === 0) {
            this.noMorePost = true;
        }

        this.lazyLoadStarted = false;
        this.onScrollYPage();
    },

    async onDeletePost( id ){
        let response;

        try{
            response = await this.$root.$api.$post.deletePost( id );
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response ){
            const post = this.userPosts.find( ( post ) => {
                return post.id === id;
            } );

            post.deleted = true;

            this.startTimer( post );
        }
    },

    async onRestorePost( id ){
        let response;

        try{
            response = await this.$root.$api.$post.restorePost( id );
        } catch (e){
            console.warn( e.detailMessage );
        }

        if ( response ){
            const post = this.userPosts.find( ( post ) => {
                return post.id === id;
            } );

            post.deleted = false;
        }
    },
},


async mounted() {
    this.$root.$on('showProfileOptionsModal', ()=>{
        this.$alert(`Какие-то опции пользователя`, 'bg-info', 10);
    });

    this.$root.$on('wallPostsSelect', this.wallPostsSelectHandler);
    await this.getPosts();

    window.addEventListener('scroll', this.onScrollYPage);
    //await this.loadMyFriends();
}
}
</script>

