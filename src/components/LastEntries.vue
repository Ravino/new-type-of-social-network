<template>
    <div id="latestEntries" class="card bg-light mb-3 px-3 py-3">
        <h6 class="card-title w-100 text-center py-2"><b>Вы недавно входили в аккаунт с этого компьютера</b></h6>

        <div class="--card-body d-flex justify-content-start">
            <LastEntryItem v-for="(leItem, leKey) in lastEntriesList" v-bind:entry-item="leItem" v-bind:key="leKey"></LastEntryItem>
        </div>
    </div>
</template>

<script>
import LastEntryItem from '../components/LastEntryItem.vue';

export default {
name: 'LastEntries',
components: {LastEntryItem},
data () {
    return {
        lastEntriesList: [
            { src: '/src/images/vladislav.png', fullName: 'Владислав Браташ', isUser: true },
            { src: '/src/images/alex.png', fullName: 'Alexey Bashmakow', isUser: true },
            { src: '/src/images/add-account.png', fullName: 'Добавить аккаунт', isUser: false },
        ],
    }
},

methods: {
}

}
</script>

