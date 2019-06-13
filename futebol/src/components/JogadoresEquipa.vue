<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10>
        <v-card>
          <v-card-title>
            <h1>Jogadores</h1>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="procura"
              append-icon="search"
              label="Procurar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table class="elevation-1" :headers="cabecalho" :items="jogadores" :search="procura">
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
              >Não foi possível apresentar os Jogadores</v-alert>
            </template>
            <template v-slot:items="props">
              <tr @click="rowClicked(props.item)">
                <td class="subheading">{{ props.item.jogador }}</td>
                <td class="subheading">{{ props.item.posicao}}</td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
                outline
              >Não existe nenhum jogador com o nome "{{ procura }}"</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
const lhost = "http://localhost:7300/api";
export default {
  props: ["idEquipa"],
  data: () => ({
    procura: "",
    cabecalho: [
      {
        text: "Nome",
        align: "left",
        sortable: true,
        value: "nome",
        class: "title"
      },
      {
        text: "Posição",
        align: "left",
        sortable: false,
        value: "posicao",
        class: "title"
      }
    ],
    jogadores: []
  }),
  mounted: async function() {
    try{
      var response = await axios.get(lhost + "/equipas/" +this.idEquipa + '/jogadores');
      this.jogadores = response.data;
    } catch (e) {
      return e;
    }
  },
  methods: {
    rowClicked: function (item){
        this.$router.push('/jogadores/' + item.j.split('#')[1])
      }
  }
};
</script>