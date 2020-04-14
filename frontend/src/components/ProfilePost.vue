<template>
    <div class="row plz-post-item mt-4 bg-white-br20 py-4">

        <div class="col-12 border-bottom px-4">
            <div class="d-flex flex-row align-content-center pb-4">
                <div class="post-poster-pic mr-3">
                    <img :src="posterPic" :alt="post.posterName"/>
                </div>

                <div class="post-poster-name d-flex flex-column justify-content-center">
                    <h6 class="post-poster-title mb-1">
                        <b>{{post.posterName}}</b>
                    </h6>
                    <time :datetime="post.dtLabel" class="post-poster-time">
                        {{ post.dtLabel | lastMessageTime }}
                    </time>
                </div>

                <div class="post-poster-actions my-auto ml-auto">
                    <button class="btn btn-link" type="button"><i class="dots-vertical"></i></button>
                </div>
            </div>
        </div>

        <div class="col-12 pt-4 px-4 pb-2">
            <p class="post-main-text mb-2" v-html="this.$options.filters.toBR(post.postText)"></p>
        </div>

        <div v-if="(post.images  &&  post.images.length>0)"
             class="col-12 px-4 post-pictures"
             :style="calcPostPictures(post.images.length)">
            <img v-for="(postPic, postPicIndex) in post.images"
                 :key="postPicIndex"
                 :src="postPic.path"
                 :alt="postPic.name"
                 :class="'postPictures-' + postPicIndex"
                 :style="calcPostPicturesImg(postPicIndex, post.images.length)"/>
        </div>

        <div class="plz-post-item-footer col-12 px-4 pt-4">
            <div class="d-flex">
                <div class="">
                    <div class="post-watched-counter">
                        <span>{{ post.viewsNumber | space1000 }}</span>
                        <IconEye />
                    </div>
                </div>

                <div class="ml-auto d-flex align-items-center">
                    <div class="post-watched-counter ml-4">
                        <IconMessage />
                        <span>{{ post.commentsNumber | space1000 }}</span>
                    </div>

                    <div class="post-watched-counter ml-4">
                        <IconHeard />
                        <span>{{ post.likesNumber | space1000 }}</span>
                    </div>

                    <div class="post-watched-counter ml-4">
                        <IconShare />
                        <span>{{ post.sharesNumber | space1000 }}</span>
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
name: 'ProfilePost',
components : { IconShare, IconMessage, IconHeard, IconEye, IconMessageUserPost },
props: {
    post: Object
},
computed: {
    posterPic: function () {
        return (this.post && this.post.posterPic !== '') ? this.post.posterPic : this.$defaultAvatarPath;
    },
},
data() {
    return {}
},
methods: {
    /**
     * Calc "grid-template-columns" style.
     *
     * @param count
     * @returns {{gridTemplateColumns: string}}
     */
    calcPostPictures(count) {
        let gridTemplateColumns;

        if (count === 3) {
            gridTemplateColumns = '1fr 1fr';
        } else {
            gridTemplateColumns = '1fr 0.5fr';
        }

        return {
            gridTemplateColumns,
        }
    },
    /**
     * Calc "grid-row" and "grid-column" styles.
     *
     * @param index
     * @param count
     * @returns {{gridRow: string, gridColumn: string}}
     */
    calcPostPicturesImg(index, count) {
        let gridRow, gridColumn;

        if (index === 0) {
            gridRow = '1 / span 3';
            gridColumn = '1 / -1';
        } else {
            gridRow = index;
            gridColumn = '2 / 3';
        }

        return {
            gridRow,
            gridColumn,
        }
    },
},
}
</script>

<style lang="scss">
img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: left bottom;
}

.post-pictures {
    display: grid;
}
</style>

