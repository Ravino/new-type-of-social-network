<template>
    <div id="latestEntries" class="plz-latest-entries bg-white-br20" :style="calcStyle()">
        <h6 class="text-center text-sm-left">Вы недавно входили в аккаунт с этого компьютера</h6>

        <div class="plz-latest-entries-list d-flex justify-content-between justify-content-sm-start flex-wrap">
            <LastEntryItem v-for="(leItem, leKey) in lastEntriesList"
                           v-bind:entry-item="leItem"
                           v-bind:key="leKey"
                           @click.native.prevent="$emit('logInWithEntryItem', leItem)">
            </LastEntryItem>
        </div>
    </div>
</template>

<script>
import LastEntryItem from './LastEntryItem.vue';

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
            {src: '/images/last-entries/ava-4.png', fullName: 'Alex Targa', isUser: true, email: `targa@arma3.in.ua`, password: `5eb004a84cf26`},
            {src: '/images/last-entries/ava-7.png', fullName: 'Alex Dnipro', isUser: true, email: `targa@ua.fm`, password: `5eafbd21343ba`},

            {src: '/images/last-entries/ava-8.png', fullName: 'Марат Большаков', isUser: true, email: `shawn48@hotmail.com`},
            {src: '/images/last-entries/ava-9.png', fullName: 'Лада Никифорова', isUser: true, email: `karelle00@zulauf.biz`},
            {src: '/images/last-entries/ava-10.png', fullName: 'Капитолина Быковa', isUser: true, email: `celine.kuhn@runte.info`},

            {src: '/images/last-entries/ava-11.png', fullName: 'Дан Савин', isUser: true, email: `beer.muriel@gmail.com`},
            {src: '/images/last-entries/ava-12.png', fullName: 'Мирослав Зыков', isUser: true, email: `mhoppe@okon.com`},
            {src: '/images/last-entries/ava-14.png', fullName: 'Эльвира Гущинa', isUser: true, email: `kaitlyn.koch@zboncak.com`},

        ];
    }
}
}
</script>

