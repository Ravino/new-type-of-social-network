<template>
    <div class="photoalbum-item d-flex">
        <div>
            <router-link :to="{
                path: `/photoalbum-`+album.id
            }" tag="a" class="" :album="album">
                <img class="" src="../../images/noavatar-256.png" :alt="album.title" :title="album.title"/>
                <div class="photoalbum-item-title">
                    <h6>
                        {{ album.title }}
                    </h6>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'PhotoalbumItem',
        props: {
            album: Object,
        },
        computed: {
        },
        methods: {

        },
    }
</script>

