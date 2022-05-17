<template>
  <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
              <button v-on:click="alertDisplay">Click Me!</button>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      result: '',

    }
  },
  components: {
  },
  props: {
  },
  methods: {
      alertDisplay() {
        this.$swal({
          title: 'Yakin Check Out?',
          text: 'Akses anda di area Sekolah akan ditutup',
          type: 'warning',
          cancelButtonText: 'Kembali',
          confirmButtonText: 'Check Out!',
          showCancelButton: true,
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
            this.$router.replace("/main");
          if(result.value) {
            this.$swal('Check Out', 'Semoga sampai tujuan dengan selamat :)', 'success')
          } else {
            this.$swal('Cancelled', 'Anda masih memiliki akses di area sekolah', 'info')
          }
        })
      }
    }
}
</script>

<style lang="css" scoped>
</style>