<template>
    <nav class="navbar navbar-expand-lg fixed-top --navbar-dark">
        <div class="container-fluid pr-0">
            <div class="row w-100">
                <div class="col-1 py-0">
                    <router-link to="/login" tag="a" class="navbar-brand mr-auto d-block h-auto my-0">
                        <img src="images/plizi-icon-56.png" alt="Plizi" />
                    </router-link>
                </div>
                <div class="col-8">
                    <form class="form-inline mt-1">
                        <input class="form-control rounded-pill w-100" type="text" placeholder="Поиск" aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div class="col-2">
                    <div class="btn-block mt-1 w-auto">
                        <a class="btn btn-link my-auto text-body btn-sm" href="#likes" title="Оценки">
                            <i class="far fa-bell fa-2x"></i>
                        </a>
                        <router-link to="/chat" tag="a" class="btn btn-link my-auto text-body btn-sm">
                            <i class="far fa-comment fa-flip-horizontal fa-2x"></i>
                        </router-link>
                        <a class="btn btn-link my-auto text-body btn-sm" href="#friends-list" title="Друзья">
                            <i class="fas fa-user-friends fa-2x"></i>
                        </a>
                    </div>
                </div>
                <div class="col-1 px-0">
                    <router-link to="/account" tag="a" class="icon-40">
                        <img src="images/last-entries/vladislav.png" alt="Plizi" />
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
name: 'AuthNavBar',
props: {
    isAuth: Boolean
},
data () {
    return {
    }
},

mounted() {
    window.console.log(`NavBar`);
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

