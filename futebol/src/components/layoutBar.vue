<template>
  <nav>
    <v-toolbar class="grey lighten-4" flat fixed app>
      <v-toolbar-side-icon @click="showMenu = !showMenu"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="showMenu" class="grey lighten-4" flat app>
      <br/>
      <v-list-tile-title class="title text-lg-center">Futebol</v-list-tile-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.nome">
          <v-list-tile-content>
            <v-btn left @click="get(item.nome)" flat small>{{ item.nome }}</v-btn>
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
      this.$router.push('/'+ nome.toLowerCase() + '/')
    }
  }
}
</script>

<style>
</style>
