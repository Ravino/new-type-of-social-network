<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-9 col-lg-9 col-xl-10  px-0 px-md-3">
                <div class="container">
                    <WhatsNewBlock @addNewPost="addNewPost"></WhatsNewBlock>

                    <div class="row mb-4 pt-0">
                        <PostFilter></PostFilter>
                        <PostInterest></PostInterest>
                    </div>

                    <template v-if="posts && posts.length > 0">
                        <Post v-for="(postData, postIndex) in posts"
                          :key="postIndex"
                          :post="postData"
                          @onEditPost="onEditPost"
                          @onDeletePost="onDeletePost"
                          @onRestorePost="onRestorePost"
                          @openVideoModal="openVideoModal"/>
                    </template>

                    <div v-else-if="!enabledPostLoader"  class="row plz-post-item mb-4 bg-white-br20 p-4">
                        <div class="alert alert-info w-100 p-5 text-center mb-0">
                            Извините, но сейчас нечего показывать.
                        </div>
                    </div>

                    <template v-if="enabledPostLoader">
                        <div class="row plz-post-item mb-4 bg-white-br20 p-4">
                            <div class="w-100 p-5 text-center mb-0">
                                <SmallSpinner/>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>

        <PostEditModal v-if="postEditModal.isVisible"
                       :post="postForEdit"
                       @hidePostEditModal="hidePostEditModal"/>

        <PostVideoModal v-if="postVideoModal.isVisible"
                        :videoLink="postVideoModal.content.videoLink"
                        @hideVideoModal="hideVideoModal"/>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import WhatsNewBlock from '../common/WhatsNewBlock.vue';

import Post from '../common/Post/Post.vue';
import PostFilter from '../common/Post/PostFilter.vue';
import PostInterest from '../common/Post/PostInterest.vue';
import PostEditModal from '../common/Post/PostEditModal.vue';
import PostVideoModal from '../common/Post/PostVideoModal.vue';
import SmallSpinner from "../common/SmallSpinner.vue";

import PliziPost from '../classes/PliziPost.js';
import LazyLoadPosts from "../mixins/LazyLoadPosts.js";

export default {
name: 'NewsPage',
components: {
    PostInterest,
    PostFilter,
    AccountToolbarLeft,
    FavoriteFriends,
    WhatsNewBlock,
    Post,
    PostEditModal,
    PostVideoModal,
    SmallSpinner,
},
    mixins: [LazyLoadPosts],
data() {
    return {
        posts: [],
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
    }
},

methods: {
    addNewPost(post) {
        this.posts.unshift(new PliziPost(post));
    },
    onEditPost(post){
        this.postEditModal.isVisible = true;
        this.postForEdit = post;
    },
    hidePostEditModal(){
        this.postEditModal.isVisible = false;
        this.postForEdit = null;
    },
    openVideoModal(evData){
        if ( evData.videoLink ){
            this.postVideoModal.isVisible = true;
            this.postVideoModal.content.videoLink = evData.videoLink;
        }
    },
    hideVideoModal(){
        this.postVideoModal.isVisible = false;
    },
    startTimer(postIndex) {
        setTimeout(() => {
            this.posts.splice(postIndex, 1);
        }, 5000);
    },

    async getPosts(limit = 50, offset = 0) {
        let response = null;

        try {
            response = await this.$root.$api.$post.getNews(limit, offset);
        } catch (e) {
            this.enabledPostLoader = false;
            console.warn(e.message);
        }

        if (response !== null) {
            this.enabledPostLoader = false;
            response.map((post) => {
                this.posts.push(new PliziPost(post));
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

        if (response){
            const postIndex = this.posts.findIndex((post) => {
                return post.id === id;
            });
            let post = this.posts[postIndex].deleted = true;

            this.startTimer(postIndex);
        }
    },
    async onRestorePost(id) {
        let response;

        try{
            response = await this.$root.$api.$post.restorePost(id);
        } catch (e){
            console.warn(e.detailMessage);
        }

        if (response){
            const post = this.posts.find((post) => {
                return post.id === id;
            });

            post.deleted = false;
        }
    },
},

mounted() {
    this.getPosts();
},
}
</script>

