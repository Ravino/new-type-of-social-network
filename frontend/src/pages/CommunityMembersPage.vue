<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1 px-0 px-md-3 ">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-11 col-lg-9 col-xl-10 px-0 px-md-3">

                <div class="d-flex flex-wrap align-items-start">

                    <div class="col-12 col-lg-8 d-flex align-items-center justify-content-between px-0">
                        <nav class="nav profile-filter-links mt-2 mt-lg-0" role="tablist">
                            <router-link :to="`/community-`+id" tag="span" class="nav-link py-2 py-sm-3 py-lg-4 px-1 mr-2 mr-lg-4" role="tab">
                                Назад
                            </router-link>
                        </nav>
                    </div>

                    <div class="col-12 order-1 order-md-0 bg-white-br20">
                        <CommunityMember
                            v-for="member in allMembers"
                            v-if="isLoaded"
                            :key="member.id"
                            :srItem="member"
                            :isAdmin="role && role !== 'user'"
                            :communityId="parseInt(id)">
                        </CommunityMember>
                        <Spinner v-else></Spinner>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FriendsAllList from '../components/FriendsAllList.vue';
    import CommunityMember from '../components/Community/CommunityMember.vue';

    import PliziMember from '../classes/PliziMember.js';
    import Spinner from '../common/Spinner.vue';
    import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';

    export default {
        name: 'CommunityMembersPage',
        components: {
            FriendsAllList,
            Spinner,
            AccountToolbarLeft,
            CommunityMember
        },
        props: {
            id: String,
        },
        data() {
            return {
                allMembers: [],
                isLoaded: true,
                role: null,

                lazyLoadStarted: false,
                noMore: false,
            }
        },
        computed: {},
        methods: {
            async loadCommunityMembers() {
                let apiResponse;
                this.isLoaded = false;

                try {
                    apiResponse = await this.$root.$api.$communities.members(this.id);
                } catch (e) {
                    console.warn(e.detailMessage);
                }

                if (apiResponse) {
                    apiResponse.list.map((request) => {
                        this.allMembers.push(new PliziMember(request));
                    });
                    this.role = apiResponse.role;
                    this.isLoaded = true;
                }
            },
            onScrollYPage() {
                if (window.scrollY >= (document.body.scrollHeight - document.documentElement.clientHeight - (document.documentElement.clientHeight / 2))) {
                    this.membersLazyLoad(); // Дозагрузка!
                }
            },

            async membersLazyLoad() {
                if (this.lazyLoadStarted || this.noMore) {
                    return;
                }

                this.lazyLoadStarted = true;

                const added = 0;
                if (added === 0) {
                    this.noMore = true;
                }

                this.lazyLoadStarted = false;
                this.onScrollYPage();
            }
        },
        mounted() {
            this.loadCommunityMembers();
            // window.addEventListener('scroll', this.onScrollYPage);
        }

    }
</script>
