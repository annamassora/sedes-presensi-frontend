<template>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <AppBar :title="routeName" :displayMobile="displayMobile"></AppBar>

<!-- DISPLAY-MOBILE -->
      <v-navigation-drawer
        v-if="displayMobile"
        left
        v-model="drawer"
        temprorary
      >
      <template #append>
        <v-list nav>
          <v-list-item prepend-icon="mdi-account-group-outline" title="logout" @click="handleLogout()" value="logout"></v-list-item>
        </v-list>
      </template>
      <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-account-circle-outline"
            :title="user.username"
            :subtitle="user.indentifier"
          ></v-list-item>
          <v-list nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="Dashboard" @click="this.$router.push('/main')"></v-list-item>
            <v-list-item prepend-icon="mdi-clipboard-account" title="Report" value="account" @click="this.$router.push('/main/report')"></v-list-item>
          </v-list>
        </v-list>
      </v-navigation-drawer>

<!-- DISPLAY-WEBSITE -->
      <v-navigation-drawer
        v-else
        left
        permanent
        priority="0"
      >
      <template #append>
        <v-list nav>
          <v-list-item prepend-icon="mdi-account-group-outline" title="logout" @click="handleLogout()" value="logout"></v-list-item>
        </v-list>
      </template>
      <template #prepend>
        <v-list nav>
          <div style="text-align: center; margin: 30px 10px;">
            <v-icon size= 65>
            mdi-account-circle-outline <!--ganti avatar-->
            </v-icon>
            <p style="margin-top: 10px;">
              {{user.username}}
            </p>
          </div>
        </v-list>
      </template>
        <v-list nav>
          <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="Dashboard" @click="this.$router.push('/main')"></v-list-item>
          <v-list-item prepend-icon="mdi-clipboard-account" title="Report" value="account" @click="this.$router.push('/main/report')"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height:100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
    
</template>

<script>
import AppBar from '../components/AppBar.vue'
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
  computed:{
     routeName(){
       return this.$route.name
    },
  },
  components: {
    AppBar,
  },
  created() {
    console.log("this.$route.name",this.$router.currentRoute.name)
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