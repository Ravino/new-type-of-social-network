<template>
    <div id="profilePhotos" class="row plz-profile-photos mt-5">
        <div class="col-12 bg-white-br20 p-4">
            <div class="w-100 d-flex flex-row justify-content-between">
                <div class="">
                    <h6 class="profilePhotos-title">Фотографии <span class="profilePhotos-desc">{{user.photosNumber}}</span></h6>
                </div>

                <div class="profilePhotos-desc">
                    <a href="#onmap">Показать на карте</a>
                </div>
            </div>
            <div class="w-100 d-flex flex-row plz-profile-photos-list mt-3">
                <div v-for="(photo, photoIndex) in photos" v-bind:key="photoIndex" class="plz-profile-photo-item w-auto my-2 ml-0 mr-3">
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
    #profilePhotos {
        color: #9b9998;
        font-size: 13px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
        border-radius: 20px;
    }

    .profilePhotos-title {
        font-size: 14px;
        color: #363636;
    }
    .profilePhotos-desc{
        display: inline-block;
        font-size: 12px;
        color: #9a9a9a;
    }
    .profilePhotos-desc a {
        display: inline-block;
        font-size: 13px;
        color: #9b9998;
    }

    .profilePhotos-desc a:hover {
        color: #0c5460;
    }

.plz-profile-photos-list {
    overflow-x: hidden;
    position: relative;
}

    .plz-profile-photos-list:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 120px;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.8) 50%, rgba(255,255,255,1) 100%);
        z-index: 1;
    }

    .plz-profile-photo-item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 140px;
        height: 140px;
        text-align: center;
    }
    .plz-profile-photo-item img{
        display: inline-block;
        vertical-align: top;
        overflow: hidden;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .plz-profile-photo-item .btn-close{
        position: absolute;
        top: -5px;
        left: 100%;
        width: 20px;
        height: 20px;
        display: inline-block;
        padding: 4px;
        border: 0;
        background-color: #ef482c;
        font-size: 10px;
        color: #fff;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        transform: translate(-60%, 0%) rotate(45deg);
        transition: .4s;
        z-index: 1;
        opacity: 0;
    }
    .plz-profile-photo-item:hover .btn-close{
        opacity: 1;
    }
</style>
