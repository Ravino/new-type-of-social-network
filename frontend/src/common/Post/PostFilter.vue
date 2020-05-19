<template>
    <div id="postFilter" class="col-12 col-xl-9 mb-4 mb-xl-0 ">
        <div class="row mr-xl-0 bg-white-br20 align-items-center justify-content-between">

            <nav class="col-lg-8 nav profile-filter-links align-items-center  pl-3 mb-lg-0" role="tablist">
                <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4 active">Новости
                    <i class="fas fa-chevron-down ml-2"></i>
                </span>
                <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4">Обновления</span>
                <span class="nav-link py-2 py-sm-3 px-1 mr-2 mr-lg-4">Понравилось</span>
                <span class="nav-link py-3 px-1 mr-2 mr-lg-4 ml-auto ml-lg-4 d-none d-md-block">
                    <button class="btn px-2 py-0 ">
                        <IconSearch style="width: 15px; height: 16px;"/>
                    </button>
                </span>
                <div class="col-12 d-flex d-md-none align-items-center form-inline mb-3 pl-0 pr-0 position-relative overflow-hidden rounded-pill mt-4">
                    <div class="form-inline  position-relative w-100"
                         :class="{'isFocused' : isFocused}">
                        <input :value="lastSearch"
                               id="txtNewsListSearch"
                               ref="txtNewsListSearch"

                               @blur="onBlur"
                               @focus="onFocus"
                               class="top-search form-control form-control  w-100"
                               type="text" placeholder="Поиск" aria-label="Поиск" />
                        <button class="btn btn-search h-100" type="button">
                            <IconSearch style="width: 15px; height: 15px;"/>
                        </button>
                    </div>
                </div>
            </nav>

            <div class="newsViewModes col-lg-4 d-lg-flex justify-content-end d-none ">
                <span>Вид:</span>
                <button class="btn bg-transparent p-0">
                    <IconMultipleViewMode style="width: 16px; height: 16px;"/>
                </button>
                <button class="btn bg-transparent p-0">
                    <IconSingleViewMode style="width: 16px; height: 16px;"/>
                </button>

            </div>

        </div>
    </div>
</template>

<script>
import IconMultipleViewMode from '../../icons/IconMultipleViewMode.vue';
import IconSearch from '../../icons/IconSearch.vue';
import IconSingleViewMode from '../../icons/IconSingleViewMode.vue';

export default {
name : 'PostFilter',
components : { IconMultipleViewMode, IconSearch, IconSingleViewMode },

data() {
    return {
        isFocused: false,
        lastSearch : ''
    }
},

methods: {
    onFocus() {
        this.isFocused = true
    },
    onBlur() {
        this.isFocused = false
    }
}

}
</script>

