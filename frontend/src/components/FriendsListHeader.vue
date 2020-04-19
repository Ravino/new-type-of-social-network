<template>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white-br20">
            <div class="d-flex flex-row align-content-start">
                <div class="p-4">
                    <router-link tag="a" to="/friends">Мои друзья</router-link>
                    |
                    <router-link tag="a" to="/invitations">Заявки в друзья</router-link>
                    |
                    <router-link tag="a" to="/fresh-friends">Новые друзья</router-link>
                </div>

                <div class="p-4 ml-auto align-self-end w-50">
                    <div class="form-inline mt-1 rounded-pill">
                        <input value="" id="friendSearch" ref="friendSearch"
                               class="form-control form-control w-100"
                               type="text" placeholder="Найти среди друзей" aria-label="Найти среди друзей" />
<!--                        <button class="btn btn-search h-100 " type="submit" >-->
<!--                            <IconSearch />-->
<!--                        </button>-->
                    </div>
                </div>
            </div>
        </div>
<!--        <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 bg-white-br20">-->
<!--            <div class="p-4">поиск друзей</div>-->
<!--        </div>-->
    </div>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue';

export default {
name : 'FriendsListHeader',
components: {IconSearch}
}
</script>
