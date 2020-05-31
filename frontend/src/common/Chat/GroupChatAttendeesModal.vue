<template>
    <div class="modal" id="groupChatAttendeesModal" tabindex="-1"
         role="dialog" aria-labelledby="groupChatAttendeesModal" @click.stop="hideGroupChatAttendeesModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div id="groupChatAttendeesModalBody" class="modal-body d-flex flex-column p-4">
                    <h5 class="resend-message-title text-left mb-4">Участники группового чата</h5>

                    <form id="chatPickAttendeesForm" novalidate="novalidate" class="mb-4">

                        <div class="form-group">
                            <div class="d-flex flex-column align-items-start" ref="attendeesList" :key="'attendeesList-'+keyUpdater">
                                <ChatAttendeeItem v-for="attItem in getAttendeesList()"
                                                  @RemoveAttendeeFromChat="onRemoveAttendeeFromChat"
                                                  v-bind:companion="attItem"
                                                  v-bind:isCanDelete="isCanDelete"
                                                  v-bind:key="'attendeeItem-'+attItem.id+'-'+keyUpdater">
                                </ChatAttendeeItem>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="">Добавить нового участника</label>
                            <multiselect v-model="model.selectedRecipients"
                                         :options="getFriendsCombo"
                                         label="fullName"
                                         track-by="fullName"
                                         :searchable="true"
                                         :close-on-select="true"
                                         :show-labels="false"
                                         :multiple="false"
                                         @select="onPickNewAttendee"
                                         placeholder="Выберите нового участника чата">

                                <template slot="option" slot-scope="props">
                                    <div class="plz-receivers-item d-flex align-items-center py-2 px-3">

                                        <span class="plz-receiver-userpic text-body">
                                            <img class="plz-short-userpic rounded-circle" :src="props.option.userPic" :alt="props.option.firstName"/>

                                            <span v-if="props.option.isOnline" class="plz-short-isonline" title="в сети"></span>
                                            <span v-else class="plz-short-isoffline" title="не в сети"></span>
                                        </span>

                                        <div class="plz-receiver-title flex align-items-center mr-auto ">
                                            <span class="plz-receiver-name">
                                                {{props.option.fullName}}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </multiselect>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ChatAttendeeItem from './ChatAttendeeItem.vue';

import PliziDialog from '../../classes/PliziDialog.js';
import PliziRecipientsCollection from '../../classes/Collection/PliziRecipientsCollection.js';

export default {
name: 'GroupChatAttendeesModal',
components: { ChatAttendeeItem },
props: {
    currentDialog: PliziDialog
},

data() {
    return {
        recipients : (new PliziRecipientsCollection()),
        model : {
            chatName : '',
            selectedRecipients: null
        },
        hasNoAttendees: false,
        keyUpdater: 0
    }
},

computed: {
    isCanDelete(){
        return this.getAttendeesList().length >= 2;
    },

    getFriendsCombo(){
        const atts = this.currentDialog.attendeesIds;

        /** @TGA сначала диалоги - это важно **/
        this.$root.$auth.dm.asArray().map( (dItem) => {
            if (!atts.includes(dItem.companion.id)) {
                this.recipients.add(dItem.companion, dItem.id);
            }
        });

        this.$root.$auth.frm.asArray().map( (frItem) => {
            if (!atts.includes(frItem.id)){
                this.recipients.add( frItem, null );
            }
        });

        return this.recipients.asArray();
    }
},

methods: {
    getAttendeesList(){
        return this.currentDialog.attendees.slice();
    },

    hideGroupChatAttendeesModal() {
        this.$emit('HideGroupChatAttendeesModal', {});
    },

    onPickNewAttendee(evData){
        this.addAttendeeToChat(evData);
    },

    onRemoveAttendeeFromChat(evData){
        this.removeAttendeeFromChat( evData.userId );
    },


    async addAttendeeToChat( user ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.addAttendee( this.currentDialog.id, user.id );
        }
        catch (e) {
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            this.$emit( 'AddAttendeeToDialog', { chatId : this.currentDialog.id, userId : user.id } );
            this.$root.$auth.dm.addAttendeeToDialog(this.currentDialog.id, user);
            this.$root.$dialogsKeyUpdater++;
            this.keyUpdater++;
        }
    },


    async removeAttendeeFromChat( userId ){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$chat.removeAttendee( this.currentDialog.id, userId );
        }
        catch (e) {
            window.console.warn( e.detailMessage );
            throw e;
        }

        if ( apiResponse ) {
            this.$emit( 'RemoveAttendeeFromDialog', { chatId : this.currentDialog.id, userId : userId } );
            this.$root.$auth.dm.removeAttendeeFromDialog(this.currentDialog.id, userId);
            this.$root.$dialogsKeyUpdater++;
            this.keyUpdater++;
        }
    }

},

}
</script>
