<template>
    <div id="communityManagedActions" class="bg-white-br20 mb-4 py-3 px-4">

        <router-link :to="{name: 'CommunitySettingsPage', params: {id: community.id}}"
                class="btn btn-link btn-block w-100 mb-2 text-black-50 text-left">
            <i class="fas fa-cog mr-2"></i>Управление
        </router-link>

        <button type="button"
                @click="onStatisticsClick"
                class="btn btn-link btn-block w-100 mb-2 text-black-50 text-left">
            <i class="far fa-chart-bar mr-2"></i>Статистика</button>

        <button type="button"
                @click="onMessageClick"
                class="btn btn-link btn-block w-100 text-black-50 text-left">
            <i class="fas fa-mail-bulk mr-2"></i>Сообщение</button>
    </div>
</template>

<script>
import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name : 'CommunityManagedActionBlock',
props: {
    community: PliziCommunity
},
methods: {
    onStatisticsClick(){
        this.$root.$alert(`Статистика`, 'bg-info', 3);
    },

    onMessageClick(){
        this.$root.$alert(`Сообщение`, 'bg-info', 3);
    },
}
}
</script>
