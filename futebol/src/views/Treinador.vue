<template>
  <v-container> 
    <layoutBar/>
    <MetaTreinador :idTreinador="$route.params.id" />
  </v-container>
</template>

<script>
import MetaTreinador from "@/components/MetaTreinador";
export default {
  components: {
    MetaTreinador
  }
};
</script>
