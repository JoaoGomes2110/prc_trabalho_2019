<template>
  <v-container>
    <MetaCompeticao :idCompeticao="$route.params.id"/>
    <Classificacao :idCompeticao="$route.params.id"/>
    <JogosPorCompeticao :idCompeticao="$route.params.id"/>
  </v-container>
</template>

<script>
import MetaCompeticao from "@/components/MetaCompeticao"
import Classificacao from "@/components/Classificacao";
import JogosPorCompeticao from "@/components/JogosPorCompeticao";
export default {
  components: {
    MetaCompeticao,
    Classificacao,
    JogosPorCompeticao
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>
