<template>
    <div id="videoPageFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between px-0 ">
            <nav class="videos-filter-links col-lg-7 nav pt-2 pt-sm-0" role="tablist">
                <span class="nav-link py-2 py-sm-3 px-1 mr-sm-4" :class="{ 'active': wMode === 'my' }" id="tabMyVideos" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Мои видео</span>
                <span class="nav-link py-2 py-sm-3 px-1 mr-sm-4" :class="{ 'active': wMode === 'all' }" id="tabAllVideos" role="tab"
                      @click.stop="wallPostsSelect(`all`)">Видеокаталог</span>
            </nav>

            <div class="additionalBtns col-12 col-sm-5 d-flex justify-content-between justify-content-sm-end px-0  my-3 my-sm-0">
                <button class="btn bg-transparent p-0 mr-3">
                    Создать трансляцию
                </button>
                <button class="btn bg-transparent p-0 mr-3">
                    Добавить видео
                </button>
                <button class="btn btn-link mx-1 px-1 btn-add-file" type="button">
                    <IconSearch style="width: 15px; height: 16px;"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import IconSearch from '../../icons/IconSearch.vue';

export default {
    name: "VideosPageFilter",
    components: {
        IconSearch
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


