<template>
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <router-link to="/" tag="a" class="navbar-brand mr-auto mr-lg-0">Plizi</router-link>

        <div class="collapse navbar-collapse" id="nav-content">
            <ul class="navbar-nav">
                <template v-if="isAuth">
                    <router-link tag="li" v-bind:to="menuItem.path" v-for="(menuItem, menuIndex) in authItems" v-bind:key="menuIndex" class="nav-item" :class="{'active' : isActiveMenu(menuItem.routes)}">
                        <a class="nav-link">{{menuItem.title}}</a>
                    </router-link>
                </template>
                <template v-else>
                    <router-link tag="li" v-bind:to="menuItem.path" v-for="(menuItem, menuIndex) in guestItems" v-bind:key="menuIndex" class="nav-item" :class="{'active' : isActiveMenu(menuItem.routes)}">
                        <a class="nav-link">{{menuItem.title}}</a>
                    </router-link>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
name: 'NavBar',
props: {
    isAuth: Boolean
},
data () {
    return {
        guestItems : [
            { path : '/login', title : 'Логин', routes : ['login'] },
            { path : '/registration', title : 'Регистрация', routes : ['registration'] },
        ],
        authItems : [
            { path : '/account', title : 'Аккаунт', routes : ['account'] },
            { path : '/chat', title : 'Чат', routes : ['chat'] },
            { path : '/login', title : 'Логаут', routes : ['login'] },
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

