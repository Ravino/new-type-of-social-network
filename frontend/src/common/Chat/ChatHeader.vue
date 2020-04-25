<template>
    <div id="chatHeader" class="bg-white w-100 border-bottom">
        <div class="row mx-0 py-3">
            <div class="col-6">
                <div class="d-flex align-items-center h-100 ">
                    <router-link :to="`/user-`+companion.id" tag="div" class="media-pic border rounded-circle mr-3 cursor-pointer">
                        <img :src="companion.userPic" v-bind:alt="companion.firstName" />
                    </router-link>

                    <div class="media-body">
                        <router-link :to="`/user-`+companion.id" tag="h6"
                                 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body cursor-pointer">
                            {{companion.fullName}}
                        </router-link>
                        <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">
                            {{ companion.lastActivity  | lastMessageTime }}
                        </p>
                    </div>
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
                                   class="chat-search-input form-control rounded-pill bg-light px-4"
                                   placeholder="Поиск в чате"/>
                            <button class="btn btn-search h-100 shadow-none"
                                    type="submit"
                                    @click="onClickStartChatFilter()">
                                <IconSearch style="width: 15px; height: 15px;"/>
                            </button>
                        </div>
                        <div v-if="showDatePicker" class="col-auto">
                            <ChatDatePicker @dateSelected="dateSelected"
                                            ref="chatDatePicker"/>
                            <button class="btn bg-transparent shadow-none"
                                    @click="clearFilters">
                                <i class="far fa-times-circle"></i>
                            </button>
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-link text-body px-3 py-0 my-auto">
                                <img class="" src="../../images/chat-options-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PliziDialog from '../../classes/PliziDialog.js';
import IconSearch from '../../icons/IconSearch.vue';
import ChatDatePicker from "./ChatDatePicker";

export default {
name: 'ChatHeader',
components: {
    IconSearch,
    ChatDatePicker,
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
    }
},

methods: {
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
        this.$emit('chatFilter', {
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
}

}
</script>


