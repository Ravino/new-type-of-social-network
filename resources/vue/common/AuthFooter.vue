<template>
    <footer class="navbar plz-footer w-100 px-0 mx-0 d-sm-none d-md-none d-lg-block d-xl-block">
        <div class="container-fluid px-0 m-0">
            <div class="plz-bottom-links w-100 d-flex flex-row justify-content-start align-items-center">
                <div class="plz-bottom-link">
                    <router-link to="/about" tag="div" class="nav-item text-center"><a class="nav-link pl-0 ml-0">О проекте</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/rules" tag="div" class="nav-item"><a class="nav-link">Правила</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/advertisement" tag="div" class="nav-item"><a class="nav-link">Реклама</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/for-developers" tag="div" class="nav-item"><a class="nav-link">Для разработчиков</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/switch-language" tag="div" class="nav-item"><a class="nav-link">Русский <i class="fas fa-chevron-down ml-1"></i></a></router-link>
                </div>

                <div class="plz-bottom-link align-self-end ml-auto mr-0">
                    <router-link to="/switch-language" tag="div" class="nav-item"><a class="nav-link plz-copy pr-0">&copy; Plizi {{ (new Date()).getFullYear() }}</a></router-link>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AuthFooter',
    data () {
        return {

        }
    }
}
</script>

<style scoped lang="scss">


.navbar.plz-footer {
    background-color: transparent;
    margin-top: 46px;
    background: gray;              /*TODO: @SV check this footer*/
}

.navbar.plz-footer .nav-link.plz-copy {
    color: #B6BEFD;
}

.navbar.plz-footer .nav-link {
    color: #F7F8FC;
}

.navbar.plz-footer .plz-bottom-link {
    height: 40px;
    line-height: 40px;
}

</style>
