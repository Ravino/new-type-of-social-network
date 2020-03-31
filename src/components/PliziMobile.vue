<template>
    <div id="pliziMobile" class="--card d-flex --flex-row justify-content-between align-items-start bg-light">
        <div class="mx-auto pl-3 mt-3">
            <h5 class="w-75"><b>Plizi для мобильных устройств</b></h5>
            <div class="d-flex justify-content-start mt-3">
                <div class="mx-3">
                    <a href="#apple" title="Apple" class="border-0 text-dark">
                        <i class="fab fa-apple fa-2x"></i>
                    </a>
                </div>
                <div class="mx-3">
                    <a href="#android" title="Android" class="border-0 text-dark">
                        <i class="fab fa-android fa-2x"></i>
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
#pliziMobile .bg-wrapper {
    /*background-color: yellow;*/
    background-image: url("/images/plizi-mobile-bg.png");
    background-position: left bottom;
    background-repeat: no-repeat;
    /*background-size: 100px;*/
    min-height: 200px;
}
</style>
