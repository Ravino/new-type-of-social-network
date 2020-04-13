<template>
    <div :class="spinnerClazz">
        <div class="w-50 text-right pr-3">
            <i class="fas fa-spinner fa-3x fa-spin text-info"></i>
        </div>
        <div class="w-50 pt-1 text-info">
            <h3 v-html="spinnerMessage"></h3>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Spinner',
    props : {
        clazz : String,
        message: String
    },

    data(){
        return {
            defaultClazz: `col-sm-12 col-md-12 col-lg-4 col-xl-12 py-5 px-5 d-flex flex-row`,
            defaultMessage: `Данные загружаются`,
        }
    },

    computed: {
        spinnerClazz(){
            return this.clazz || this.defaultClazz;
        },
        spinnerMessage(){
            return this.message || this.defaultMessage;
        },
    }
}
</script>
