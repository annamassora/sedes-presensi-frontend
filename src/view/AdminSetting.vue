<template>
  
    <v-container>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              No
            </th>
            <th class="text-left">
              Keterangan
            </th>
            <th class="text-left">
              Jam Masuk
            </th>
            <th class="text-left">
              Jam Keluar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="(item, index) in timeList"
          :key="item.name"
          >
            <td>{{ index+1 }}</td>
            <td>{{ item.Keterangan }}</td>
            <td>
            <div  v-if="item.isEditingJamMasuk" >
              <v-row>
                <v-col class="v-col-auto " style="align-self:center; width: 180;">
                  <Datepicker v-model="time" timePicker autoApply />
                </v-col>
                <v-col class="v-col-auto" >
                  <v-btn
                    variant="text"
                    color="purple-darken-2"
                    icon="mdi-check"
                    @click="updateTime(item.id, 0, time); item.isEditing=false;">
                  </v-btn>
                  <v-btn
                    variant="text"
                    color="purple-darken-2"
                    icon="mdi-close"
                    @click="item.isEditingJamMasuk=false; isEditing=false">
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              {{ item.JamMasuk }}
              <v-btn 
              variant="text"
              color="purple-darken-2"
              icon="mdi-circle-edit-outline"
              :disabled="isEditing"
              @click="item.isEditingJamMasuk=true; isEditing=true; updateClassString=item.id_time;">
              </v-btn>
            </div>          
          </td>
          <td>
            <div  v-if="item.isEditingJamKeluar" >
            <v-row>
               <v-col class="v-col-auto " style="align-self:center; width: 180;">
                  <Datepicker v-model="time" timePicker autoApply />
                </v-col>
              <v-col class="v-col-auto" >
                <v-btn
                  variant="text"
                  color="purple-darken-2"
                  icon="mdi-check"
                  @click="updateTime(item.id, 1, time); item.isEditing=false;">
                </v-btn>
                <v-btn
                  variant="text"
                  color="purple-darken-2"
                  icon="mdi-close"
                  @click="item.isEditingJamKeluar=false; isEditing=false">
                </v-btn>
              </v-col>
            </v-row>
              
            </div>
            <div v-else>
              {{ item.JamKeluar }}
              <v-btn 
              variant="text"
              color="purple-darken-2"
              icon="mdi-circle-edit-outline"
              :disabled="isEditing"
              @click="item.isEditingJamKeluar=true; isEditing=true; updateClassString=item.id_time;">
              </v-btn>
            </div>
          </td>
        </tr>
        
          
          
        </tbody>
      </v-table>
    </v-container>
    <AddSetting :showModal="showModal" ></AddSetting>     
</template>
<script>
import RequestService from '../service/request.service';
import AddSetting from '@/components/addSetting.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
  export default {
    data: () => ({
        filter: "",
        loading: false,
        isEditing:false,
        timeList:[],
        updateTitleString:"",
        dialog: false,
        showModal: false,
        showUploadModal: false,
        time : ref({ 
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
        }),
    }),
    created() {
        console.log("RequestService.studentlist()");
        RequestService.getTime().then(result => this.timeList = result.timeList);
        this.timeList.map(v => ({...v, isEditingJamMasuk: false,isEditingJamKeluar: false}))
        console.log("list", this.tableLists);
    },
    
    methods: {
      updateTime(id, tipe_jam, timeData) {
        console.log("Edit for "+id+tipe_jam+timeData+" with value "+this.updateTitleString)
        timeData=("0" + timeData.hours).slice(-2) + ":" + ("0" + timeData.minutes).slice(-2)
        console.log(timeData)
        RequestService.updateTime(id, tipe_jam, timeData).then(result => {
        if(result.status==200)
        {
            RequestService.getTime().then(result => this.timeList = result.timeList);
            this.timeList.map(v => ({...v, isEditingJamMasuk: false,isEditingJamKeluar: false}))
            this.isEditing=false
        }
        else{
            this.$swal('Update data gagal', 'Silahkan coba lagi', 'error')
        }
        })
      },
      
    },
    
    components: { AddSetting,Datepicker }
    
}
</script>