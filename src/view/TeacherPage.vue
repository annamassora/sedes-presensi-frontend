<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="filter"
            outlined
            clearable
            hide-details
            label="Search"
            type="text"
          >
            <template v-slot:prepend>
              <v-tooltip
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">
                   mdi-magnify
                  </v-icon>
                </template>
                I'm a tooltip
              </v-tooltip>
            </template>
            <template v-slot:append>
            <div>
                <v-btn large text color="primary" @click="openModal">
                  <v-icon left>
                    mdi-clipboard-account
                  </v-icon>
                  Add
                </v-btn>
                <v-btn large text color="primary" class="ml-2" @click="openUploadModal">
                  <v-icon left>
                    mdi-clipboard-account
                  </v-icon>
                  csv
                </v-btn>  
                <v-btn large color="error" class="ml-2" @click="downloadReport">
                  Download CSV
                </v-btn>
            </div>
            </template>
          </v-text-field>
          
        </v-col>
        
      </v-row>
      <v-table>
      <thead>
        <tr>
          <th class="text-left">
          index
          </th>
          <th class="text-left">
            Nama Lengkap
          </th>
          <th class="text-left">
            No Urut
          </th><th class="text-left">
            Tanggal Lahir
          </th>
          <th class="text-left">
          Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in tableListsFiltered"
          :key="item.name"
         
        >
          <td>{{ index+1 }}</td>
          <td>{{ item.fullname }}</td>
          <td>{{ item.nourut }}</td>
          <td>{{ item.datebirth }}</td>
           <td>
            <v-btn class="mr-5"
            color="error"
             @click="handleClick(item)"
            >
            Detail
            </v-btn>
            
            <v-btn
            color="error"
            @click="removeRow(item.nourut)"
            >
            Hapus
            </v-btn>
        </td>
        </tr>
      </tbody>
      </v-table>
    </v-container>
    <AddTeacher :showModal="showModal" ></AddTeacher>     
    <AddTeacherCsv :showModal="showUploadModal" ></AddTeacherCsv>     
</template>
<script>
import RequestService from '../service/request.service';
import AddTeacher from '@/components/addTeacher.vue';
import AddTeacherCsv from '@/components/uploadTeacherCsv.vue';
  export default {
    data: () => ({
        filter: "",
        loading: false,
        tableLists: [],
        dialog: false,
        showModal: false,
        showUploadModal: false,
    }),
    created() {
        console.log("RequestService.teacherlist()");
        RequestService.teacherlist(this.fullname, this.nourut).then(result => this.tableLists = result.list);
        console.log("list", this.tableLists);
    },
    methods: {
        clickMe() {
        },
        handleClick(item) {
            console.log(item);
            this.$router.push(`/main/teacherdetail/${item.nourut}`);
        },

      openModal(){
          this.showModal = true
      },

      closeModal(){
          this.showModal = false
          RequestService.teacherlist(this.fullname, this.nourut).then(result => this.tableLists = result.list);
          
      },

      openUploadModal(){
          this.showUploadModal = true
      },

      closeUploadModal(){
          this.showUploadModal = false
          RequestService.teacherlist(this.fullname, this.nourut).then(result => this.tableLists = result.list);
          
      },
      downloadReport(){
          RequestService.downloadTeacherReport().then(result => 
          {console.log(result);
 
          const anchor = document.createElement('a');
          anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(result);
          anchor.target = '_blank';
          anchor.download = 'teacherReport.csv';
          anchor.click();
          });
        },
      removeRow (id) {
       
      console.log("click")
        this.$swal({
          title: 'Yakin Hapus? ',
          text: 'Data tersebut akan hilang',
          type: 'warning',
          cancelButtonText: 'Kembali',
          confirmButtonText: 'Hapus',
          showCancelButton: true,
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
         if(result.value) {
            RequestService.deleteTeacher(id).then((res)=>{
              console.log("res :", res)
              if(res.status==200)
              {
                 RequestService.teacherlist().then(list => this.tableLists = list.list)
                 this.$swal('Delete', 'Data Berhasil dihapus', 'success')
              }
              else{
                 this.$swal('Hapus data gagal', 'Silahkan coba lagi', 'error')
              }
              })
            console.log("RequestService.deleteTeacher", result)
          } else {
            this.$swal('Cancelled', 'Data tidak dihapus', 'info')
          }
            
        })
        console.log("Removing", id);
    },
    },
    computed: {
        tableListsFiltered() {
            var newArray = [];
            try{

              if (this.tableLists != []) {
                  newArray = this.tableLists.filter((tableList) => {
                      return tableList.fullname.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())|| tableList.nourut.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase());
                  });
                  return newArray
              }

            }
            catch(error)
            {
              return this.tableLists;
            }
            return this.tableLists;
        },
    },
    
    components: { AddTeacher, AddTeacherCsv }
}
</script>