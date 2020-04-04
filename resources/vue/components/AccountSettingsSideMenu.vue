<template>
    <div id="accountSettingsSideMenu" class="card bg-white py-3 border rounded">
        <div class="list-group border-0">
            <router-link tag="a" v-bind:to="menuItem.path" v-for="(menuItem, menuIndex) in menuItems" v-bind:key="menuIndex" class="list-group-item list-group-item-action border-0 py-2"
                         :class="{'active' : menuItem.isActive}">
                {{menuItem.title}}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
name: 'AccountSettingsSideMenu',
data () {
    return {
        menuItems : [
            { path : '#main', title : 'Основные', isActive: true },
            { path : '#privacy', title : 'Приватность', isActive: false },
            { path : '#security', title : 'Безопасность', isActive: false },
            { path : '#black-list', title : 'Чёрный список', isActive: false },
        ],
    }
},

methods: {
}

}
</script>
