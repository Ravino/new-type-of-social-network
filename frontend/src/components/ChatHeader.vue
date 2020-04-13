<template>
    <div id="chatHeader" class="bg-white w-100 border-bottom">
        <div class="row mx-0 py-2">
            <div class="col-6">
                <div class="d-flex align-items-center h-100 ">
                    <div class="media-pic border rounded-circle  mr-3">
                        <img :src="companionUserPic" v-bind:alt="companionName" />
                    </div>

                    <div class="media-body">
                        <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                            {{companionName}}
                        </h6>
                        <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">
                            {{ companionLastActivity  | lastMessageTime }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <form class="d-flex align-items-center justify-content-end">
                    <div class="form-row align-items-center mt-3 justify-content-end pr-3">
                        <div class="col-auto">
                            <label class="sr-only d-none" for="txtFindInChat">Поиск</label>
                            <input type="text" class="chat-search-input form-control rounded-pill bg-light px-4" id="txtFindInChat" placeholder="Поиск" />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-link text-body px-3 py-0 my-auto">
                                <img class="" src="../images/chat-options-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'ChatHeader',
props: {
    currentDialog: Object
},

data() {
    return {
    }
},

computed: {
    companionUserPic: function() {
        let res = this.$defaultAvatarPath;

        if (this.currentDialog  &&  this.currentDialog.attendees  &&  this.currentDialog.attendees[0]  &&  this.currentDialog.attendees[0].userPic) {
            res = this.currentDialog.attendees[0].userPic;
        }

        // TODO: @TGA выпилить когда перестанут сеять в БД lorempixel.com
        const url = document.createElement('a');
        url.href = res;

        if (`lorempixel.com` === url.hostname.toLowerCase()) {
            res = this.$defaultAvatarPath;
        }

        return res;
    },

    companionName: function(){
        if (this.currentDialog  &&  this.currentDialog.attendees  &&  this.currentDialog.attendees[0]  &&  this.currentDialog.attendees[0].firstName) {
            return this.currentDialog.attendees[0].firstName;
        }

        return `Кто-то неизвестный`;
    },

    companionLastActivity: function(){
        if (this.currentDialog  &&  this.currentDialog.attendees  &&  this.currentDialog.attendees[0]  &&  this.currentDialog.attendees[0].lastActivityDT) {
            return this.currentDialog.attendees[0].lastActivityDT;
        }

        return `1970-01-01 00:00:00`;
    }
},

methods: {
},

}
</script>


