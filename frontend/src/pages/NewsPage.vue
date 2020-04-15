<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-9 col-md-9 col-lg-10 col-xl-10">
            <div class="container">
                <WhatsNewBlock></WhatsNewBlock>
                <div id="postFilter" class="row bg-white-br20 mt-4 pt-0 px-4">
                    <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
                        <nav class="nav profile-filter-links align-items-center" role="tablist">
                            <span class="nav-link py-3 px-1 mr-4">Рекомендации <i
                                class="fas fa-chevron-down"></i></span>
                            <span class="nav-link py-3 px-1 mr-4">Обновления</span>
                            <span class="nav-link py-3 px-1 mr-4">Понравилось</span>
                            <span class="nav-link py-3 px-1 mr-4">
                                <i class="fas fa-search"></i>
                            </span>
                        </nav>

                        <button class="btn btn-link mx-1 px-1 btn-add-file" type="button">
                            Вид:
                        </button>

                    </div>
                </div>
                <Post v-for="(postData, postIndex) in news"
                      v-bind:key="postIndex" v-bind:post="postData"></Post>
            </div>
        </div>

        <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
    import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
    import AccountToolbarRight from '../common/AccountToolbarRight.vue';
    import AccountSettingsSideMenu from '../components/AccountSettingsSideMenu.vue';
    import WhatsNewBlock from "../common/WhatsNewBlock.vue";
    import Post from "../common/Post.vue";
    import PliziPost from '../classes/PliziPost.js';

    export default {
        name: "NewsPage",
        components: {
            AccountToolbarLeft,
            AccountToolbarRight,
            AccountSettingsSideMenu,
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
                    response = await this.$root.$api.getPosts();
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
        },
        mounted() {
            this.getPosts();
        },
    }
</script>

<style scoped>

</style>
