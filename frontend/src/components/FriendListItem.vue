<template>
    <li class="plizi-friend-item-user media m-0 py-4 px-4">
        <div class="plizi-friend-item d-flex w-100 align-items-center">
            <router-link :to="`/user-`+srItem.id" tag="div" class="plizi-friend-item-pic mr-3 " >
                <img class="plizi-friend-item-img rounded-circle overflow-hidden" v-bind:src="srItem.userPic" v-bind:alt="srItem.fullName" />
                <span v-if="srItem.isOnline" class="plizi-friend-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-friend-item-isoffline"></span>
            </router-link>

            <div class="plizi-friend-item-body m-0 pr-5 ">
                <router-link :to="`/user-`+srItem.id" tag="div"  class="plizi-friend-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-friend-item-name my-0">
                        {{ srItem.fullName }}
                    </h6>
                </router-link>

                <div class="plizi-friend-item-body-bottom d-flex pr-5">
                    <p class="plizi-friend-item-desc p-0 my-0  d-inline ">

                        <IconLocation style="height: 14px;" />

                        <!-- TODO: @YZ нужна проверка городов и страны -->
                        <span class="">
                            {{ srItem.city.title +', '+  srItem.country }}
                        </span>
                    </p>
                </div>
            </div>

            <IconMessageShort :clazz="'ml-auto'" />

            <div class="plizi-friend-item-actions ml-3">
                <button class="btn btn-link plizi-friend-item-settings"
                        :id="`friend` + srItem.id"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    <i class="dots-vertical"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right py-3 "
                     :aria-labelledby="`friend` + srItem.id">

                    <div class="nav-item">
                        <router-link tag="a" class="dropdown-item px-3 py-1" to="/editing">
                            Редактировать
                        </router-link>
                    </div>

                    <div class="nav-item">
                        <router-link tag="a" class="dropdown-item px-3 py-1" to="/account">
                            Настройки
                        </router-link>
                    </div>

                    <div class="nav-item">
                        <router-link tag="a" class="dropdown-item px-3 py-1" to="/help">
                            Помощь
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </li>
</template>

<script>
import IconLocation from '../icons/IconLocation.vue';
import IconMessage from '../icons/IconMessage.vue';
import IconMessageShort from '../icons/IconMessageShort';

import PliziFriend from '../classes/PliziFriend.js';

export default {
name : 'SearchResultItem',
    components: {IconMessageShort, IconMessage, IconLocation},
    props : {
    srItem : PliziFriend
}

}
</script>

