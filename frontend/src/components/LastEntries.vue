<template>
    <div id="latestEntries" class="plz-latest-entries bg-white-br20" :style="calcStyle()">
        <h6 class="">Вы недавно входили в аккаунт с этого компьютера</h6>

        <div class="plz-last-entries-list d-flex justify-content-start flex-wrap">
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
        lastEntriesList: this.getLastEntries(),
    }
},

methods: {
    // TODO: удалить позже
    checkIsTarga(){
        return (typeof isTarga !== 'undefined'  &&  !!isTarga);
    },

    // TODO: удалить позже
    calcStyle(){
        if (this.checkIsTarga())
            return { 'height' : 'auto', 'padding-bottom': '2rem' };

        return {};
    },

    getLastEntries(){
        if ( !this.checkIsTarga() ) {
            return [
                {src: '/images/last-entries/ava-2.png', fullName: 'Мариана Кабанова', isUser: true, email: `test@gmail.com` },
                {src: '/images/last-entries/ava-1.png', fullName: 'Виктория Мамонтовa', isUser: true, email: `user@mail.com`},
                {src: '/images/icons/add-account.png', fullName: 'Добавить аккаунт', isUser: false},
            ];
        }

        return [
            {src: '/images/last-entries/ava-2.png', fullName: 'Мариана Кабанова', isUser: true, email: `test@gmail.com` },
            {src: '/images/last-entries/ava-1.png', fullName: 'Виктория Мамонтовa', isUser: true, email: `user@mail.com`},
            {src: '/images/last-entries/ava-3.png', fullName: 'Полина Дорожина', isUser: true, email: `admin@mail.com`},
            {src: '/images/last-entries/ava-6a.png', fullName: 'Никодим Соколов', isUser: true, email: `denesik.adeline@gmail.com`},
            {src: '/images/last-entries/ava-4.png', fullName: 'Alexey Targa', isUser: true, email: `targa@arma3.in.ua`, password: `5e944f8dc5a03`},
            {src: '/images/last-entries/ava-7.png', fullName: 'Alex Dnipro', isUser: true, email: `targettius@ukr.net`, password: `5e9721681107f`},

        ];
    }
}
}
</script>

