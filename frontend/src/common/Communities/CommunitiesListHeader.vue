<template>
    <div id="communitiesFilter" class="col-sm-6 col-md-6 col-lg-8 col-xl-8 mb-4 py-0 px-4">
        <div class="row bg-white-br20">
            <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                <nav class="profile-filter-links nav" role="tablist">
                    <router-link to="/communities" tag="span" class="nav-link py-4 px-1 mr-4" role="tab"
                                 :class="{ 'active': 'CommunitiesListPage'===this.$root.$router.currentRoute.name }">
                        Мои сообщества
                    </router-link>

                    <router-link to="/manage-communities" tag="span" class="nav-link py-4 px-1 mr-4"  role="tab"
                                 :class="{ 'active': 'CommunitiesManagePage'===this.$root.$router.currentRoute.name }">
                        Управление
                    </router-link>

                    <router-link to="/popular-communities" tag="span" class="nav-link py-4 px-1 --mr-4" role="tab"
                                 :class="{ 'active': 'CommunitiesPopularPage'===this.$root.$router.currentRoute.name }">
                        Популярные сообщества
                    </router-link>
                </nav>
            </div>

            <div class="communities-search-block col-sm-6 col-md-6 col-lg-4 col-xl-4 d-flex align-items-center">
                <div class="form-inline mt-1 mt-md-1 position-relative overflow-hidden rounded-pill"
                     :class="{'isFocused' : isFocused}">
                    <input :value="lastSearch" id="txtCommunitiesListSearch"
                           ref="txtCommunitiesListSearch"

                           @blur="onBlur"
                           @focus="onFocus"
                           class="top-search form-control form-control  w-100"
                           type="text" placeholder="Поиск" aria-label="Поиск" />
                    <button class="btn btn-search h-100 " type="submit"  >
                        <IconSearch style="width: 15px; height: 15px;" />
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import IconSearch from '../../icons/IconSearch.vue';

export default {
name : 'CommunitiesListHeader',
components: {IconSearch},
data() {
    return {
        isFocused: false
    }
},
methods: {
    onFocus() {
        this.isFocused = true
    },
    onBlur() {
        this.isFocused = false
    }
}
}
</script>
