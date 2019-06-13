<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex xs-6>
        <v-card class="teal lighten-5" height="125">
          <v-card-title primary-title>
            <b>Número de Competições</b>
          </v-card-title>
          <v-card-text>{{ nCompeticoes.nCompeticoes }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs-6>
        <v-card class="teal lighten-5"  height="125">
          <v-card-title primary-title>
            <b>Número de Equipas</b>
          </v-card-title>
          <v-card-text>{{ nEquipas.nEquipas }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs-6>
        <v-card class="teal lighten-5"  height="125">
          <v-card-title primary-title>
           <b> Número de Jogos</b>
          </v-card-title>
          <v-card-text>{{ nJogos.nJogos }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs-6>
        <v-card class="teal lighten-5"  height="125">
          <v-card-title primary-title>
            <b>Número de Jogadores</b>
          </v-card-title>
          <v-card-text>{{ nJogadores.nJogadores }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs-6>
        <v-card class="teal lighten-5"  height="125">
          <v-card-title primary-title>
            <b>Número de Treinadores</b>
          </v-card-title>
        <v-card-text class="">{{ nTreinadores.nTreinadores }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs-6>
        <v-card class="teal lighten-5"  height="125">
          <v-card-title primary-title>
            <b>Número de Arbitros </b>
          </v-card-title>
        <v-card-text>{{ nArbitros.nArbitros }}</v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
const lhost = "http://localhost:7300/api/counts"
export default {
  data: () => ({
      nCompeticoes: {},
      nEquipas: {},
      nJogos: {},
      nJogadores: {},
      nTreinadores:{},
      nArbitros:{},
    }),
  mounted: async function (){
    try{
       var response = await axios.get(lhost + '/competicoes')
       this.nCompeticoes = response.data[0]
    }
    catch(e){
      alert(e)
    }
    try{
       var response = await axios.get(lhost + '/equipas')
       this.nEquipas = response.data[0]
    }
    catch(e){
      alert(e)
    }
    try{
       var response = await axios.get(lhost + '/jogos')
       this.nJogos = response.data[0]
    }
    catch(e){
      alert(e)
    }
    try{
       var response = await axios.get(lhost + '/jogadores')
       this.nJogadores = response.data[0]
    }
    catch(e){
      alert(e)
    }
    try{
       var response = await axios.get(lhost + '/treinadores')
       this.nTreinadores = response.data[0]
    }
    catch(e){
      alert(e)
    }
    try{
       var response = await axios.get(lhost + '/arbitros')
       this.nArbitros = response.data[0]
    }
    catch(e){
      alert(e)
    }
  }
};
</script>