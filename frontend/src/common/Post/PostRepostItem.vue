<template>
    <div class="post-repost pl-3 ml-1 mt-3">
        <div class="post-user-data  d-flex align-items-center mb-2">
            <div class="media-pic border rounded-circle  mr-3">
                <img :src="user.userPic" :alt="user.firstName" />
            </div>
            <div class="media-body">
                <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">{{ user.firstName }}</h6>
            </div>
        </div>
        <p v-html="post.body"></p>
    </div>
</template>

<script>
    import PliziUser from '../../classes/PliziUser.js';
    import PliziPost from '../../classes/PliziPost.js';

    export default {
        name: "PostRepostItem",
        props: {
            user: PliziUser,
            post: PliziPost,
        },
    }
</script>

<style lang="scss">
    .post-repost {
        border-left: 2px solid #cececf;
    }
</style>
