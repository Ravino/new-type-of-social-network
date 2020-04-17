<template>
    <div class="form-inline mt-1 mt-md-1 position-relative overflow-hidden rounded-pill">
        <input :value="lastSearch" id="topSearch" ref="topSearch"
               @keydown.stop="topSearchKeyDownCheck($event)"
               class="top-search form-control form-control  w-100"
               type="text" placeholder="Поиск" aria-label="Поиск" />
        <button class="btn btn-search h-100 " type="submit"  @keydown="topSearchKeyDownCheck($event)">
            <IconSearch style="width: 15px; height: 15px;" />
        </button>
    </div>
</template>

<script>
import IconSearch from "../../icons/IconSearch";
export default {
name : 'NavBarSearch',
    components: {IconSearch},
    data () {
    return {
    }
},

computed: {
    lastSearch(){
        return (this.$root.$lastSearch+``).trim();
    }
},

methods: {
    topSearchKeyDownCheck(ev) {
        const sText = this.$refs.topSearch.value.trim();

        if ( 13 === ev.keyCode   &&  sText!==``){
            return this.startSearch(this.$refs.topSearch.value);
        }
    },

    startSearch(sText){
        this.$root.$lastSearch = sText;
        this.$store.dispatch('SET_LAST_SEARCH', sText);

        this.$root.$emit('searchStart', {
            searchText : sText,
            source: `topSearch`
        });

        if (this.$route.name !== `SearchResultsPage`) {
            this.$router.push({ path: '/search-results' });
        }
    }
}
}
</script>
