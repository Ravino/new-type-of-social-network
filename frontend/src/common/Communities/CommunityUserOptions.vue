<template>
    <div id="communityUserOptions">
        <div class="nav-item">
            <span @click="onAddPostClick"
                    class="community-options-link px-3 py-1 cursor-pointer">
                Написать сообщение
            </span>
        </div>
        <div class="nav-item">
            <span v-if="community.subscribed" @click="onNotificationDisableClick"
                    class="community-options-link px-3 py-1 cursor-pointer">
                Отключить уведомления
            </span>
            <span v-else @click="onNotificationEnableClick"
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
        <div class="nav-item border-top d-block d-lg-none">
            <span @click="onVideoInformationClick"
                  class="community-options-link px-3 py-1 cursor-pointer">
                Видео сообщества
            </span>
        </div>
        <div class="nav-item  d-block d-lg-none">
            <span @click="onMembersInformationClick"
                  class="community-options-link px-3 py-1 cursor-pointer">
                Участники сообщества
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

    async onNotificationEnableClick(){
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$communities.subscribeNotify(this.community.id);
        } catch (e) {
            window.console.warn(e.detailMessage);
            this.$root.$alert(`Не получилось включить нотификации`, 'bg-warning', 3);
            throw e;
        }

        if (apiResponse) {
            this.community.subscribed = true;
            this.$root.$alert(`Включение нотификаций`, 'bg-success', 3);
        } else {
            this.$root.$alert(`Не получилось включить нотификации`, 'bg-warning', 3);
        }

        return true;
    },
    async onNotificationDisableClick() {

        let apiResponse = null;
        try {
            apiResponse = await this.$root.$api.$communities.unsubscribeNotify(this.community.id);
        } catch (e) {
            window.console.warn(e.detailMessage);
            this.$root.$alert(`Не получилось отключить нотификации`, 'bg-warning', 3);
            throw e;
        }
        if (apiResponse) {
            this.community.subscribed = false;
            this.$root.$alert(`Отключение нотификаций`, 'bg-success', 3);
        } else {
            this.$root.$alert(`Не получилось отключить нотификации`, 'bg-warning', 3);
        }

        return true;
    },

    onFriendInformationClick(){
        this.$root.$alert(`Рассказываю друзьям`, 'bg-info', 3);
    },
    onVideoInformationClick(){
        this.$root.$alert(`Показываю видео этого сообщества`, 'bg-info', 3);
    },
    onMembersInformationClick(){
        this.$root.$alert(`Показываю участников этого сообщества`, 'bg-info', 3);
    },
}

}
</script>
