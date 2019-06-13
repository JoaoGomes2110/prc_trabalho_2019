<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-layout column fill-height>
            <br>
            <h1 class="text-lg-center">{{ treinador.nome }}</h1>
          </v-layout>

          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ treinador.dNasc.split('T')[0] }}</v-list-tile-title>
                <v-list-tile-sub-title>Data de Nascimento</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-divider light></v-divider>

            <v-list-tile two-line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ treinador.nacionalidade }}</v-list-tile-title>
                <v-list-tile-sub-title>Nacionalidade</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-divider light></v-divider>

            <v-list-tile two-line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ treinador.paisNascimento }}</v-list-tile-title>
                <v-list-tile-sub-title>Pais de Nascimento </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action></v-list-tile-action>
            </v-list-tile>

            <v-divider light></v-divider>
            <v-list-tile two line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ treinador.nomeEquipa }}</v-list-tile-title>
                <v-list-tile-sub-title>Equipa</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider light></v-divider>
            <v-list-tile two line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ treinador.papel }}</v-list-tile-title>
                <v-list-tile-sub-title>Papel</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider light></v-divider>
            <v-list-tile two line>
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title> <a v-bind:href="ref"> {{ treinador.nome }}</a></v-list-tile-title>
                <v-list-tile-sub-title>Página da Wikipedia</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <br/>
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
  props: ["idTreinador"],
  data: () => ({
    treinador: {},
    ref: ''
  }),
  mounted: async function() {
    try {
      var response = await axios.get(lhost + "/treinadores/" + this.idTreinador);
      this.treinador = response.data[0];
      const link = 'https://pt.wikipedia.org/wiki/'
      this.ref = link + this.treinador.nome.replace(/ /,'_')
    } catch (e) {
      return e;
    }
  }
};
</script>

<style>
</style>