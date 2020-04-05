<template>
    <div id="profile-filter" class="row plz-profile-photos mt-4">
        <div class="col-12 bg-white-br20 ">
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
    #profile-filter {
        color: #9b9998;
        font-size: 13px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
        border-radius: 20px;
        padding: 0 20px;
    }
    .profile-filter a{
        font-size: 13px;
        font-family: OpenSans, sans-serif;
        color: #939292;
        padding-right: 0;
        padding-left: 0;
        margin-right: 2rem;
        line-height: 50px;
    }
    .profile-filter .active {
        font-family: OpenSans-Bold, sans-serif;
        border-bottom: 2px solid #576df6;
        font-weight: bold;
        color: #2f2f2f;
    }
</style>
