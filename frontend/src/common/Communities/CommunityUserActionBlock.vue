<template>
    <div id="communityUserActions" class="bg-white-br20 mb-4 py-3 px-4">
        <button @click="onAddPostClick" type="button" class="btn btn-primary btn-block mx-auto mb-3 px-3 py-2 text-uppercase text-center rounded-pill">
            Написать сообщение
        </button>

        <button type="button"
                @click="onMentionClick"
                class="btn btn-link btn-block w-100 mb-2 text-black-50 text-left">
            <i class="fas fa-at mr-2"></i>Упоминания</button>

        <button type="button"
                @click="onNotificationEnableClick"
                class="btn btn-link btn-block w-100 mb-2 text-black-50 text-left">
            <i class="far fa-bell mr-2"></i>Включить уведомления</button>

        <button type="button"
                @click="onFriendInformationClick"
                class="btn btn-link btn-block w-100 text-black-50 text-left">
            <i class="fas fa-share mr-2"></i>Рассказать друзьям</button>
    </div>
</template>

<script>
import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name : 'CommunityUserActionBlock',
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
