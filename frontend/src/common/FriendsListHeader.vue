<template>
    <div id="FriendsFilter" class="row bg-white-br20 mb-4 py-0 px-4">
        <div class="col-8 d-flex align-items-center justify-content-between px-0 ">
            <nav class="nav profile-filter-links" role="tablist">
                <router-link to="/friends" tag="span" class="nav-link py-4 px-1 mr-4" role="tab"
                             :class="{ 'active': 'FriendsListPage'===this.$root.$router.currentRoute.name }">
                    Мои друзья
                </router-link>

                <router-link to="/invitations" tag="span" class="nav-link py-4 px-1 mr-4"  role="tab"
                             :class="{ 'active': 'InvitationsPage'===this.$root.$router.currentRoute.name }">
                    Заявки в друзья
                </router-link>

                <router-link to="/friends-recent" tag="span" class="nav-link py-4 px-1 mr-4" role="tab"
                             :class="{ 'active': 'FriendsRecentPage'===this.$root.$router.currentRoute.name }">
                    Новые друзья
                </router-link>
            </nav>
        </div>

        <div id="friendsListSearch" class="col-4 d-flex align-items-center form-inline pl-4 pr-0 position-relative overflow-hidden rounded-pill">
            <input
                v-model="searchTerm"
                id="friendsListSearchinput"
                ref="friendsListSearchinput"
                class="top-search form-control form-control  w-100"
                type="search"
                placeholder="Поиск"
                aria-label="Поиск"
                @keydown.stop="chatSearchKeyDownCheck($event)"
            />
            <button class="btn btn-search h-100" type="button">
                <IconSearch style="width: 15px; height: 15px;" />
            </button>
        </div>
    </div>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue';

export default {
    name : 'FriendsListHeader',
    components: {IconSearch},
    data() {
        return {
            searchTerm: '',
        }
    },
    methods: {
        chatSearchKeyDownCheck(ev){
            //backspace, enter, delete
            if (8 === ev.keyCode || 13 === ev.keyCode || 46 === ev.keyCode){
                this.filterFriends();
            }
        },
        filterFriends(){
            this.$emit('filterSearch', {
                searchTerm: this.searchTerm.trim(),
            });
        },
    }
}
</script>
