<template>
    <div class="container">

        <VentanaBienvenida v-if="ocultarVentana" :sliderActive="false" ruta="Escenario">
            <template #titulo>
                Permitir el acceso a la cámara web.
            </template>
            <template #texto>
                <div v-if="!camaraReady" class="flex-center-elements-row gap-3">
                    <div class="btn-primary" @click="config.habilitarCamara()">SI</div>
                    <div class="btn-primary" @click="config.inhabilitarCamara()">NO</div>
                </div>
                <div v-if="camaraReady">
                    <div id="camara">
                        <CaramaWeb :width="300" :height="300" />
                    </div>  

                </div>
                <div v-else>
                    <img src="/src/img/camaraweb.png" alt="" width="240">
                </div>

            </template>
            <template #button-ventana >
                CONTINUAR
            </template>

        </VentanaBienvenida>
    </div>
</template>

<script setup>
import VentanaBienvenida from "@/components/VentanaBienvenida.vue";
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useConfigStore } from "../stores/config.js";
import CaramaWeb from '../components/Camaraweb/CamaraWeb.vue'

import { useRouter, useRoute } from "vue-router";


const router = useRouter()





onBeforeMount(() => {


})

onMounted(() => {

    // From anywhere
    //handsfree.value.data.hands.landmarks

    /* hands.start() */
    // From inside a plugin
    /*   hands.use('logger', data => {
          if (!data.hands) return
  
          // Show a log whenever the left hand is visible
          if (data.hands.landmarksVisible[0]) {
              console.log(' mano izquierda')
          }
  
          if (data.hands.landmarksVisible[1]) {
              console.log(' mano derecha')
          } */

    /*   document.addEventListener('handsfree-data', event => {
          const data = event.detail
          if (!data.hands) return
  
          // Show a log whenever the right hand for person #2 is visible
          if (data.hands.landmarksVisible[3]) {
              console.log(data.hands.landmarks[3])
          }
      }) */
    /* }) */
});



const habilitahabilitarCamaraWebrcamaraweb = () => {
  
     router.push('/Escenario')
}


const ocultarVentana = ref(true);

const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)

/* const now = computed(() => Date.now()) */
</script>

<style lang="css" scoped>
.container {
    /* display: none */
}
</style>