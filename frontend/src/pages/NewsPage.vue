<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-9 col-md-9 col-lg-10 col-xl-10">
            <div class="container">
                <WhatsNewBlock></WhatsNewBlock>
                <div id="postFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
                    <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
                        <nav class="nav profile-filter-links align-items-center" role="tablist">
                            <span class="nav-link py-3 px-1 mr-4">Рекомендации <i
                                class="fas fa-chevron-down"></i></span>
                            <span class="nav-link py-3 px-1 mr-4">Обновления</span>
                            <span class="nav-link py-3 px-1 mr-4">Понравилось</span>
                            <span class="nav-link py-3 px-1 mr-4">
                                <IconSearch style="width: 15px; height: 16px;"/>
                            </span>
                        </nav>

                        <div class="newsViewModes mx-1 px-1">
                            <span>Вид:</span>
                            <button class="btn bg-transparent p-0">
                                <IconMultipleViewMode style="width: 16px; height: 16px;"/>
                            </button>
                            <button class="btn bg-transparent p-0">
                                <IconSingleViewMode style="width: 16px; height: 16px;"/>
                            </button>
                        </div>
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
    import IconSearch from "../icons/IconSearch";
    import IconSingleViewMode from "../icons/IconSingleViewMode";
    import IconMultipleViewMode from "../icons/IconMultipleViewMode";
    import Post from "../common/Post.vue";
    import PliziPost from '../classes/PliziPost.js';

    export default {
        name: "NewsPage",
        components: {
            AccountToolbarLeft,
            AccountToolbarRight,
            AccountSettingsSideMenu,
            WhatsNewBlock,
            IconSearch,
            IconSingleViewMode,
            IconMultipleViewMode,
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

<style lang="scss">
    .newsViewModes {
        color: #939292;

        span:first-child {
            margin-right: 11px;
        }

        button:nth-child(2) {
            margin-right: 7px;
        }

        button {
            svg {
                fill: #939292;

                &:hover {
                    fill: #204af4;
                }
            }
        }
    }
</style>
