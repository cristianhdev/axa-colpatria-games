<template>
    <div class="contenedor-actividad">
        <div class="contenedor-items   center-element">

            <div class=" contenedor-concentrese flex-center-elements-row gap-1">
                <div class=" auto flex-center-elements-column gap-1">


                    <Cronometro v-if="mostrarcronometro" :isCronometroPausa="detenerTiempo"
                        :isRun="habilitarTiempoCronometro" :segundos="actualizarTiempoPausa"
                        @tiempoActual="tiempoActualCronometro" @endTime="continuarActividad" />

                    <div class="btn-ayuda tooltip" v-if="opcionCorrecta" @click="VerInstruccionesPausa">
                        <span class="tooltiptext">Ver Instrucciones</span>
                    </div>


                    <div class=" auto flex-center-elements-column gap-3">
                        <div>
                            <img src="@/assets/img/mensaje.png" width="580" alt="">
                        </div>
                        <div class="contenedor-ejercicio-pausas  gap-1">

                            <div>
                                <div class="titulo-instrucciones-pausas auto">
                                    <div>Instruccion id: {{ id }}</div>
                                </div>
                                <div>
                                    <div v-html="textoDescripcionPause" class="texto-descripcion-pausas"></div>
                                </div>

                            </div>
                            <div>

                                <div :style="styleContenedorEjercicioRealizado"
                                    class="size-imagen-pausas contenedor-ejercicio-realizado  gap-4"
                                    style="position:relative">

                                    <VideoPausas ref="videoPausasRef" :ismonstrarMensajeCambio="monstrarMensajeCambio"
                                        :videoPausaUrl="videoPausa" :isPlayVideo="estadoVideoPause"
                                        :isPauseVideo="!estadoVideoPause" :mostrarImagenUrl="mostrarImagen"
                                        :mostrarimagenReferencia="false" :isLoop="isLoopVideo"
                                        idElementCamara="camaraPausaActivdad" />

                                </div>



                            </div>
                        </div>


                    </div>


                    <div :class="{ 'habilitar-boton-listo': ocultarBotonComenzarActividad }"
                        class="auto  inhabilitar-boton-listo flex-center-elements-row gap-2" style="text-align:center">
                        <div v-if="ocultarBotonComenzarActividad" class="button-bs" @click="OcultarBotonComenzar">
                            COMENZAR</div>
                        <div v-if="isFinCronometro" class="button-bs" @click="OcultarBotonRepetir">
                            REPETIR</div>

                    </div>

                </div>


            </div>

        </div>




        <!-- VENTANA INSTRUCCIONES PAUSA -->
        <InstruccionesPausa v-if="isInstruccionesPausaVisible"
            @eventOcultarInstruccionesVentana="ocultarVentanaInstruccionesPausas"
            :isCerrarVisible="monstrarBotonCerrarInstrucciones"
            @eventOcultarInstrucciones="isInstruccionesPausaVisible = !isInstruccionesPausaVisible">
            <template #texto-instrucciones>
                <div>
                    <img src="@/assets/img/mensaje.png" width="580" alt="">
                </div>
                <div class="contenedor-ejercicio-pausas  gap-1">

                    <div>
                        <div class="titulo-instrucciones-pausas auto">
                            <div>Instrucciones</div>
                        </div>
                        <div>
                            <div v-html="textoDescripcionPause" class="texto-descripcion-pausas"></div>
                        </div>

                    </div>
                    <div>

                        <VideoPausas :videoPausaUrl="videoPausa" :mostrarImagenUrl="mostrarImagen" />



                    </div>
                </div>
            </template>
        </InstruccionesPausa>


    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, reactive } from 'vue'

//COMPONENTES
import Cronometro from '../Cronometro.vue'


import InstruccionesPausa from '@/components/InstruccionesPausas.vue';
import VideoPausas from '@/components/videoPausas.vue';

//DB instruccions
import { PausasActivas } from "@/assets/textos/PausasActivas.js";






import { useConfigStore } from "../../stores/config.js";
import { useRouter } from "vue-router";


//Textos 
import { instruccionesJuegoConcentrese } from "@/assets/textos/TextosInstrucciones.js";


const router = useRouter()

const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)
const ocultarIntroNivel = ref(false)
const ocultarInstrucciones = ref(true)
const finTime = ref(false)
const reiniciarCronometro = ref(false)
const tiempoActividad = ref(null)
const audioAplausos = ref(null)
const audioIncorrecto = ref(null)
const contadorClicks = ref(0)



const validarCambioActividad = ref(null)
//Variables video pausas
const videoPausa = ref(null)
const videoPausasRef = ref(null)
const estadoVideoPause = ref(null)


const opcionCorrecta = ref(false)
const activarBotonContinuar = ref(false)
const innabilitarClick = ref(false)
const camaraWebCargada = ref(false)
const ocultarBotonComenzarActividad = ref(true)
const monstrarBotonCerrarInstrucciones = ref(false)

//Cargamos los ejercicios.
const pausasActivasInstrucciones = ref([])
const srcUrlImagen = ref('ImagenInterrogante')

const continuar = ref(false)

const mensajeFinal = ref(false)

// Variables pausas
const mostrarImagen = ref('')
const mostrarImagenId = ref('')
const isLoopVideo = ref(false)


const instruccionesActividad = ref(instruccionesJuegoConcentrese)

//DetenerCronometro
const detenerCronometro = ref(false)
const tiempoValidado = ref(false)
const isFinCronometro = ref(false)//COn esta variable mostrarmos o ocultamos el boton de repetir.
//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(true)



const imagesActividadesPausas = ref([])
const textoInstruccionPausa = ref('')
const isInstruccionesPausaVisible = ref(false)
const isVisibleNivel = ref(false)


const configPausas = defineProps({
    id: {
        type: [Number, String],
        default: 10
    }
})
//MensajeCambio.
const monstrarMensajeCambio = ref(false)

const stylecuadriculaItems = reactive({
    width: "100%",
    height: "58vh",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    placeItems: "center",
    gridGap: "5vh 10vh"
})


const styleContenedorEjercicioRealizado = reactive({
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "1fr",
    objectFit: "scale-down",
    placeContent: "center",
    placeItems: "center",
    width: "70%"
})




//Posicion audio aleatorio
const posicionAudioAleatorio = ref(0)

const finLoadCamara = () => {
    camaraWebCargada.value = true
    ocultarBotonComenzarActividad.value = true
}

onBeforeMount(() => {

    pausasActivasInstrucciones.value = PausasActivas


    Object.values(pausasActivasInstrucciones.value).forEach((element, index) => {
        const { imagen, id, video, cambio, tiempo, loop } = element
        imagesActividadesPausas.value.push({ imagen: imagen == undefined ? null : imagen, id, video, cambio, finalizado: false, tiempo, loop })
    })

    configurarTiempoPausas(configPausas.id)
    cargarImagen(configPausas.id)
    textoInstruccionPausa.value = Object.values(buscarInstruccionesEjercicio(configPausas.id))


})

const tiempoActualCronometro = (tiempo) => {


    if (validarCambioActividad.value == true) {

        if (tiempoValidado.value == false) {

            if (Math.round((tiempoActividad.value / 2)) == tiempo) {



                estadoVideoPause.value = false
                detenerCronometro.value = true
                monstrarMensajeCambio.value = true
                mostrarcronometro.value = false

                setTimeout(() => {
                    estadoVideoPause.value = true
                    mostrarcronometro.value = true
                    tiempoActividad.value = tiempo
                    monstrarMensajeCambio.value = false
                    detenerCronometro.value = false
                    habilitarCronometro.value = true
                    tiempoValidado.value = true
                }, 4000)


            }
        } else {
            estadoVideoPause.value = true
            /*   tiempoValidado.value = false */
        }
    }
}


const cargarImagen = (id) => {

    let busquedaVideoForId = Object.values(imagesActividadesPausas.value).filter((elementoImagen) => {
        return id == elementoImagen.id
    })


    validarCambioActividad.value = busquedaVideoForId[0].cambio

    videoPausa.value = busquedaVideoForId[0].video
    mostrarImagen.value = busquedaVideoForId[0].imagen
    isLoopVideo.value = busquedaVideoForId[0].loop

}


const textoDescripcionPause = computed(() => textoInstruccionPausa.value[0]?.instruccion)
const mostrarVentanaInstrucciones = computed(() => isInstruccionesPausaVisible.value)
const mostrarVentanaInstruccionesActividad = computed(() => config.mostrarInicioInstrucciones)
const actualizarTiempoPausa = computed(() => tiempoActividad.value)
const detenerTiempo = computed(() => detenerCronometro.value)
const habilitarTiempoCronometro = computed(() => habilitarCronometro.value)

const OcultarBotonComenzar = () => {
    estadoVideoPause.value = true
    habilitarCronometro.value = !habilitarCronometro.value
    ocultarBotonComenzarActividad.value = false
    mostrarcronometro.value = true
}

const OcultarBotonRepetir = () => {
    isFinCronometro.value = false
    habilitarCronometro.value = !habilitarCronometro.value
    ocultarBotonComenzarActividad.value = false
    mostrarcronometro.value = true
    estadoVideoPause.value = true
}

const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    if (isVisibleNivel.value == false) {
        ocultarIntroNivel.value = true
        isVisibleNivel.value = true
    }
}


const buscarInstruccionesEjercicio = (id) => {
    return Object.values(pausasActivasInstrucciones.value).filter(pausa => {
        return pausa.id == id
    })
}


const ocultarVentanaInstruccionesPausas = () => {
    isInstruccionesPausaVisible.value = !isInstruccionesPausaVisible.value
    ocultarBotonComenzarActividad.value = true
    opcionCorrecta.value = true
    mostrarcronometro.value = true
    if (camaraWebCargada.value) {
        styleContenedorEjercicioRealizado.gridTemplateColumns = "1fr 1fr"
    } else {
        styleContenedorEjercicioRealizado.gridTemplateColumns = "repeat( auto-fit, minmax(250px, 1fr))"
    }


}



const configurarTiempoPausas = (id) => {
    //Configuracion de tiempo para el cronometro dependiento de las pausas.
    let tiempoPausa = Object.values(imagesActividadesPausas.value).filter((elementPausaId) => {
        return elementPausaId.id == id
    })[0].tiempo

    console.log("tiempoPausa", tiempoPausa)


    //Configuramos el tiempo de la pausa de acuerdo a lo programado en el archivo pausas
    /* tiempoActividad.value = 0 //Reiniciamos el tiempo */
    tiempoActividad.value = tiempoPausa
}



const continuarActividad = () => {


    /*  monstrarBotonCerrarInstrucciones.value = false
     isInstruccionesPausaVisible.value = false
     opcionCorrecta.value = false
     habilitarCronometro.value = false
     
     tiempoValidado.value = false
     validarCambioActividad.value = false */
    habilitarCronometro.value = false
    isFinCronometro.value = true
    mostrarcronometro.value = false
    estadoVideoPause.value = false

}




</script>

<style lang="css" scoped>
h1 {
    font-family: Source Sans Pro;
    font-size: var(--h1-title-size);
    line-height: var(--h1-title-height);
    margin: 2px;
}

h2 {
    font-family: Source Sans Pro;
    font-size: 1em;
    color: black;
    font-weight: 500;
}

h3 {
    font-family: Source Sans Pro;
    font-size: 1em;
    color: black;
    font-weight: normal;
}



.contenedor-camara-pausa {
    height: 100%
}

.loading-camara {
    position: absolute;
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%
}


.contenedor-concentrese {
    width: fit-content;
    height: 34pc;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
}


.desahbilitado {
    filter: grayscale(1);
    pointer-events: none;

}

.titulo {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: white;
    font-weight: normal;
}

.titulo-instrucciones-pausas {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 1.5em;
    color: black;
    font-weight: bold;
    margin-bottom: 0px
}





.contenedor-ejercicio-pausas {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-content: center;
    place-items: center;
    width: 61vw;
    margin: 0px auto;
}





.remove-click {
    pointer-events: none;
}


.opcion-correcto::before {
    content: '';
    background: url('@/assets/img/check_awert.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(10rem, 0.7rem);
    float: right;
}

.opcion-incorrecto::before {
    content: '';
    background: url('@/assets/img/check_wrong.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(10rem, 0.7rem);
    float: right;
}

.habilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(1)
}

.inhabilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(0)
}



.size-imagen-pausas {
    width: 90%;
    height: 40vh
}

.overflow {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 21px;
    background-color: #02144df2;
    overflow: hidden
}

.texto-descripcion-pausas {
    text-align: justify;
    font-family: Source Sans Pro;
    font-size: 1.1em;
    color: black;
    font-weight: normal;
    padding: 19px;
    height: 22vw;
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
    flex-direction: column;
    overflow-y: auto;
    width: 50vh;
}





@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    .responsive {
        width: auto;
        height: auto;
        object-fit: scale-down;
    }

    .opcion-correcto::before {
        content: '';
        background: url('@/assets/img/check_awert.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(4.5rem, 0.7rem);
        float: right;
    }

    .opcion-incorrecto::before {
        content: '';
        background: url('@/assets/img/check_wrong.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(4.5rem, 0.7rem);
        float: right;
    }

    .size-imagen-pausas {
        width: 80%;
        height: auto
    }
}
</style>