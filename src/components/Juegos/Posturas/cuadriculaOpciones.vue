<template>
    <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarInstrucciones = !ocultarInstrucciones">
        <template #texto>
            <h2>Para este ejercicio, debe estar de pie y en posición erguida.

                Entrelace los dedos de sus manos atrás de su espalda (como se muestra en el ejemplo), realice
                respiraciones profundas llevando los codos hacia atrás al igual que los hombros.
            </h2>

        </template>
    </VentanaInstrucciones>
    <div class="contenedor-actividad">
        <div v-if="mensajeFinal"
            class="mensaje-puntos center-element flex-center-elements-column gap-2 border-axa padding-2 animate__animated animate__fadeIn">
            <div>
                <h1>
                    ¡La actividad ha terminado! <br> Genial {{ puntosBuenos }} respuestas correctas
                </h1>
            </div>
            <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="volverEscenario">VOLVER A EJERCICIOS</button>
            </div>
        </div>
        <div class="contendor-interrogante" v-if="continuar">
            <div class="imagen-random">
                <div class="imagen-random-img">
                    <img :id="getOpcionRandomSeleccionada().id" :src="getOpcionRandomSeleccionada().imagen" alt="">
                </div>
            </div>
        </div>
        <Cronometro v-if="mostrarCronometro" segundos="30" @endTime="FinOpcion" />
        <div class="contenedor-elementos flex-center-elements-column gap-2  center-element">
            <div v-if="continuar">

                <div>
                    <h2>Selecciona la posición donde se encontraba la imagen.</h2>
                </div>

            </div>
            <div v-else>
                <div>
                    <h2>Visualiza y memoriza las siguientes posiciones</h2>
                </div>
            </div>
            <div class="cuadricula  gap-2">
                <div v-for="(imagen, index) in getRamdomimagen" :key="`cuadrado-${index}`">
                    <!-- v-for="i in filas" :key="i" -->
                    <div class="contenedor-opciones   border-axa animate__animated animate__fadeIn  animate__zoomIn"
                        v-if="visible">
                        <CuadriculaNumero :numero="imagen.valorCheck" :posicion="index + 1"
                            :opcion="getOpcionRandomSeleccionada()?.id" :girarOpciones="continuar"
                            @finAnimacion="finAnimacion" @finAnimacionFlip="finAnimacionFlip"
                            @OpcionCorrecto="opcionSiguiente" :srcUrlImagen="imagen.imagen" />
                    </div>
                    <div v-else>
                        <div class="spiner center-element">

                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!continuar" class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="continuarActividad">CONTINUAR</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CuadriculaNumero from '../Posturas/cuadroNumero.vue'
import Cronometro from '../../Cronometro.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from "vue-router";

const router = useRouter()

const numeracionCuadricula = ref(0)
const numero = ref(null)
const visible = ref(false)
const ocultarInstrucciones = ref(true)
const mensajeFinal = ref(false)
const puntosBuenos = ref(0)
const puntosMalos = ref(0)

onBeforeMount(() => {
    getRamdomimagenInterrogante()
    let loading = setTimeout(() => {
        visible.value = true
        clearTimeout(loading)
    }, 2500)
})


const imagenesReferenciaRandom = ref([
    { imagen: "/src/img/Ejercicio1.png", valorCheck: 1 },
    { imagen: "/src/img/Ejercicio2.png", valorCheck: 2 },
    { imagen: "/src/img/Ejercicio3.png", valorCheck: 3 },
    { imagen: "/src/img/Ejercicio4.png", valorCheck: 4 },
    { imagen: "/src/img/Ejercicio5.png", valorCheck: 5 },
    { imagen: "/src/img/Ejercicio6.png", valorCheck: 6 }
])

const imagenesReferencia = ref([
    { imagen: "/src/img/Ejercicio1.png", valorCheck: 1 },
    { imagen: "/src/img/Ejercicio2.png", valorCheck: 2 },
    { imagen: "/src/img/Ejercicio3.png", valorCheck: 3 },
    { imagen: "/src/img/Ejercicio4.png", valorCheck: 4 },
    { imagen: "/src/img/Ejercicio5.png", valorCheck: 5 },
    { imagen: "/src/img/Ejercicio6.png", valorCheck: 6 }
])


const finTiempo = ref(false)
const continuar = ref(false)

const mostrarCronometro = ref(false)
const opcionSeleccionada = ref(null)



const getRamdomimagen = computed(() => {
    imagenesReferencia.value.sort(() => Math.random() - 0.5)
    return imagenesReferencia.value
})


const getRamdomimagenInterrogante = () => {
    if (Object.values(imagenesReferenciaRandom.value).length != 0) {
        numero.value = Math.floor(Math.random() * (Object.values(imagenesReferenciaRandom.value).length - 1) + 1)
        opcionSeleccionada.value = imagenesReferenciaRandom.value[numero.value]
        imagenesReferenciaRandom.value.splice(numero.value, 1)
    }

}

const getOpcionRandomSeleccionada = () => {

    if (Object.values(imagenesReferenciaRandom.value).length - 1 != 0) {
        return {
            imagen: opcionSeleccionada.value.imagen,
            id: opcionSeleccionada.value.valorCheck
        }
    }

}


const continuarActividad = () => {
    continuar.value = !continuar.value
}


const cuadriculaElementos = defineProps({

    filas: {
        type: Number,
        default: 3
    }
})


const opcionSiguiente = () => {
    continuar.value = !continuar.value
    puntosBuenos.value = puntosBuenos.value + 1
    console.log("puntosBuenos", puntosBuenos.value)
    if (puntosBuenos.value == 2) {
        mensajeFinal.value = true
    }
    else {
        getRamdomimagenInterrogante()
    }
}

const FinOpcion = () => {
    continuar.value = !continuar.value
}

const finAnimacionFlip = () => {
    mostrarCronometro.value = true
    continuar.value = true

}


const finAnimacion = () => {
    visible.value = false
    mostrarCronometro.value = false
    let loading = setTimeout(() => {
        visible.value = true
        clearTimeout(loading)
    }, 500)

}

const volverEscenario = () => {
    router.push('/Escenario')
}

</script>

<style lang="css" scoped>
.contendor-interrogante {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50vh);
    z-index: 999999;
    background-image: url(/src/img/interrogante.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 230px;
    text-align: center;
}

.contenedor-elementos {
    width: 90%;
    height: 90vh;
    background-image: url(/src/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background-position: center center;
}

.imagen-random {
    overflow: hidden;
    height: 152px;
    margin-top: 22px;
}

.imagen-random-img {
    overflow: hidden;
}

.imagen-random-img img {
    width: 9vw;
    height: 15vh;
}


.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('/src/img/fondoEscenario.png');
    background-size: 100% 100%;

}

.cuadricula {
    width: 70%;
    height: 40vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    align-items: center;
}

.contenedor-opciones {
    width: 218px;
    height: 18vh;
    text-align: center;
    border: 1px solid white;
    background-color: #027180;
    color: white
}

.mensaje-puntos {
    background-color: white;
    z-index: 999;
    height: 57vh;
    width: 107vh;
}
</style>