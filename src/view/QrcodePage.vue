<template>
  <v-container>
    <v-row
      justify="space-between"
    >
        <v-col
         cols="12"
         md="4"
         lg="4"
        >
        <v-form 
         ref="form"
         v-model="valid"
         lazy-validation
        >
        <v-text-field
         v-model="location"
         :counter="max"
         :rules="rules"
         label="Tambah Lokasi"
         required
         hide-details
        ></v-text-field>
        <v-btn
          color="error"
          class="mt-2"
          @click="handleSubmit"
        >
          Submit
        </v-btn>
       </v-form>
     </v-col>
   </v-row>
   <v-table>
    <thead>
      <tr>
        <th class="text-left">
          index
        </th>
        <th class="text-left">
          Location
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item,index) in tableLists"
        :key="item.id"
      >
        <td>{{ index+1 }}</td>
        <td>{{ item.location }}</td>
        <td>
            <v-btn
            color="error"
            class="mr-2"
            @click="openModal(item.qrString, item.location)"
            >
            Tampilan QR
            </v-btn>
            <v-btn
            color="error"
            @click="removeRow(item.id)"
            >
            Hapus
            </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
    </v-container>
    <div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <span class="modal__title">{{ loc }}</span>
      <div class="modal__content">
       <QRCodeVue3
          :width="500"
          :height="500"
          :value="qrString"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'square',
            color: '#000000',
          }"
          :image="img"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'square', color: '#000000' }"
          :cornersDotOptions="{ type: 'square', color: '#000000' }"
          fileExt="png"
          myclass="my-qur"
          imgclass="img-qr"
        />
      </div>
    </vue-final-modal>
  </div>
       
     
</template>


<script>
  import RequestService from '../service/request.service';
  import QRCodeVue3 from "qrcode-vue3";
  import image from "@/assets/sedeslogo.png"
  export default {
    data: () => ({
      filter: '',
      location: '',
      loc: '',
      qrString: '',
      loading: false,
      showModal : false,
      tableLists: [
        ],
        img:image

    }),
    created ()  {
      console.log("RequestService.studentlist()")
      RequestService.getQrCode().then(result => this.tableLists = result)
      console.log("list",this.tableLists)
    },
    components: {QRCodeVue3},
    methods: {
      handleSubmit () {
         RequestService.createQrcode(this.location).then(result => {console.log(result)
         RequestService.getQrCode().then(result => this.tableLists = result)})
         
         this.location=""
      },
      openModal(qrString,location){
          console.log(qrString)
          this.qrString=qrString
          this.loc=location
          this.showModal = true
      },
      removeRow (id) {
      console.log("click")
        this.$swal({
          title: 'Yakin Hapus? ',
          text: 'QRCode lokasi tersebut akan hilang',
          type: 'warning',
          cancelButtonText: 'Kembali',
          confirmButtonText: 'Hapus',
          showCancelButton: true,
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
         if(result.value) {
            RequestService.deleteQrCode(id).then((res)=>{
              console.log("res :", res)
              if(res.status==200)
              {
                 RequestService.getQrCode().then(result => this.tableLists = result)
              }
              else{
                 this.$swal('Hapus data gagal', 'Silahkan coba lagi', 'error')
              }
              })
            this.$swal('Delete', 'QRCode Berhasil dihapus', 'success')
            console.log("RequestService.deleteQrCode", result)
          } else {
            this.$swal('Cancelled', 'QRCode Lokasi tidak dihapus', 'info')
          }
            
        })
        console.log("Removing", id);
    },
    
    computed: {
    },
}}
</script>
<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>