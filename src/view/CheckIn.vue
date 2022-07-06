<template>
  <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <p class="decode-result">Arahkan kamera ke QRCode Presensi: <b>{{ result }}</b></p>
              <div class="center stream">
                <QrcodeStream @decode="onDecode" class="mb" @init="onInit"/>
              </div>
            </v-card>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { QrcodeStream} from 'qrcode-reader-vue3'
// import RequestService from '../service/request.service';
export default {
  data() {
    return {
      // temperature:0,
      qrString:""
    }
  },
  components: {
    QrcodeStream,
  },
  props: {
    
  },
  methods: {
    onDecode (decodedString) 
    {
      this.qrString = decodedString

            console.log("decodedString :", decodedString);
            this.$router.replace("/main");
            this.$swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Berhasil Check-in',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 1500
            });
        console.log("decodedString :", decodedString)
      
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  },
  async mounted() {
  } 
} 
</script>

<style lang="css" scoped>
</style>