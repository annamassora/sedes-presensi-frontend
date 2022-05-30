<template>
    <div>
    <vue-final-modal v-model="show" classes="modal-container" content-class="modal-content" @closed="$parent.closeModal">
      <span class="modal__title">Add Teacher</span>
      <div class="modal__content" style="width:50vw">
        <v-col cols="12" >
          <v-text-field
            label="Fullname*"
            v-model="fullname"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="NIGN*"
            v-model="nign"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Datebirth (DD/MM/YYYY)*"
            v-model="datebirth"
            required
          ></v-text-field>
        </v-col>
        <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn
           color="blue darken-1"
           text
           @click="$parent.closeModal"
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
      fullname: "",
      nign: "",
      datebirth: "",
      show:false
    }),
    methods: {
      handleClick () {
          const parent=this.$parent;
          if(this.fullname!=""&&this.nign!= ""&&
      this.datebirth!= "")
      {
         RequestService.addTeacher(this.fullname, this.datebirth, this.nign).then((result)=>{
              console.log("res :", result)
              if(result.status==200)
              {
                  this.$swal('Add Teacher Berhasil', 'Teacher berhasil di tambahkan', 'success');
                    parent.closeModal();
              }
              else{
                 this.$swal('Add Teacher gagal', 'Silahkan coba lagi', 'error');
                //  parent.closeModal;
                 
              }
              console.log("RequestService.addTeacher", result)
              })
      }
      else{
          this.$swal('Add Teacher gagal', 'Silahkan Isi semua field terlebih dahulu', 'error')
      }
       
      },
    },
    watch:{
    showModal(newValue) {
      this.show=newValue
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