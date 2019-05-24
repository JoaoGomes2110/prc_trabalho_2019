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
      name: 'home',
      component: Home
    },
    {
      path: '/competições',
      name: 'competições',
      component: () => import('./views/Competicoes.vue')
    },
    {
      path: '/equipas',
      name: 'equipas',
      component: () => import('./views/Equipas.vue')
    },
    {
      path: '/jogos',
      name: 'jogos',
      component: () => import('./views/Jogos.vue')
    },
    {
      path: '/jogadores',
      name: 'jogadores',
      component: () => import('./views/Jogadores.vue')
    },
    {
      path: '/treinadores',
      name: 'treinadores',
      component: () => import('./views/Treinadores.vue')
    },
    {
      path: '/arbitros',
      name: 'arbitros',
      component: () => import('./views/Arbitros.vue')
    }
  ]
})
