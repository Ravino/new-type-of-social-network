<template>
    <div id="photoalbumPageFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between px-0 ">
            <nav class="videos-filter-links col-lg-7 nav pt-2 pt-sm-0" role="tablist">
                <span class="nav-link py-2 py-sm-3 px-1 mr-sm-4" :class="{ 'active': wMode === 'my' }" id="tabMyPhotoalbums" role="tab"
                      @click.stop="ontabChange">Мои альбомы</span>
                <template v-if="wMode === 'album'">
                    <PhotoalbumEditBlock></PhotoalbumEditBlock>
                </template>
            </nav>

            <div class="additionalBtns col-12 col-sm-5 d-flex justify-content-between justify-content-sm-end px-0  my-3 my-sm-0">
                <template v-if="wMode === 'my'">
                    <PhotoalbumCreateBlock></PhotoalbumCreateBlock>
                </template>
                <template v-else>
                    <a href="#">Добавить фотографии</a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import PhotoalbumCreateBlock from "./PhotoalbumCreateBlock.vue";
import PhotoalbumEditBlock from "./PhotoalbumEditBlock.vue";

export default {
    name: "PhotoalbumsPageFilter",
    components: {
        PhotoalbumCreateBlock,
        PhotoalbumEditBlock
    },
    data() {
        return {
            wMode: `my`
        }
    },
    methods: {
        ontabChange() {
            if (this.$route.name !== 'PhotoalbumsListPage') {
                this.$router.push({ path: '/photoalbums-list' });
                this.wMode = 'album';
            }
        },
        wallPostsSelect(wMode) {
            this.wMode = wMode;
            this.$emit('wallPostsSelect', {wMode: wMode});
        },
    },
    mounted() {
        if (this.$route.name !== 'PhotoalbumsListPage') {
            this.wMode = 'album';
        }
    }
}
</script>


