<template>
    <div class="modal show" tabindex="-1" role="dialog" aria-labelledby="Modal" aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);" @click.stop="hideRegistrationModal">
        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">
<!--                <div class="modal-header">-->
<!--                    <h4 class="modal-title">Быстрая регистрация</h4>-->
<!--                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideAlertModal">-->
<!--                        <span aria-hidden="true">&times;</span>-->
<!--                    </button>-->
<!--                </div>-->

                <div class="modal-body">
                    <RegistrationForm></RegistrationForm>
                </div>

<!--                <div class="modal-footer">-->
<!--                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="hideAlertModal">Close</button>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import RegistrationForm from './RegistrationForm.vue';


export default {
    name : 'RegistrationModal',
    props: {
        regModalVisible : Boolean,
    },
    components : {
        RegistrationForm
    },

    methods : {
        hideRegistrationModal(){
            this.$root.$emit('hideRegistrationModal', {});
        }
    }
}
</script>
