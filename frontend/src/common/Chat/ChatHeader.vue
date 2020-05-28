<template>
    <div id="chatHeader" class="bg-white w-100 border-bottom d-flex justify-content-between">
<!--        <div class="row mx-0 py-1 justify-content-between">-->
            <div class="col-11 col-md-5 d-flex">
                <ChatHeaderCompanion v-if="currentDialog.isPrivate" v-bind:companion="companion"></ChatHeaderCompanion>

                <div v-if="currentDialog.isGroup" class="d-flex align-items-center h-100">
                    <ChatHeaderAttendeeItem v-for="attItem in currentDialog.attendees"
                        v-bind:attendee="attItem"
                        v-bind:key="attItem.id">
                    </ChatHeaderAttendeeItem>

                    <ChatHeaderAttendeePlus @ShowAddAttendeeModal="onShowAttendeesModal"></ChatHeaderAttendeePlus>
                </div>
            </div>

            <div class="col-1 col-md-7 d-flex p-0 px-md-3">
                <div class="d-flex align-items-center justify-content-end w-100">
                    <div class="form-row align-items-center justify-content-end flex-nowrap">
                        <div class="col-auto d-none d-md-block position-relative">
                            <label class="sr-only d-none" for="txtFindInChat">Поиск</label>
                            <input v-model="chatFilterText" id="txtFindInChat" ref="txtFindInChat" type="text"
                                   @focus="onFocusSearch"
                                   @keydown.stop="chatSearchKeyDownCheck($event)"
                                   class="chat-search-input form-control rounded-pill px-4"
                                   placeholder="Поиск в чате"/>
                            <button class="btn btn-search h-100 shadow-none"
                                    type="submit"
                                    @click="onClickStartChatFilter()">
                                <IconSearch style="width: 15px; height: 15px;" />
                            </button>
                        </div>
                        <div v-if="showDatePicker" class="col-auto">
                            <ChatDatePicker @dateSelected="dateSelected" ref="chatDatePicker"></ChatDatePicker>
                            <button class="btn bg-transparent shadow-none" @click="clearFilters">
                                <i class="far fa-times-circle"></i>
                            </button>
                        </div>

                        <div class="col-md-auto">
                            <ChatHeaderMenu
                                @ShowRemoveCurrentChatModal="onShowRemoveCurrentChatModal"
                                @ShowCreateGroupChatModal="onShowCreateGroupChatModal"
                                @ShowAddAttendeeModal="onShowAttendeesModal"
                                @ShowRemoveAttendeeModal="onShowAttendeesModal"></ChatHeaderMenu>
                        </div>
                    </div>
                </div>
            </div>

        <CreateGroupChatModal v-if="createGroupChatModalShow"
                              @HideCreateGroupChatModal="onHideCreateGroupChatModal"
                              v-bind:currentDialog="currentDialog">
        </CreateGroupChatModal>

        <RemoveCurrentDialogModal v-if="removeDialogModalShow"
            @HideRemoveDialogModal="onHideRemoveDialogModal"
            v-bind:currentDialog="currentDialog">
        </RemoveCurrentDialogModal>

        <GroupChatAttendeesModal v-if="showAttendeesModal"
            @HideGroupChatAttendeesModal="onHideAttendeesModal"
            v-bind:currentDialog="currentDialog">
        </GroupChatAttendeesModal>

    </div>
</template>

<script>
import IconSearch from '../../icons/IconSearch.vue';

import ChatDatePicker from './ChatDatePicker.vue';
import ChatHeaderMenu from './ChatHeaderMenu.vue';
import CreateGroupChatModal from './CreateGroupChatModal.vue';
import RemoveCurrentDialogModal from './RemoveCurrentDialogModal.vue';
import GroupChatAttendeesModal from './GroupChatAttendeesModal.vue';

import ChatHeaderCompanion from './ChatHeaderCompanion.vue';
import ChatHeaderAttendeeItem from './ChatHeaderAttendeeItem.vue';
import ChatHeaderAttendeePlus from './ChatHeaderAttendeePlus.vue';

import PliziDialog from '../../classes/PliziDialog.js';

export default {
name: 'ChatHeader',
components: {
    IconSearch,
    ChatHeaderCompanion,
    ChatHeaderAttendeeItem,
    ChatHeaderAttendeePlus,
    ChatDatePicker,
    ChatHeaderMenu,
    CreateGroupChatModal,
    RemoveCurrentDialogModal,
    GroupChatAttendeesModal
},
props: {
    currentDialog: {
        type: PliziDialog | null,
        required : true
    }
},

data() {
    return {
        chatFilterText : ``,
        showDatePicker: false,
        dateRange: null,
        createGroupChatModalShow: false,
        removeDialogModalShow : false,
        showAttendeesModal: false,
    }
},

computed: {
    /**
     * хак, чтобы не падало когда ещё нет данных
     * @returns {object|PliziAttendee}
     */
    companion(){
        if (this.currentDialog  &&  this.currentDialog.companion) {
            return this.currentDialog.companion;
        }

        return {
            userPic : this.$defaultAvatarPath,
            firstName : `пользователь`,
            lastActivity: (new Date()).getTime() / 1000
        }
    }
},

methods: {
    onShowRemoveCurrentChatModal(){
        this.removeDialogModalShow = true;
    },

    onHideRemoveDialogModal(){
        this.removeDialogModalShow = false;
    },

    onShowCreateGroupChatModal(){
        this.createGroupChatModalShow = true;
    },

    onHideCreateGroupChatModal(){
        this.createGroupChatModalShow = false;
    },

    onShowAttendeesModal(){
        this.showAttendeesModal = true;
    },

    onHideAttendeesModal(){
        this.showAttendeesModal = false;
    },

    chatSearchKeyDownCheck(ev){
        const sText = this.chatFilterText.trim();

        if (8===ev.keyCode  ||  13===ev.keyCode  ||  46===ev.keyCode){
            return this.startChatFilter(sText);
        }
    },

    onClickStartChatFilter(){
        const sText = this.chatFilterText.trim();
        return this.startChatFilter(sText);
    },

    startChatFilter(filterText){
        this.$emit('ChatMessagesFilter', {
            text : filterText,
            range: this.dateRange,
        });
    },

    onFocusSearch() {
        this.showDatePicker = true;
    },

    dateSelected(range) {
        this.dateRange = range;
        this.startChatFilter(null);
    },

    clearFilters() {
        this.chatFilterText = ``;
        this.showDatePicker = false;
        this.$refs.chatDatePicker.clearDateSelected();
    },

},

created(){
    this.$root.$on('ChatDialogsNew', this.onShowCreateGroupChatModal);
},

beforeDestroy() {
    this.$root.$off('ChatDialogsNew', ()=>{});
}



}
</script>


