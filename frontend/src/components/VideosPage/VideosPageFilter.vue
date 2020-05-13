<template>
    <div id="videoPageFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
            <nav class="col-lg-7 nav videos-filter-links" role="tablist">
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode === 'my' }" id="tabMyVideos" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Мои видео</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode === 'all' }" id="tabAllVideos" role="tab"
                      @click.stop="wallPostsSelect(`all`)">Видеокаталог</span>
            </nav>

            <div class="additionalBtns col-lg-5 d-lg-flex justify-content-end d-none">
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

<style lang="scss">
    .videos-filter-links {
        span {
            display: block;
            font-size: 13px;
            color: #939292;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: 0.4s;

            &:hover {
                background-color: #dae4ee;
            }
        }

        .active {
            border-bottom: 2px solid #576DF6;
            color: #2F2F2F;
        }
    }

    .additionalBtns {
        button {
            color: #939292 !important;
            font-size: 13px;
        }
    }
</style>
