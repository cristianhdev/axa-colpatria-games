import { createRouter, createWebHistory } from 'vue-router'
import BienvenidaView from '../views/BienvenidaView.vue'
import VentanaUsuarioView from '../views/VentanaUsuarioView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BienvenidaView
      //component: () => import('../views/VentanaEscenarioView.vue')
    },
    {
      path: '/Escenario',
      name: 'escenario',
      component: () => import('../views/VentanaEscenarioView.vue')
    },
    {
      path: '/camaraWebPruebas',
      name: 'camarawebPruebas',
      component: () => import('@/components/Camaraweb/CamaraWeb.vue')
    },
    {
      path: '/Usuario',
      name: 'usuario',
      component: VentanaUsuarioView
    },
    {
      path: '/WebCamera',
      name: 'webcamera',
      component: () => import('../views/ventanaCamaraView.vue')
    },
    {
      path: '/JuegoOjos',
      name: 'juegoojos',
      component: () => import('../views/VentanaJuegoVisualView.vue')
    },
    {
      path: '/JuegoPosturas',
      name: 'juegoposturas',
      component: () => import('../views/ventanaJuegoPosturas.vue')
    },
    {
      path: '/JuegoManos',
      name: 'juegomanos',
      component: () => import('../views/VentanaJuevoManosView.vue')
    },
    {
      path: '/JuegoRuleta',
      name: 'juegoruleta',
      component: () => import('../views/VentanaJuegoRuletaView.vue')
    },
    {
      path: '/JuegoAudios',
      name: 'juegoaudios',
      component: () => import('../views/VentanaJuegoSonidosView.vue')
    },
    {
      path: '/JuegoAudiosPosturas',
      name: 'juegoaudiosPosturas',
      component: () => import('../views/ventanaJuegoAudiosPosturasView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
   
    /*  { path: "*.*", redirect: '/' } */
  ]
})

export default router
