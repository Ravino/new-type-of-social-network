<template>
    <div id="communityUserOptions">
        <div class="nav-item">
            <span @click="onAddPostClick"
                    class="community-options-link px-3 py-1 cursor-pointer">
                Написать сообщение
            </span>
        </div>
        <div class="nav-item">
            <span @click="onNotificationEnableClick"
                    class="community-options-link px-3 py-1 cursor-pointer">
                Включить уведомления
            </span>
        </div>
        <div class="nav-item">
            <span @click="onFriendInformationClick"
                  class="community-options-link px-3 py-1 cursor-pointer">
                Рассказать друзьям
            </span>
        </div>
    </div>
</template>
<script>
import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name: 'CommunityUserOptions',
props: {
    community: PliziCommunity
},
methods: {
    onAddPostClick(){
        this.$root.$alert(`Тут наверное будет модалка для добавления поста`, 'bg-info', 3);
    },

    onMentionClick(){
        this.$root.$alert(`Упоминание`, 'bg-info', 3);
    },

    onNotificationEnableClick(){
        this.$root.$alert(`Включение нотификаций`, 'bg-info', 3);
    },

    onFriendInformationClick(){
        this.$root.$alert(`Рассказываю друзьям`, 'bg-info', 3);
    },
}

}
</script>
