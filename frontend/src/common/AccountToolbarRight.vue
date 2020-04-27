<template>
    <div id="rightToolbar" class="bg-white-br20 py-3 overflow-hidden">
<!--        <div class="d-block w-50 mb-1 mt-2 mx-auto text-center m">-->
<!--            <i class="fas fa-chevron-left"></i>-->
<!--        </div>-->

<!--        <hr class="w-100" />-->

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/alexandra.png" alt="Alexandra" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/alina.png" alt="Alina" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/anna.png" alt="Anna" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/anna2.png" alt="Anna" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
    </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/maria.png" alt="Maria" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto" src="/images/chat/mariya2.png" alt="Masha" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

        <a class="rightToolbar-user w-100 d-block text-center position-relative py-1 " href="#">
            <div class="position-relative d-inline-block">
                <img class="d-block mx-auto"  src="/images/chat/malunder.png" alt="Malunder" />
                <div v-if="messageWriting" class="writing"><span></span><span></span><span></span></div>
                <div v-else class="">
                    <span v-if="friend.isOnline" class="friend-status-isonline" title="в сети"></span>
                    <span v-else class="friend-status-isoffline" ></span>
                </div>
            </div>
        </a>

    </div>
</template>

<script>
export default {
/**
 * @TGA: компонент устарел, после того как возьмём отсюда вёрстку для <FavoriteFriends :isNarrow="true"></FavoriteFriends>
 * это компонент удалить из проекта и репозитария
 */
name: 'AccountToolbarRight',
data () {
    return {
        messageWriting: true, // TODO нужно доработать прикрутив получение данных
        friend: {
            isOnline: true // TODO нужно доработать прикрутив получение данных
        }
    }
},

methods: {
}

}
</script>
