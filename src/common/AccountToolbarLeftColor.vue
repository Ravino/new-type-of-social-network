<template>
    <div id="toolbarLeftColor" class="">
        <a class="add-new ml-auto mr-auto text-center mx-auto mb-4" href="#">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-01.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-02.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-03.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-04.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-05.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-06.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <img src="/images/left-colored-icons/icon-07.png" alt="" />
        </a>

    </div>
</template>

<script>
export default {
name: 'AccountToolbarLeftColor',
data () {
    return {
    }
},

methods: {
}

}
</script>

<style>
    #toolbarLeftColor {
        text-align: center;
        color: #a6a7a9;
    }
    #toolbarLeftColor a{
        position: relative;
        width: 48px;
        height: 48px;
    }
    #toolbarLeftColor .add-new{
        position: relative;
        display: inline-block;
        background-color: #e3e4ec;
        width: 48px;
        height: 48px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
    }
    .add-new .fa {
        line-height: 48px;
        color: #b3b6d0;
    }
</style>
