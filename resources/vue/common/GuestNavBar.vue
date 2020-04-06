<template>
    <nav class="navbar plz-guest-navbar">
        <div class="container-fluid px-0 py-0 --w-100 my-0">
            <div class="row w-100 px-0 mx-auto">
                <div class="col-2">
                    <router-link to="/" tag="a" class="navbar-brand mr-auto">
                        <img src="images/plizi-icon-56.png" alt="Plizi" />
                    </router-link>
                </div>
                <div class="col-7">
                    <form class="form-inline my-0 h-100">
                        <input id="topSearch" ref="topSearch" class="top-search form-control"
                               type="text"
                               placeholder="Поиск" aria-label="Поиск" />
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

<style lang="scss">
$plzGuestNavbarH: 56px;

.navbar.plz-guest-navbar {
    height: $plzGuestNavbarH;
    min-height: $plzGuestNavbarH;
    max-height: $plzGuestNavbarH;
    padding: 0px;
    margin-top: 153px;

    .to-english.btn.btn-link {
        display: block;
        color: #AFB4C5;
        float: right;
        line-height: $plzGuestNavbarH;
        height: $plzGuestNavbarH;
    }
}


</style>
