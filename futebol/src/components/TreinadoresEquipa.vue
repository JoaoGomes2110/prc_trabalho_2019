<template>
  <v-container>
    <v-layout>
      <v-card width="300">
        <h2 class="text-lg-center">Treinadores:</h2>
        <v-list two-line>
          <template v-for="(tr,index) in treinadores">
          <v-list-tile v-bind:key="tr">
            <v-list-tile-content>
              <v-list-tile-title>
                <a
                  v-bind:href="'http://localhost:8080/treinadores/' + tr.t.split('#')[1]"
                >{{ tr.treinador }}</a>
              </v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ tr.papel }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider
              v-if="index + 1  < treinadores.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

const lhost = "http://localhost:7300/api";

export default {
  props: ["idEquipa"],
  data: () => ({
    treinadores: []
  }),
  mounted: async function() {
    try {
      var response = await axios.get(
        lhost + "/equipas/" + this.idEquipa + "/treinadores"
      );
      this.treinadores = response.data;
    } catch (e) {
      return e;
    }
  }
};
</script>

<style>
</style>