<template>
    <div class="plz-gallery"
         :class="[`plz-gallery-${galleryType}`,
         {'plz-gallery-single': isSingleImage},
         {'plz-gallery-double': isDoubleImages},
         {'plz-gallery-fourth': isFourthImages},
         {'plz-gallery-triple': isTripleImages}]">

        <div v-if="galleryType === 'album'" class="plz-gallery-wrap plz-gallery-wrap-album">
            <div v-if="profilePhotos" class="profile-photos d-flex">
                <div v-for="(photo) in images" v-bind:key="photo.id"
                     class="plz-profile-photo-item w-auto my-0 ml-0 mr-3"
                     :class="{'plz-gallery-image-mores': photo.isMore}"
                     :data-more="countImage"
                     @click="showImage(photo)">
                    <img @click="showImage(photo)"
                         class="plz-gallery-image"
                         :src="photo.path"
                         :alt="photo.name"/>
                </div>
            </div>
            <template v-else v-for="image in imagesWithClasses">
                <div :class="{'plz-gallery-image-mores': image.isMore}"
                     :data-more="countImage"
                     @click="showImage(image)"
                     class="plz-gallery-wrapper">

                    <img @click="showImage(image)"
                         class="plz-gallery-image"
                         :class="image.classes"
                         :src="image.path"
                         :alt="image.name"/>
                </div>
            </template>

        </div>
        <template v-else>
            <template v-if="profilePhotos">
                <div v-if="profilePhotos" class="profile-photos d-flex">
                    <div v-for="(photo) in images" v-bind:key="photo.id"
                         class="plz-profile-photo-item w-auto my-0 ml-0 mr-3"
                         :class="{'plz-gallery-image-mores': photo.isMore}"
                         :data-more="countImage"
                         @click="showImage(photo)">
                        <img @click="showImage(photo)"
                             class="plz-gallery-image"
                             :src="photo.path"
                             :alt="photo.name"/>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="block in portraitBlocks" :class="block.classes">
                    <template v-for="image in block.images">
                        <div class="plz-gallery-image-mores-div"
                             :class="{'plz-gallery-image-mores': image.isMore}"
                             :data-more="countImage"
                             @click="showImage(image)">
                            <img @click="showImage(image)"
                                 :class="image.classes"
                                 class="plz-gallery-image"
                                 :src="image.path"
                                 :alt="image.name"/>
                        </div>
                    </template>
                </div>
            </template>

        </template>
        <div class="plz-gallery__show" v-if="activeImageId">
            <GalleryViewer
                :images="images"
                :active-id="activeImageId"
                @close="activeImageId = null">
            </GalleryViewer>

            <GalleryDescription v-if="post"
                                :post="post"
                                :image="activeImage"></GalleryDescription>
        </div>
    </div>
</template>

<script>
    import GalleryViewer from './GalleryViewer.vue';
    import GalleryDescription from './GalleryDescription.vue';

    export default {
        name: 'Gallery',
        components: {GalleryDescription, GalleryViewer},
        props: {
            profilePhotos: Boolean,
            images: {
                type: Array,
                default: () => [],
            },
            post: {
                type: Object,
            },
        },

        data() {
            return {
                activeImageId: null,
                activeImage: null,
            };
        },

        computed: {
            countImage() {
                return this.countImagesMore > 0 ? `И ещё ${this.countImagesMore}` : '';
            },

            countImages() {
                return this.images.length;
            },

            isSingleImage() {
                return this.countImages === 1;
            },

            isTripleImages() {
                return this.countImages === 3;
            },

            isDoubleImages() {
                return this.countImages === 2;
            },

            isFourthImages() {
                return this.countImages === 4;
            },

            countImagesMore() {
                return this.countImages - this.moreCount;
            },

            viewImages() {
                return this.images.slice(0, this.moreCount);
            },

            firstImageView() {
                return this.images.slice(0, 1).pop();
            },

            lastImageView() {
                return this.viewImages.slice(-1).pop();
            },

            isMore() {
                return this.countImages > this.moreCount;
            },

            galleryType() {
                return this.imageType(this.firstImageView);
            },

            moreCount() {
                return this.galleryType === 'album' ? 5 : 4;
            },

            imagesWithClasses() {
                let index = 0;
                const countImages = this.viewImages.length;

                return this.viewImages.map(image => {
                    index++;
                    const type = this.galleryType;

                    const classes = [
                        `plz-gallery-image-${type}-wrap`,
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
                        path: image.original.path,
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
                let index = 1;

                for (const image of this.imagesWithClasses) {
                    /** TODO: @TGA вопрос: использовать тут SWITCH CASE религия запрещает? **/
                    if (index === 1) {
                        first.push(image);
                    } else if (index === 2) {
                        if (countImages === 4) {
                            first.push(image);
                        } else {
                            second.push(image);
                        }
                    } else if (index === 3) {
                        second.push(image);
                    } else if (index === 4) {
                        second.push(image);
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

                return blocks;
            },
        },

        methods: {
            showImage(image) {
                this.activeImageId = image.id;
                this.activeImage = this.images.find(attach => attach.id === image.id);
            },

            isAlbum(image) {
                return (image.original.width / image.original.height) > 1.2;
            },

            imageType(file) {
                if (!file)
                    return null;

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
                    if (countImages === 4) {
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
                        return `plz-gallery-image-portrait-half`;
                    }
                } else if (index === 3) {
                    if (countImages === 3) {
                        return `plz-gallery-image-portrait-half`;
                    } else if (countImages === 4) {
                        return `plz-gallery-image-portrait-half`;
                    }
                } else if (index === 4) {
                    return `plz-gallery-image-portrait-half`;
                }
            }
        }
    }
</script>
