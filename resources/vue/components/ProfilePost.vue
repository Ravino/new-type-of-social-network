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

</style>
