<template>
    <div id="profilePhotos" class="row plz-profile-photos mt-5">
        <div class="col-12 bg-white-br20 p-3">
            <div class="">
                <h6>Фотографии <span>{{user.photosNumber}}</span></h6>
            </div>

            <div class="">
                <a href="#onmap">Показать на карте</a>
            </div>
            <div class="w-100 d-flex flex-row plz-profile-photos-list">
                <div v-for="(photo, photoIndex) in photos" v-bind:key="postIndex" class="plz-profile-photo-item w-auto my-2 ml-0 mr-3">
                    <img :src="photo.path" :alt="photoIndex" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'ProfilePhotos',
props: {
    user: Object,
    photos: Array
},
data () {
    return {
    }
},

methods: {
}

}
</script>

<style>
.plz-profile-photos-list {
    overflow-x: hidden;
}

/** класс для последней фотки **/
.plz-profile-photos-list .plz-profile-photo-item:last-child {
    border: 1px solid red;
}
</style>
