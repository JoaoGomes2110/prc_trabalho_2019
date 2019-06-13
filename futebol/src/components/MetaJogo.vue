<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-layout column fill-height>
            <br>
            <h1 class="text-lg-center">Jogo nº {{ jogo.numeroDeJogo }}</h1>
            <h3 class="text-lg-center">{{ jogo.data.split("T")[0] }}</h3>
          </v-layout>

          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="teal--text" @click="rowClickedEquipa(jogo.eC)">{{ jogo.nomeC }}</v-list-tile-title>
                <v-list-tile-sub-title>Equipa Casa</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title><b>{{ jogo.gC }}</b></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-divider light></v-divider>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title><b>{{ jogo.gF }}</b></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="teal--text" @click="rowClickedEquipa(jogo.eF)">{{ jogo.nomeF }}</v-list-tile-title>
                <v-list-tile-sub-title>Equipa Fora</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider light></v-divider>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                    <h4>Arbitros:</h4>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider light></v-divider>
            <v-template v-for="(ar,index) in arbitros" v-bind:key="ar">
              <v-list-tile >
                <v-list-tile-action></v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                     <a
                        v-bind:href="'http://localhost:8080/arbitros/' + ar.a.split('#')[1]"
                      >{{ ar.nome }}</a>
                    
                    {{  }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider
              v-if="index + 1  < arbitros.length"
              :key="index"
            ></v-divider>
            </v-template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
const lhost = "http://localhost:7300/api";

export default {
  props: ["idJogo"],
  data: () => ({
    jogo: {},
    arbitros: []
  }),
  mounted: async function() {
    try {
      var response = await axios.get(lhost + "/jogos/" + this.idJogo);
      this.jogo = response.data[0];
    } catch (e) {
      return e;
    }
    try {
      var response2 = await axios.get(lhost + "/jogos/" + this.idJogo +"/arbitros");
      this.arbitros = response2.data;
    } catch (e) {
      return e;
    }
  },
   methods: {
    rowClickedEquipa: function(item){
      this.$router.push('/equipas/' + item.split('#')[1])
    }
  }
};
</script>

<style>
</style>