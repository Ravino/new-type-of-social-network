<template>
    <div class="row plz-post-item mb-4 bg-white-br20 py-4">

        <div class="col-12 border-bottom plz-post-item-header">
            <div class="post-news-item d-flex flex-row align-content-center pb-4">
                <div class="post-poster-pic mr-3">
                    <img :src="posterPic" :alt="posterName"/>
                </div>

                <div class="post-poster-name d-flex flex-column justify-content-center">
                    <h6 class="post-poster-title mb-1">
                        <b>{{posterName}}</b>
                    </h6>
                    <time :datetime="postCreatedAt" class="post-poster-time">
                        {{ postCreatedAt | lastMessageTime }}
                    </time>
                </div>

                <div class="post-poster-actions my-auto ml-auto">
                    <button class="btn btn-link post-settings"
                            :id="`postSettings` + post.id"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <i class="dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right py-3 px-3"
                         :aria-labelledby="`postSettings` + post.id">

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/editing">Редактировать</router-link>
                        </div>

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/account">Настройки</router-link>
                        </div>

                        <div class="nav-item">
                            <router-link tag="a" class="dropdown-item px-0 py-1" to="/help">Помощь</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 plz-post-item-body pt-4 pb-2">
            <p class="post-main-text mb-2" v-html="this.$options.filters.toBR(postBody)"></p>
        </div>

        <div class="col-12 plz-post-item-images">
            <div v-if="(postImages && postImages.length > 0)"
                 :id="post_images_id"
                 class="post-images">
            </div>
        </div>

        <div class="plz-post-item-footer col-12 pt-4">
            <div class="d-flex">
                <div class="d-flex">
                    <div class="post-watched-counter">
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
            },
            postCreatedAt() {
                return this.post.createdAt;
            },
        },
        data() {
            return {
                post_images_id: 'postImages-' + Math.floor(Math.random() * 1000),
                image: {
                    width: this.$router.currentRoute.name === 'NewsPage' ? 752 : 538,
                    height: 337,
                    "margin for two images": 27,
                },
            }
        },
        methods: {
            calcPic() {
                let self = this;
                let post_images_div = document.querySelector('#' + this.post_images_id);
                let post_images = this.postImages;
                let count_post_images = this.postImages.length;
                let parent_div = document.createElement('div');
                let child_div = document.createElement('div');
                let image;

                parent_div.classList.add('d-flex');
                child_div.classList.add('d-flex', 'flex-wrap');

                if (post_images) {
                    post_images.forEach(function (post_image, index) {
                        image = document.createElement('img');
                        image.setAttribute('src', post_image);

                        if (count_post_images === 1) {
                            image.classList.add('w-100');
                            parent_div.append(image);
                        } else if (count_post_images === 2) {
                            image.classList.add('w-100');
                            let margin = self.image['margin for two images'] / 2;
                            if (index === 0) {
                                image.style = "margin-right: " + margin + 'px';
                            } else {
                                image.style = "margin-left: " + margin + 'px';
                            }

                            parent_div.append(image);
                        } else {
                            let second_child_div = document.createElement('div');

                            if (index === 0) {
                                image.style = "width: " + self.image.width + "px; margin-right: 7px";
                                second_child_div.append(image);
                                parent_div.append(second_child_div);
                            } else {
                                if ((((count_post_images - 1) % 2 === 0) && count_post_images < 5) || count_post_images === 4) {
                                    let height = self.image.height / (count_post_images - 1);
                                    let margin = count_post_images - 1 !== index ? 6 : null;
                                    image.style = "width: 312px; height: " + (height - margin) + "px; margin-bottom: " + margin + "px;";
                                    child_div.append(image);
                                } else {
                                    let width = 280 / 2;
                                    let height = self.image.height / 2;
                                    let margin_bottom = 6;
                                    let margin_right = index % 2 !== 0 ? 6 : null;

                                    image.style.width = width + "px";
                                    image.style.height = (height - (margin_bottom) / 2) + "px";
                                    image.style.marginRight = margin_right + "px";

                                    if (!((index === count_post_images - 1) || (index === count_post_images - 2))) {
                                        image.style.marginBottom = margin_bottom + "px";
                                    }

                                    child_div.append(image);
                                }
                            }
                        }
                    });

                    parent_div.append(child_div);
                    post_images_div.append(parent_div);
                }
            }
        },
        mounted() {
            this.calcPic();
        },
    }
</script>

<style lang="scss">
    .plz-post-item {
        .plz-post-item-header,
        .plz-post-item-body,
        .plz-post-item-images,
        .plz-post-item-footer {
            padding: 0 35px 0 39px;
        }
    }

    .post-images {
        img {
            max-height: 337px;
            border-radius: 3px;
        }
    }
</style>
