<template>

  <v-app >
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import AppBar from './components/AppBar.vue'
// import LoginPage from './components/LoginPage.vue'

export default {
  name: 'App',

  components: {
    // AppBar,
    // LoginPage,
  },
  computed: {
    currentUser() {

     let userLogin= null;
     try {
      userLogin= this.$store.state.auth.user.user
     } catch (error) {
        console.log("userLogin : ",userLogin)
     }
     console.log("userLogin : ",userLogin)
    //  this.user=user;
    return userLogin;
    }
  },
  data: () => ({
    //
    user:null,
  }),
}
</script>
