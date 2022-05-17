<template>
  <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <p class="decode-result">Arahkan kamera ke QRCode Presensi: <b>{{ result }}</b></p>
              <div class="center stream">
                <QrcodeStream @decode="onDecode" class="mb"/>
              </div>
            </v-card>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
import { QrcodeStream} from 'qrcode-reader-vue3'
import RequestService from '../service/request.service';
export default {
  data() {
    return {
      temperature:0,
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
      console.log("decodedString :", decodedString)
      this.$swal.fire({
      title: "Submit Suhu!",
      text: "Ketikan suhu anda saat ini",
      input: 'text',
      allowOutsideClick: false,
      closeOnClickOutside: false,
      allowEscapeKey: false,
      confirmButtonColor: 'green'
      }).then((result) => 
      {

        if (result.value>=38&&result.value<35) {
            this.$swal.fire({
                            title: 'Suhu tidak normal, silahkan cek kesehatan anda',
                            allowOutsideClick: false,
                            closeOnClickOutside: false,
                            allowEscapeKey: false
                            });
            this.$router.replace("/main");
        }

       else if (result.value>=35&&result.value<38) {
            this.temperature=result.value
            this.$swal.fire('Suhu Anda:'+result.value);
            RequestService.attendance(this.temperature, this.qrString)
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
        }

        else if (result.value==''){
            this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda belum mengetik Suhu tubuh',
                allowOutsideClick: false,
                closeOnClickOutside: false,
                allowEscapeKey: false,
                }).then(this.$router.replace("/main"))
        }

        console.log("decodedString :", decodedString)
      }) 
    }
  },
  async mounted() {
  } 
} 
</script>

<style lang="css" scoped>
</style>