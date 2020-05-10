<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div v-if="isDataReady" id="communityHeader" class="bg-white-br20 py-5 mb-5 text-left pl-3">
                        <h1>{{communityData.name}}</h1>
                        <p class="alert alert-info">
                            {{communityData.description}}
                        </p>
                    </div>
                    <Spinner v-else></Spinner>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <div v-if="isDataReady" id="communityInfoBlock" class="bg-white-br20 py-5 mb-5 text-left">
                        <div class="post-poster-pic mr-3">
                            <img :src="communityData.primaryImage" :alt="communityData.name" />
                        </div>
                        <p>{{communityData.description}}</p>
                    </div>
                    <Spinner v-else></Spinner>

                    <CommunityEditor v-if="canPost" :community-id="communityData.id"></CommunityEditor>

                    <div v-if="isDataReady" id="communityPostsBlock" class="bg-white-br20 py-5 mb-5 --text-center">
                        <Post v-for="postItem in communityPosts"
                              :key="postItem.id"
                              :post="postItem"
                              :isCommunity="true"
                              @onShare="onSharePost"></Post>
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

    </div>
</template>

<script>
    import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
    import FavoriteFriends from '../common/FavoriteFriends.vue';
    import Spinner from '../common/Spinner.vue';

    import Post from '../common/Post/Post.vue';

    import PliziCommunity from '../classes/PliziCommunity.js';
    import PliziPost from '../classes/PliziPost.js';
    import CommunityUserActionBlock from "../common/Communities/CommunityUserActionBlock";
    import CommunityFriendsInformer from "../common/Communities/CommunityFriendsInformer";
    import CommunityShortMembers from "../common/Communities/CommunityShortMembers";
    import CommunityEditor from "../common/Communities/CommunityEditor.vue";

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
    CommunityEditor,
},

computed: {
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

data() {
    return {
        isDataReady: false,
        communityData: null,
        communityPosts: null,
    }
},

methods: {
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

