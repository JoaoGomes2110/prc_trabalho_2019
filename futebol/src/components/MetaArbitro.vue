<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs2>
        <h4>Nome</h4>
      </v-flex>
      <v-flex xs10>
        <p>{{ arbitro.nome }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

const lhost = "http://localhost:7300/api";

export default {
  props: ["idArbitro"],
  data: () => ({
    arbitro: {}
  }),
  mounted: async function() {
    try {
      var response = await axios.get(lhost + "/arbitros/" + this.idArbitro);
      this.arbitro = response.data[0];
    } catch (e) {
      return e;
    }
  }
};
</script>

<style>
</style>