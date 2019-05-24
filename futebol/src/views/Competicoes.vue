<template>
  <v-container fluid fill-height> 
    <layoutBar/>
    <Home/>
  </v-container>
</template>

<script>
import layoutBar from "@/components/layoutBar";
import Home from "@/components/Home";
export default {
  components: {
    Home,
    layoutBar
  }
};
</script>
