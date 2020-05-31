<template>
    <div id="profilePhotos" class="row bg-white-br20 p-4 mb-4">
        <div class="col-12 bg-white-br20 p-0">
            <div class="w-100 d-flex flex-row justify-content-between align-items-center">
                <div class="">
                    <template v-if="userImageNumber">
                        <h6 class="profilePhotos-title my-0">Фотографии
                        <span class="profilePhotos-desc" v-html="sBeaty(userImageNumber)"></span>
                        </h6>
                    </template>
                    <template v-else>
                        <span class="numbers-bottom">Нет фотографий</span>
                    </template>
                </div>

                <div class="profilePhotos-desc d-none" >
                    <a href="#onmap">Показать на карте</a>
                </div>
            </div>
            <div class="w-100 d-flex flex-row plz-profile-photos-list pt-3">
                <ProfileGallery v-if="photos.length > 0" :profilePhotos="profilePhotos" :images="photos"></ProfileGallery>
                <div v-else class="mx-auto">Нет фотографий</div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProfileGallery from '../common/ProfileGallery.vue';
    import PliziUser from "../classes/PliziUser";
    import PliziAuthUser from "../classes/PliziAuthUser";

export default {
name: 'ProfilePhotos',
    components: {
        ProfileGallery
    },
props: {
    photos: Array,
    profileData: PliziUser | PliziAuthUser,
    isOwner: Boolean,
},
data () {
    return {
        profilePhotos: true
    }
},

computed : {
    userData() {
        return this.$root.$auth.user;
    },
    userImageNumber() {
        if (this.profileData) {
            return this.profileData.stats.imageCount;
        } else {
            return this.userData.stats.imageCount;
        }
    },
},
    methods: {
        sBeaty(param) {
            return this.$options.filters.statsBeauty(param);
        }
    },

}
</script>

