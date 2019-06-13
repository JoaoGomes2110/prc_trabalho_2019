<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Nome</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.nomeEquipa }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Competição</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.nome }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Nome Curto</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.nomeCurto }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>País</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.area }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Estadio</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.estadio }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Email</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.email }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Website</h4>
          </v-flex>
          <v-flex xs10>
            <p>
              <a v-bind:href="equipa.website">{{ equipa.website }}</a>
            </p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Cores Clube</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.coresClube }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>Ano de Fundação</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.anoFundacao }}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs2>
            <h4>TLA</h4>
          </v-flex>
          <v-flex xs10>
            <p>{{ equipa.tla }}</p>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-img v-bind:src=" equipa.crestUrl " max-height="300px" max-width="200px"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

const lhost = 'http://localhost:7300/api'

export default {
  props: ['idEquipa'],
  data: () => ({
    equipa: {},
    ref: ''
  }),
  mounted: async function () {
    try {
      var response = await axios.get(lhost + '/equipas/' + this.idEquipa)
      this.equipa = response.data[0]
    } catch (e) {
      return e
    }
  }
}
</script>
<style>
</style>
