<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="offset-2 col-8 bg-white-br20 p-4">
                    <div v-if="isDataReady" class="plizi-search-results-list">
                        <ul v-if="searchResults  &&  (searchResults.length > 0)" class="list-unstyled mb-0">
                            <SearchResultItem v-for="(srItem, srIndex) in searchResults"
                                              v-bind:key="srIndex" v-bind:srItem="srItem">
                            </SearchResultItem>
                        </ul>
                        <div v-else>
                            <div class="alert alert-info">
                                По Вашему запросу &quot;<b>{{searchText}}</b>&quot; ничего не найдено
                            </div>
                        </div>
                    </div>
                    <Spinner v-else v-bind:clazz="`d-flex flex-row`"></Spinner>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <FavoriteFriends :isNarrow="true"></FavoriteFriends>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import Spinner from '../common/Spinner.vue';

import SearchResultItem from '../components/SearchResultItem.vue';

import PliziUser from '../classes/PliziUser.js';

export default {
name: 'SearchResultsPage',
components: {
    SearchResultItem,
    AccountToolbarLeft, FavoriteFriends,
    Spinner
},
data() {
    return {
        searchResultsList: [],
        isDataReady : false
    }
},

computed: {
    searchResults() {
        return this.searchResultsList;
    },

    searchText(){
        return this.$root.$lastSearch;
    }
},

methods: {
    async searchProcess(){
        this.isDataReady = true; // на случай если строка поиска пустая
        this.searchResultsList = [];

        if (this.$root.$lastSearch === ``)
            return;

        this.isDataReady = false;
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.userSearch(this.$root.$lastSearch);
        }
        catch (e) {
            window.console.warn(e.detailMessage);
        }

        if (apiResponse !== null) {
            this.searchResultsList = [];

            apiResponse.map( (srItem)=> {
                this.searchResultsList.push( new PliziUser({ data : srItem} ) );
            });

            this.isDataReady = true;
        }
    }
},

beforeMount() {
    this.$root.$on('searchStart', this.searchProcess);
},

mounted(){
    const lst = window.localStorage.getItem('pliziLastSearch');

    if (lst  &&  lst!==``) {
        this.$root.$lastSearch = lst;
        this.searchProcess();
    }
}

}
</script>


<style lang="scss">
.chat-list-user {
    transition: .4s;

    &:hover {
        background-color: #e6e7eb !important;
    }

    .sr-item-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
