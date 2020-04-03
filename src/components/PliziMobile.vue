<template>
    <div id="pliziMobile" class="plz-plizi-mobile bg-white-br20 d-flex justify-content-between align-items-start">
        <div class="plz-for-mobile">
            <h5 class="w-75"><b>Plizi для мобильных устройств</b></h5>
            <div class="plz-social-apps d-flex justify-content-start">
                <div class="mx-3">
                    <a href="#apple" title="Apple" class="btn-social-app">
                        <img src="/images/icons/app-ios-icon.png" alt="ios" />
                    </a>
                </div>
                <div class="mx-3">
                    <a href="#android" title="Android" class="btn-social-app">
                        <img src="/images/icons/app-andoid-icon.png" alt="android" />
                    </a>
                </div>
            </div>
        </div>
        <div class="bg-wrapper w-50 h-100 mx-auto">&nbsp;</div>
    </div>
</template>

<script>
    export default {
        name: 'PliziMobile',
        data () {
            return {
            }
        },
        methods: {
        }
    }
</script>


<style scoped>
.plz-plizi-mobile {
    position: relative;
    margin-top: 25px;
    height: 212px; /* 183px */
    min-height: 212px;
    max-height: 212px;
}

.plz-plizi-mobile .plz-for-mobile {
    margin-left: 39px; /* @TGA - иначе немного неровно если смотреть на верхний блок */
    margin-top: 40px;
    width: 120px;
    max-width: 120px;
}

.plz-social-apps {
    margin-top: 25px;
}

.plz-social-apps .btn-social-app {

}

.plz-plizi-mobile .bg-wrapper {
    display: block;
    position: absolute;
    left: 252px;
    top: 63px;

    /*background-color: yellow;*/
    background-image: url("/images/plizi-mobile-bg.png");
    background-position: 0px 0px;
    background-repeat: no-repeat;
    width: 266px;
    min-width: 266px;
    max-width: 266px;
    height: 149px;
    min-height: 149px;
    max-height: 149px;
}
</style>
