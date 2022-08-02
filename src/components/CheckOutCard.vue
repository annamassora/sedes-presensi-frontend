<template>
        <v-card
          class="mb-6 ma-5"
          max-width="250"
          variant="outlined"
        >
            <v-card-header>
              <div>
                <div class="text-overline mb-1">
                  CHECK-IN
                </div>
                <div class="text-h6 mb-1">
                  {{location}}
                </div>
                <div class="text-caption">{{datetime}}</div>
                <div v-if="keterlambatan!=''&&parseInt(keterlambatan)>0" class="text-caption">Terlambat: {{waktuKeterlambatan}} </div>
              </div>
            </v-card-header>
    
            <v-card-actions>
              <v-btn variant="outlined" text color="cyan accent-4" @click="checkOut">
                Check Out
              </v-btn>
            </v-card-actions>
        </v-card>
</template>
<script>
import RequestService from '../service/request.service'
export default {
    props: {
    location: String,
    datetime: String,
    keterlambatan:String,
    id: Number
  },
  methods:
  {
    checkOut()
    {
      console.log("click")
        this.$swal({
          title: 'Yakin Check Out? ',
          text: 'Akses anda di area sekolah akan ditutup',
          type: 'warning',
          cancelButtonText: 'Kembali',
          confirmButtonText: 'Check Out!',
          showCancelButton: true,
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
          if(result.value) {
            RequestService.check_out(this.id).then((res)=>{
              console.log("res :", res)
              if(res.status==200)
              {
                 this.$parent.dataCards = this.$parent.dataCards.filter((item) => item.id !== this.id)
              }
              else{
                 this.$swal('Check Out Gagal', 'Silahkan coba lagi', 'error')
              }
              })
            this.$swal('Check Out', 'Semoga sampai tujuan dengan selamat', 'success')
            console.log("RequestService.check_out", result)
          } else {
            this.$swal('Cancelled', 'Anda masih memiliki akses di area sekolah', 'info')
          }
        })
    }
  },
  computed:{
    waktuKeterlambatan()
    {
      var decimalTimeString = this.keterlambatan;
      var decimalTime = parseFloat(decimalTimeString);
      decimalTime = decimalTime * 60 * 60;
      var hours = Math.floor((decimalTime / (60 * 60)));
      decimalTime = decimalTime - (hours * 60 * 60);
      var minutes = Math.floor((decimalTime / 60));
      decimalTime = decimalTime - (minutes * 60);
      // var seconds = Math.round(decimalTime);
      // if(hours < 10)
      // {
      //   hours = "" + hours;
      // }
      // if(minutes < 10)
      // {
      // 	minutes = "0" + minutes;
      // }
      return hours+" jam "+minutes+" menit"
    }
  }
  // props
}
  

</script>
