<template>
    <div class="row plz-post-item mt-4 bg-white-br20 py-4">

        <div class="col-12 border-bottom px-4">
            <div class="d-flex flex-row align-content-center pb-4">
                <div class="post-poster-pic mr-3">
                    <img :src="posterPic" :alt="posterName"/>
                </div>

                <div class="post-poster-name d-flex flex-column justify-content-center">
                    <h6 class="post-poster-title mb-1">
                        <b>{{posterName}}</b>
                    </h6>
                    <!--                    <time :datetime="post.dtLabel" class="post-poster-time">-->
                    <!--                        {{ post.dtLabel | lastMessageTime }}-->
                    <!--                    </time>-->
                </div>

                <div class="post-poster-actions my-auto ml-auto">
                    <button class="btn btn-link" type="button"><i class="dots-vertical"></i></button>
                </div>
            </div>
        </div>

        <div class="col-12 pt-4 px-4 pb-2">
            <p class="post-main-text mb-2" v-html="this.$options.filters.toBR(postBody)"></p>
        </div>

        <div class="col-12">
            <div v-if="(postImages && postImages.length > 0)"
                 :id="postImagesId"
                 class="post-images">
                <!--                <template v-for="(postPic, postPicIndex) in postImages">-->
                <!--                    <div v-if="postImages.length === 1"-->
                <!--                         class="col-12">-->
                <!--                        <img :src="postPic" class="w-100" alt="">-->
                <!--                    </div>-->

                <!--                    <div v-if="postImages.length >= 2">-->
                <!--                        <div class="col col-6">-->
                <!--                            <img :src="postPic" class="w-100" alt="">-->
                <!--                        </div>-->
                <!--                        <div class="col col-6">-->
                <!--                            <img :src="postPic" class="w-100" alt="">-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </template>-->
            </div>
        </div>

        <div class="plz-post-item-footer col-12 px-4 pt-4">
            <div class="d-flex">
                <div class="d-flex">
                    <div class="post-watched-counter ml-4">
                        <IconHeard/>
                        <span>{{ postLikes | space1000 }}</span>
                    </div>
                    <div class="post-watched-counter ml-4">
                        <IconMessage/>
                        <span>{{ postCommentsCount | space1000 }}</span>
                    </div>

                    <div class="post-watched-counter ml-4">
                        <IconShare/>
                        <span>{{ postSharesCount | space1000 }}</span>
                    </div>
                </div>

                <div class="ml-auto d-flex align-items-center">
                    <div class="post-watched-counter">
                        <span>{{ postViews | space1000 }}</span>
                        <IconEye/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import IconEye from '../icons/IconEye.vue';
    import IconHeard from '../icons/IconHeard.vue';
    import IconMessage from '../icons/IconMessage.vue';
    import IconMessageUserPost from '../icons/IconMessageUserPost.vue';
    import IconShare from '../icons/IconShare.vue';

    export default {
        name: 'Post',
        components: {IconShare, IconMessage, IconHeard, IconEye, IconMessageUserPost},
        props: {
            post: Object
        },
        computed: {
            posterPic: function () {
                if (this.post.user && this.post.user.profile.userPic !== '') {
                    return this.post.user.profile.userPic;
                } else if (this.post.community && this.post.community.primaryImage !== '') {
                    return this.post.community.primaryImage;
                }
            },
            posterName() {
                return this.post.user ? this.post.user.profile.firstName + " " + this.post.user.profile.lastName
                    : this.post.community.name;
            },
            postBody() {
                return this.post.body;
            },
            postImages() {
                return this.post.primaryImage;
            },
            postViews() {
                return this.post.views;
            },
            postLikes() {
                return this.post.likes;
            },
            postCommentsCount() {
                return this.post.commentsCount;
            },
            postSharesCount() {
                return this.post.sharesCount;
            }
        },
        data() {
            return {
                postImagesId: 'postImages-' + Math.floor(Math.random() * 1000),
            }
        },
        methods: {
            calcPic() {
                let postImagesDiv = document.querySelector('#' + this.postImagesId);
                let post_images = this.postImages;
                let count_post_images = this.postImages.length;
                let parent_div = document.createElement('div');
                let child_div = document.createElement('div');
                let image = document.createElement('img');

                if (count_post_images) {
                    if (count_post_images === 1) {
                        image.classList.add('w-100');
                        child_div.classList.add('col-12');

                        image.setAttribute('src', post_images[0]);
                        child_div.append(image);
                        parent_div.append(child_div);
                    } else {
                        let second_child_div = document.createElement('div');
                        let margin = 0;

                        parent_div.classList.add('d-flex');

                        post_images.forEach(function (postImage, index) {
                            image = document.createElement('img');
                            image.classList.add('w-100');

                            if (count_post_images >= 3) {
                                margin = index % 2 !== 0 ? 5 : 0;
                            }

                            if (index === 0) {
                                image.setAttribute('src', postImage);
                                child_div.append(image);
                                child_div.classList.add('w-75');
                                child_div.classList.add('mr-2');
                                parent_div.append(child_div);
                            } else {
                                image.setAttribute('src', postImage);
                                image.style = "height:" + (500 / (count_post_images - 1) - margin) + "px; margin-bottom: 5px;";
                                second_child_div.append(image);
                                second_child_div.classList.add('w-25');
                                parent_div.append(second_child_div);
                            }
                        });
                    }

                    postImagesDiv.append(parent_div);
                }

                // if (post_images) {
                //     let el = document.createElement('div');
                //
                //     post_images.forEach(function (postImage, index) {
                //         let div_second = document.createElement('div');
                //
                //         div_second.classList.add('mb-2');
                //         image = document.createElement('img');
                //         image.classList.add('w-100');
                //
                //         if (index === 0) {
                //             image.setAttribute('src', postImage);
                //             div.append(image);
                //             row.append(div);
                //         } else {
                //             image.setAttribute('src', postImage);
                //             image.classList.add('h-50');
                //             div_second.append(image);
                //             el.append(div_second);
                //             row.append(el);
                //         }
                //     });
                //

                // }
            }
        },
        mounted() {
            this.calcPic();
        },
    }
</script>

<style lang="scss">
    .post-images {
        img {
            max-height: 500px;
            border-radius: 5px;
        }
    }
</style>
