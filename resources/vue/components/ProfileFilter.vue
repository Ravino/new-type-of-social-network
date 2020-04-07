<template>
    <div id="profileFilter" class="row plz-profile-filter mt-4">
        <div class="col-12 bg-white-br20 d-flex align-items-center justify-content-between">
            <nav class="nav profile-filter-links" role="tablist">
                <a class="nav-link" :class="{ 'active': wMode==='all' }" id="tabAllPosts" role="tab" @click.stop="wallPostsSelect(`all`)">Все записи</a>
                <a class="nav-link" :class="{ 'active': wMode==='my' }" id="tabMyPosts" role="tab" @click.stop="wallPostsSelect(`my`)">Мои записи</a>
                <a class="nav-link" :class="{ 'active': wMode==='archive' }" id="tabArchivePosts" role="tab" @click.stop="wallPostsSelect(`archive`)">Архив</a>
            </nav>

            <i class="fa fa-search" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProfileFilter',

        data () {
            return {
                wMode: `all`
            }
        },

        methods: {

            /** TODO: @TGA перевести потом на отправку события только родителю **/
            wallPostsSelect(wMode){
                this.wMode = wMode;
                this.$root.$emit('wallPostsSelect', {wMode: wMode});
            },
        }

    }
</script>
