<template>
    <div id="toolbarLeftColor" class="">
        <a class="add-new ml-auto mr-auto text-center mx-auto mb-4" href="#">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-01.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-02.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-03.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-04.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-05.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <img src="/images/left-colored-icons/icon-06.png" alt="" />
        </a>
        <a class="w-100 d-block text-center mx-auto mb-4" href="#">
            <button class="btn-close"  aria-label="delete">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
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
    }
    #toolbarLeftColor img{
        position: relative;
        width: 48px;
        height: 48px;
        border-radius: 100%;
        overflow: hidden;
    }
    #toolbarLeftColor .btn-close{
        position: absolute;
        top: -5px;
        left: 50%;
        width: 16px;
        height: 16px;
        display: inline-block;
        padding: 3px;
        border: 0;
        background-color: #ef482c;
        font-size: 10px;
        color: #fff;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        transform: translate(40%, 0%) rotate(45deg);
        transition: .4s;
        z-index: 1;
        opacity: 0;
    }
    #toolbarLeftColor .d-block:hover .btn-close{
        opacity: 1;
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
