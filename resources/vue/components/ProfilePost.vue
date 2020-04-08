<template>
    <div class="row plz-post-item mt-4 bg-white-br20 py-3">
        <div class="col-12">
            <div class="d-flex flex-row align-content-lg-start border-bottom pb-3">
                <div class="post-poster-pic mr-3">
                    <img :src="posterPic" :alt="post.posterName" />
                </div>

                <div class="post-poster-name">
                    <h6><b>{{post.posterName}}</b></h6>
                    <time :datetime="post.dtLabel" class="">
                        {{ post.dtLabel | toDMYHM }}
                    </time>
                </div>

                <div class="post-poster-actions align-self-end ml-auto">
                    <button class="btn btn-link text-black-50" type="button"><i class="fas fa-ellipsis-v fa-2x"></i></button>
                </div>
            </div>
        </div>

        <div class="col-12 py-3">
            <div class="post-main-text text-body" v-html="this.$options.filters.toBR(post.postText)"></div>
        </div>


        <div class="col-12">
            <div class="post-picture-main mt-3">
                <img :src="post.images[0].path" alt="" />
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'ProfilePost',
        props: {
            user: Object,
            post: Object
        },
        data() {
            return {
            }
        },

        methods: {
        },

        computed : {
            posterPic: function(){
                return (this.post  &&  this.post.posterPic!=='') ? this.post.posterPic : this.$defaultAvatarPath;
            }
        }

    }
</script>

<style lang="scss">
    .plz-profile-user {
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        color: #363636;
        font-family: OpenSans-Light, sans-serif;
        font-size: 13px;
    }

    $postPosterPicSize: 48px;

    .plz-post-item {
        .post-poster-pic {
            width: $postPosterPicSize;
            min-width: $postPosterPicSize;
            max-width: $postPosterPicSize;
            height: $postPosterPicSize;
            min-height: $postPosterPicSize;
            max-height: $postPosterPicSize;
            text-align: center;
            vertical-align: middle;

            > img {
                width: 100%;
                height: auto;
                border-radius: $postPosterPicSize/2;
            }
        }

        .post-picture-main {
            width: 100%;
            min-width: 100%;
            max-width: 100%;

            > img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>
