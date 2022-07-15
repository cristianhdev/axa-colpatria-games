<template>
    <div class="container">

        <VentanaIntroduccion v-if="ocultarVentana" :sliderActive="false">
            <template #titulo v-if="!camaraReady">
                <div class="camara-web">

                </div>
                <!-- <img  src="" alt="" width="240"> -->
            </template>
            <template #texto>

                <div class="contenedor-camara" v-if="camaraReady">
                    <CaramaWeb :width="200" :height="200" @camaraLoad="finLoadCamara" />
                    <div class="flex-center-elements-row center-element" v-if="!camaraWebCargada">
                        <span class="spiner"></span>
                    </div>




                </div>
                <div v-else>
                    <!-- <img src="/src/img/camaraweb.png" alt="" width="240"> -->
                    <div class="titulos-ventanas-intro">¿Permite el acceso a su cámara web?</div>
                </div>

            </template>
            <template #button-ventana>
                <div v-if="!camaraReady" class="flex-center-elements-row gap-4">
                    <div class="btn-primary" @click="config.habilitarCamara()">SI</div>
                    <div class="btn-primary" @click="habilitarCamara">NO</div>
                </div>
                <div v-else>
                    <!--  :class="{ 'disable-button': !camaraWebCargada }" -->
                    <div
                        class="btn-primary flex-center-elements-row gap-4" @click="habilitarCamara">
                        CONTINUAR
                    </div>
                </div>
            </template>

        </VentanaIntroduccion>
    </div>
</template>

<script setup>

import VentanaIntroduccion from "@/components/VentanaIntroduccion.vue";
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


.camara-web {
    background-image: url('@/assets/img/camara-icono.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    width: 43vh;
    height: 22vh;
    position: relative;
    top: -43px;
    margin: 0px auto;
}

.title {
    text-align: center
}


.contenedor-camara {
    margin-top: -2rem
}
</style>