<template>
    <div class="row">
        <div class="col-4 offset-4">
            <RegistrationForm></RegistrationForm>
        </div>
    </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm.vue';

export default {
name: 'RegistrationPage',
components: {RegistrationForm},
data() {
    return {

    }
},
beforeMount() {
    window.localStorage.removeItem('pliziJWToken');
}

}
</script>
