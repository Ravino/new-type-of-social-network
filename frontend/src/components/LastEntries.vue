<template>
    <div id="latestEntries" class="plz-latest-entries bg-white-br20">
        <h6 class="">Вы недавно входили в аккаунт с этого компьютера</h6>

        <div class="plz-last-entries-list d-flex justify-content-start">
            <LastEntryItem v-for="(leItem, leKey) in lastEntriesList"
                           v-bind:entry-item="leItem"
                           v-bind:key="leKey"
                           @click.native.prevent="$emit('logInWithEntryItem', leItem)">
            </LastEntryItem>
        </div>
    </div>
</template>

<script>
import LastEntryItem from '../components/LastEntryItem.vue';

export default {
    name: 'LastEntries',
    components: {LastEntryItem},
    data() {
        return {
            //TODO: @TGA удалить потом эти mock-данные
            lastEntriesList: [
                {src: '/images/last-entries/ava-2.png', fullName: 'Анжелика Герасимовa', isUser: true, email: `test@gmail.com` },
                {src: '/images/last-entries/ava-1.png', fullName: 'Варвара Захаровa', isUser: true, email: `user@mail.com`},
                {src: '/images/icons/add-account.png', fullName: 'Добавить аккаунт', isUser: false},
            ],
        }
    },
}
</script>

