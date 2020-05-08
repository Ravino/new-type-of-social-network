<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 pl-0">
            <AccountToolbarLeft/>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0">
            <div class="container">
                <div class="row plz-post-item mb-4 bg-white-br20 p-4">
                    <div class="alert alert-info w-100 p-5 text-center mb-0">
                        Извините! Страница, которую Вы ищете, не может быть найдена.
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoriteFriends :isNarrow="false"></FavoriteFriends>
            <ShortFriends v-bind:friends="allMyFriends"></ShortFriends>
        </div>

    </div>
</template>

<script>
import AccountToolbarLeft from "../common/AccountToolbarLeft";
import FavoriteFriends from "../common/FavoriteFriends";
import ShortFriends from "../common/ShortFriends";
import ShortFriendsMixin from '../mixins/ShortFriendsMixin';

export default {
name: "Error404",
components: {
 ShortFriends,
 FavoriteFriends,
 AccountToolbarLeft
},
mixins: [ShortFriendsMixin],
async created() {
    if (!this.$root.$isAuth) {
    await this.$router.push({ name: 'LogoutPage' });
    return;
    }

    await this.loadMyFriends();
},
}
</script>
