<template>
    <nav class="navbar navbar-expand-lg fixed-top --bg-light">
        <div class="container-fluid --w-100">
            <div class="row w-100">
                <div class="col-2 offset-1">
                    <router-link to="/" tag="a" class="navbar-brand mr-auto">
                        <img src="images/plizi-icon-56.png" alt="Plizi" />
                    </router-link>
                </div>
                <div class="col-5">
                    <form class="form-inline my-0 h-100">
                        <input class="form-control rounded-pill w-100" type="text" placeholder="Поиск" aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div class="col-3 text-right">
                    <a href="#toEnglish" class="btn btn-link text-black-50 mt-3 d-block" style="float: right">Switch to English</a>
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

