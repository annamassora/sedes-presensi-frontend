<template>
  <v-container style="">
    <Carousel :autoplay="6000" :wrap-around="true">
      <Slide v-for="slide in 5"  :key="slide">
        <div class="carousel__item d-flex"
        >
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
  </v-container>
  <div class="ma-5 pa-5">
    <v-subheader key="Check-in" inset>Check-in</v-subheader>
    <v-divider key="0" inset></v-divider>
      <v-card
        class="d-flex justify-center align-center mb-6 ma-5"
        color="cyan darken-2"
        theme="dark"
        max-width="150"
        height="100"
        ripple
        hover
        @click="this.$router.push('/main/checkin')"
        >
        <div >
              <div class="justify-center"><v-icon size="50" class="justify-center" icon="mdi-clock-check"></v-icon></div> 
              <p class="justify-center  text-h6 font-weight-bold ">Check-in</p>
        </div>
            
      </v-card>
  </div>
  
  <div class="ma-5 pa-5">
      <v-subheader key="Last Check-in" inset>Last Check-in</v-subheader>
      <v-divider key="1" inset></v-divider>
      <div  v-for="dataCard in dataCards" :key="dataCard.id">
        <CheckOutCard :location="dataCard.location" :datetime="dataCard.checkin" :key="dataCard.id"></CheckOutCard>
      </div>

  </div>
</template>

<script>
import CheckOutCard from '../components/CheckOutCard.vue'
import RequestService from '../service/request.service';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
export default {
  data() {
    return {
      result: '',
      image: "/assets/web_sedes.png",
      dataCards: [],
    }
  },
  created(){
      console.log("RequestService.lastcheckin()")
      RequestService.last_checkin().then(result => this.dataCards = result)
      
  },
  components: {
    Carousel,
    Slide,
    CheckOutCard
  },
  props: {
  },
  methods: {
},
  async mounted() {
  }
}
</script>

<style scoped>
.background {
    position: relative; 
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.background::before {  
      content: "";
      background-image: url('@/assets/web_sedes.png');
      background-size: cover;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.5;
}

</style>