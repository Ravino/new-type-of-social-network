<template>
    <div id="profilePhotos" class="row plz-profile-photos mt-4 ">

            <div class="col-1 pt-1">
                <div class="profilePhotos-userpic ">
                    <img src="../images/chat/maria.png" alt="">
                </div>
            </div>
            <div class="col-9 bg-white-br20 pt-1 pb-2">
                <textarea class="profileWhatsNew-textarea" name="profileWhatsNew-textarea" id=""  cols="1" rows="1" placeholder="Что у Вас нового?"></textarea>
            </div>
            <div class="col-2 bg-white-br20 ml-auto pt-1 pb-2 d-flex align-items-center justify-content-end" >
                <i class="fa fa-paperclip ml-3" aria-hidden="true"></i>
                <i class="fa fa-camera ml-3" aria-hidden="true"></i>
                <i class="fa fa-smile ml-3" aria-hidden="true"></i>
            </div>


    </div>
</template>

<script>
export default {
name: 'ProfileWhatsNew',
data () {
    return {
    }
},

methods: {
}

}
</script>

<style>
    .plz-profile-photos {
        padding: 16px 20px 7px;
    }
    .profilePhotos-userpic {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 40px;
        height: 40px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        overflow: hidden;
    }
    .profilePhotos-userpic img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
    }

    .profileWhatsNew-textarea {
        display: block;
        width: 100%;
        height: auto;
        padding: 8px;
        border: none;
        border: 1px solid transparent;
        border-radius: 10px;
        outline: none;
        margin: 0;
        resize: none;
        color: #333;
    }

    .profileWhatsNew-textarea::placeholder {
        font-size: 13px;
        color: #9a9a9a;
    }
    .profileWhatsNew-textarea:focus {
        border: 1px solid #ccc;
    }
</style>
