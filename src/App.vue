<template>
    <div class="container-fluid">
        <NavBar></NavBar>

        <main id="contentContainer" role="main" class="container">
            <router-view></router-view>
        </main>

        <Footer></Footer>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
    name: 'App',
    components: {NavBar, Footer},
    data () {
        return {

        }
    }
}
</script>

<style>
#contentContainer {
    margin-top: 70px;
    min-height: 200px;
}
</style>
