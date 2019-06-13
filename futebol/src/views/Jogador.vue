<template>
  <v-container> 
    <MetaJogador :idJogador="$route.params.id" />
  </v-container>
</template>

<script>
import MetaJogador from "@/components/MetaJogador";
export default {
  components: {
    MetaJogador
  }
};
</script>
