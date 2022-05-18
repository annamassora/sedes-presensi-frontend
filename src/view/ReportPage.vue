<template>
<v-container>
    <AppBar title="Rekapan Presensi"></AppBar>
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
            <th class="text-left">
              Lokasi
            </th>
            <th class="text-left">
              Check-Out
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in sorted_attendance"
            :key="item.name"
          >
            <td>{{ item.check_in }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.check_out }}</td>
          </tr>
        </tbody>
    </v-table>
</v-container>
</template>

<script>
  import RequestService from '../service/request.service';
  export default {
    data () {
      return {
        attend: [
          // {
          //   Tanggal: 'Frozen Yogurt',
          //   Check_In: 159,
          //   Lokasi: 'Frozen Yogurt',
          //   Check_Out: 159,
          // },

        ],
      }
    },
    created ()  {
      console.log("RequestService.report()")
      RequestService.report().then(result => this.attend = result)
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
<!-- <script>
// import AppBar from './AppBar.vue'
    // export default {
    //   computed: {
    //   },
    //   mounted() {
    //   }
    // }

</script> -->
<style 
lang="css" scoped
></style>