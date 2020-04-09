<template>
    <div id="latestEntries" class="plz-latest-entries bg-white-br20">
        <h6 class="">Вы недавно входили в аккаунт с этого компьютера</h6>

        <div class="plz-last-entries-list d-flex justify-content-start">
            <LastEntryItem v-for="(leItem, leKey) in lastEntriesList"
                           v-bind:entry-item="leItem"
                           v-bind:key="leKey"
                           @click.native.prevent="$emit('logInWithEntryItem', leItem)"></LastEntryItem>
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
                lastEntriesList: [
                    {src: '/images/last-entries/vladislav.png', fullName: 'Ксения Евгеньевна', isUser: true},
                    {src: '/images/icons/add-account.png', fullName: 'Добавить аккаунт', isUser: false},
                ],
            }
        },
    }
</script>

<style>
    .plz-latest-entries {
        height: 270px;
        min-height: 270px;
        max-height: 270px;
    }

    .plz-latest-entries > h6 {
        text-align: left;
        font-size: 16pt;
        font-weight: bold;
        color: #363636;
        letter-spacing: -1px;
        padding: 24px 0px 0px 40px;
    }

    .plz-last-entries-list {
        padding-left: 40px;
        margin-top: 15px;
    }

    .plz-last-entries-list .plz-last-entry-item {
        border: 1px solid #C9CBD9;
        width: 148px;
        min-width: 148px;
        max-width: 148px;
        height: 170px;
        min-height: 170px;
        max-height: 170px;
        margin-right: 18px;
        border-radius: 18px;
        text-align: center;
        cursor: pointer;
    }

    .plz-last-entry-item .plz-last-entry-user-pic {
        display: inline-block;
        margin: 18px auto 10px auto;
        width: 85px;
        min-width: 85px;
        max-width: 85px;
        height: 85px;
        min-height: 85px;
        max-height: 85px;
    }
</style>
