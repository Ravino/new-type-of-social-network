<template>
    <div id="chatHeader" class="bg-white w-100 border-bottom">
        <div class="row mx-0 py-2">
            <div class="col-6">
                <div class="d-flex align-items-center h-100 ">
                    <div class="media-pic border rounded-circle  mr-3">
                        <img :src="companion.userPic" v-bind:alt="companion.firstName" />
                    </div>

                    <div class="media-body">
                        <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                            {{companion.firstName}}
                        </h6>
                        <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block">
                            {{ companion.lastActivity  | lastMessageTime }}
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
import PliziDialog from '../classes/PliziDialog.js';

export default {
name: 'ChatHeader',
props: {
    currentDialog: {
        type: PliziDialog | null,
        required : true
    }
},

data() {
    return {
    }
},

computed: {
    companion(){
        if (this.currentDialog  &&  this.currentDialog.companion) {
            //window.console.log( JSON.parse( JSON.stringify(this.currentDialog.companion) ), `companion this.currentDialog`);
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


