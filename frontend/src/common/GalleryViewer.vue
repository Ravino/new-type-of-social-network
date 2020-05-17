<template>
    <div class="plz-gallery-viewer">
        <button class="plz-gallery-viewer__close" @click="close"></button>
        <div class="plz-gallery-viewer-overflow" :style="{'background-image': `linear-gradient(to right, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, .85) 100%),url('${activeImage.image.normal.path}')`}" @click="close"></div>
        <div class="plz-gallery-viewer-nav">
            <div class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-prev" @click="prevImage">
                <img src="../images/gallery/arrow-left.svg" alt="prev">
            </div>
            <div class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-next" @click="nextImage">
                <img src="../images/gallery/arrow-right.svg" alt="next">
            </div>
        </div>
        <div class="plz-gallery-viewer-current">
            <img :src="activeImage.image.original.path" :alt="activeImage.originalName">
        </div>
    </div>
</template>

<script>
export default {
    name: 'GalleryViewer',
    props: {
        images: {
            type: Array,
            default: () => [],
        },
        activeId: {
            type: Number,
        },
    },
    data() {
        return {
            activeImage: null,
        };
    },
    created() {
        if (this.activeId) {
            const image = this.images.find(image => image.id === this.activeId);

            if (image) {
                this.activeImage = image;
            }
        }

        if (!this.activeImage && this.images.length > 0) {
            this.activeImage = this.images.slice(0, 1).pop();
        }
    },
    computed: {
        currentImageIndex() {
            return this.images.findIndex(image => image.id === this.activeImage.id);
        },
    },
    methods: {
        prevImage() {
            const prevImageIndex = this.currentImageIndex - 1;

            if (prevImageIndex >= 0 && this.images[prevImageIndex]) {
                this.activeImage = this.images[prevImageIndex];
            } else {
                this.goToImage([...this.images].pop());
            }
        },
        nextImage() {
            const nextImageIndex = this.currentImageIndex + 1;

            if (nextImageIndex >= 0 && this.images[nextImageIndex]) {
                this.activeImage = this.images[nextImageIndex];
            } else {
                this.goToImage([...this.images].shift());
            }
        },
        close() {
            this.$emit('close');
        },
        goToImage(image) {
            this.activeImage = image;
        }
    }
}
</script>

<style lang="scss">
    .plz-gallery-viewer {
        position: fixed;
        width: 70vw;
        height: 100vh;
        z-index: 10000;
        top: 0;
        left: 0;

        &-overflow {
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: 1;
            cursor: pointer;
            background-size: cover;
            background-repeat: no-repeat;
        }

        &-nav {
            width: 70vw;
            height: 100vh;
            position: absolute;

            &-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 5;
                background: #000;
                padding: 10px;
                border-radius: 50%;
                opacity: 0.6;
                transition: opacity .3s;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }

                img {
                    width: 25px;
                    height: 25px;
                    margin: 0 !important;
                    user-select: none;
                }
                &-prev {
                    left: 5px;
                }
                &-next {
                    right: 5px;
                }
            }
        }

        &__close {
            position: absolute;
            right: 32px;
            top: 32px;
            width: 32px;
            height: 32px;
            opacity: 0.3;
            z-index: 2001;
            border: none;
            background: none;
            outline: none;
            display: inline-block;
            &:focus {
                outline: none;
            }
        }
        &__close:hover {
            opacity: 1;
        }
        &__close:before, .plz-gallery-viewer__close:after {
            position: absolute;
            left: 15px;
            content: ' ';
            height: 33px;
            width: 2px;
            background-color: #ffffff;
        }
        &__close:before {
            transform: rotate(45deg);
        }
        &__close:after {
            transform: rotate(-45deg);
        }

        &-current {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            img {
                z-index: 2;
                max-height: 100%!important;
                max-width: calc(100% - 100px)!important;
                width: 70%;
            }
        }
    }
</style>
