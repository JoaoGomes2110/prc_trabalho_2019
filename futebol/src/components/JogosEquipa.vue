<template>
  <v-container >
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>Jogos</h1>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="procura"
              append-icon="search"
              label="Procurar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="cabecalho" :items="jogos" :search="procura">
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
              >Não foi possível apresentar os Jogos</v-alert>
            </template>
            <template v-slot:items="props">
              <tr @click="rowClicked(props.item)">
                <td class="subheading">{{ props.item.numeroDeJogo }}</td>
                <td class="subheading">{{ props.item.nomeC }}</td>
                <td class="subheading">{{ props.item.nomeF }}</td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
                outline
              >Não existe nenhum jogo com o nome "{{ procura }}"</v-alert>
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
        text: "Número de Jogo",
        align: "left",
        sortable: true,
        value: "numeroDeJogo",
        class: "title"
      },
      {
        text: "Casa",
        align: "left",
        sortable: true,
        value: "nomeC",
        class: "title"
      },
      {
        text: "Fora",
        align: "left",
        sortable: true,
        value: "nomeF",
        class: "title"
      }
    ],
    jogos: []
  }),
  mounted: async function() {
    try{
      var response = await axios.get(lhost + "/equipas/" +this.idEquipa + '/jogos');
      this.jogos = response.data;
    } catch (e) {
      return e;
    }
  },
  methods: {
    rowClicked: function (item){
        this.$router.push('/jogos/' + item.j.split('#')[1])
      }
  }
};
</script>