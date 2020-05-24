<template>
    <div id="accountSettingsSideMenu" class="bg-white-br20">
        <div class="list-group border-0 py-3">
            <router-link tag="a" v-bind:to="menuItem.path"
                         v-for="(menuItem, menuIndex) in menuItems"
                         v-bind:key="menuIndex"
                         class="list-group-item list-group-item-action border-0 py-2"
                         :class="{'active' : menuItem.isActive}"
                         @click.native="anchorHashCheck">
                {{menuItem.title}}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
name: 'BlackListSideMenu',
data () {
    return {
        menuItems : [
            { path : '/account', title : 'Основные', isActive: false },
            { path : '/black-list', title : 'Чёрный список', isActive: true },
        ],
    }
},

methods: {
    anchorHashCheck() {
        if (window.location.hash === this.$route.hash) {
            const el = document.getElementById(this.$route.hash.slice(1));

            if (el) {
                window.scrollTo(0, el.offsetTop);

                this.menuItems.map((menuItem) => {
                    menuItem.isActive = menuItem.path === this.$route.hash;
                });
            }
        }
    },
}

}
</script>
