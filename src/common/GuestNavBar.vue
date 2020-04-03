<template>
    <nav class="navbar plz-navbar">
        <div class="container-fluid px-0 py-0 --w-100 my-0">
            <div class="row w-100 px-0 mx-auto">
                <div class="col-2">
                    <router-link to="/" tag="a" class="navbar-brand mr-auto">
                        <img src="images/plizi-icon-56.png" alt="Plizi" />
                    </router-link>
                </div>
                <div class="col-7">
                    <form class="form-inline my-0 h-100">
                        <input id="topSearch" ref="topSearch" class="top-search form-control" type="search" placeholder="Поиск" aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div class="col-3 px-0 mr-0">
                    <div class="w-100 h-100 --d-flex --flex-row-reverse">
                        <a id="toEnglish" href="#toEnglish" class="to-english btn btn-link">Switch to English</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
name: 'GuestNavBar',
props: {
    isAuth: Boolean
},
data () {
    return {

    }
},

methods: {
    isActiveMenu(routNames) {
        return !!routNames.find((rItem) => {
            return this.$router.currentRoute.name === rItem;
        });
    },
}

}
</script>

<style>
.navbar.plz-navbar {
    height: 56px;
    min-height: 56px;
    max-height: 56px;
    padding: 0px;
    margin: 154px 0px 0px 0px;
}

.navbar.plz-navbar .top-search.form-control {
    color: #A3A8B9;

    /*width: 100%; !* 534px *!*/
    width: 534px;
    height: 40px;
    min-height: 40px;
    max-height: 40px;
    background-color: #EEEFF4;

    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
    border-width: 0px;
    padding: 0px 30px;

    background-image: url("/images/top-search-icon.png");
    background-repeat: no-repeat;
    background-position: 490px center;
}

.navbar.plz-navbar .to-english.btn.btn-link {
    display: block;
    color: #AFB4C5;
    float: right;
    line-height: 56px;
    height: 56px;
}

</style>
