<template>
    <div class="plz-gallery-viewer">
        <button class="plz-gallery-viewer-close" @click="close"></button>
        <div class="plz-gallery-viewer-overflow"
             :style="{'background-image':
             `linear-gradient(to right, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, .85) 100%),
             url('${activeImage.image.normal.path}'),
             linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)`}"
             @click="close"
        >
        </div>
        <div class="plz-gallery-viewer-nav">
            <div v-if="images.length > 1" class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-prev" @click="prevImage">
                <img src="../images/gallery/arrow-left.svg" alt="prev">
            </div>
            <div v-if="images.length > 1" class="plz-gallery-viewer-nav-btn plz-gallery-viewer-nav-btn-next" @click="nextImage">
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
            type: Number|String,
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

        this.addBodyViewerOpen();
    },
    destroyed() {
       this.removeBodyViewerOpen();
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
        },
       addBodyViewerOpen() {
            document.querySelector('body').classList.add('plz-gallery--open');
       },
       removeBodyViewerOpen() {
            document.querySelector('body').classList.remove('plz-gallery--open');
       }
    }
}
</script>
