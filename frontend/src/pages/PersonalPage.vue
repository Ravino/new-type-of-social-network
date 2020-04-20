<template>
    <div class="row">
        <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1">
            <AccountToolbarLeft></AccountToolbarLeft>
        </div>

        <div class="col-sm-10 col-md-9 col-lg-8 col-xl-8 pl-0 --bg-danger">
            <div class="container">
                <ProfileHeader v-if="isDataReady" v-bind:user-data="profileData"></ProfileHeader>
                <Spinner v-else></Spinner>
            </div>

            <NewPersonalMessageModal v-if="isShowMessageDialog" v-bind:user="profileData"></NewPersonalMessageModal>
        </div>

        <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0">
            <FavoritFriends></FavoritFriends>
            <ShortFriends v-bind:user="{}"></ShortFriends>
        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoritFriends from '../common/FavoritFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';
import Spinner from '../common/Spinner.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import NewPersonalMessageModal from '../components/NewPersonalMessageModal.vue';

import PliziUser from '../classes/PliziUser.js';

export default {
name: 'PersonalPage',
props: {
    id : Number|String
},

components: {
    Spinner,
    AccountToolbarLeft, FavoritFriends, ShortFriends,
    ProfileHeader, NewPersonalMessageModal
},

data() {
    return {
        profileData: {},
        isDataReady: false,
        isShowMessageDialog: false,

    }
},

methods: {
    async getUserInfo() {
        let profile = null;

        try {
            profile = await this.$root.$api.infoUser(this.id >>> 0);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (profile) {
            this.profileData = new PliziUser();
            this.profileData.saveUserData(profile);
            this.isDataReady = true;
        }
    },


    // TODO: @TGA тут времененно, для отладки
    handlePersonalMessage(evData){
        //window.console.dir(evData, `handlePersonalMessage`);
        this.sendMessageToUser(evData);
    },

    async sendMessageToUser(msg){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.chatMessage(msg.receiverId, msg.message.body);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        // TODO: @TGA доделать тут когда API починят
        window.console.log(apiResponse, `apiResponse`);
        return;

        if (apiResponse != null &&  apiResponse.status.toUpperCase() === 'OK') {
            msg.id = -1;
            msg.firstName = this.$root.$user.firstName;
            msg.lastName = this.$root.$user.lastName;
            msg.userPic =  this.$root.$user.userPic;

            const eventData = {
                dialogId : (this.currentDialog) ? this.currentDialog.id : -1,
                message : msg
            }

            try {
                this.$root.$emit('newMessageInDialog', eventData);
            } catch (e){

            }
            this.newMessage = ``;
        }
        else {
            window.console.info(apiResponse);
        }
    }
},

mounted() {
    this.getUserInfo();

    this.$root.$on('hidePersonalMsgModal', ()=>{
        this.isShowMessageDialog = false;
    });

    this.$root.$on('showPersonalMsgModal', ()=>{
        this.isShowMessageDialog = true;
    });

    // TODO: @TGA тут времененно, для отладки
    this.$root.$on('sendPersonalMessage', this.handlePersonalMessage);
}

}
</script>

