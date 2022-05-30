<template>
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
      style="position: fixed; height:100%"
      priority="0"
    >
        <template #prepend>
            <v-list nav>
                <div style="text-align: center; margin: 30px 10px;">
                    <v-icon size= 65>
                    mdi-account-circle-outline <!--ganti avatar-->
                    </v-icon>
                    <p style="margin-top: 10px;">
                      {{user.username}}
                    </p>
                    <p style="margin-top: 10px;">
                      {{user.indentifier}}
                    </p>
                </div>
            </v-list>
        </template>
        <v-list nav>
            <v-list-item prepend-icon="mdi-home-city" title="Dashboard" value="Dashboard" @click="this.$router.push('/main')"></v-list-item>
            <v-list-item prepend-icon="mdi-clipboard-account" title="Report" value="account" @click="this.$router.push('/main/report')"></v-list-item>
        </v-list>
        <template #append>
            <v-list nav>
                <v-list-item prepend-icon="mdi-account-group-outline" title="logout" @click="handleLogout()" value="logout"></v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
    
</template>

<script>

export default {
  data() { //
    return {
      drawer: true,
      group: null,
    }
  },
  props: {
      displayMobile:Boolean,
      user : String,
  },
  computed:{
     routeName(){
       return this.$route.name
    },
  },
  created() {
    console.log("this.$route.name",this.$router.currentRoute.name)
    if(this.displayMobile==true)
    {
      this.drawer=false
    }
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