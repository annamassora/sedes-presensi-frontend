<template>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" v-if="displayMobile==true" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Welcome</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>

      <v-navigation-drawer
        v-if="displayMobile"
        v-model="drawer"
        left
        temprorary
      >
      <v-list density="compact" nav>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            :title="user.username"
            :subtitle="user.indentifier"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" @click="this.$router.push('/main')"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" @click="this.$router.push('/main/presensi')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="logout" @click="handleLogout()" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-else
        v-model="drawer"
        left
        permanent
      >
        <v-list density="compact" nav>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            :title="user.username"
            :subtitle="user.indentifier"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-home-city" title="Presensi" value="Presensi" @click="this.$router.push('/main')"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account" @click="this.$router.push('/main')"></v-list-item>
          <v-list-item prepend-icon="mdi-logout-variant" title="logout" @click="handleLogout()" value="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
    
</template>

<script>
// import AppBar from './AppBar.vue'
import { useDisplay } from 'vuetify'
export default {
  data() {
    return {
      displayMobile:null,
      drawer: true,
      group: null,
      user : null,
      loading : false,
    }
  },
  created() {
    this.user= JSON.parse(localStorage.getItem('user')).user;
    console.log("this.user : ",this.user);
    const display = useDisplay();
    this.displayMobile=display.mobile.value;
    if(this.displayMobile==true)
    {
      this.drawer=false
    }
    console.log("display.thresholds.md : ",this.displayMobile) // 1280
  },
  methods: {
     handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
     }
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
}

</script>

<style lang="css" scoped>
</style>