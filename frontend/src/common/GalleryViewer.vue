<template>
    <div class="plz-gallery-viewer">
        <div class="plz-gallery-viewer-overflow" @click="close"></div>
        <div class="plz-gallery-viewer-nav">
            <div class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-prev" @click="prevImage">
                prev
            </div>
            <div class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-next" @click="nextImage">
                next
            </div>
        </div>
        <div class="plz-gallery-viewer-current">
            <img :src="activeImage.original.path" :alt="activeImage.originalName">
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

        this.setBodyOverflow('hidden');
    },
    destroyed() {
        this.setBodyOverflow('auto');
    },
    computed: {
        currentImageIndex() {
            return this.images.findIndex(image => image.id === this.activeImage.id);
        },
    },
    methods: {
        prevImage() {
            const prevImageIndex = this.currentImageIndex - 1;

            if (this.images[prevImageIndex]) {
                this.activeImage = this.images[prevImageIndex];
            } else {
                this.activeImage = [...this.images].pop();
            }
        },
        nextImage() {
            const nextImageIndex = this.currentImageIndex + 1;

            if (this.images[nextImageIndex]) {
                this.activeImage = this.images[nextImageIndex];
            } else {
                this.activeImage = [...this.images].shift();
            }
        },
        close() {
            this.$emit('close');
        },
        setBodyOverflow(overflow) {
            document.querySelector('body').style.overflow = overflow;
        }
    }
}
</script>

<style lang="scss">
    .plz-gallery-viewer {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        top: 0;
        left: 0;

        &-overflow {
            background: #000;
            height: 100%;
            width: 100%;
            opacity: 0.7;
            position: absolute;
            z-index: 1;
            cursor: pointer;
        }

        &-nav {
            width: 100vw;
            height: 100vh;
            position: absolute;

            &-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 5;
                &-prev {
                    left: 5px;
                }
                &-next {
                    right: 5px;
                }
            }
        }

        &-current {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            img {
                z-index: 2;
            }
        }
    }
</style>
