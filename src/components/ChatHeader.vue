<template>
    <div id="chatHeader" class="bg-white align-self-start w-100">
        <div class="row">
            <div class="col-6">
                <div class="media">
                    <img class="chat-companion-user-pic my-3 mx-3" width="32" height="32" v-bind:src="companion.userPic" v-bind:alt="companion.name" />
                    <div class="media-body">
                        <h6 class="w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body" style="line-height: 20px;">
                            <b>{{companion.name}}</b>
                        </h6>
                        <div class="text-black-50 p-0 mb-0 mt-1 w-100 d-block">
                            {{companion.lastActivityDT}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-6">
                <form class="">
                    <div class="form-row align-items-center mt-3 justify-content-end pr-3">
                        <div class="col-auto">
                            <label class="sr-only d-none" for="txtFindInChat">Поиск</label>
                            <input type="search" class="chat-search-input form-control rounded-pill bg-light px-4" id="txtFindInChat" placeholder="Поиск" />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-link text-body px-3 py-0 my-auto">
                                <img class="" src="/src/images/chat-options-icon.png" alt="" />
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
    companion: Object
},
data () {
    return {
    }
},

methods: {
},
mounted() {

}

}
</script>

<style scoped>
.form-control.chat-search-input {
    background-image: url("/src/images/chat-search-loupe.png");
    background-position: 90% center;
    background-repeat: no-repeat;
}
</style>
