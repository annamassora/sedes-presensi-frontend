<template>
      <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
                <v-img src="@/assets/sedeslogo.png" alt="Fedorae Education Log" contain height="200"></v-img>
              <v-card-text>
                <v-form>
                  <v-text-field label="NISN or No Urut" name="indentifier" v-model="user.username" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your password" name="password"  v-model="user.password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                  <v-btn class="rounded-0" @click="handleLogin" :disabled="loading" x-large block dark>Login</v-btn>                 
                </v-form>
              </v-card-text>
             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: 'app-login',
  data() {
    return {
      user : {username:"", password:""},
      loading : false,
    }
  },
  methods: {
     handleLogin() {
      if(this.user.username==''&&this.user.password=='')
      {
         this.$swal(
            { title: 'Error!',
              text: 'Lengkapi form terlebih dahulu',
              icon: 'error',
              confirmButtonText: 'ok'
            })
      }
      else
      {
      this.loading = true;
      this.$store.dispatch("auth/logout")
      this.$store.dispatch("auth/login", this.user).then(
        response => {
          console.log("response ", response)
          if(response.status==200)
          {
            if(response.access.user.role==0)
            {
              this.$router.replace("/main");
              console.log(localStorage.getItem('user'));
              this.loading = false;
            }
            if(response.access.user.role==1)
            {
              this.$router.replace("/main");
              console.log(localStorage.getItem('user'));
              this.loading = false;
            }if(response.access.user.role==2)
            {
              this.$router.replace("/main");
              console.log(localStorage.getItem('user'));
              this.loading = false;
            }if(response.access.user.role==3)
            {
              this.$router.replace("/main");
              console.log(localStorage.getItem('user'));
              this.loading = false;
            }
            if(response.access.user.role==4)
            {
              this.$router.replace("/main");
              console.log(localStorage.getItem('user'));
              this.loading = false;
            }
            
          }
          else{
            this.$swal(
            { title: 'Error!',
              text: 'NISN/No Urut atau pasword tidak cocok',
              icon: 'error',
              confirmButtonText: 'ok'
            })
             this.loading = false;
          }
        },
        
      );
      }
     
    },
  // async  login() {
  //     // const password="12345"
  //     // const username="adfadsf"
  //     const response = await fetch("http://127.0.0.1:5000/api/login", {
  //       method:'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
  //       },
  //       body:{}
  //     })
  //     const data = await response.json();
  //     console.log(data)
  //     if(data["status"]==200)
  //     {
  //       this.$router.push('/presensi')
  //     }
  //     else
  //     {
  //       this.$swal(
  //         { title: 'Error!',
  //           text: 'NISN/NIGN atau pasword tidak cocok',
  //           icon: 'error',
  //           confirmButtonText: 'ok'
  //         })
  //     }
  //   }
  },
  }



</script>

<style lang="css" scoped>
</style>