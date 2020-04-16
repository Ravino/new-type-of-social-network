<template>
    <div class="plz-top-watcher-item position-relative d-inline-block">
        <router-link to="/chats-list" tag="a" class="btn btn-link my-auto text-body btn-sm">
            <IconMessage/>
        </router-link>
        <span class="counter-info" id="dropdownMenuMessages" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">55</span>
        <div class="dropdown-menu dropdown-menu-right py-3  dropdown-white w-auto" aria-labelledby="dropdownMenuMessages">
            <!--  User -->
            <div class="user-friend d-flex py-1 px-3">
                <div class="user-friend-pic"> <!-- Взято с chatListItem  -->
                    <img src="images/chat/alexandra.png" alt="Валерия" class="user-friend-img rounded-circle">
                </div>
                <div class="user-friend-body ml-2">
                    <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                        <h6 class="user-friend-name my-0 text-nowrap">
                            userName
                        </h6>
                    </div>

                    <div class="user-friend-body-bottom d-flex">
                        <p class="user-friend-desc p-0 my-0  d-inline text-nowrap">
                            Прислала сообщение
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconMessage from '../../icons/IconMessage.vue'

export default {
    name : 'NavBarMessages',
    components : { IconMessage }
}
</script>
