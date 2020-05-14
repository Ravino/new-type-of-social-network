<template>
    <div class="plz-gallery" :class="[`plz-gallery-${galleryType}`]">
        <div v-if="galleryType === 'album'" class="plz-gallery-wrap plz-gallery-wrap-album">
            <template v-for="image in imagesWithClasses">
                <img
                    @click="showImage(image.id)"
                    :class="image.classes"
                    class="plz-gallery-image"
                    :src="image.path"
                    :alt="image.name"
                >
            </template>
        </div>
        <template v-else>
           <div v-for="block in portraitBlocks" :class="block.classes">
               <template v-for="image in block.images">
                   <img
                       @click="showImage(image.id)"
                       :class="image.classes"
                       class="plz-gallery-image"
                       :src="image.path"
                       :alt="image.name"
                   >
               </template>
           </div>
        </template>
    <GalleryViewer
        v-if="activeImageId"
        :images="images"
        :active-id="activeImageId"
        @close="activeImageId = null"
    ></GalleryViewer>
    </div>
</template>

<script>

import GalleryViewer from './GalleryViewer.vue';
const MORE_COUNT = 5;

export default {
name: 'Gallery',
    components: {GalleryViewer},
    props: {
    images: {
        type: Array,
        default: () => [],
    }
},
data() {
    return {
        activeImageId: null,
    };
},
computed: {
    countImages() {
        return this.images.length;
    },
    viewImages() {
        return this.images.slice(0, MORE_COUNT);
    },
    firstImageView() {
        return this.viewImages.slice(0, 1).pop();
    },
    lastImageView() {
        return this.viewImages.slice(-1).pop();
    },
    isMore() {
        return this.countImages > MORE_COUNT;
    },
    galleryType() {
        return this.imageType(this.firstImageView);
    },
    imagesWithClasses() {
        let index = 0;
        const countImages = this.viewImages.length;

        return this.viewImages.map(image => {
            index++;
            const type = this.imageType(image);

            const classes = [
                `plz-gallery-image-${type}`,
            ];

            const isMore = this.isMore && this.lastImageView.id === image.id;

            if (isMore) {
                classes.push('plz-gallery-image-more');
            }

            if (this.galleryType === 'album') {
                classes.push(this.getAlbumImageClass(index, countImages));
            } else {
                classes.push(this.getPortraitImageClass(index, countImages));
            }

            return {
                path: image.medium.path,
                name: image.originalName,
                classes,
                isMore,
                id: image.id,
            };
        });
    },
    portraitBlocks() {
        const countImages = this.viewImages.length;

        const first = [];
        const second = [];
        const third = [];
        let index = 1;

        for (const image of this.imagesWithClasses) {
            if (index === 1) {
                first.push(image);
            } else if (index === 2) {
                if (countImages === 5) {
                    first.push(image);
                } else {
                    second.push(image);
                }
            } else if (index === 3) {
                if (countImages === 5) {
                    third.push(image);
                } else {
                    second.push(image);
                }
            } else if (index === 4) {
                if (countImages === 5) {
                    third.push(image);
                } else {
                    second.push(image);
                }
            } else if (index === 5) {
                third.push(image);
            }

            index++;
        }

        const blocks = [];
        let indexBlock = 1;

        if (first.length > 0) {
            blocks.push({
                images: first,
                classes: [
                    'plz-gallery-image-portrait',
                    `plz-gallery-image-portrait-block-${indexBlock}`,
                ]
            });

            indexBlock++;
        }

        if (second.length > 0) {
            blocks.push({
                images: second,
                classes: [
                    'plz-gallery-image-portrait',
                    `plz-gallery-image-portrait-block-${indexBlock}`,
                ]
            });

            indexBlock++;
        }

        if (third.length > 0) {
            blocks.push({
                images: third,
                classes: [
                    'plz-gallery-image-portrait',
                    `plz-gallery-image-portrait-block-${indexBlock}`,
                ],
            });

            indexBlock++;
        }

        return blocks;
    },
},
methods: {
    showImage(id) {
        this.activeImageId = id;
    },
    isAlbum(image) {
        return (image.original.width / image.original.height) > 1.2;
    },
    imageType(file) {
        if (!file) {
            return null;
        }

        return this.isAlbum(file.image) ? 'album' : 'portrait';
    },
    getAlbumImageClass(index, countImages) {
        if (index === 1) {
            if (countImages === 1) {
                return `plz-gallery-image-album-full`;
            } else if (countImages === 2) {
                return `plz-gallery-image-album-full`;
            } else if (countImages === 3) {
                return `plz-gallery-image-album-full`;
            } else if (countImages === 4) {
                return `plz-gallery-image-album-full`;
            } else if (countImages === 5) {
                return `plz-gallery-image-album-half`;
            }
        } else if (index === 2) {
            if (countImages === 2) {
                return `plz-gallery-image-album-full`;
            } else if (countImages === 3) {
                return `plz-gallery-image-album-half`;
            } else if (countImages === 4) {
                return `plz-gallery-image-album-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-album-half`;
            }
        } else if (index === 3) {
            if (countImages === 3) {
                return `plz-gallery-image-album-half`;
            } else if (countImages === 4) {
                return `plz-gallery-image-album-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-album-third`;
            }
        } else if (index === 4) {
            if (countImages === 4) {
                return `plz-gallery-image-album-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-album-third`;
            }
        } else if (index === 5) {
            return `plz-gallery-image-album-third`;
        }
    },
    getPortraitImageClass(index, countImages) {
        if (index === 1) {
            if (countImages === 5) {
                return `plz-gallery-image-portrait-half`;
            } else {
                return `plz-gallery-image-portrait-full`;
            }
        } else if (index === 2) {
            if (countImages === 2) {
                return `plz-gallery-image-portrait-full`;
            } else if (countImages === 3) {
                return `plz-gallery-image-portrait-half`;
            } else if (countImages === 4) {
                return `plz-gallery-image-portrait-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-portrait-half`;
            }
        } else if (index === 3) {
            if (countImages === 3) {
                return `plz-gallery-image-portrait-half`;
            } else if (countImages === 4) {
                return `plz-gallery-image-portrait-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-portrait-third`;
            }
        } else if (index === 4) {
            if (countImages === 4) {
                return `plz-gallery-image-portrait-third`;
            } else if (countImages === 5) {
                return `plz-gallery-image-portrait-third`;
            }
        } else if (index === 5) {
            return `plz-gallery-image-portrait-third`;
        }
    }
}
}
</script>

<style lang="scss">
    .plz-gallery {
        position: relative;
        &-wrap-album {
            overflow: hidden;
        }
        &-image {
            object-fit: cover;
            cursor: pointer;

            &-album {
                &-full {
                    width: 100%;
                }

                &-half {
                    width: calc(100% / 2 - 5px);
                }

                &-third {
                    width: calc(100% / 3 - 5px);
                    height: 150px;
                }
            }

            &-portrait {
                height: 100%;
                width: 100%;

                &-block-1 {
                   width: 50%;
                    margin-right: 5px;
                }

                &-block-2 {
                    width: 50%;
                }

                &-block-3 {
                    width: 100%;
                }

                &-full {
                    height: 100%;
                    min-height: 500px;
                }

                &-half {
                    height: calc(100% / 2);
                    min-height: calc(500px / 2 - 5px);
                }

                &-third {
                    height: calc(100% / 3);
                    min-height: calc(500px / 3 - 5px);
                }
            }
        }

        &-portrait {
            display: flex;
        }
    }
</style>
