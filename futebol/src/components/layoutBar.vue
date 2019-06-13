<template>
  <nav>
    <v-toolbar class="teal lighten-5" flat fixed app>
      <v-toolbar-side-icon @click="showMenu = !showMenu"></v-toolbar-side-icon>
      <v-spacer/>
      <v-btn right @click="goBack" light color="dark">
        <v-icon left>arrow_back</v-icon>Voltar
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="showMenu" class="teal lighten-5" flat app>
      <br>
      <v-list-tile-title class="title text-lg-center">Futebol</v-list-tile-title>
      <br>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.nome">
          <v-list-tile-content>
            <v-btn left @click="get(item.nome)" flat small>
              <b>{{ item.nome }}</b>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data: () => ({
    showMenu: false,
    items: [
      { nome: 'Home' },
      { nome: 'Competições' },
      { nome: 'Equipas' },
      { nome: 'Jogos' },
      { nome: 'Jogadores' },
      { nome: 'Treinadores' },
      { nome: 'Arbitros' }
    ],
    right: null
  }),
  methods: {
    get: function (nome) {
      this.$router.push('/' + nome.toLowerCase() + '/')
    },
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
