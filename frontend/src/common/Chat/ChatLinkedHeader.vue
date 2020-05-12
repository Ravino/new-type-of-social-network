<template>
    <div id="chatHeader" class="bg-white w-100 border-bottom">
        <div class="row mx-0 py-3">
            <div class="col-6">
                <ChatHeaderCompanion v-if="currentDialog.isPrivate" v-bind:companion="companion"></ChatHeaderCompanion>

                <div v-if="currentDialog.isGroup" class="d-flex align-items-center h-100">
                    <ChatHeaderAttendeeItem v-for="attItem in currentDialog.attendees"
                        v-bind:attendee="attItem"
                        v-bind:key="attItem.id">
                    </ChatHeaderAttendeeItem>
                </div>
            </div>

            <div class="col-6">
                <div class="d-flex align-items-center justify-content-end">
                    <div class="form-row align-items-center justify-content-end pr-3">
                        <div class="col-auto position-relative">
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

                        <div class="col-auto">
                            <ChatHeaderMenu
                                @showRemoveCurrentChatModal="onShowRemoveCurrentChatModal"
                                @showAddAttendeeToDialogModal="onShowAddAttendeeToDialogModal"></ChatHeaderMenu>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ChatPickAttendeesDialogModal v-if="pickAttendeesDialogModalShow"
            @hidePickAttendeesDialogModal="onHidePickAttendeesDialogModal"
            v-bind:currentDialog="currentDialog">
        </ChatPickAttendeesDialogModal>

        <RemoveCurrentDialogModal v-if="removeDialogModalShow"
            @hideRemoveDialogModal="onHideRemoveDialogModal"
            v-bind:currentDialog="currentDialog">
        </RemoveCurrentDialogModal>

    </div>
</template>

<script>
import IconSearch from '../../icons/IconSearch.vue';

import ChatDatePicker from './ChatDatePicker.vue';
import ChatHeaderMenu from './ChatHeaderMenu.vue';
import ChatPickAttendeesDialogModal from './ChatPickAttendeesDialogModal.vue';
import RemoveCurrentDialogModal from './RemoveCurrentDialogModal.vue';

import ChatHeaderCompanion from './ChatHeaderCompanion.vue';
import ChatHeaderAttendeeItem from './ChatHeaderAttendeeItem.vue';

import PliziDialog from '../../classes/PliziDialog.js';

export default {
name: 'ChatLinkedHeader',
components: {
    IconSearch,
    ChatHeaderCompanion,
    ChatHeaderAttendeeItem,
    ChatDatePicker,
    ChatHeaderMenu,
    ChatPickAttendeesDialogModal,
    RemoveCurrentDialogModal
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
        pickAttendeesDialogModalShow: false,
        removeDialogModalShow : false
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

    onShowAddAttendeeToDialogModal(){
        this.pickAttendeesDialogModalShow = true;
    },

    onHidePickAttendeesDialogModal(){
        this.pickAttendeesDialogModalShow = false;
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


}
</script>


