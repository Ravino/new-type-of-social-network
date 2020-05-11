<template>
    <div class="row plizi-friends-list" v-bind:key="friendsKey">

        <ul v-if="hasFriends" class="d-block w-100 p-0" v-bind:key="`friendsListKey`+frmSize">
            <transition-group name="slide-fade" :duration="700">
                <FriendListItem v-for="friendItem in getFriends()"
                                v-bind:key="friendItem.id+`-`+friendsKey"
                                v-bind:friend="friendItem">
                </FriendListItem>
            </transition-group>
        </ul>

        <div v-else class="alert alert-info w-100 p-5 text-center">
            <p v-if="wMode==='all'">Вы ещё ни с кем не подружились.</p>
            <p v-if="wMode==='online'">Сейчас все друзья оффлайн.</p>
            <p v-if="wMode==='favorites'">Вы никого не добавили в Избранные.</p>
        </div>
    </div>

</template>

<script>
import FriendListItem from './FriendListItem.vue';

export default {
name : 'FriendsAllList',
components : { FriendListItem },
props : {
    friends : Array,
    friendsKey : String,
    frmSize : Number,
    wMode: String,
    hasFriends : Boolean
},

methods: {
    getFriends(){
        return this.friends;
    }
},

created(){
    this.$root.$on( this.$root.$auth.frm.loadEventName, ()=>{
        this.$forceUpdate();
    });
}

}
</script>
