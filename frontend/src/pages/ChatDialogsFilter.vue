<template>
    <div class="find-in-dialogs-form d-flex align-items-center justify-content-end w-100 border-bottom pr-3 py-3">
        <div class="form-row w-100 align-items-center justify-content-end position-relative pl-4">
            <div class="find-in-chat-list w-100 position-relative pl-2">
                <label class="sr-only d-none" for="txtFindInChatList">Поиск</label>
                <input v-model="filterText" type="text"
                       id="txtFindInChatList" ref="txtFindInChatList"
                       class="chat-search-input form-control rounded-pill bg-light px-4"
                       @keydown.stop="dialogSearchKeyDownCheck"
                       placeholder="Поиск в собеседниках" />

                <button class="find-in-chat-list-btn btn btn-search h-100 shadow-none"
                        @click="startDialogFilter" type="submit">
                    <IconSearch />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import IconSearch from '../icons/IconSearch.vue';

export default {
name : 'ChatDialogsFilter',
components : { IconSearch },
props : {
},

data(){
    return {
        filterText: ``
    }
},

methods: {
    dialogSearchKeyDownCheck(ev){
        if (8===ev.keyCode  ||  13===ev.keyCode  ||  46===ev.keyCode){
            return this.startDialogFilter();
        }
    },

    startDialogFilter(){
        const sText = this.filterText.trim();

        this.$emit('ChatDialogsFilter', {
            text : sText,
        });
    },
}

}
</script>
