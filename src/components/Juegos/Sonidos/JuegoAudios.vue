<template>

    <div class="contenedor-actividad gap-2">
        <div v-if="continuarActividad">
            <Cronometro :segundos="15" @endTime="activarNavegacionSliders" />
        </div>
        <div >
            <template v-if="!continuarActividad">
                <h1>Memoriza las siguientes posiciones con tus manos, cuando ya estes listo da clic en continuar.</h1>
            </template>
            <template v-else>
                <h1>Ahora eres capaz de recordar la secuencia</h1>
            </template>
        </div>
        <div class=" flex-center-elements-row gap-3">
            <div class="flex-center-elements-row gap-3">
                <div v-for="i in cantidadItemSliders" :key="`_${i}`">
                    <ItemSliders :finTime="navegacionsEstado" :ocultarNavegacion="!finTiempoCronometro" :id="i" @validarOpciones="validarRespuesta"
                        :comprobar="false" />
                </div>
            </div>
        </div>
        <div v-if="!continuarActividad">
            <div class="auto" style="text-align:center">
                <button class="btn-primary" @click="continuar">CONTINUAR</button>
            </div>
        </div>
        <div v-if="activarBotonComprobar">
            <div class="auto flex-center-elements-row gap-2" style="text-align:center">

                <button v-if="activarBotonComprobar" class="btn-primary" @click="comprobarRespuesta">COMPROBAR</button>
                <button v-if="activarBotonComprobar" class="btn-primary" @click="comprobarRespuesta">REPETIR</button>
                <button v-if="activarBotonComprobar" class="btn-primary" @click="volverEscenario">VOLVER A EJERCICIOS</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, reactive } from 'vue'
import SliderParent from '../Sonidos/SlidersParent.vue'
import ItemSliders from './ItemSliders.vue'
import Cronometro from '../../Cronometro.vue'
import { useRouter, useRoute } from "vue-router";

const router = useRouter()


const cantidadSliders = ref(4)
const cantidadItemSliders = ref(4)
const navegacionsEstado = ref(false)
const continuarActividad = ref(false)
const activarBotonComprobar = ref(false)
const finTiempoCronometro = ref(true)
const correcto = ref(false)

//Guardamos las opciones actuales antes de validar
const opcinesValidacion = reactive({
    posicionSlider: null,
    actual: null,
    respuesta: [],
    orderArray: []
});

const activarNavegacionSliders = () => {
    activarBotonComprobar.value = true

    finTiempoCronometro.value = true
}


const validarRespuesta = (comprobar) => {

    opcinesValidacion.posicionSlider = comprobar.posicionSlider
    opcinesValidacion.actual = comprobar.actual.value
    opcinesValidacion.respuesta = comprobar.validacionArray.value
    opcinesValidacion.orderArray[comprobar.posicionSlider] = { slider: comprobar.posicionSlider, posicion: opcinesValidacion.actual, respuesta: opcinesValidacion.respuesta[0].id }
    console.log(opcinesValidacion.orderArray)
}

const comprobarRespuesta = () => {


    opcinesValidacion.orderArray.forEach(element => {
        console.log(element.posicion)
        console.log(element.respuesta)
        console.log(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion}`)
        if (element.posicion == element.respuesta) {
            correcto.value = true

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


}

const continuar = () => {
    continuarActividad.value = true
    navegacionsEstado.value = true
    finTiempoCronometro.value = false
}


const volverEscenario = () =>{
    router.push("/")
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
    height: 115vh
}
</style>