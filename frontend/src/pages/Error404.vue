<template>
    <div class="plizi-404">
        404 error
    </div>
</template>

<script>
 export default {
  name: "Error404",
  created() {
   if (!this.$root.$isAuth) {
    this.$router.push({ name: 'LogoutPage' });
   }

  },
 }
</script>
