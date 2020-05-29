<template>
    <div class="modal" id="postLikeModal" tabindex="-1" role="dialog" aria-labelledby="postLikeModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="hideLikeModal">

        <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">
                <div id="postLikeBody" class="modal-body p-4">
                    <div class="row">
                        <div class="col-3 text-center mb-3"
                             v-for="(user, index) in users"
                             :key="index">
                            <router-link :to="{ name: 'PersonalPage', params: { id: user.id } }" class="text-dark">
                                <p>{{ user.profile.firstName + ' ' + user.profile.lastName }}</p>
                                <img :src="user.profile.userPic"
                                     class="rounded-circle"
                                     :alt="user.profile.firstName + ' ' + user.profile.lastName"
                                     :title="user.profile.firstName + ' ' + user.profile.lastName">
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PliziUser from "../../classes/PliziUser.js";

    export default {
        name: "PostLikeModal",
        props: {
            postId: Number,
        },
        data() {
            return {
                isStarted: false,
                noMore: false,
                users: [],
            }
        },
        methods: {
            hideLikeModal() {
                this.$emit('hideLikeModal');
            },

            async getUsersLikes(limit = 20, offset = 0) {
                let response = null;

                try{
                    response = await this.$root.$api.$post.getUsersLikes(this.postId, limit, offset);
                } catch (e){
                    console.warn( e.detailMessage );
                }

                if ( response !== null ) {
                    response.map((post) => {
                        this.users.push(new PliziUser(post));
                    });

                    return response.length;
                }
            },
            async lazyLoadLikes() {
                if (this.isStarted || this.noMore) return;

                this.isStarted = true;
                let oldSize = this.users.length;
                let added = 0;

                if (oldSize) {
                    added = await this.getUsersLikes(10, oldSize++);
                }

                if (added === 0) {
                    this.noMore = true;
                }

                this.isStarted = false;
                this.onScrollYPageLikes();
            },
            async onScrollYPageLikes() {
                let body = document.querySelector('#postLikeBody');

                if (body.scrollTop >= (body.scrollHeight - body.clientHeight - (body.clientHeight / 2))) {
                    await this.lazyLoadLikes();
                }
            },
        },
        async mounted() {
            await this.getUsersLikes();

            let body = document.querySelector('#postLikeBody');
            body.addEventListener('scroll', this.onScrollYPageLikes);
        },
        beforeRouteLeave(to, from, next) {
            let body = document.querySelector('#postLikeBody');
            body.removeEventListener('scroll', this.onScrollYPageLikes);
            next();
        },
    }
</script>

<style lang="scss">
    #postLikeModal {
        #postLikeBody {
            img {
                height: 150px;
            }
        }
    }
</style>
