<template>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" :urlImagenFondo="marco_nivel_1">
        <!-- <template #mensaje-nivel>
            1
            
        </template> -->
    </VentanaIntroNivel>
    <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarVentanaInstrucciones">
        <template #texto>
            <h2>Para este ejercicio, debe estar de pie y en posición erguida.

                Entrelace los dedos de sus manos atrás de su espalda (como se muestra en el ejemplo), realice
                respiraciones profundas llevando los codos hacia atrás al igual que los hombros.
            </h2>
            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="ocultarVentanaInstrucciones">
                <button class="btn-primary-ghost"> CONTINUAR</button>
            </div>

        </template>
    </VentanaInstrucciones>
    <div class="contenedor-actividad">
        <VentanaPuntosFinal v-if="mensajeFinal" @continuarTriviaEvent="continuarTrivia"
            @volverEscenarioEvent="volverEscenario">
            <template #puntos-buenos>
                {{ puntosBuenos }}
            </template>
            <template #mensaje-respuestas>
                <span>RESPUESTAS SEGUIDAS</span>
            </template>
            <template #mensaje-opcion>
                <div v-if="puntosBuenos > 0">
                    <span>¡GENIAL!</span>
                </div>
                <div v-else>
                    <span>¡LO SENTIMOS!</span>
                </div>

            </template>
            <template #botones>
                <!-- <button class="btn-primary-vr1" @mousemove="confity" @click="continuarTrivia">CONTINUAR TRIVIA!</button> -->
                <button class="btn-primary-vr1" @mousemove="confity" @click="volverEscenario">VOLVER A
                    EJERCICIOS</button>
                <!--  <button class="btn-primary-vr1" @mousemove="confity" id="salir">SALIR</button> -->
            </template>
        </VentanaPuntosFinal>
        <!--   <div v-if="mensajeFinal"
            class="mensaje-puntos center-element flex-center-elements-column gap-2 border-axa padding-2 animate__animated animate__fadeIn">
            <div>
                <h1>
                    ¡La actividad ha terminado! <br> Genial {{ puntosBuenos }} respuestas correctas
                </h1>
            </div>
            <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="volverEscenario">VOLVER A EJERCICIOS</button>
            </div>
        </div>-->


        <div class="contendor-interrogante" v-if="imagenRamdom">
            <div class="imagen-random">
                <div class="imagen-random-img">
                    <div>
                        <img :id="getOpcionRandomSeleccionada()?.id" :src="getOpcionRandomSeleccionada()?.imagen"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
        <Cronometro v-if="opcionCorrecta" segundos="10" @endTime="FinOpcion" />
        <div class="contenedor-elementos flex-center-elements-column gap-2  center-element">
            <div v-if="continuar">

                <div v-if="!opcionCorrecta">
                    <h2>¿En que posicion se encontraba la pausa activa?</h2>
                </div>

            </div>
            <div v-else>
                <div v-if="!opcionCorrecta">
                    <h2>Visualiza y memoriza las siguientes pausas activas.</h2>
                </div>
            </div>
            <div v-if="!opcionCorrecta" :style="styleCuadricula" id="cuadricula" class="gap-2">
                <div v-for="(imagen, index) in getRamdomimagen" :key="`cuadrado-${index}`">
                    <!-- v-for="i in filas" :key="i" -->
                    <div class="contenedor-opciones   border-axa animate__animated animate__fadeIn  animate__zoomIn"
                        v-if="visible">
                        <CuadriculaNumero :numero="imagen.valorCheck" :posicion="index + 1"
                            :opcion="opcionIdInterroganteSeleccionada" :girarOpciones="continuar"
                            @finAnimacionFlip="finAnimacionFlip" @OpcionCorrecto="opcionSiguiente"
                            :srcUrlImagen="imagen.imagen" />
                    </div>
                    <div v-else>
                        <div class="spiner center-element">

                        </div>
                    </div>
                </div>
            </div>
            <div v-if="opcionCorrecta" class="contenedor-ejercicio-realizado">
                <div>
                    <div class="auto">
                        <h2>Ahora realiza el ejercicio.</h2>
                    </div>
                    <div class="flex-center-elements-row gap-3">
                        <div class="contenedor-ejercicios" v-if="camaraReady">

                            <div>
                                <CaramaWeb :width="285" :height="250" @camaraLoad="finLoadCamara" />
                            </div>
                            <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                        </div>
                        <div class="contenedor-ejercicios">
                            <img :id="opcionIdInterroganteSeleccionada" :src="opcionImagenInterroganteSeleccionada"
                                alt="" width="285" height="250">
                        </div>
                    </div>

                </div>

            </div>

            <div v-if="visible" class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button v-if="!continuar" class="btn-primary-ghost" @click="continuarActividad">CONTINUAR</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CuadriculaNumero from '../Posturas/cuadroNumero.vue'
import Cronometro from '../../Cronometro.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import { ref, computed, onBeforeMount, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from "vue-router";

//Imagenes Demo
import { useConfigStore } from "../../../stores/config.js";
import Imagen1Figuras from '@/assets/img/Ejercicio1.png'
import Imagen2Figuras from '@/assets/img/Ejercicio2.png'
import Imagen3Figuras from '@/assets/img/Ejercicio3.png'
import Imagen4Figuras from '@/assets/img/Ejercicio4.png'
import Imagen5Figuras from '@/assets/img/Ejercicio5.png'
import Imagen6Figuras from '@/assets/img/Ejercicio6.png'

//Ejericicios Postura
import Ejercicio1 from '@/assets/ejercicios/Ej1.gif'
import Ejercicio2 from '@/assets/ejercicios/Ej2.gif'
import Ejercicio3 from '@/assets/ejercicios/Ej3.gif'
import Ejercicio4 from '@/assets/ejercicios/Ej4.gif'



const router = useRouter()
const numeracionCuadricula = ref(0)
const numero = ref(null)
const visible = ref(false)
const ocultarInstrucciones = ref(true)
const ocultarIntroNivel = ref(false)
const imagenRamdom = ref(false)
const cargarActividad = ref(false)
const mensajeFinal = ref(false)
const puntosBuenos = ref(0)
const puntosMalos = ref(0)
const opcionIdInterroganteSeleccionada = ref(0)
const opcionImagenInterroganteSeleccionada = ref('')
const opcionCorrecta = ref(false)
const config = useConfigStore();
const camaraReady = computed(() => config.isCamara)

onBeforeMount(() => {

})

onMounted(() => {

})

const configActividad = reactive({
    imagenFondo: {
        type: String,
        default: 'marco_nivel_2'
    },
    nivel: {
        type: Number,
        default: 0
    },
    filas: {
        type: Number,
        default: 3
    }
});

/* { imagen: " @/assets/img/Ejercicio4.png", valorCheck: 4 },
    { imagen: "@/assets/img/Ejercicio5.png", valorCheck: 5 },
    { imagen: "@/assets/img/Ejercicio6.png", valorCheck: 6 }*/

/*  { imagen: "@/assets/img/Ejercicio4.png", valorCheck: 4 },
{ imagen: "@/assets/img/Ejercicio5.png", valorCheck: 5 },
{ imagen: "@/assets/img/Ejercicio6.png", valorCheck: 6 }*/

const imagenesReferenciaRandom = ref([])

const imagenesReferencia = ref([])




const finTiempo = ref(false)
const continuar = ref(false)

const mostrarCronometro = ref(false)
const opcionSeleccionada = ref(null)

const styleCuadricula = reactive({
    width: "70%",
    height: "40vh",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(30vw, 1fr))",
    placeItems: "center",
    alignItems: "center"
})


const configurarActividad = (valor) => {

    if (valor == 1) {
        imagenesReferenciaRandom.value = [
            { imagen: Ejercicio1, valorCheck: 1 },
            { imagen: Ejercicio2, valorCheck: 2 },
            { imagen: Ejercicio3, valorCheck: 3 },
            { imagen: Ejercicio4, valorCheck: 4 }
        ]

        imagenesReferencia.value = [
            { imagen: Ejercicio1, valorCheck: 1 },
            { imagen: Ejercicio2, valorCheck: 2 },
            { imagen: Ejercicio3, valorCheck: 3 },
            { imagen: Ejercicio4, valorCheck: 4 }
        ]

        styleCuadricula.gridTemplateColumns = "repeat(auto-fill, minmax(30vw, 1fr))"

    } else {
        imagenesReferenciaRandom.value = [
            { imagen: Ejercicio1, valorCheck: 1 },
            { imagen: Ejercicio2, valorCheck: 2 },
            { imagen: Ejercicio3, valorCheck: 3 },
            { imagen: Ejercicio4, valorCheck: 4 },
            { imagen: Imagen5Figuras, valorCheck: 5 },
            { imagen: Imagen6Figuras, valorCheck: 6 }
        ]

        imagenesReferencia.value = [
            { imagen: Ejercicio1, valorCheck: 1 },
            { imagen: Ejercicio2, valorCheck: 2 },
            { imagen: Ejercicio3, valorCheck: 3 },
            { imagen: Ejercicio4, valorCheck: 4 },
            { imagen: Imagen5Figuras, valorCheck: 5 },
            { imagen: Imagen6Figuras, valorCheck: 6 }
        ]
        styleCuadricula.gridTemplateColumns = "repeat(auto-fill, minmax(16vw, 1fr))"
    }
}

const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    ocultarIntroNivel.value = true
}

const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
    cargarActividad.value = true
    inicioActividad()
}

const inicioActividad = () => {
    getRamdomimagenInterrogante()
    let loading = setTimeout(() => {
        visible.value = true
        clearTimeout(loading)
    }, 2500)
}

const getRamdomimagen = computed(() => {
    imagenesReferencia.value.sort(() => Math.random() - 0.5)
    return imagenesReferencia.value
})






const continuarActividad = () => {
    continuar.value = !continuar.value
    imagenRamdom.value = !imagenRamdom.value
}





const opcionSiguiente = () => {
    /* continuar.value = !continuar.value */
    imagenRamdom.value = !imagenRamdom.value
    puntosBuenos.value = puntosBuenos.value + 1

    opcionCorrecta.value = true

}

const getRamdomimagenInterrogante = () => {
    if ((Object.values(imagenesReferenciaRandom.value).length - 1) == 0) {


    } else {
        numero.value = Math.floor(Math.random() * (Object.values(imagenesReferenciaRandom.value).length - 1) + 1)
        opcionSeleccionada.value = (Object.values(imagenesReferenciaRandom.value))[numero.value]
        imagenesReferenciaRandom.value.splice(numero.value, 1)
    }

}


const getOpcionRandomSeleccionada = () => {


    opcionIdInterroganteSeleccionada.value = opcionSeleccionada.value?.valorCheck
    opcionImagenInterroganteSeleccionada.value = opcionSeleccionada.value?.imagen

    return {
        imagen: opcionSeleccionada.value?.imagen,
        id: opcionSeleccionada.value?.valorCheck
    }


}

const FinOpcion = () => {

    if (puntosBuenos.value == 1) {
        mensajeFinal.value = true
    } else {
        continuar.value = !continuar.value
        opcionCorrecta.value = !opcionCorrecta.value
        opcionIdInterroganteSeleccionada.value = 0
        getRamdomimagenInterrogante()
    }

}

const finAnimacionFlip = () => {

    continuar.value = true
    mostrarCronometro.value = !mostrarCronometro.value
    let loading = setTimeout(() => {
        visible.value = true
        clearTimeout(loading)

    }, 500)

}


const finAnimacion = () => {
    visible.value = false
}

const volverEscenario = () => {
    config.setActividadActual(router.currentRoute.value.path)
    puntosBuenos.value = 0
    ocultarInstrucciones.value = false
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
    background-image: url(@/assets/img/interrogante.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 230px;
    text-align: center;
}

.contenedor-elementos {
    width: 90%;
    height: 90vh;
    background-image: url(@/assets/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background-position: center center;
}

.contenedor-ejercicios {
    border: 1px solid white;
    padding: 3px;
    width: 285px;
    height: 250px;
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
}

.contenedor-ejercicio-realizado {
    width: 50vw;
    text-align: center
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%;

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