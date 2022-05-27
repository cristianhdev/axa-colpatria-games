<template>
    <div class="container">
        <div class="puntos-avance">

            <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

            </object>
        </div>
        <VentanaBienvenida v-if="ocultarVentana" :sliderActive="false">
            <template #titulo>
                <img v-if="!camaraReady" src="@/assets/img/camarawebImagen.png" alt="" width="240">
            </template>
            <template #texto>

                <div class="contenedor-camara" v-if="camaraReady">

                    <div>
                        <CaramaWeb :width="200" :height="200" @camaraLoad="finLoadCamara" />
                    </div>
                    <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                </div>
                <div v-else>
                    <!-- <img src="/src/img/camaraweb.png" alt="" width="240"> -->
                    <h2>Permitir el acceso a la cámara web.</h2>
                </div>

            </template>
            <template #button-ventana>
                <div v-if="!camaraReady" class="flex-center-elements-row gap-3">
                    <div class="btn-primary-vr1" @click="config.habilitarCamara()">SI</div>
                    <div class="btn-primary-vr1" @click="habilitarCamara">NO</div>
                </div>
                <div v-else>
                    <div :class="{ 'disable-button': !camaraWebCargada }"
                        class="btn-primary-vr1 flex-center-elements-row gap-3" @click="habilitarCamara">
                        CONTINUAR
                    </div>
                </div>
            </template>

        </VentanaBienvenida>
    </div>
</template>

<script setup>
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';
import VentanaBienvenida from "@/components/VentanaBienvenida.vue";
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useConfigStore } from "../stores/config.js";
import party from "party-js";
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import animateCSS from "@/assets/helpers/animations.js";
import { useRouter, useRoute } from "vue-router";


const camaraWebCargada = ref(false)

const ocultarVentana = ref(true);

const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)

const router = useRouter()





onBeforeMount(() => {


})

onMounted(() => {
    /* setTimeout((e) => {
        party.confetti(this);
    }, 1000) */


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


const finLoadCamara = () => {

    camaraWebCargada.value = true
}


const habilitarCamara = () => {

    animateCSS(".ventana-usuario", "fadeOut").then((message) => {

        router.push('/Escenario')
        document.querySelector(".ventana-usuario").style.display = "none";
    });
}



/* const now = computed(() => Date.now()) */
</script>

<style lang="css" scoped>
.disable-button {
    pointer-events: none;
    filter: grayscale(1)
}

.puntos-escena {
  width: 94vw;
  height: 910px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>