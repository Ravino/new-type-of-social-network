<template>
<!--old layout    <div class="row plz-profile-user mt-5">-->
<!--old layout        <div class="col-12 bg-white-br20 py-3">-->
<!--old layout            {{post.postText}}-->
<!--old layout        </div>-->
<!--old layout    </div>-->
    <div class="row plz-profile-user mt-4" style="height: 300px;"><!-- added height for remove content jumping -->
        <div class="col-12 bg-white-br20 py-3">
            <div class="tab-pane fade show active" id="all-posts" role="tabpanel" aria-labelledby="all-posts">
                <p>Я не могу сказать, что я отношусь к категории гордых людей, я скорее всего с категории взаимных.
                Для меня важно чувствовать необходимость, тёплое отношение и заботу.</p>
            </div>
            <div class="tab-pane fade" id="my-posts" role="tabpanel" aria-labelledby="my-posts">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At blanditiis cum deserunt dicta eius excepturi, exercitationem
                    fuga mollitia nam necessitatibus nisi officiis qui sapiente soluta,
                    sunt, vel voluptas! Ab at commodi culpa eos ipsum iusto maxime, modi
                    molestias non odio possimus quae quod saepe sapiente soluta, ullam velit.</p>
                <p>Ab ad aperiam aspernatur beatae consectetur cupiditate, dolorum eius eum
                    excepturi, fugit labore maiores molestias necessitatibus optio possimus quaerat
                    quam quis quod quos rem sapiente sequi similique sint suscipit tempora tempore
                    temporibus tenetur totam veniam voluptatibus. Beatae, dignissimos dolorum ducimus
                    explicabo illum incidunt laboriosam nostrum obcaecati, perferendis quas, quasi quidem totam voluptate!</p>
            </div>
            <div class="tab-pane fade" id="archive-posts" role="tabpanel" aria-labelledby="archive-posts">
                <img src="../images/last-entries/vladislav.png" alt="">
                <img src="../images/last-entries/vladislav.png" alt="">
                <img src="../images/last-entries/vladislav.png" alt="">
                <img src="../images/last-entries/vladislav.png" alt="">
            </div>

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
