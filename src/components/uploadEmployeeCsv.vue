<template>
    <div>
    <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content" @closed="$parent.closeModal">
      <span class="modal__title">Add Employee from CSV</span>
      <div class="modal__content" style="width:50vw">
        <v-file-input
          accept=".csv"
          v-model="file"
          label="File input"
        ></v-file-input>
        <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="blue darken-1"
           text
           @click="$parent.closeUploadModal"
         >
           Close
         </v-btn>
         <v-btn
           color="blue darken-1"
           text
           @click="handleClick()"
         >
           Save
         </v-btn>
        </v-card-actions>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
  import RequestService from '../service/request.service';
  export default {
      props: {
    showModal: Boolean,
  },
    data: () => ({
      file: "",
      show:false
    }),
    methods: {
      handleClick () {
        console.log(this.file)
          const parent=this.$parent;
          if(this.file!="")
      {
         RequestService.addEmployeeCsv(this.file[0]).then((result)=>{
              console.log("res :", result)
              if(result.status==200)
              {
                  this.$swal('Add Employee Berhasil', 'Data Karyawan berhasil di tambahkan', 'success');
                  parent.closeUploadModal();
              }
              else{
                 this.$swal('Add Employee gagal', 'Silahkan coba lagi', 'error');
                //  parent.closeModal;
                 
              }
              console.log("RequestService.addEmployee", result)
              })
      }
      else{
          this.$swal('Add Employee gagal', 'Silahkan pilih file', 'error')
      }
       
      },
    },
    watch:{
    showModal(newValue) {
      this.show=newValue
      this.file=""
    }
    },
    computed: {
    },
}
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