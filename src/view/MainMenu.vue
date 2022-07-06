<template>
  <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
      <AppBar @toogle-drawer="toogleDrawer" :title="routeName" :displayMobile="displayMobile" ></AppBar>

      <NavbarStudent @toogle-drawer="toogleDrawer"  v-if="user.role==1" :displayMobile="displayMobile" :drawer="drawer" :user="user"></NavbarStudent>
      <NavbarTeacher @toogle-drawer="toogleDrawer"  v-else-if="user.role==0" :displayMobile="displayMobile" :drawer="drawer" :user="user"></NavbarTeacher>
      <NavbarAdmin @toogle-drawer="toogleDrawer"  v-else :displayMobile="displayMobile" :drawer="drawer" :user="user"></NavbarAdmin>
      <v-main >
        <router-view></router-view>
      </v-main>
  </v-layout> 
    
</template>

<script>
import AppBar from '../components/AppBar.vue'
import NavbarStudent from '@/components/NavbarStudent.vue'
import { useDisplay } from 'vuetify'
import NavbarTeacher from '@/components/NavbarTeacher.vue'
import NavbarAdmin from '@/components/NavbarAdmin.vue'
export default {
  data() {
    return {
      drawer: true,
      displayMobile:null,
      user : null,
    }
  },
  computed:{
     routeName(){
       return this.$route.name
    },
  },
   
  components: {
    AppBar,
    NavbarStudent,
    NavbarTeacher,
    NavbarAdmin

},  
methods:{
  toogleDrawer()
  {
     this.drawer=!this.drawer
  }
},
  created() {
    console.log("this.$route.name",this.$router.currentRoute.name)
    this.user= JSON.parse(localStorage.getItem('user')).user;
    console.log("this.user : ",this.user);
    const display = useDisplay();
    this.displayMobile=display.mobile.value;
    this.drawer=!this.displayMobile
    console.log("display.thresholds.md : ",this.displayMobile) // 1280
  },
  watch:{
    drawer(newValue) {
      console.log("drawer new value:", newValue)
    }
  }
}

</script>

<style lang="css" scoped>

</style>