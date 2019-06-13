<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>Classificações</h1>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="procura"
              append-icon="search"
              label="Procurar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="cabecalho" :items="classificaçoes" :search="procura">
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
              >Não foi possível apresentar as Classificações</v-alert>
            </template>
            <template v-slot:items="props">
              <tr @click="rowClicked(props.item)">
                <td class="subheading">{{ props.item.pos }}</td>
                <td class="subheading">{{ props.item.nome }}</td>
                <td class="subheading">{{ props.item.pontos }}</td>
                <td class="subheading">{{ props.item.nJogos }}</td>
                <td class="subheading">{{ props.item.nVitorias }}</td>
                <td class="subheading">{{ props.item.nEmpates }}</td>
                <td class="subheading">{{ props.item.nDerrotas }}</td>
                <td class="subheading">{{ props.item.nGolosMarcados }}</td>
                <td class="subheading">{{ props.item.nGolosSofridos }}</td>
                <td class="subheading">{{ props.item.diferencaDeGolos }}</td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert
                :value="true"
                color="error"
                icon="warning"
                outline
              >Não existe nenhuma equipa com o nome "{{ procura }}"</v-alert>
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
  props: ["idCompeticao"],
  data: () => ({
    procura: "",
    cabecalho: [
      {
        text: "Posição",
        align: "left",
        sortable: true,
        value: "pos",
        class: "title"
      },
      {
        text: "Nome",
        align: "left",
        sortable: true,
        value: "nome",
        class: "title"
      },
      {
        text: "Pontos",
        align: "left",
        sortable: true,
        value: "pontos",
        class: "title"
      },
      {
        text: "Jogos",
        align: "left",
        sortable: true,
        value: "nJogos",
        class: "title"
      },
      {
        text: "Vitórias",
        align: "left",
        sortable: true,
        value: "nVitorias",
        class: "title"
      },
      {
        text: "Empates",
        align: "left",
        sortable: true,
        value: "nEmpates",
        class: "title"
      },
      {
        text: "Derrotas",
        align: "left",
        sortable: true,
        value: "nDerrotas",
        class: "title"
      },
      {
        text: "GM",
        align: "left",
        sortable: true,
        value: "nGolosMarcados",
        class: "title"
      },
      {
        text: "GS",
        align: "left",
        sortable: true,
        value: "nGolosSofridos",
        class: "title"
      },
      {
        text: "DG",
        align: "left",
        sortable: true,
        value: "diferencaDeGolos",
        class: "title"
      }
    ],
    classificaçoes: []
  }),
  mounted: async function() {
    try {
      var response = await axios.get(lhost + "/competicoes/" +this.idCompeticao + '/classificacoes');
      this.classificaçoes = response.data;
    } catch (e) {
      return e;
    }
  },
  methods: {
    rowClicked: function (item){
        this.$router.push('/equipas/' + item.e.split('#')[1])
      }
  }
};
</script>