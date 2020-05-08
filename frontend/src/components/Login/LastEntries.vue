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

            {src: '/images/last-entries/ava-21.png', fullName: 'Иннокентий Савельев', isUser: true, email: `brandyn96@paucek.net`},
            {src: '/images/last-entries/ava-2.png', fullName: 'Alex Targa', isUser: true, email: `targa@ua.fm`, password: `5eb415816486f`},
            {src: '/images/last-entries/ava-7.png', fullName: 'Alex Dnipro', isUser: true, email: `targettius@gmail.com`, password: `5eb595c40a762`},

            {src: '/images/last-entries/ava-22.png', fullName: 'Филипп Голубев', isUser: true, email: `homenick.amber@carroll.com`},
            {src: '/images/last-entries/ava-23.png', fullName: 'Елизавета Зимина', isUser: true, email: `rruecker@mann.com`},
            {src: '/images/last-entries/ava-24.png', fullName: 'Яна Шарапова', isUser: true, email: `ohintz@yahoo.com `},

            {src: '/images/last-entries/ava-25.png', fullName: 'Михаил Шарапов', isUser: true, email: `vharris@robel.org`},
            {src: '/images/last-entries/ava-26.png', fullName: 'Родион Корнилов', isUser: true, email: `kellen.williamson@gmail.com`},
            {src: '/images/last-entries/ava-27.png', fullName: 'Олеся Александрова', isUser: true, email: `vstreich@powlowski.biz`},
        ];
    }
}
}
</script>

