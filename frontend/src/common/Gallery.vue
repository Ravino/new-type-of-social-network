<template>
    <div class="plz-gallery" :style="{'width': `${width}px`}">
        <template v-for="image in imagesWithSizes">
            <img
                :class="{'plz-gallery-image-more': image.isMore}"
                class="plz-gallery-image"
                :src="image.path"
                :width="image.width"
                :height="image.height"
                :alt="image.name"
            >
        </template>
    </div>
</template>

<script>
const MORE_COUNT = 5;

export default {
name: 'Gallery',
props: {
    images: {
        type: Array,
        default: () => [],
    }
},
data() {
    return {
        width: 500,
    }
},
computed: {
    countImages() {
        return this.images.length;
    },
    lastImageView() {
        return this.viewImages.slice(-1).pop();
    },
    viewImages() {
        return this.images.slice(0, MORE_COUNT);
    },
    isMore() {
        return this.countImages > MORE_COUNT;
    },
    typesImage() {
        return this
            .viewImages
            .map(image => image.normal.height > image.normal.width ? 'portrait' : 'album')
        ;
    },
    imagesWithSizes() {
        const sizeMap = {
            'album': [
                {
                    height: 'auto',
                    width: '500px',
                },
            ],
            'album-album': [
                {
                    height: '247px',
                    width: 'auto',
                },
                {
                    height: '247px',
                    width: '500px',
                },
            ],
            'album-album-album': [
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '500px',
                },
            ],
            'album-album-album-album': [
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
            ],
            'album-album-album-album-album': [
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '500px',
                },
            ],
            'album-portrait-portrait-album-album': [
                {
                    height: '249px',
                    width: '500px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
                {
                    height: '249px',
                    width: '247px',
                },
            ],
        };

        const defaultSize = {
            height: '500px',
            width: '247px',
        };

        const sizes = sizeMap[this.typesImage.join('-')];

        const images = [];

        for (let i = 0;i < this.viewImages.length;i++) {
            const size = sizes && sizes[i] || defaultSize;
            const image = this.viewImages[i];

            images.push({
                height: size.height,
                width: size.width,
                path: image.image.normal.path,
                isMore: this.isMore && this.lastImageView.id === image.id,
                name: image.originalName,
            });
        }

        return images;
    }
}
}
</script>

<style lang="scss">
    .plz-gallery {
        position: relative;
        &-image {
            object-fit: cover;
            margin-bottom: 2px!important;
            margin-left: 2px!important;
        }
    }
</style>
