<template>
    <div class="container-fluid pl-md-0">
        <div class="row">
            <div class="col-12 col-md-1  px-0 px-md-3">
                <AccountToolbarLeft></AccountToolbarLeft>
            </div>

            <div class="col-12 col-md-11 pr-0 px-0 px-md-3"
                 :class="calcCentralBlockClass()"
                 v-bind:key="`CentralColumn-`+$root.$friendsKeyUpdater">

                <div class="container">
                    <ProfileHeader v-if="isDataReady" ref="personalProfileHeader"
                                   @ShowPersonalMsgModal="onShowPersonalMsgModal"
                                   :isInBlacklist="profileData.stats.isInBlacklist"
                                   :userData="profileData">
                    </ProfileHeader>
                    <Spinner v-else></Spinner>

                    <router-view></router-view>

                </div>

                <NewPersonalMessageModal v-if="isShowMessageDialog"
                                         @HidePersonalMsgModal="onHidePersonalMsgModal"
                                         @SendPersonalMessage="handlePersonalMessage"
                                         v-bind:user="profileData"></NewPersonalMessageModal>
            </div>

            <div v-if="$root.$auth.fm.size>0" class="col-sm-3 col-md-3 col-lg-3 col-xl-3 pr-0 d-none d-xl-block"
                 v-bind:key="`RightColumn-`+$root.$favoritesKeyUpdater">

                <FavoriteFriends></FavoriteFriends>
            </div>

        </div>
    </div>
</template>

<script>
import AccountToolbarLeft from '../common/AccountToolbarLeft.vue';
import FavoriteFriends from '../common/FavoriteFriends.vue';
import ShortFriends from '../common/ShortFriends.vue';
import Spinner from '../common/Spinner.vue';
import SmallSpinner from '../common/SmallSpinner.vue';

import ProfileHeader from '../components/ProfileHeader.vue';
import ProfilePhotos from '../components/ProfilePhotos.vue';
import ProfileFilter from '../components/ProfileFilter.vue';
import Post from '../common/Post/Post.vue';

import NewPersonalMessageModal from '../components/NewPersonalMessageModal.vue';
import PostRepostModal from '../common/Post/PostRepostModal.vue';
import PostLikeModal from '../common/Post/PostLikeModal.vue';
import IconUnlock from "../icons/IconUnlock.vue";

import DialogMixin from '../mixins/DialogMixin.js';
import LazyLoadPosts from '../mixins/LazyLoadPosts.js';
import BlackListMixin from '../mixins/BlackListMixin.js';
import PhotosListMixin from '../mixins/PhotosListMixin.js';

import PliziUser from '../classes/PliziUser.js';
import PliziPost from '../classes/PliziPost.js';

export default {
name: 'PersonalPageInfo',
props: {
    id : Number|String
},
components: {
    Spinner,
    AccountToolbarLeft, FavoriteFriends, ShortFriends,
    ProfileHeader, NewPersonalMessageModal,
    Post,
    ProfilePhotos,
    ProfileFilter,
    PostRepostModal,
    SmallSpinner,
    PostLikeModal,
    IconUnlock,
},
mixins: [DialogMixin, LazyLoadPosts, BlackListMixin, PhotosListMixin],
data() {
    return {
        userId: null,
        profileData: {},
        isDataReady: false,
        isShowMessageDialog: false,
        communities: null
    }
},

watch: {
    $route: 'afterRouteUpdate' // при изменениях маршрута запрашиваем данные снова
},

methods: {
    async afterRouteUpdate(ev){
        this.userId = ev.params.id;
        // this.posts = [];
        this.communities = null;
        this.isStarted = true;

        if (!this.isLockedProfile) {
            await this.getUserInfo();
        }

        window.scrollTo(0, 0);
    },

    calcCentralBlockClass(){
        const isCentralNarrow = (this.$root.$auth.fm.size > 0 || this.communities || this.profileData.videos);

        return {
            'col-lg-8 col-xl-8'   : isCentralNarrow,
            'col-lg-11 col-xl-11' : !isCentralNarrow,
        };
    },

    onHidePersonalMsgModal(){
        this.isShowMessageDialog = false;
    },

    onShowPersonalMsgModal(){
        this.isShowMessageDialog = true;
    },

    async handlePersonalMessage(evData){
        this.onHidePersonalMsgModal();

        this.$root.$once('NewChatDialog', (dlgData) => {
            this.sendPrivateMessageToUser(dlgData, evData.message);
        });

        await this.openDialogWithFriend( {
            id : this.profileData.id,
            fullName : this.profileData.fullName
        } );
    },

    async sendPrivateMessageToUser( chatData, msgData ){
        const sendData = {
            chatId: chatData.id,
            body: msgData.postText,
            attachments: msgData.attachments,
            event: 'new.message'
        };
        this.$root.$api.sendToChannel(sendData);
    },

    async getUserInfo() {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.getUser(this.id);
        }
        catch (e){
            this.isStarted = false;
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.profileData = new PliziUser(apiResponse.data);
            this.isDataReady = true;
        }
    },

    async getUserCommunitiesList() {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.getUserCommunities(this.userId);
        }
        catch (e){
            this.isStarted = false;
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (apiResponse) {
            this.communities = apiResponse;
        }
    },
},

created(){
    this.userId = this.id;

    this.$root.$on( this.$root.$auth.frm.updateEventName,()=>{
        if (this.$refs  && this.$refs.personalProfileHeader){
            this.$refs.personalProfileHeader.$forceUpdate();
        }
    });
},


async mounted() {
    this.isStarted = true;
    await this.getUserInfo();
    await this.getUserCommunitiesList();

    window.scrollTo(0, 0);
},

/**
 * @TGA закоменченное ниже - ошибка но пусть пока будет
 */
// async beforeRouteUpdate( to, from, next ){
//    this.profileData = null;
//    this.posts = null;
//    this.userId = to.params.id;
//    next();
//     this.isStarted = true;
//     await this.getUserInfo();
//     await this.getPosts();
//    window.scrollTo( 0, 0 );
// },
}
</script>

<style lang="scss">
    .locked-profile-notify {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);

        .icon {
            width: 30px;
        }
    }
</style>

