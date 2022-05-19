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
              </div>
            </v-card-header>
    
            <v-card-actions>
              <v-btn variant="outlined" text color="cyan accent-4">
                Check Out
              </v-btn>
            </v-card-actions>
        </v-card>
</template>
<script>
export default {
    props: {
    location: String,
    datetime: String
  },
  // props
}
  



</script>
