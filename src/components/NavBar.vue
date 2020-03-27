<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <router-link to="/login" tag="a" class="navbar-brand mr-auto mr-lg-0">Plizi</router-link>

        <div class="collapse navbar-collapse" id="nav-content">
            <ul class="navbar-nav">
                <router-link tag="li" v-bind:to="menuItem.path" v-for="(menuItem, menuIndex) in menuItems" v-bind:key="menuIndex" class="nav-item" :class="{'active' : isActiveMenu(menuItem.routes)}">
                    <a class="nav-link">{{menuItem.title}}</a>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
name: 'NavBar',
data () {
    return {
        menuItems : [
            { path : '/login', title : 'Логин', routes : ['login'] },
            { path : '/registration', title : 'Регистрация', routes : ['registration'] },
            { path : '/account', title : 'Аккаунт', routes : ['account'] },
            { path : '/chat', title : 'Чат', routes : ['chat'] },
        ],
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

