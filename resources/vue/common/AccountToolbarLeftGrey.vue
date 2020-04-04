<template>
    <div id="toolbarLeftGrey" class="pt-2 mb-5">

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-blue-flame.png" alt="" />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-grey-atom.png" alt="" />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-grey-play-btn.png" alt="" />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-grey-star.png" alt="" />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-grey-paper.png" alt="" />
        </a>

        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img class="" width="32" height="32" src="/images/left-grey-icons/icon-grey-tv-play.png" alt="" />
        </a>

    </div>
</template>

<script>
export default {
name: 'AccountToolbarLeftGrey',
data () {
    return {
    }
},

methods: {
}

}
</script>

<style>
    #toolbarLeftGrey {
        position: relative;
    }

    #toolbarLeftGrey::after {
        content: '';
        position: absolute;
        bottom: -23px;
        left: 50%;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        background-color: #cbd0e2;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
    }
</style>
