<template>
    <div class="container-fluid">
        <NavBar></NavBar>

        <main id="contentContainer" role="main" class="container-fluid">
            <router-view></router-view>
        </main>

        <Footer></Footer>
    </div>
</template>

<script>
import NavBar from './common/NavBar.vue';
import Footer from './common/Footer.vue';

export default {
    name: 'App',
    components: {NavBar, Footer},
    data () {
        return {

        }
    }
}

// $pliziWaveBlue: #3D51DE;
// $pliziWaveWhite: #F7F8FC;
</script>

<style>
body {
    background-color: #F7F8FC;

    /*background-image: url("/src/images/plizi-bg-exp.svg");*/
    /*background-size: auto auto;*/
    /*background-repeat: no-repeat;*/
    /*background-position: right 40px;*/
    /*background-attachment: scroll;*/
}

#contentContainer {
    margin-top: 70px;
    min-height: 200px;
}
</style>
