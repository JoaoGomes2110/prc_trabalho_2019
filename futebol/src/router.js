import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'homes',
      component: Home
    },
    {
      path: '/competições',
      name: 'competições',
      component: () => import('./views/Competicoes.vue')
    },
    {
      path: '/competições/:id',
      name: 'competição',
      component: () => import('./views/Competicao.vue')
    },
    {
      path: '/equipas',
      name: 'equipas',
      component: () => import('./views/Equipas.vue')
    },
    {
      path: '/equipas/:id',
      name: 'equipa',
      component: () => import('./views/Equipa.vue')
    },
    {
      path: '/jogos',
      name: 'jogos',
      component: () => import('./views/Jogos.vue')
    },
    {
      path: '/jogos/:id',
      name: 'jogo',
      component: () => import('./views/Jogo.vue')
    },
    {
      path: '/jogadores',
      name: 'jogadores',
      component: () => import('./views/Jogadores.vue')
    },
    {
      path: '/jogadores/:id',
      name: 'jogador',
      component: () => import('./views/Jogador.vue')
    },
    {
      path: '/treinadores',
      name: 'treinadores',
      component: () => import('./views/Treinadores.vue')
    },
    {
      path: '/treinadores/:id',
      name: 'treinador',
      component: () => import('./views/Treinador.vue')
    },
    {
      path: '/arbitros',
      name: 'arbitros',
      component: () => import('./views/Arbitros.vue')
    },
    {
      path: '/arbitros/:id',
      name: 'arbitro',
      component: () => import('./views/Arbitro.vue')
    }
  ]
})
