<template>
    <li class="plizi-friend-item-user media m-0 py-4 px-4"
            :class="{ 'bg-danger': isPrepareToRemoved, 'd-none': isRemoved }">

        <div class="plizi-friend-item d-flex w-100 align-items-center">
            <router-link :to="`/user-`+friend.id" tag="div" class="plizi-friend-item-pic mr-3 " >
                <img class="plizi-friend-item-img rounded-circle overflow-hidden"
                     v-bind:src="friend.userPic" v-bind:alt="friend.fullName" />

                <span v-if="isFavorite" class="plizi-friend-item-isfavorite" :title="favoriteTitle">
                    <i class="fas fa-star"></i>
                </span>

                <span v-if="friend.isOnline" class="plizi-friend-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-friend-item-isoffline"></span>
            </router-link>

            <div class="plizi-friend-item-body m-0 ">
                <router-link :to="`/user-`+friend.id" tag="div"
                             class="plizi-friend-item-top d-flex align-items-end justify-content-between mb-2" >
                    <h6 class="plizi-friend-item-name my-0">{{ friend.fullName }}</h6>
                </router-link>

                <div class="plizi-friend-item-body-bottom d-flex ">
                    <p class="plizi-friend-item-desc p-0 my-0 d-inline">

                        <IconLocation style="height: 14px;" />

                        <span v-if="friend.location && friend.city.title && friend.country.title">
                            {{ friend.city.title.ru +', '+  friend.country.title.ru }}
                        </span>
                        <span v-else>
                            Не указано
                        </span>
                    </p>
                </div>
            </div>

            <button @click.prevent="goToDialogWithFriend()" type="button" class="btn btn-link ml-auto"
                    :title="`Перейти к диалогу с ${friend.fullName}`">
                <IconSpinner v-if="isInRedirecting" />
                <IconMessageShort v-else />
            </button>

            <FriendListItemMenu v-bind:friend="friend"
                                v-bind:isFavorite="isFavorite"
                                @FriendAddToFavorites="onFriendAddToFavorites"
                                @FriendRemoveFromFavorites="onFriendRemoveFromFavorites"
                                @FriendshipStop="onFriendshipStop">
            </FriendListItemMenu>
        </div>
    </li>
</template>

<script>
import IconLocation from '../icons/IconLocation.vue';
import IconMessageShort from '../icons/IconMessageShort';
import IconSpinner from '../icons/IconSpinner.vue';

import FriendListItemMenu from './FriendListItemMenu.vue';

import DialogMixin from '../mixins/DialogMixin.js';
import FriendItemMixin from '../mixins/FriendItemMixin.js';

import PliziFriend from '../classes/PliziFriend.js';

export default {
name : 'FriendListItem',
components: { FriendListItemMenu, IconMessageShort, IconSpinner, IconLocation},
mixins : [DialogMixin, FriendItemMixin],
props : {
    friend : PliziFriend
},

data(){
    return {
        isPrepareToRemoved: false,
        isRemoved : false,
        isFavorite: false,
        isInRedirecting: false
    }
},

computed: {
    favoriteTitle(){
        return ( this.friend.sex==='f' ? `избранная` : `избранный` );
    },
},

methods: {
    goToDialogWithFriend(){
        this.isInRedirecting = true;
        this.openDialogWithFriend( this.friend );
        this.$root.$router.push('/chats');
    },

    checkIsFavorite(){
        this.isFavorite = !!this.$root.$auth.fm.asArray().find( (fItem)=>{
            return fItem.id === this.friend.id;
        });
    },

    onFriendRemoveFromFavorites(){
        this.removeFriendFromFavorites();
    },

    async removeFriendFromFavorites(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$friend.removeFromFavorites( this.friend.id );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            this.$root.$auth.fm.removeFromFavorites(this.friend.id);

            this.$emit( 'FriendRemoveFromFavorites', {
                friendId: this.friend.id
            });
        }
        else {
            let errMsg = `Не получилось удалить <b>${this.friend.fullName}</b> из Избранных`;
            this.$root.$alert(errMsg, `bg-warning`, 3);
        }
    },

    onFriendAddToFavorites(){
        this.addFriendToFavorites();
    },

    async addFriendToFavorites(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$friend.addToFavorites( this.friend.id );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            const jFriend = this.friend.toJSON();
            this.$root.$auth.fm.onAddToFavorites( jFriend );

            this.$emit( 'FriendAddToFavorites', {
                friendId: this.friend.id
            });
        }
        else {
            let errMsg = `Не получилось добавить <b>${this.friend.fullName}</b> в Избранные`;
            this.$root.$alert(errMsg, `bg-warning`, 3);
        }
    },

    onFriendshipStop(){
        this.stopFriendship();
    },

    async stopFriendship(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$friend.friendshipStop( this.friend.id );
        } catch (e){
            window.console.warn( e.detailMessage );
            throw e;
        }

        this.isPrepareToRemoved = true;

        if ( apiResponse ) {
            this.isRemoved = true;

            this.$root.$auth.fm.removeFromFavorites(this.friend.id);
            this.$root.$auth.frm.stopFriendship(this.friend.id);

            this.$emit( 'FriendshipStop', {
                friendId: this.friend.id
            });
        }
    }
},

beforeMount(){
    this.checkIsFavorite();
}

}
</script>

