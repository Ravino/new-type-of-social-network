<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0">

            <div class="container">
                <ProfileHeader v-bind:userData="userData" v-bind:isOwner="true"></ProfileHeader>

                <ProfilePhotos v-bind:photos="userPhotos"></ProfilePhotos>

                <WhatsNewBlock @addNewPost="addNewPost"></WhatsNewBlock>

                <ProfileFilter @wallPostsSelect="wallPostsSelectHandler"></ProfileFilter>

                <Post v-for="postItem in filteredPosts"
                      :key="postItem.id"
                      :post="postItem"
                      @deletePost="deletePost"
                      @restorePost="restorePost"
                      @onEditPost="onEditPost">
                </Post>
            </div>

        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoriteFriends :isNarrow="false"></FavoriteFriends>
            <ShortFriends></ShortFriends>
        </div>

        <PostEditModal v-if="postEditModal.isVisible"
                       :post="postForEdit"/>
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
import PostEditModal from "../common/Post/PostEditModal.vue";

import PliziPost from '../classes/PliziPost.js';

export default {
name: 'ProfilePage',
components: {
    AccountToolbarLeft, FavoriteFriends, ShortFriends,
    ProfileHeader, ProfilePhotos, WhatsNewBlock, ProfileFilter, Post,
    PostEditModal,
},
data() {
    return {
        userPosts: null,
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
    }
},

computed: {
    userData() {
        return this.$root.$user;
    },

    /**
     * @returns {PliziPost[]}
     */
    filteredPosts(){
      switch (this.filterMode) {
            case 'my':
                return this.userPosts.filter(post => post.checkIsMinePost(this.$root.$user.id));

            case 'archive':
                return this.userPosts.filter(post => post.isArchivePost);
        }

        return this.userPosts;
    }
},

methods: {
    wallPostsSelectHandler(evData) {
        this.filterMode = evData.wMode;
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

    addNewPost(post) {
        this.userPosts.unshift(new PliziPost(post));
    },

  startTimer(post) {
    setTimeout(() => {
      const postIndex = this.userPosts.find((userPost) => {
        return userPost.id === post.id;
      });

      if (post.deleted) {
        this.userPosts.splice(postIndex, 1);
      }
    }, 5000);
  },
    onEditPost(post) {
        this.postEditModal.isVisible = true;
        this.postForEdit = post;
    },
    hidePostEditModal() {
        this.postEditModal.isVisible = false;
        this.postForEdit = null;
    },

  async deletePost(id) {
    let response;

    try {
      response = await this.$root.$api.$post.deletePost(id);
    } catch (e) {
      console.warn(e.detailMessage);
    }

    if (response) {
      const post = this.userPosts.find((post) => {
        return post.id === id;
      });

      post.deleted = true;

      this.startTimer(post);
    }
  },
  async restorePost(id) {
    let response;

    try {
      response = await this.$root.$api.$post.restorePost(id);
    } catch (e) {
      console.warn(e.detailMessage);
    }

    if (response) {
      const post = this.userPosts.find((post) => {
        return post.id === id;
      });

      post.deleted = false;
    }
  },
},

mounted() {
    this.$root.$on('showProfileOptionsModal', ()=>{
        this.$alert(`Какие-то опции пользователя`, 'bg-info', 10);
    });

    this.$root.$on('wallPostsSelect', this.wallPostsSelectHandler);
    this.$root.$on('hidePostEditModal', this.hidePostEditModal);
    this.getPosts();
}
}
</script>

