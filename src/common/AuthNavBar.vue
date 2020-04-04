<template>
    <nav class="auth-navbar navbar navbar-expand-lg fixed-top">
        <div class="container-fluid pr-0">
            <div class="row w-100">
                <div class="col-sm-1 col-md-1 col-lg-1 col-xl-1 py-lg-0 p-xl-0">
                    <router-link to="/login" tag="a" class="navbar-brand w-100 d-block text-center mx-auto h-auto my-0">
                        <img src="images/plizi-icon-56.png" alt="Plizi" />
                    </router-link>
                </div>

                <div class="col-sm-4 col-md-6 col-lg-4 d-sm-none d-md-block d-lg-block d-xl-block">
                    <form class="form-inline mt-3 mt-md-3">
                        <input id="topSearch" ref="topSearch"  class="top-search form-control form-control rounded-pill w-100" type="text" placeholder="Поиск" aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <div id="playerWrapper" class="col-lg-3 col-xl-3 d-sm-none d-md-none d-lg-block d-xl-block text-center mt-1">
                    <div class="btn-block d-inline-block mt-3 ">
                        <a class="btn btn-link btn-sm" href="#prev" title="предыдущий трэк">
                            <i class="fas fa-step-backward"></i>
                        </a>
                        <a class="btn btn-link  btn-sm" href="#play" title="начать воспроизведение">
                            <i class="far fa-play-circle fa-2x"></i>
                        </a>
                        <a class="btn btn-link btn-sm" href="#next" title="начать воспроизведение">
                            <i class="fas fa-step-forward"></i>
                        </a>
                        <a class="btn btn-link btn-song btn-sm" href="#track" title="MASE - Psychoi">
                            <span class="singer">MASE</span> - <span class="song">Psychoi</span>
                        </a>
                    </div>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-2 col-xl-2 text-center">
                    <div class="--btn-block mt-3 d-inline-block">
                        <a class="btn btn-link my-auto text-body btn-sm" href="#likes" title="Оценки">
                            <i class="far fa-bell fa-2x"></i>
                        </a>
                        <router-link to="/chats-list" tag="a" class="btn btn-link my-auto text-body btn-sm">
                            <i class="far fa-comment fa-flip-horizontal fa-2x"></i>
                        </router-link>
                        <a class="btn btn-link my-auto text-body btn-sm" href="#friends-list" title="Друзья">
                            <i class="fas fa-user-friends fa-2x"></i>
                        </a>
                    </div>
                </div>

                <div class="col-sm-2 col-md-1 col-lg-2 px-0 profile-menu">
                    <router-link to="/account" tag="a" class="profile-menu--link">
                        <span>Александр</span>
                        <img src="images/last-entries/vladislav.png" alt="Plizi" />
                    </router-link>
                    <i class="fa fas fa-chevron-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
name: 'AuthNavBar',
props: {
    isAuth: Boolean
},
data () {
    return {
    }
},

methods: {
    isActiveMenu(routNames) {
        return !!routNames.find((rItem) => {
            return this.$router.currentRoute.name === rItem;
        });
    },
}

}
</script>

<style>
    .auth-navbar.navbar.fixed-top {
        background-color: #F7F8FC;
    }
    #playerWrapper .btn {
        font-size: 10px;
        color: #A5A9C4;
    }
    #playerWrapper .btn-song {
        font-size: 13px;
    }

    .fa-bell,
    .fa-comment,
    .fa-user-friends {
        font-size: 24px;
        color: #bfc0c3;
        transition: .4s;
    }

    .fa-bell:hover,
    .fa-comment:hover,
    .fa-user-friends:hover {
        color: #576df6;
    }

    .profile-menu {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #a6a7a9;
    }
    .profile-menu .fa-chevron-right{
        transform: rotate(90deg);
        font-size: 10px;
        cursor: pointer;
    }

    .profile-menu--link span {
        display: inline-block;
        vertical-align: middle;
        color: #a6a7a9;
        margin-right: 15px;
    }
    .profile-menu--link img {
        display: inline-block;
        vertical-align: top;
        width: 40px;
        height: 40px;
        margin-right: 12px;
        -webkit-border-radius: 40px;
        -moz-border-radius: 40px;
        border-radius: 40px;
    }

</style>
