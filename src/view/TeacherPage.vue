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
              <v-btn
                v-if="user.role==2&&(deleteLists.length>0||selectAll)"
                class="ma-2"
                size="small"
                icon="mdi-delete"
                color="error"
                @click="removeRow()"
              ></v-btn>
            </template>
            <template v-slot:append>
            <div>
                <v-btn 
                  v-if="user.role==2"
                  class="ma-2"
                  size="small"
                  color="yellow"
                  icon="mdi-account-plus"
                  @click="openModal">                  
                </v-btn>
                <v-btn 
                  v-if="user.role==2"
                  class="ma-2"
                  size="small"
                  color="yellow"
                  icon="mdi-cloud-upload"
                  @click="openUploadModal">
                </v-btn>  
                <v-btn 
                  v-if="user.role==2"
                  color="yellow" 
                  size="small"
                  class="ml-2" 
                  icon="mdi-cloud-download"
                  @click="downloadReport">
                </v-btn>
            </div>
            </template>
          </v-text-field>
          
        </v-col>
        
      </v-row>
      <v-table>
      <thead>
        <tr>
          <th v-if="user.role==2" class="text-left">
            <div>
              <v-checkbox
                v-model="selectAll"
                :disabled="tableLists.length<1"
                hide-details
              >
              </v-checkbox>
            </div>
          </th>
          <th class="text-left">
          No
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
            Jabatan
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
          <td v-if="user.role==2">
             <v-checkbox v-if="selectAll==false"
                v-model="deleteLists"
                :value="item.nourut"
                hide-details
              ></v-checkbox>
              <v-checkbox v-else
                v-model="selectAll"
                hide-details
                disabled="true"
              ></v-checkbox>
          </td>        
          <td>{{ index+1 }}</td>
          <td>{{ item.fullname }}</td>
          <td>{{ item.nourut }}</td>
          <td>{{ item.datebirth }}</td>
          <td >
            <div  v-if="item.isEditing" >
            <v-row>
              <v-col style="align-self:center">
                <v-text-field
                  v-model="updateTitleString"
                  density="compact" 
                  variant="outlined" 
                  hide-details>
                </v-text-field>
              </v-col>
              <v-col class="v-col-auto" >
                <v-btn
                  variant="text"
                  color="purple-darken-2"
                  icon="mdi-check"
                  @click="updateTeacher(item.nourut); item.isEditing=false;">
                </v-btn>
                <v-btn
                  variant="text"
                  color="purple-darken-2"
                  icon="mdi-close"
                  @click="item.isEditing=false; isEditing=false">
                </v-btn>
              </v-col>
            </v-row>
              
            </div>
            <div v-else>
              {{ item.title }}
              <v-btn 
              v-if="user.role==3"
              variant="text"
              color="purple-darken-2"
              icon="mdi-circle-edit-outline"
              :disabled="isEditing"
              @click="item.isEditing=true; isEditing=true; updateTitleString=item.title;">
              </v-btn>
            </div>
          </td>
          <td>
            <v-btn 
              class="mr-5"
              variant="text"
              color="green-darken-2"
              icon="mdi-card-account-details"
              @click="handleClick(item)"
            >
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
        isEditing:false,
        deleteLists: [],
        updateTitleString:"",
        dialog: false,
        showModal: false,
        selectAll:false,
        showUploadModal: false,
        user : null,
    }),
    created() {
        this.user= JSON.parse(localStorage.getItem('user')).user;
        console.log("RequestService.teacherlist()", this.user);
        RequestService.teacherlist(this.fullname, this.nourut).then(result => this.tableLists = result.list);
        this.tableLists.map(v => ({...v, isEditing: false}))
        console.log("list", this.tableLists);
    },
    methods: {
      updateTeacher(idGuru) {
        console.log("Edit for "+idGuru+" with value "+this.updateTitleString)
        RequestService.updateTeacher(idGuru, this.updateTitleString).then(result => {
        if(result.status==200)
        {
            RequestService.teacherlist(["all"]).then(list => this.tableLists = list.list)
            this.isEditing=false
            this.tableLists.map(v => ({...v, isEditing: false}))
        }
        else{
            this.$swal('Update data gagal', 'Silahkan coba lagi', 'error')
        }
        })
      },
      handleClick(item) {
          console.log(item);
          this.$router.push(`/main/teacherdetail/${item.nourut}`);
      },
      editClick(item) {
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
      removeRow () {
       if(this.selectAll)
       {
          console.log("click")
          this.$swal({
            title: 'Yakin Hapus semua? ',
            text: 'semua data akan hilang',
            type: 'warning',
            cancelButtonText: 'Kembali',
            confirmButtonText: 'Hapus',
            showCancelButton: true,
            showCloseButton: true,
            showLoaderOnConfirm: true,
          }).then((result) => {
           if(result.value) {
              RequestService.deleteTeacher(["all"]).then((res)=>{
                console.log("res :", res)
                if(res.status==200)
                {
                   RequestService.teacherlist(["all"]).then(list => this.tableLists = list.list)
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
            this.selectAll=false
          })
       }
        else
        {
           console.log("click", this.deleteLists)
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
              RequestService.deleteTeacher(this.deleteLists).then((res)=>{
                console.log("res :", res)
                if(res.status==200)
                {
                   RequestService.teacherlist(this.deleteLists).then(list => this.tableLists = list.list)
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
        }
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