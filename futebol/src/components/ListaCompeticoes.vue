<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>Competições</h1>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="procura"
              append-icon="search"
              label="Procurar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table class="elevation-1" :headers="cabecalho" :items="competicoes" :search="procura">
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
              >Não foi possível apresentar uma lista das Competições</v-alert>
            </template>
            <template v-slot:items="props">
              <tr @click="rowClicked(props.item)">
                <td class="subheading">{{ props.item.nome }}</td>
                <td class="subheading">{{ props.item.area }}</td>
                <td class="subheading">{{ props.item.nEquipas }}</td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
                outline
              >Não existe nenhuma competição com o nome "{{ procura }}"</v-alert>
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
        text: "País",
        align: "left",
        sortable: true,
        value: "area",
        class: "title"
      },
      {
        text: "Número de Equipas",
        align: "left",
        sortable: true,
        value: "nEquipas",
        class: "title"
      }
    ],
    competicoes: []
  }),
  mounted: async function() {
    try {
      var response = await axios.get(lhost + "/competicoes");
      this.competicoes = response.data;
    } catch (e) {
      return e;
    }
  },
  methods: {
    rowClicked: function (item){
        this.$router.push('/competições/' + item.c.split('#')[1])
      }
  }
};
</script>