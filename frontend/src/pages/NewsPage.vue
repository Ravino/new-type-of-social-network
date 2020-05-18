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
                        <div id="postFilter" class="col-12 col-xl-9 mb-4 mb-xl-0 ">
                            <div class="row mr-xl-0 bg-white-br20 align-items-center justify-content-between">

                                    <nav class="col-lg-8 nav profile-filter-links align-items-center pl-3  mb-lg-0" role="tablist">
                                        <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4 active">Новости
                                            <i class="fas fa-chevron-down ml-2"></i>
                                        </span>
                                        <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4">Обновления</span>
                                        <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4">Понравилось</span>
                                        <span class="nav-link py-3 px-1 mr-2 mr-lg-4 ml-auto ml-lg-4 d-none d-md-block">
                                            <button class="btn px-2 py-0 ">
                                                <IconSearch style="width: 15px; height: 16px;"/>
                                            </button>
                                        </span>
                                        <div class="col-12 d-flex align-items-center form-inline mb-3 pl-0 pr-0 position-relative overflow-hidden rounded-pill mt-4">
                                            <div class="form-inline  position-relative w-100"
                                                 :class="{'isFocused' : isFocused}">
                                                <input :value="lastSearch"
                                                       id="txtCommunitiesListSearch"
                                                       ref="txtCommunitiesListSearch"

                                                       @blur="onBlur"
                                                       @focus="onFocus"
                                                       class="top-search form-control form-control  w-100"
                                                       type="text" placeholder="Поиск" aria-label="Поиск" />
                                                <button class="btn btn-search h-100 " type="submit"  >
                                                    <IconSearch style="width: 15px; height: 15px;" />
                                                </button>
                                            </div>

                                        </div>

                                    </nav>

                                    <div class="newsViewModes col-lg-4 d-lg-flex justify-content-end d-none ">
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
                        <div id="postInterest" class="col-12 col-xl-3 bg-white-br20 d-flex align-items-center mr-n3 py-2 py-xl-0" >
                            <div class="d-flex align-items-center">
                                <IconFire class="mr-3" />
                                <p class="my-0">Сначала Интересные</p>
                            </div>
                            <div class="button-switch d-flex align-items-center justify-content-center ml-2 ml-lg-auto">
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

            <div class="col-md-2 col-lg-2 col-xl-1 d-none d-md-block pr-0">
                <FavoriteFriends :isNarrow="true"></FavoriteFriends>
            </div>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';

import AccountSettingsSideMenu from '../components/AccountSettings/AccountSettingsSideMenu.vue';
import WhatsNewBlock from "../common/WhatsNewBlock.vue";
import IconSearch from "../icons/IconSearch.vue";
import IconSingleViewMode from "../icons/IconSingleViewMode.vue";
import IconMultipleViewMode from "../icons/IconMultipleViewMode.vue";
import IconFire from "../icons/IconFire.vue";
import Post from "../common/Post/Post.vue";
import PliziPost from '../classes/PliziPost.js';

export default {
    name: "NewsPage",
    components: {
        AccountToolbarLeft,
        FavoriteFriends,
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
