<template>
    <div id="pliziMobile" class="card">
        <div class="card-body w-50">
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
        <div class="bg-wrapper"></div>
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
    background-color: white;
    background-image: url("/src/images/plizi-mobile-bg.png");
    background-position: left bottom;
    background-repeat: no-repeat;
    background-size: 100px;
}
</style>
