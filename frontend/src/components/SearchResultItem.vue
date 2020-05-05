<template>
    <li class="plizi-sr-item-user media m-0 py-4 px-4">
        <div class="plizi-sr-item d-flex w-100 align-items-center">
            <router-link :to="`/user-`+srItem.id" tag="div" class="plizi-sr-item-pic mr-3 " >
                <img class="plizi-sr-item-img rounded-circle overflow-hidden" v-bind:src="srItem.userPic" v-bind:alt="srItem.fullName" />
                <span v-if="srItem.isOnline" class="plizi-sr-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-sr-item-isoffline"></span>
            </router-link>

            <div class="plizi-sr-item-body m-0 pr-5 ">
                <router-link :to="`/user-`+srItem.id" tag="div"  class="plizi-sr-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-sr-item-name my-0">
                        {{ srItem.fullName }}
                    </h6>
                </router-link>

                <div class="plizi-sr-item-body-bottom d-flex pr-5">
                    <p class="plizi-sr-item-desc p-0 my-0  d-inline ">

                        <IconLocation style="height: 14px;" />

                        <!-- TODO: @YZ нужна проверка городов и страны -->
                        <span v-if="srItem.location && srItem.city.title && srItem.country.title">
                            {{ srItem.city.title.ru +', '+  srItem.country.title.ru }}
                        </span>
                        <span v-else>
                            Не указано
                        </span>
                    </p>
                </div>
            </div>

            <router-link to="/chats" tag="a" class="plz-short-friend-is-active text-body mr-2 ml-auto">
                <IconMessageShort />
            </router-link>

            <a class="text-body" @click="sendInvite()">
                <IconAddUser style="width: 24px; height: 24px;" />
            </a>

        </div>
    </li>
</template>

<script>
import IconLocation from '../icons/IconLocation.vue';
import IconMessage from '../icons/IconMessage.vue';
import IconMessageShort from '../icons/IconMessageShort';
import IconAddUser from '../icons/IconAddUser.vue';

import PliziUser from '../classes/PliziUser.js';

export default {
name : 'SearchResultItem',
components: {IconMessageShort, IconAddUser, IconMessage, IconLocation},

props : {
    srItem : PliziUser
},

methods: {
    sendInvite(){
        this.$root.$alert('Отправка инвайта', 'bg-info', 3);
    }
}
}
</script>

