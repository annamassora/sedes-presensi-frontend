<template>
      <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="https://edu-fedorae.netlify.app" name="Fedorae Education" title="Fedorae Education" target="_blank">
                <v-img src="@/assets/sedeslogo.png" alt="Fedorae Education Log" contain height="200"></v-img>
              </a>
              <v-card-text>
                <v-form>
                  <v-text-field label="NISN or NIGN" name="indentifier" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" suffix="| Forgot?" class="rounded-0" outlined></v-text-field>
                  <v-btn class="rounded-0" x-large block dark>Login</v-btn>
                 
                </v-form>
              </v-card-text>
             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: 'app-login'
}

</script>

<style lang="css" scoped>
</style>