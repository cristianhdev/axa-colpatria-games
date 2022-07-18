import { createRouter, createWebHistory } from 'vue-router'
import BienvenidaView from '../views/BienvenidaView.vue'
import TestPausasView from '../views/VentanaTestPausas.vue'



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
      component: () => import('../views/VentanaUsuarioView.vue')
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
      component: () => import('../views/VentanaJuegoManosView.vue')
    },
    {
      path: '/JuegoRuleta',
      name: 'juegoruleta',
      component: () => import('../views/VentanaJuegoRuletaView.vue')
    },
    {
      path: '/JuegoAudiosPosturas',
      name: 'juegoaudiosPosturas',
      component: () => import('../views/ventanaJuegoAudiosPosturasView.vue')
    },
    {
      path: '/JuegoConcentrese',
      name: 'juegoconcentrese',
      component: () => import('../views/VentanaConcentreseView.vue')
      /*  component:{ 
         default:import('../views/VentanaConcentreseView.vue'),
         menuPrincipal
       } */
    },
    {
      path: '/VentanaFinal',
      name: 'ventanafinal',
      component: () => import('../views/VentanaFinalJuegoView.vue')
    },
    {
      path: '/InstruccionesPausas',
      name: 'instruccionespausas',
      component: () => import('../views/VentanaTestInstruccionesPausas.vue')
    },
    {
      path: '/VentanaPuntosFinal',
      name: 'ventanapuntosfinal',
      component: () => import('@/components/VentanaPuntosFinal.vue')
    },
    {
      path: '/MenuPrincipal',
      name: 'menuprincipal',
      component: () => import('@/components/MenuPrincipal.vue')
    },
    {
      path: '/TestPausas/:id',
      name: 'testPausas',
      component: () => import('../views/VentanaTestPausas.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})


export default router
