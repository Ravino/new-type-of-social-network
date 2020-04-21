<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-9 col-md-9 col-lg-10 col-xl-10">
            <div class="container">
                <WhatsNewBlock></WhatsNewBlock>

                <div class="row mb-4 pt-0">
                    <div id="postFilter" class="col-9 ">
                        <div class="col-12 bg-white-br20 ml-n3 d-flex align-items-center justify-content-between">
                            <nav class="nav profile-filter-links align-items-center" role="tablist">
                            <span class="nav-link py-3 px-1 mr-4 active">Новости
                                <i class="fas fa-chevron-down ml-2"></i></span>
                                <span class="nav-link py-3 px-1 mr-4">Обновления</span>
                                <span class="nav-link py-3 px-1 mr-4">Понравилось</span>
                                <span class="nav-link py-3 px-1 mr-4 ml-4">
                                <button class="btn px-2 py-0">
                                    <IconSearch style="width: 15px; height: 16px;"/>
                                </button>
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
                    <div id="postInterest" class="col-3 bg-white-br20 d-flex  align-items-center mr-n3">
                        <IconFire class="mr-3" />
                        <p class="my-0">Сначала Интересные</p>
                        <div class="button-switch d-flex align-items-center">
                            <input type="checkbox" id="switch-blue" class="switch" checked />
                            <label for="switch-blue" class="lbl-off">Off</label>
                            <label for="switch-blue" class="lbl-on">On</label>
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
    import IconFire from "../icons/IconFire";
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
            IconFire,
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
