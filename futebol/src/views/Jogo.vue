<template>
  <v-container fluid fill-height> 
    <MetaJogo :idJogo="$route.params.id"/>
  </v-container>
</template>

<script>
import MetaJogo from "@/components/MetaJogo";
export default {
  components: {
    MetaJogo
  }
};
</script>
