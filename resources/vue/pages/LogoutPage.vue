<template>
    <div class="alert alert-info">Выходим...</div>
</template>

<script>
export default {
name: 'LoginPage',
data() {
    return {

    }
},

mounted() {
    this.$root.$emit('afterSuccessLogout', {redirect: true});
}

}
</script>
