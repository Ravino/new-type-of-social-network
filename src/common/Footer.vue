<template>
    <footer class="navbar --fixed-bottom navbar-expand-sm --navbar-dark bg-dark mt-3">
        <div class="container">
            <div class="pull-left">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <router-link to="/about" tag="li" class="nav-item"><a class="nav-link text-white">О проекте</a></router-link>
                        <router-link to="/rules" tag="li" class="nav-item"><a class="nav-link text-white">Правила</a></router-link>
                        <router-link to="/advertisement" tag="li" class="nav-item"><a class="nav-link text-white">Реклама</a></router-link>
                        <router-link to="/for-developers" tag="li" class="nav-item"><a class="nav-link text-white">Для разработчиков</a></router-link>
                        <router-link to="/switch-language" tag="li" class="nav-item"><a class="nav-link text-white">Русский <i class="fas fa-chevron-down ml-1"></i></a></router-link>
                    </ul>
                </div>
            </div>
            <div class="pull-right text-white">&copy; Plizi {{ (new Date()).getFullYear() }}</div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {

        }
    }
}
</script>

