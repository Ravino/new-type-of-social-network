<template>
    <div id="communitiesFilter" class="bg-white-br20 mb-4 py-0 px-4 col-12 d-flex align-items-center justify-content-between px-0">

        <div class="row">
            <div class="col-8">
                <nav class="profile-filter-links nav" role="tablist">
                    <router-link to="/communities" tag="span" class="nav-link py-4 px-1 mr-4" role="tab"
                                 :class="{ 'active': 'CommunitiesListPage'===this.$root.$router.currentRoute.name }">
                        Мои сообщества
                    </router-link>

                    <router-link to="/manage-communities" tag="span" class="nav-link py-4 px-1 mr-4"  role="tab"
                                 :class="{ 'active': 'CommunitiesManagePage'===this.$root.$router.currentRoute.name }">
                        Управление
                    </router-link>

                    <router-link to="/popular-communities" tag="span" class="nav-link py-4 px-1 mr-4" role="tab"
                                 :class="{ 'active': 'CommunitiesPopularPage'===this.$root.$router.currentRoute.name }">
                        Популярные сообщества
                    </router-link>
                </nav>
            </div>

            <div class="communities-search-block col-4 d-flex align-items-center form-inline pl-4 pr-0 w-100 position-relative overflow-hidden --rounded-pill">
                <input ref="txtCommunitiesListSearch"
                       class="top-search form-control form-control --w-100"
                       type="search" placeholder="Поиск" aria-label="Поиск" />
<!--                <button class="btn btn-search" type="button">-->
<!--                    <IconSearch style="width: 15px; height: 15px;" />-->
<!--                </button>-->
            </div>
        </div>
    </div>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue';

export default {
name : 'CommunitiesListHeader',
components: {IconSearch}
}
</script>
