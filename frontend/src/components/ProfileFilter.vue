<template>
    <div id="profileFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
            <nav v-if="!firstName" class="nav profile-filter-links" role="tablist">
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='all' }" id="tabAllPosts" role="tab"
                      @click.stop="wallPostsSelect(`all`)">Все записи</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='my' }" id="tabMyPosts" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Мои записи</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='archive' }" id="tabArchivePosts"
                      role="tab" @click.stop="wallPostsSelect(`archive`)">Архив</span>
            </nav>

            <nav v-else class="nav profile-filter-links" role="tablist">
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='all' }" id="tabAllPosts" role="tab"
                      @click.stop="wallPostsSelect(`all`)">Все записи</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='user' }" id="tabMyPosts" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Записи {{ firstName }}</span>
            </nav>

            <button class="btn btn-link mx-1 px-1 btn-add-file" type="button">
                <IconSearch style="width: 15px; height: 16px;"/>
            </button>

        </div>
    </div>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue';

export default {
    name: 'ProfileFilter',
    components: {
        IconSearch
    },
    props: {
        firstName: {
            type: String,
            default: null,
        },
    },

    data() {
        return {
            wMode: `all`
        }
    },

    methods: {
        wallPostsSelect(wMode) {
            this.wMode = wMode;
            this.$emit('wallPostsSelect', {wMode: wMode});
        },
    }
}
</script>
