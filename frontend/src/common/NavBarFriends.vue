<template>
    <div class="plz-top-watcher-item position-relative d-inline-block">

        <router-link to="/friends" tag="a" class="btn btn-link my-auto text-body btn-sm ">
            <IconFriends/>
        </router-link>

        <span v-if="invitationsNumber>0" class="counter-info" id="dropdownMenuFriends"
              type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{invitationsNumber}}</span>

        <div  v-if="invitationsNumber>0"
              class="dropdown-menu dropdown-menu-right py-3  dropdown-white w-auto"
              aria-labelledby="dropdownMenuFriends">
            <!--  User-->
            <div class="user-friend d-flex py-1 px-3">
                <!-- Взято с chatListItem  -->
                <div class="user-friend-pic  ">
                    <img src="images/chat/alexandra.png" alt="Валерия" class="user-friend-img  rounded-circle">
                </div>
                <div class=" user-friend-body ml-2  ">
                    <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                        <h6 class="user-friend-name my-0 text-nowrap">
                            userName
                        </h6>
                    </div>

                    <div class="user-friend-body-bottom d-flex">
                        <p class="user-friend-desc p-0 my-0  d-inline text-nowrap ">
                            Хочет в друзья
                        </p>
                    </div>
                </div>
            </div>

            <div class="user-friend d-flex py-1 px-3">
                <div class="user-friend-pic  "><!-- Взято с chatListItem  -->
                    <img src="images/chat/alexandra.png" alt="Валерия" class="user-friend-img  rounded-circle">
                </div>
                <div class=" user-friend-body ml-2  ">
                    <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                        <h6 class="user-friend-name my-0 text-nowrap">
                            userName
                        </h6>
                    </div>

                    <div class="user-friend-body-bottom d-flex">
                        <p class="user-friend-desc p-0 my-0  d-inline text-nowrap ">
                            Хочет в друзья
                        </p>
                    </div>
                </div>
            </div>
            <div class="user-friend d-flex py-1 px-3">
                <div class="user-friend-pic  "><!-- Взято с chatListItem  -->
                    <img src="images/chat/alexandra.png" alt="Валерия" class="user-friend-img  rounded-circle">
                </div>
                <div class=" user-friend-body ml-2  ">
                    <div class="user-friend-body-top d-flex align-items-end justify-content-between">
                        <h6 class="user-friend-name my-0 text-nowrap">
                            userName
                        </h6>
                    </div>

                    <div class="user-friend-body-bottom d-flex">
                        <p class="user-friend-desc p-0 my-0  d-inline text-nowrap ">
                            Хочет в друзья
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import IconFriends from '../icons/IconFriends.vue'

export default {
name : 'NavBarFriends',
components : { IconFriends },

methods : {
    updateInvitations(){
        window.console.log(this.$root.$user.invitationsNumber, `updateInvitations`);
    }
},

computed: {
    invitationsNumber(){
        return this.$root.$user.invitationsNumber;
    }
},

created(){
    this.$root.$on('invitationsL',  this.updateInvitations);
}

}
</script>
