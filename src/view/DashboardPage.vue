<template>
  <v-container  style="">
  <Carousel :autoplay="6000" :wrap-around="true">
    <Slide v-for="slide in 5"  :key="slide">
      <div class="carousel__item d-flex" >
        <v-card
            color="blue darken-2"
            theme="dark"
            class="mx-auto"
          >
            <div class="d-flex pa-7">
              <div>
                <v-card-title class="text-h7">
                  {{slide}} Selamat Datang
                </v-card-title>

              </div>
            </div>
          </v-card></div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
  <div class="ma-5 pa-5">
    <v-container class="black lighten-5">
      <v-row>
        <v-col md="3" lg="6">
          <v-card
            class="d-flex justify-center align-center mb-6"
            color="purple darken-2"
            theme="dark"
            max-width="400"
            height="200"
            ripple
            hover
            @click="this.$router.push('/main/checkin')"
            >
            <div >
                  <div class="justify-center"><v-icon size="50" class="justify-center" icon="mdi-clock-check"></v-icon></div> 
                  <p class="justify-center  text-h6 font-weight-bold ">Check-in</p>
            </div>
                
          </v-card>
        </v-col>
        <v-col md="6" lg="6">
          <v-card
           class="d-flex justify-center align-center mb-6"
            color="purple darken-2"
            theme="dark"
            max-width="400"
            height="200"
            ripple
            hover
            @click="this.$router.push('/main/checkout')"
            >
            <div >
                  <div class="justify-center"><v-icon size="50" class="justify-center" icon="mdi-clock-check-outline"></v-icon></div> 
                  <p class="justify-center  text-h6 font-weight-bold ">Check-out</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </v-container>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
export default {
  data() {
    return {
      result: '',
    }
  },
  components: {
    Carousel,
    Slide,
  },
  props: {
  },
  methods: {
},
  async mounted() {
  }
}
</script>

<style lang="css" scoped>
</style>