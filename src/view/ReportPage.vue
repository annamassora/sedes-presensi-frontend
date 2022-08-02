<template>
  <Datepicker v-model="month" monthPicker autoApply :closeOnAutoApply="true" @update:modelValue="getMonth" style="margin: 1rem; margin-right:50vw;" />
    <v-table
     theme="dark"
     fixed-header
     height="auto"
    >
        <thead>
          <tr>
            
            <th class="text-left">
              Check-In
            </th>
            <!-- <th class="text-left">
              Suhu
            </th> -->
            <th class="text-left">
              Lokasi
            </th>
            <th class="text-left">
              Check-Out
            </th>
            <th v-if="user.role==3" class="text-left">
              Lembur
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in attend"
            :key="item.name"
          >
            <td>{{ item.check_in }}</td>
            <!-- <td>{{ item.temperature }}</td> -->
            <td>{{ item.location }}</td>
            <td>{{ item.check_out }}</td>
            <td v-if="user.role==3">{{ item.lembur }}</td>
          </tr>
        </tbody>
    </v-table>
</template>

<script>
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'
  import RequestService from '../service/request.service';
  export default {
    data () {
      return {
        user : null,
        attend: [
        ],
        month : ref({ 
            year: new Date().getFullYear(),
            month: new Date().getMonth()
            
        })
      }
    },
    components: { Datepicker },
    methods:{
        getMonth()
        {
          console.log("datepicker: ", this.month);
          RequestService.report(this.month.year, this.month.month).then(result => this.attend = result.attendance)
        }
    },
    created ()  {
      console.log("RequestService.report()")
      this.user= JSON.parse(localStorage.getItem('user')).user;
      RequestService.report(this.month.year, this.month.month).then(result => this.attend = result.attendance)
      console.log("attend",this.attend)
    },
    computed : {
      sorted_attendance(){
        console.log(this.attend)
        return  ((this.attend.check_in!=null) ? this.attend.check_in.slice().sort() : this.attend);
      }
    }
  }
</script>

<style 
lang="css" scoped
></style>