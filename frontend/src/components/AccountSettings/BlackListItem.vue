<template>
    <li class="plizi-friend-item-user media m-0 py-4 px-4">

        <div class="plizi-friend-item d-flex w-100 align-items-center">
            <router-link :to="`/user-`+userItem.id" tag="div" class="plizi-friend-item-pic mr-3 " >
                <img class="plizi-friend-item-img rounded-circle overflow-hidden"
                     v-bind:src="userItem.userPic" v-bind:alt="userItem.fullName" />

                <span v-if="userItem.isOnline" class="plizi-friend-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-friend-item-isoffline"></span>
            </router-link>

            <div class="plizi-friend-item-body m-0 ">
                <router-link :to="`/user-`+userItem.id" tag="div"
                             class="plizi-friend-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-friend-item-name my-0">{{ userItem.fullName }}</h6>
                </router-link>

                <div class="plizi-friend-item-body-bottom d-flex ">
                    <p class="plizi-friend-item-desc p-0 my-0 d-inline">

                        <IconLocation style="height: 14px;" />

                        <span v-if="userItem.location && userItem.city.title && userItem.country.title">
                            {{ userItem.city.title.ru +', '+  userItem.country.title.ru }}
                        </span>
                        <span v-else>
                            Не указано
                        </span>
                    </p>
                </div>
            </div>
            <button
                type="button"
                class="btn btn-primary btn-sm delete-from-blacklist"
                title="Удалить из черного листа"
                @click="deleteFromBlacklist"
                style="cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </li>
</template>

<script>
    import IconLocation from '../../icons/IconLocation.vue';
import PliziBlackListItem from "../../classes/PliziBlackListItem";

export default {
name : 'BlackListItem',
    components: {
        IconLocation
    },
props : {
    userItem: PliziBlackListItem
},

data(){
    return {

    }
},

methods: {
    async deleteFromBlacklist() {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.deleteFromBlacklist(this.userItem.id);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }

        return true;

    }
},

beforeMount(){
    // console.log(this.userItem.fullName);
}

}
</script>

