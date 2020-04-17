<template>
    <div id="profileFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex align-items-center justify-content-between px-0 ">
            <nav class="nav profile-filter-links" role="tablist">
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='all' }" id="tabAllPosts" role="tab"
                      @click.stop="wallPostsSelect(`all`)">Все записи</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='my' }" id="tabMyPosts" role="tab"
                      @click.stop="wallPostsSelect(`my`)">Мои записи</span>
                <span class="nav-link py-3 px-1 mr-4" :class="{ 'active': wMode==='archive' }" id="tabArchivePosts"
                      role="tab" @click.stop="wallPostsSelect(`archive`)">Архив</span>
            </nav>

            <button class="btn btn-link mx-1 px-1 btn-add-file" type="button">
                <IconSearch style="width: 15px; height: 16px;"/>
            </button>

        </div>
    </div>
</template>

<script>
    import IconSearch from "../icons/IconSearch";

    export default {
        name: 'ProfileFilter',
        components: {
            IconSearch
        },
        data() {
            return {
                wMode: `all`
            }
        },
        methods: {
            /** TODO: @TGA перевести потом на отправку события только родителю **/
            wallPostsSelect(wMode) {
                this.wMode = wMode;
                this.$root.$emit('wallPostsSelect', {wMode: wMode});
            },
        }

    }
</script>
