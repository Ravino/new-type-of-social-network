<template>
    <div id="profile-filter" class="row plz-profile-photos mt-4">
        <div class="col-12 bg-white-br20 d-flex align-items-center justify-content-between">
            <nav class="nav profile-filter" role="tablist">
                <a class="nav-link active"
                   href="#all-posts"
                   id="all-posts-tab"
                   data-toggle="tab"
                   role="tab"
                   aria-controls="all-posts"
                   aria-selected="true">Все записи</a>
                <a class="nav-link"
                   id="my-posts-tab"
                   href="#my-posts"
                   data-toggle="tab"
                   role="tab"
                   aria-controls="my-posts"
                   aria-selected="false">Мои записи</a>
                <a class="nav-link"
                   href="#archive-posts"
                   id="archive-posts-tab"
                   data-toggle="tab"
                   role="tab"
                   aria-controls="archive-posts"
                   aria-selected="false">Архив</a>
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
    }
},

methods: {
}

}
</script>

<style>

</style>
