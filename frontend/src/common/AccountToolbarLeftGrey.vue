<template>
    <div id="toolbarLeftGrey" class="pt-2 mb-5">

        <router-link :to="{name: 'NewsPage'}"
                     :class="{ 'active': 'NewsPage'===this.$root.$router.currentRoute.name }"
                     class="w-100 d-block text-center mx-auto mb-4">
            <IconFireLeftToolBar />
        </router-link>

        <router-link :to="{name: 'CommunitiesListPage'}"
                     :class="{ 'active': 'CommunitiesListPage'===this.$root.$router.currentRoute.name }"
                     tag="a" class="w-100 d-block text-center mx-auto mb-4">
            <IconAtom />
        </router-link>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <IconPlay />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <IconPaper />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <IconVideo />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <IconStar />
        </a>

    </div>
</template>

<script>
import IconFireLeftToolBar from '../icons/IconFireLeftToolBar.vue';
import IconAtom from '../icons/IconAtom.vue';
import IconPlay from '../icons/IconPlay.vue';
import IconPaper from '../icons/IconPaper.vue';
import IconVideo from '../icons/IconVideo.vue';
import IconStar from '../icons/IconStar.vue';

export default {
name: 'AccountToolbarLeftGrey',
    components : { IconStar, IconVideo, IconPaper, IconPlay, IconAtom, IconFireLeftToolBar },
    data () {
    return {
    }
},

methods: {
}

}
</script>

<style>
    #toolbarLeftGrey {
        position: relative;
    }

    #toolbarLeftGrey::after {
        content: '';
        position: absolute;
        bottom: -23px;
        left: 50%;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        background-color: #cbd0e2;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
    }
</style>
