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

                    <Post v-for="(postData, postIndex) in news"
                          v-bind:key="postIndex" v-bind:post="postData"></Post>
                </div>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import WhatsNewBlock from '../common/WhatsNewBlock.vue';

import Post from '../common/Post/Post.vue';
import PostFilter from '../common/Post/PostFilter.vue';
import PostInterest from '../common/Post/PostInterest.vue';

import PliziPost from '../classes/PliziPost.js';

export default {
name: 'NewsPage',
components: {
    PostInterest,
    PostFilter,
    AccountToolbarLeft,
    FavoriteFriends,
    WhatsNewBlock,
    Post,
},

data() {
    return {
        news: null,
    }
},

methods: {
    async getPosts() {
        let response = null;

        try {
            response = await this.$root.$api.$post.getPosts();
        } catch (e) {
            console.warn(e.message);
        }

        if (response !== null) {
            this.news = [];

            response.map((post) => {
                this.news.push(new PliziPost(post));
            });
        }
    },

    addNewPost(post) {
        this.news.unshift(new PliziPost(post));
    },
},

mounted() {
    this.getPosts();
}

}
</script>

