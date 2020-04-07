<template>
    <nav class="auth-navbar navbar navbar-expand-lg fixed-top container container-wide mx-auto">
        <div class="w-100 ">
            <div class="row w-100 px-0 mr-0">
                <div class="d-flex align-items-center col-sm-1 col-md-1 col-lg-1 col-xl-1 py-lg-0 p-xl-0">
                    <router-link to="/login" tag="a" class="navbar-brand w-100 d-block text-center mx-auto h-auto my-0">
                        <svg class="page-logo w-75" viewBox="0 0 1101 446" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="page-logo-bg" d="M16.9363 104.685C19.7716 46.0686 68.1225 0 126.808 0L1100.67 0L1084.86 341.094C1082.14 399.801 1033.75 446 974.981 446L0.426514 446L16.9363 104.685Z" />
                            <path d="M242.42 91C256.233 91 268.937 93.3433 280.53 98.03C292.123 102.717 302.237 109.253 310.87 117.64C319.503 125.78 326.163 135.647 330.85 147.24C335.783 158.587 338.25 171.043 338.25 184.61C338.25 198.177 335.783 210.757 330.85 222.35C326.163 233.697 319.503 243.563 310.87 251.95C302.237 260.337 292.123 266.873 280.53 271.56C268.937 276.247 256.233 278.59 242.42 278.59H203.57V350H132.16V91H242.42ZM233.91 216.06C243.283 216.06 250.807 213.223 256.48 207.55C262.153 201.63 264.99 193.983 264.99 184.61C264.99 175.483 262.153 167.96 256.48 162.04C250.807 156.12 243.283 153.16 233.91 153.16H203.57V216.06H233.91ZM534.917 284.51V350H370.637V91H442.787V284.51H534.917ZM567.199 91H639.349V350H567.199V91ZM878.019 283.4V350H673.039V335.2L768.869 157.6H679.329V91H873.579V107.28L778.119 283.4H878.019ZM912.629 91H984.779V350H912.629V91Z" fill="white"/>
                        </svg>
                    </router-link>
                </div>

                <div class="col-sm-4 col-md-6 col-lg-4 d-sm-none d-md-block d-lg-block d-xl-block pl-0">
                    <form class="form-inline mt-3 mt-md-3">
                        <input id="topSearch" ref="topSearch"  class="top-search form-control form-control rounded-pill w-100"
                               type="text"
                               placeholder="Поиск"
                               aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>

                <div id="playerWrapper" class="plz-top-player col-lg-3 col-xl-3 d-sm-none d-md-none d-lg-block d-xl-block text-center mt-1">
                    <div class="btn-block d-inline-block mt-3 ">
                        <a class="btn btn-link btn-sm" href="#prev" title="предыдущий трэк">
                            <i class="fas fa-step-backward"></i>
                        </a>
                        <a class="btn btn-link btn-sm" href="#play" title="начать воспроизведение">
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

                <div id="watcherWrapper" class="plz-top-watcher col-sm-4 col-md-4 col-lg-2 w-auto ml-auto text-center">
                    <div class="--btn-block mt-3 d-inline-block">
                        <a class="btn btn-link my-auto text-body btn-sm" href="#likes" title="Оценки">
                            <i class="far fa-bell fa-2x"></i>
                        </a>

                        <router-link to="/chats-list" tag="a" class="btn btn-link my-auto text-body btn-sm">
                            <i class="far fa-comment fa-flip-horizontal fa-2x"></i>
                        </router-link>

                        <router-link to="/friends-list" tag="a" class="btn btn-link my-auto text-body btn-sm">
                            <i class="fas fa-user-friends fa-2x"></i>
                        </router-link>
                    </div>
                </div>

                <div class="col-sm-2 col-md-1 col-lg-2 px-0 profile-menu">
                    <router-link to="/account" tag="a" class="profile-menu-link">
                        <span>{{userName}}</span>
                    </router-link>

                    <router-link to="/profile" tag="a" class="profile-menu-link">
                        <img :src="userPic" :alt="userName" :class="{ 'default-avatar': isDefaultAvatar }" />
                    </router-link>
                    <i class="profile-menu-opener fa fas fa-chevron-down" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
name: 'AuthNavBar',
props: {
    isAuth: Boolean,
    userData : Object,
},
data () {
    return {
        tmpUserName : `---`,
        tmpUserPicture : `images/noavatar-256.png`,
        // userData : null,
        isDefaultAvatar: true,
    }
},

methods: {

},

computed : {
    userName() {
        let retName = this.tmpUserName;

        if (this.userData  &&  this.userData.firstname) {
            retName = this.userData.firstname;
        }

        return retName;
    },

    userPic() {
        let retPath = this.tmpUserPicture;

        if (this.userData  &&  this.userData.user_pic) {
            retPath = this.userData.user_pic;
            this.isDefaultAvatar = false;
        }

        return retPath;
    }
},

}
</script>
