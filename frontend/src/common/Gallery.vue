<template>
    <div class="plz-gallery" :class="[`plz-gallery-${galleryType}`, {'plz-gallery-single': isSingleImage}]">
        <div v-if="galleryType === 'album'" class="plz-gallery-wrap plz-gallery-wrap-album">
            <template v-for="image in imagesWithClasses">
                <img
                    @click="showImage(image.id)"
                    :class="image.classes"
                    class="plz-gallery-image"
                    :src="image.path"
                    :alt="image.name"
                    :data-more="`Еще ${countImagesMore.toString()}`"
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
                        :data-more="`Еще ${countImagesMore.toString()}`"
                    >
                </template>
            </div>
        </template>
        <div class="plz-gallery__show" v-if="activeImageId">
            <GalleryViewer
                :images="images"
                :active-id="activeImageId"
                @close="activeImageId = null">
            </GalleryViewer>
            <GalleryDescription v-if="post" :post="post"></GalleryDescription>
        </div>
    </div>
</template>

<script>

import GalleryViewer from './GalleryViewer.vue';
import GalleryDescription from "./GalleryDescription";

export default {
  name: 'Gallery',
  components: {GalleryDescription, GalleryViewer},
  props: {
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
    };
},
computed: {
   countImages() {
    return this.images.length;
   },
   isSingleImage() {
    return this.countImages === 1;
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
