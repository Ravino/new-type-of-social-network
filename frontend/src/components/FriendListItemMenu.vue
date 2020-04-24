<template>
    <div class="plizi-friend-item-actions ml-3">
        <button class="btn btn-link plizi-friend-item-settings"
                :id="`friend${this.friend.id}`"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
            <i class="dots-vertical"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-right py-3" :aria-labelledby="`friend${this.friend.id}`">
            <div class="nav-item">
                <router-link tag="a" class="dropdown-item px-3 py-1" :to="`/user`+friend.id">
                    Смотреть профиль
                </router-link>
            </div>

            <div class="nav-item">
                <router-link tag="a" class="dropdown-item px-3 py-1" to="/chat-list">
                    Начать общение
                </router-link>
            </div>

            <div class="nav-item">
                <span class="dropdown-item px-3 py-1" @click.prevent="onStopfriendClick">
                    Не дружить
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Plizifriend from '../classes/PliziFriend.js';

export default {
name : 'friendListItemMenu',
props : {
    friend : Plizifriend
},

methods: {
    onStopfriendClick(){
        this.$emit( 'friendShipStop', {
            friendId: this.friend.id
        });
    }
}

}
</script>
