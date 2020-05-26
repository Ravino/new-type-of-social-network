<template>
    <div id="toolbarLeftGrey" class="pt-0 pt-md-2 mb-1 mb-md-5 d-flex d-md-block">

        <router-link :to="{name: 'NewsPage'}"
                     :class="{ 'active': 'NewsPage'===this.$root.$router.currentRoute.name }"
                     :title="newsPage"
                     class="w-100 d-block text-center mx-auto mb-4">
            <IconFireLeftToolBar/>
        </router-link>

        <router-link :to="{name: 'CommunitiesListPage'}"
                     :class="communitiesListPage"
                     :title="communities"
                     tag="a" class="w-100 d-block text-center mx-auto mb-4">
            <IconAtom/>
        </router-link>

        <!--<router-link :to="{name: 'VideosPage'}"
                     tag="a"
                     class="w-100 d-block text-center mx-auto mb-4">
            <IconPlay/>
        </router-link>-->

        <router-link :to="{name: 'PhotoalbumsPage'}"
                     :class="{ 'active': 'PhotoalbumsPage' === this.$root.$router.currentRoute.name }"
                     :title="photoalbums"
                     tag="a"
                     class="w-100 d-block text-center mx-auto mb-4">
            <IconAddCamera clazz="icon icon-atom"/>
        </router-link>

        <router-link :to="{name: 'VideosPage'}"
                     :class="{ 'active': 'VideosPage' === this.$root.$router.currentRoute.name }"
                     :title="videos"
                     tag="a"
                     class="w-100 d-block text-center mx-auto mb-4">
            <IconVideo/>
        </router-link>

    </div>
</template>

<script>
    import IconFireLeftToolBar from '../icons/IconFireLeftToolBar.vue';
    import IconAtom from '../icons/IconAtom.vue';
    import IconPlay from '../icons/IconPlay.vue';
    import IconVideo from '../icons/IconVideo.vue';
    import IconStar from '../icons/IconStar.vue';
    import IconAddCamera from "../icons/IconAddCamera.vue";

    export default {
        name: 'AccountToolbarLeftGrey',
        components: {IconAddCamera, IconStar, IconVideo, IconPlay, IconAtom, IconFireLeftToolBar},
        data() {
            return {
                newsPage: 'Новости',
                communities: 'Сообщества',
                photoalbums: 'Фотоальбомы',
                videos: 'Видео',
                favorites: 'Избранное'
            }
        },
        computed: {
            communitiesListPage() {
                if (this.$root.$router.currentRoute.name === 'CommunitiesListPage' ||
                  this.$root.$router.currentRoute.name === 'CommunitiesManagePage' ||
                  this.$root.$router.currentRoute.name === 'CommunitiesPopularPage' ||
                  this.$root.$router.currentRoute.name === 'CommunityPage') {
                    return ['router-link-exact-active', 'router-link-active', 'active'];
                }

                return null;
            },
        },
        methods: {},
    }
</script>
