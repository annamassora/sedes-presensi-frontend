<template>
      
      <v-app-bar color="#00695C" priority="1">
        <v-app-bar-nav-icon style="color:white" variant="text" v-if="displayMobile==true" @click="$emit('toogleDrawer')"></v-app-bar-nav-icon>
        <v-toolbar-title style="color:white" >{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

      </v-app-bar>
</template>
<script>

export default {
    props: {
    title: String,
    displayMobile: Boolean,
  },
  methods:{
  }
  // props
  }



</script>
