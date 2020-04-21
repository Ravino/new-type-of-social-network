<template>

    <div id="FriendsFilter" class="row bg-white-br20 mb-4 py-0 px-4">
        <div class="col-8 d-flex align-items-center justify-content-between px-0 ">
            <nav class="nav profile-filter-links" role="tablist">
                <span class="nav-link py-4 px-1 mr-4 active"
                      id="tabAllPosts" role="tab">Мои друзья</span>
                <span class="nav-link py-4 px-1 mr-4"
                      id="tabMyPosts" role="tab">Заявки в друзья</span>
                <span class="nav-link py-4 px-1 mr-4"
                      id="tabArchivePosts"
                      role="tab" >Новые друзья</span>
            </nav>
        </div>

        <div id="friendsListSearch" class="col-4 d-flex align-items-center form-inline pl-4 pr-0 position-relative overflow-hidden rounded-pill">
            <input id="friendsListSearchinput" ref="friendsListSearchinput"
                   class="top-search form-control form-control  w-100"
                   type="text" placeholder="Поиск" aria-label="Поиск" />
            <button class="btn btn-search h-100 " type="submit"  >
                <IconSearch style="width: 15px; height: 15px;" />
            </button>
        </div>

    </div>

</template>

<script>
import IconSearch from '../icons/IconSearch.vue';
import NavBarSearch from "../common/NavBar/NavBarSearch";

export default {
name : 'FriendsListHeader',
components: {NavBarSearch, IconSearch}
}
</script>
