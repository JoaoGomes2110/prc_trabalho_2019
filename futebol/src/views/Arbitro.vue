<template>
  <v-container> 
    <MetaArbitro :idArbitro="$route.params.id"/>
    <ArbitroJogos :idArbitro="$route.params.id"/>
  </v-container>
</template>

<script>
import MetaArbitro from "@/components/MetaArbitro";
import ArbitroJogos from "@/components/ArbitroJogos"
export default {
  components: {
    MetaArbitro,
    ArbitroJogos
  }
};
</script>
