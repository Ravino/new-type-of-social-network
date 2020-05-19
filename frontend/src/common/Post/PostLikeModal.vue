<template>
    <div class="modal" id="postLikeModal" tabindex="-1" role="dialog" aria-labelledby="postLikeModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="hideLikeModal">

        <div class="modal-dialog modal-xl" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">
                <div id="postLikeBody" class="modal-body p-4">
                    <div class="row">
                        <div class="col-3 text-center"
                             v-for="(user, index) in users"
                             :key="index">
                            <p>{{ user.profile.firstName + ' ' + user.profile.lastName }}</p>
                            <img :src="user.profile.userPic"
                                 class="rounded-circle"
                                 :alt="user.profile.firstName + ' ' + user.profile.lastName"
                                 :title="user.profile.firstName + ' ' + user.profile.lastName">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostLikeModal",
        props: {
            users: {
                type: Array,
                default: null,
            },
        },
        methods: {
            hideLikeModal() {
                this.$emit('hideLikeModal');
            },
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
