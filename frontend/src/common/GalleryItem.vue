<template>
    <div :class="image.classes">
        <img
            class="plz-gallery-image"
            :class="[`plz-gallery-image-${type}`]"
            @click="showImage"
            :src="image.path"
            :alt="image.name"
        >
        <span class="plz-gallery-item-more" v-if="image.isMore">Еще {{ countImagesMore }}</span>
    </div>
</template>
<script>
 export default {
  name: "GalleryItem",
  props: {
   image: {
    type: Object,
   },
   countImagesMore: {
    type: Number,
   },
   type: {
    type: String,
    default: 'album'
   }
  },
  methods: {
   showImage() {
    this.$emit('showImage', this.image.id);
   },
  },
 }
</script>

<style lang="scss">
    .plz-gallery {
        &-item {
            position: relative;
            &-inline {
                display: inline-block;
            }
            &-more {
                position: absolute;
            }
        }

        &-image {
            object-fit: cover;
            cursor: pointer;
            width: calc(100% - 5px);

            &-album {
                &-wrap {
                    display: inline-block;
                }

                &-full {
                    width: 100%;
                }

                &-half {
                    width: calc(100% / 2 - 5px);
                }

                &-third {
                    width: calc(100% / 3 - 3px);
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
