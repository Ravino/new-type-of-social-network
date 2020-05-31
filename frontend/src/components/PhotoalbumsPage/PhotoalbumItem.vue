<template>
    <div class="photoalbum-item d-flex">
        <div>
            <router-link :to="{
                path: `/photoalbum-`+album.id
            }" tag="a" class="" :album="album">
                <img class=""
                     :src="image"
                     :alt="album.title"
                     :title="album.title"/>
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
            image() {
                return this.album.lastImage ? this.album.lastImage.image.original.path : '../../images/noavatar-256.png';
            },
        },
        methods: {

        },
    }
</script>

