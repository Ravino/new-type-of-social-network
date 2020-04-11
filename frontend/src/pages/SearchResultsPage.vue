<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pr-md-0">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-10 col-lg-10 col-xl-10">
            <div class="row">
                <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 pr-3">
                    <div class="p-4 bg-white-br20">
                        Новые друзья | Заявки в друзья | <b>Новые друзья</b>
                    </div>
                </div>
                <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 bg-white-br20">
                    <div class="p-4">поиск друзей</div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 py-3"></div>
            </div>

            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 bg-white-br20">
                    <div class="p-4">
                        <div class="">
                            Все друзья | Друзья онлайн Найти друзей
                        </div>
                        <hr />

                        <div class="plizi-friends-list">
                            <div v-for="(srItem, srIndex) in searchResult" v-bind:key="srIndex">
                                <div class="plizi-friend-item text-left py-2">
                                    <router-link :to="`/user-${srItem.id}`" tag="a" class="plizi-friend-link btn btn-link btn-block text-left pl-3">
                                        <span class="plizi-friend-name">{{srItem.fullname}}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <h5>Возможные друзья</h5>
                    <h5>Рекомендуемые друзья</h5>
                </div>
            </div>
        </div>

        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarRight></AccountToolbarRight>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import AccountToolbarRight from '../common/AccountToolbarRight.vue';

export default {
name: 'SearchResultsPage',
components: { AccountToolbarLeft,
    AccountToolbarRight
},
data() {
    return {
        searchResult: []
    }
},

methods: {
    async searchProcess(evData){
        const searchResult = await this.$root.$api.userSearch(evData.searchText);
        window.console.log(searchResult, 'searchResult');

        this.searchResult = JSON.parse( JSON.stringify(searchResult) );
    }
},

beforeMount() {
    this.$root.$on('searchStart', this.searchProcess);
},


}
</script>
