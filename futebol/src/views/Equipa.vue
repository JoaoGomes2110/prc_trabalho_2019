<template>
  <v-container> 
    <MetaEquipa :idEquipa="$route.params.id"/>
    <TreinadoresEquipa :idEquipa="$route.params.id"/>
    <JogadoresEquipa :idEquipa="$route.params.id"/>
    <JogosEquipa :idEquipa="$route.params.id"/>
  </v-container>
</template>

<script>
import MetaEquipa from "@/components/MetaEquipa";
import TreinadoresEquipa from "@/components/TreinadoresEquipa"
import JogadoresEquipa from "@/components/JogadoresEquipa";
import JogosEquipa from "@/components/JogosEquipa";

export default {
  components: {
    MetaEquipa,
    TreinadoresEquipa,
    JogadoresEquipa,
    JogosEquipa
  }
};
</script>
