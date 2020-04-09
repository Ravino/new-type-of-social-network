<template>
    <div id="profilePhotos" class="row bg-white-br20 mt-5 p-4">
        <div class="col-12 bg-white-br20 p-0">
            <div class="w-100 d-flex flex-row justify-content-between align-items-center pb-4">
                <div class="">
                    <h6 class="profilePhotos-title my-0">Фотографии
                        <span class="profilePhotos-desc">{{userData.photosNumber}}</span>
                    </h6>
                </div>

                <div class="profilePhotos-desc">
                    <a href="#onmap">Показать на карте</a>
                </div>
            </div>
            <div class="w-100 d-flex flex-row plz-profile-photos-list">
                <div v-for="(photo, photoIndex) in photos" v-bind:key="photoIndex"
                     class="plz-profile-photo-item w-auto my-0 ml-0 mr-3">
                    <button class="btn-close"  aria-label="delete">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
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
    photos: Array
},
data () {
    return {
    }
},

computed : {
    userData() {
        return this.$root.$user;
    },
}

}
</script>

