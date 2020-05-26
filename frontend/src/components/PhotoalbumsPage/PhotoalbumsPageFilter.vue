<template>
    <div id="photoalbumPageFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between px-0 ">
            <nav class="videos-filter-links col-lg-7 nav pt-2 pt-sm-0" role="tablist">
                <span class="nav-link py-2 py-sm-3 px-1 mr-sm-4" :class="{ 'active': wMode === 'my' }" id="tabMyVideos" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Мои альбомы</span>
            </nav>

            <div class="additionalBtns col-12 col-sm-5 d-flex justify-content-between justify-content-sm-end px-0  my-3 my-sm-0">
                <PhotoalbumCreateBlock></PhotoalbumCreateBlock>
            </div>
        </div>
    </div>
</template>

<script>
import PhotoalbumCreateBlock from "./PhotoalbumCreateBlock.vue";

export default {
    name: "PhotoalbumsPageFilter",
    components: {
        PhotoalbumCreateBlock
    },
    data() {
        return {
            wMode: `my`
        }
    },
    methods: {
        wallPostsSelect(wMode) {
            this.wMode = wMode;
            this.$emit('wallPostsSelect', {wMode: wMode});
        },
    },
}
</script>


