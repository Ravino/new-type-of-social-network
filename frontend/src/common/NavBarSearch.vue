<template>
    <div class="form-inline mt-3 mt-md-3">
        <input :value="lastSearch" id="topSearch" ref="topSearch"
               @keydown.stop="topSearchKeyDownCheck($event)"
               class="top-search form-control form-control rounded-pill w-100"
               type="text" placeholder="Поиск" aria-label="Поиск" />
        <button class="d-none btn btn-outline-success" type="submit">Поиск</button>
    </div>
</template>

<script>
export default {
name : 'NavBarSearch',
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
