<template>
    <div class="row">
        <footer class="navbar plz-footer col-12 w-100 container-fluid  m-0 ">
            <div class="plz-bottom-links w-100 d-flex flex-wrap flex-column align-items-center flex-md-row justify-content-md-start  ">
                <div class="plz-bottom-link">
                    <router-link to="/about" tag="div" class="nav-item text-center text-md-left"><a class="nav-link ">О проекте</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/rules" tag="div" class="nav-item text-center text-md-left"><a class="nav-link">Правила</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/advertisement" tag="div" class="nav-item text-center text-md-left"><a class="nav-link">Реклама</a></router-link>
                </div>
                <div class="plz-bottom-link">
                    <router-link to="/for-developers" tag="div" class="nav-item text-center text-md-left"><a class="nav-link">Для разработчиков</a></router-link>
                </div>

                <div class="plz-bottom-link dropup">
                    <p class="nav-link dropdown-menu-btn  text-center text-md-left" id="dropdownMenuButton"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Русский
                        <i class="fas fa-chevron-down ml-1"></i>
                    </p>
                    <div class="dropdown-menu py-3 px-0" aria-labelledby="dropdownMenuButton">
                        <router-link to="/switch-language" tag="div" class="nav-item">
                            <a class="dropdown-item" href="#">English</a>
                        </router-link>
                        <router-link to="/switch-language" tag="div" class="nav-item">
                            <a class="dropdown-item" href="#">German</a>
                        </router-link>
                    </div>
                </div>

                <div class="plz-bottom-link align-self-end ml-auto mr-0">
                    <router-link to="/switch-language" tag="div" class="nav-item"><a class="nav-link plz-copy pr-0">&copy; Plizi {{ (new Date()).getFullYear() }}</a></router-link>
                </div>
            </div>
        </footer>
    </div>
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
