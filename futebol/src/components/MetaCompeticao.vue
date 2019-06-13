<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs6>
        <v-layout row wrap>
          <h1> {{ competicao.nome }} </h1>
        </v-layout>
        <br/>
        <v-layout row wrap>
          <v-flex xs2>
            <h3>País</h3>
          </v-flex>
          <v-flex xs10>
            <p>{{ competicao.area }}</p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs6>
            <img v-bind:src=" link " max-height="300px" max-width="200px">
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
const lhost = "http://localhost:7300/api";

export default {
  props: ["idCompeticao"],
  data: () => ({
    link: process.env.BASE_URL,
    competicao: {}
  }),
  mounted: async function() {
    try {
      var response = await axios.get(
        lhost + "/competicoes/" + this.idCompeticao
      );
      this.competicao = response.data[0];
      this.link += this.competicao.nome + ".png";
    } catch (e) {
      return e;
    }
  }
};
</script>

<style>
</style>