<template>
      <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <a href="https://edu-fedorae.netlify.app" name="Fedorae Education" title="Fedorae Education" target="_blank">
                
              </a>
              <v-card-text>
              </v-card-text>
             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: 'app-login',
  props: {
    token: String,
  },
  async mounted() {
  }
}
</script>

<style lang="css" scoped>
</style>