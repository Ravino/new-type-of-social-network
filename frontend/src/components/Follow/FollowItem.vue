<template>
    <li class="plizi-invitation-item-user --media m-0 px-4 py-2">
        <div class="plizi-invitation-item d-flex">
            <router-link :to="`/user-`+follow.id" tag="div" class="plizi-invitation-item-pic mr-3">
                <img class="plizi-invitation-item-img rounded-circle overflow-hidden" v-bind:src="follow.userPic"
                     v-bind:alt="follow.fullName"/>
                <span v-if="follow.isOnline" class="plizi-invitation-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-invitation-item-isoffline"></span>
            </router-link>

            <div class="plizi-invitation-item-body flex-shrink-0 w-50 m-0 pr-4">
                <div class="plizi-invitation-item-top d-flex align-items-start justify-content-between">
                    <router-link :to="`/user-`+follow.id" tag="h6" class="plizi-invitation-item-name my-0"
                                 :title=" follow.fullName ">
                        {{ follow.fullName }}
                    </router-link>
                </div>

                <div class="plizi-invitation-item-body-bottom d-flex pr-5">
                    <p class="plizi-invitation-item-subdesc p-0 my-0  d-inline-block ">
                        <time :datetime="follow.lastActivity" class="">
                            {{ follow.lastActivity | lastEventTime }}
                        </time>
                    </p>
                </div>
            </div>

            <div class="align-self-center flex-shrink-0 ml-auto">
                <div class="btn-group">
                    <button class="btn btn-danger btn-sm ml-2 rounded" @click="unFollow()">
                        <i class="fas fa-stop"></i>&nbsp;Отписаться
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    import PliziUser from "../../classes/PliziUser.js";

    export default {
        name: 'FollowItem',
        props: {
            follow: {
                type: PliziUser,
                required: true
            }
        },
        data() {
            return {};
        },

        methods: {
            async unFollow() {
                let response = null;

                try {
                    response = await this.$root.$api.$users.unFollow(this.follow.id);
                } catch (e) {
                    window.console.warn(e.detailMessage);
                    throw e;
                }

                if (response) {
                    if (response.status && response.status === 422) {
                        this.$root.$alert(response.message, 'bg-info', 3);
                    } else {
                        this.$emit('unFollow', {
                            id: this.follow.id
                        });
                        this.$root.$alert(response.message, 'bg-success', 3);
                    }
                } else {
                    this.$root.$alert(`Не получилось отписаться`, 'bg-warning', 3);
                }
            },
        }

    }
</script>


