<template>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        :urlImagenFondo="marco_nivel_1">
        <template #mensaje-nivel>
            1
            <!--    {{ configActividad.nivel }} -->
        </template>
    </VentanaIntroNivel>
    <VentanaInstrucciones v-if="ocultarInstrucciones" >
        <template #texto>
            <h2>Para este ejercicio, con la mano derecha debe agarrar los dedos de la mano izquierda y llevarlos
                suavemente hacia atrás como se muestra en la imagen para realizar ejercicios de estiramiento (cambiamos
                con la otra mano), Mantenemos esta postura por 10 segundos cada una.
            </h2>
            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="ocultarVentanaInstrucciones">
                <button class="btn-primary-ghost"> CONTINUAR</button>
            </div>

        </template>
    </VentanaInstrucciones>
    <div class="contenedor-actividad gap-2 ">

        <Cronometro v-if="activarCronometro" :segundos="15" @endTime="activarNavegacionSliders" />

        <div class="contenedor-mensaje flex-center-elements-column gap-3">
            <div v-if="mostrarCamara" class="flex-center-elements-column gap-1">
                <div class="titulo auto">
                    <h2>Instrucciones
                    </h2>
                </div>
                <div class="contenedor-ejercicios" v-if="camaraReady">

                    <div>
                        <CaramaWeb :width="200" :height="200" @camaraLoad="finLoadCamara" />
                    </div>
                    <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                </div>
            </div>
            <div v-if="!mostrarCamara">
                <div class="titulo auto" v-if="!continuarActividad">
                    <h2>Memoriza las siguientes posiciones con tus manos, cuando ya estes listo da clic en
                        continuar.
                    </h2>
                </div>
                <div v-else>
                    <h2>Ahora organiza la secuencia</h2>
                </div>
            </div>
            <div class="contenedor-opciones flex-center-elements-column gap-3">

                <div class=" flex-center-elements-row gap-3">
                    <div class="flex-center-elements-row gap-1">
                        <div v-for="i in cantidadItemSliders" :key="`_${i}`">
                            <ItemSliders :finTime="navegacionsEstado" :ocultarNavegacion="!finTiempoCronometro" :id="i"
                                @validarOpciones="validarRespuesta" :comprobar="false" />
                        </div>
                    </div>
                </div>
                <div v-if="!continuarActividad">
                    <div class="auto" style="text-align:center">
                        <button class="btn-primary-ghost" @click="continuar">CONTINUAR</button>
                    </div>
                </div>
                <div>
                    <div class="auto flex-center-elements-row gap-2" style="text-align:center">

                        <button v-if="activarBotonComprobar" class="btn-primary-ghost"
                            @click="comprobarRespuesta">COMPROBAR</button>
                        <button v-if="activarBotonRepetir" class="btn-primary-ghost" @click="repetirOpciones">REPETIR</button>
                        <button v-if="mostrarCamara" class="btn-primary-ghost" @click="volverEscenario">VOLVER AL ESCENARIO</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useConfigStore } from "../../../stores/config.js";
import { ref, computed, reactive } from 'vue'
import SliderParent from '../Sonidos/SlidersParent.vue'
import ItemSliders from './ItemSliders.vue'
import Cronometro from '../../Cronometro.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import { useRouter, useRoute } from "vue-router";
const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)

const router = useRouter()


const cantidadSliders = ref(4)
const cantidadItemSliders = ref(4)
const navegacionsEstado = ref(false)
const continuarActividad = ref(false)
const activarBotonComprobar = ref(false)
const activarBotonRepetir = ref(false)
const activarBotonVolver = ref(false)
const finTiempoCronometro = ref(true)
const ocultarInstrucciones = ref(true)
const ocultarIntroNivel = ref(false)
const mostrarCamara = ref(false)
const activarCronometro = ref(false)
const correcto = ref(false)

//Guardamos las opciones actuales antes de validar
const opcinesValidacion = reactive({
    posicionSlider: null,
    actual: null,
    respuesta: [],
    orderArray: []
});


const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    ocultarIntroNivel.value = true
}

const activarNavegacionSliders = () => {
    activarBotonComprobar.value = true
    activarCronometro.value = false
    finTiempoCronometro.value = true
}

const repetirOpciones = () => {
    activarBotonRepetir.value=false
    activarBotonComprobar.value = false
    activarCronometro.value = true
    finTiempoCronometro.value = false
}


const validarRespuesta = (comprobar) => {

    opcinesValidacion.posicionSlider = comprobar.posicionSlider
    opcinesValidacion.actual = comprobar.actual.value
    opcinesValidacion.respuesta = comprobar.validacionArray.value
    opcinesValidacion.orderArray[comprobar.posicionSlider] = { slider: comprobar.posicionSlider, posicion: opcinesValidacion.actual, respuesta: opcinesValidacion.respuesta[0].id }
    console.log(opcinesValidacion.orderArray)
}

const comprobarRespuesta = () => {
    let puntos = 0
    activarCronometro.value = false
    activarBotonRepetir.value = true
    opcinesValidacion.orderArray.forEach(element => {
        if (element.posicion == element.respuesta) {
            correcto.value = true
            puntos++
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.boxShadow = '-1px -1px 16px inset green';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.borderRadius = '12px';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.backgroundColor = '#4caf50';

        } else {
            correcto.value = false

            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.boxShadow = '-1px -1px 16px inset red';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.borderRadius = '12px';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} `).style.backgroundColor = '#a93a3a';
        }
    });

    if (puntos == opcinesValidacion.orderArray.length) {
        activarBotonRepetir.value = false
        mostrarCamara.value = true
        activarBotonComprobar.value = false
      
    } 


}

const continuar = () => {
    continuarActividad.value = true
    activarCronometro.value = true
    navegacionsEstado.value = true
    finTiempoCronometro.value = false
}

const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
    /*   cargarActividad.value = true
      inicioActividad() */
}


const volverEscenario = () => {
    router.push("/escenario")
}

</script>

<style lang="css" scoped>
h1 {
    text-align: center;
}

.contenedor-actividad {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 22px;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoPantallaIntermedias.png');
    background-size: 100% 100%
}

.contenedor-mensaje {
    width: 90%;
    height: 90vh;
    background-image: url(@/assets/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background-position: center center;
}


.contenedor-opciones {
    width: 90vw;
}

.titulo {
    width: 69%;
    margin: 0px auto
}
</style>