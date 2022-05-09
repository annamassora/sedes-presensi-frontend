<template>
  <v-container fluid >
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <p class="decode-result">Last result: <b>{{ result }}</b></p>
              <div class="center stream">
                <QrcodeStream @decode="onDecode" class="mb"/>
              </div>
            </v-card>
          </v-col>
        </v-row>
  </v-container>

  PRESESNSI
</template>

<script>
import { QrcodeStream} from 'qrcode-reader-vue3'
import RequestService from '../service/request.service';
export default {
  data() {
    return {
      result: '',
    }
  },
  components: {
    QrcodeStream,
  },
  props: {
  },
  methods: {
  onDecode (decodedString) {
    this.result = decodedString
    RequestService.attendance(decodedString)
    console.log("decodedString :", decodedString)
  },
},
  async mounted() {
  }
}
</script>

<style lang="css" scoped>
</style>