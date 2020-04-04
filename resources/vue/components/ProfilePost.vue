<template>
    <div class="row plz-profile-user mt-5">
        <div class="col-12 bg-white-br20 py-3">
            {{post.postText}}
        </div>
    </div>
</template>

<script>
export default {
name: 'ProfilePost',
props: {
    post: Object
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
    .plz-profile-user {
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        color: #363636;
        font-family: OpenSans-Light, sans-serif;
        font-size: 13px;
    }
</style>
