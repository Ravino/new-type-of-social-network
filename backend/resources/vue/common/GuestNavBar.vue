<template>
    <nav class="navbar plz-guest-navbar">
        <div class="container-fluid px-0 py-0 --w-100 my-0">
            <div class="row w-100 px-0 mx-auto">
                <div class="col-2">
                    <router-link to="/" tag="a" class="navbar-brand mr-auto">
                        <svg class="page-logo w-75" viewBox="0 0 1101 446" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path  class="page-logo-bg"  d="M16.9363 104.685C19.7716 46.0686 68.1225 0 126.808 0L1100.67 0L1084.86 341.094C1082.14 399.801 1033.75 446 974.981 446L0.426514 446L16.9363 104.685Z" />
                            <path d="M242.42 91C256.233 91 268.937 93.3433 280.53 98.03C292.123 102.717 302.237 109.253 310.87 117.64C319.503 125.78 326.163 135.647 330.85 147.24C335.783 158.587 338.25 171.043 338.25 184.61C338.25 198.177 335.783 210.757 330.85 222.35C326.163 233.697 319.503 243.563 310.87 251.95C302.237 260.337 292.123 266.873 280.53 271.56C268.937 276.247 256.233 278.59 242.42 278.59H203.57V350H132.16V91H242.42ZM233.91 216.06C243.283 216.06 250.807 213.223 256.48 207.55C262.153 201.63 264.99 193.983 264.99 184.61C264.99 175.483 262.153 167.96 256.48 162.04C250.807 156.12 243.283 153.16 233.91 153.16H203.57V216.06H233.91ZM534.917 284.51V350H370.637V91H442.787V284.51H534.917ZM567.199 91H639.349V350H567.199V91ZM878.019 283.4V350H673.039V335.2L768.869 157.6H679.329V91H873.579V107.28L778.119 283.4H878.019ZM912.629 91H984.779V350H912.629V91Z" fill="white"/>
                        </svg>
                    </router-link>
                </div>
                <div class="col-7">
                    <form class="form-inline my-0 h-100">
                        <input id="topSearch" ref="topSearch" class="top-search form-control"
                               type="text"
                               placeholder="Поиск" aria-label="Поиск" />
                        <button class="d-none btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div class="col-3 px-0 mr-0">
                    <div class="w-100 h-100 --d-flex --flex-row-reverse">
                        <a id="toEnglish" href="#toEnglish" class="to-english btn btn-link">Switch to English</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
name: 'GuestNavBar',
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

<style lang="scss">
$plzGuestNavbarH: 56px;

.navbar.plz-guest-navbar {
    height: $plzGuestNavbarH;
    min-height: $plzGuestNavbarH;
    max-height: $plzGuestNavbarH;
    padding: 0px;
    margin-top: 153px;

    .to-english.btn.btn-link {
        display: block;
        color: #AFB4C5;
        float: right;
        line-height: $plzGuestNavbarH;
        height: $plzGuestNavbarH;
    }
}


</style>
