<template>
    <div class="plz-gallery"
         :class="[`plz-gallery-${galleryType}`,
         {'plz-gallery-single': isSingleImage},
         {'plz-gallery-double': isDoubleImages},
         {'plz-gallery-fourth': isFourthImages}]">

        <div v-if="galleryType === 'album'" class="plz-gallery-wrap plz-gallery-wrap-album">
            <template v-for="image in imagesWithClasses">
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
        <div class="plz-gallery__show" v-if="activeImage">
            <GalleryViewer
                :images="images"
                :active-image="activeImage"
                @close="closeGalleryModal"
                @showImage="showImage"
                @navChangeActiveImage="changeGetParams"
            >
            </GalleryViewer>

            <GalleryDescription
                v-if="post"
                :post="post"
                :comments="comments"
                :image="activeImage"
                @updateComments="updateComments"
            >
            </GalleryDescription>
        </div>
    </div>
</template>

<script>
import GalleryViewer from './GalleryViewer.vue';
import GalleryDescription from './GalleryDescription.vue';
import PliziComment from "../classes/PliziComment";

export default {
name : 'Gallery',
components : { GalleryDescription, GalleryViewer },
props : {
    images : {
        type : Array,
        default : () => [],
    },
    post : {
        type : Object,
    },
    type: {
        type: String,
    }
},

data(){
    return {
        activeImage : null,
        comments: [],
    };
},

computed : {
    countImage(){
        return this.countImagesMore > 0 ? `И ещё ${this.countImagesMore}` : '';
    },

    countImages(){
        return this.images.length;
    },

    isSingleImage(){
        return this.countImages === 1;
    },

    isDoubleImages(){
        return this.countImages === 2;
    },

    isFourthImages(){
        return this.countImages === 4;
    },

    countImagesMore(){
        return this.countImages - this.moreCount;
    },

    viewImages(){
        return this.images.slice( 0, this.moreCount );
    },

    firstImageView(){
        return this.images.slice( 0, 1 ).pop();
    },

    lastImageView(){
        return this.viewImages.slice( -1 ).pop();
    },

    isMore(){
        return this.countImages > this.moreCount;
    },

    galleryType(){
        return this.imageType( this.firstImageView );
    },

    moreCount(){
        return this.galleryType === 'album' ? 5 : 4;
    },

    imagesWithClasses(){
        let index = 0;
        const countImages = this.viewImages.length;

        return this.viewImages.map( image => {
            index++;
            const type = this.galleryType;

            const classes = [
                `plz-gallery-image-${type}-wrap`,
            ];

            const isMore = this.isMore && this.lastImageView.id === image.id;

            if ( isMore ){
                classes.push( 'plz-gallery-image-more' );
            }

            if ( this.galleryType === 'album' ){
                classes.push( this.getAlbumImageClass( index, countImages ) );
            }
            else{
                classes.push( this.getPortraitImageClass( index, countImages ) );
            }
            return {
                path : image.original.path,
                name : image.originalName,
                classes,
                isMore,
                id : image.id,
            };
        } );
    },

    portraitBlocks(){
        const countImages = this.viewImages.length;
        const first = [];
        const second = [];
        let index = 1;

        for ( const image of this.imagesWithClasses ){
            /** TODO: @TGA вопрос: использовать тут SWITCH CASE религия запрещает? **/
            if ( index === 1 ){
                first.push( image );
            }
            else if ( index === 2 ){
                if ( countImages === 4 ){
                    first.push( image );
                }
                else{
                    second.push( image );
                }
            }
            else if ( index === 3 ){
                second.push( image );
            }
            else if ( index === 4 ){
                second.push( image );
            }

            index++;
        }

        const blocks = [];
        let indexBlock = 1;

        if ( first.length > 0 ){
            blocks.push( {
                images : first,
                classes : [
                    'plz-gallery-image-portrait',
                    `plz-gallery-image-portrait-block-${indexBlock}`,
                ]
            } );

            indexBlock++;
        }

        if ( second.length > 0 ){
            blocks.push( {
                images : second,
                classes : [
                    'plz-gallery-image-portrait',
                    `plz-gallery-image-portrait-block-${indexBlock}`,
                ]
            } );

            indexBlock++;
        }

        return blocks;
    },
},

methods : {
    async getCommentsOnGallery() {
        try {
            let response = await this.$root.$api.$post.getCommentsByIdOnGallery(this.activeImage.id);
            this.comments = response.data.list.map(comment => new PliziComment(comment));
        } catch (e) {
            console.warn(e.detailMessage);
        }
    },
    updateComments({ comments, id }) {
        if (this.activeImage.id === id) {
            this.comments = comments;
        }
    },
    showImage( image ){
        this.activeImage = this.images.find(attach => attach.id === image.id);
        this.$router.replace({query: {activeImageId: this.activeImage.id, galleryType: this.type}});
        this.getCommentsOnGallery();
    },

    changeGetParams( activeImage ) {
        this.$router.replace({query: {activeImageId: activeImage.id, galleryType: this.type}});
    },

    closeGalleryModal() {
        this.activeImage = null;
        this.$router.replace({query: ''});
    },

    isAlbum( image ){
        return (image.original.width / image.original.height) > 1.2;
    },

    imageType( file ){
        if ( !file )
            return null;

        return this.isAlbum( file.image ) ? 'album' : 'portrait';
    },

    getAlbumImageClass( index, countImages ){
        if ( index === 1 ){
            if ( countImages === 1 ){
                return `plz-gallery-image-album-full`;
            }
            else if ( countImages === 2 ){
                return `plz-gallery-image-album-full`;
            }
            else if ( countImages === 3 ){
                return `plz-gallery-image-album-full`;
            }
            else if ( countImages === 4 ){
                return `plz-gallery-image-album-full`;
            }
            else if ( countImages === 5 ){
                return `plz-gallery-image-album-half`;
            }
        }
        else if ( index === 2 ){
            if ( countImages === 2 ){
                return `plz-gallery-image-album-full`;
            }
            else if ( countImages === 3 ){
                return `plz-gallery-image-album-half`;
            }
            else if ( countImages === 4 ){
                return `plz-gallery-image-album-third`;
            }
            else if ( countImages === 5 ){
                return `plz-gallery-image-album-half`;
            }
        }
        else if ( index === 3 ){
            if ( countImages === 3 ){
                return `plz-gallery-image-album-half`;
            }
            else if ( countImages === 4 ){
                return `plz-gallery-image-album-third`;
            }
            else if ( countImages === 5 ){
                return `plz-gallery-image-album-third`;
            }
        }
        else if ( index === 4 ){
            if ( countImages === 4 ){
                return `plz-gallery-image-album-third`;
            }
            else if ( countImages === 5 ){
                return `plz-gallery-image-album-third`;
            }
        }
        else if ( index === 5 ){
            return `plz-gallery-image-album-third`;
        }
    },

    getPortraitImageClass( index, countImages ){
        if ( index === 1 ){
            if ( countImages === 4 ){
                return `plz-gallery-image-portrait-half`;
            }
            else{
                return `plz-gallery-image-portrait-full`;
            }
        }
        else if ( index === 2 ){
            if ( countImages === 2 ){
                return `plz-gallery-image-portrait-full`;
            }
            else if ( countImages === 3 ){
                return `plz-gallery-image-portrait-half`;
            }
            else if ( countImages === 4 ){
                return `plz-gallery-image-portrait-half`;
            }
        }
        else if ( index === 3 ){
            if ( countImages === 3 ){
                return `plz-gallery-image-portrait-half`;
            }
            else if ( countImages === 4 ){
                return `plz-gallery-image-portrait-half`;
            }
        }
        else if ( index === 4 ){
            return `plz-gallery-image-portrait-half`;
        }
    }
},
    mounted() {
        const activeId = this.$router.history.current.query.activeImageId;
        const typeGallery= this.$router.history.current.query.galleryType;

        if (typeGallery !== this.type || !activeId) {
            return;
        }

        const foundImage = this.images.find(image => activeId === image.id.toString());

        if (foundImage) {
            this.showImage(foundImage);
        }
    }
}
</script>
