<template>
    <div class="botonMenu" @click="mostrarMenu"></div>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" :urlImagenFondo="marco_nivel_1">
        <!-- <template #mensaje-nivel>
            1
            
        </template> -->
    </VentanaIntroNivel>
    <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarVentanaInstrucciones">
        <template #texto>
            <!-- <div>
                <h2>Para este ejercicio, debe estar de pie y en posición erguida.
    
                    Entrelace los dedos de sus manos atrás de su espalda (como se muestra en el ejemplo), realice
                    respiraciones profundas llevando los codos hacia atrás al igual que los hombros.
                </h2>
            </div> -->
            <div>
                <sliderInstrucciones :numerodeSliders="0" :ocultarNavegacion="true"
                    :tituloInstruccion="instruccionesActividad">


                    <template #sliders>

                        <div class="item-slider">
                            <img src="@/assets/img/Intrucciones_posturas.png" class="responsive-imagen-slider" alt="">
                        </div>
                        <!--  <div>
                            <img src="@/assets/img/Intrucciones_audios.png" width="800" alt="">
                        </div>
 -->
                    </template>
                </sliderInstrucciones>
            </div>
            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="ocultarVentanaInstrucciones">
                <div class="btn-primary"> CONTINUAR</div>
            </div>

        </template>
    </VentanaInstrucciones>
    <div class="contenedor-actividad">
        <VentanaPuntosFinal v-if="mensajeFinal" @continuarTriviaEvent="continuarTrivia">
            <template #puntos-buenos>
                <div v-if="puntosBuenos > 0">
                    <span>¡Genial!</span>
                </div>
                <div v-else>
                    <span>¡Lo sentimos!</span>
                </div>
            </template>
            <template #mensaje-respuestas>
                <div v-if="puntosBuenos > 0" class="auto">
                    <img :src="ChetList" width="180" height="180" alt="">
                </div>
                <div v-else class="auto">
                    <img :src="WarnList" width="180" height="180" alt="">
                </div>
            </template>
            <template #mensaje-opcion>
                <span style="font-size:2em">{{ puntosBuenos }}</span> <span>Respuestas seguidas</span>
            </template>
            <template #botones>
                <!-- <button class="btn-primary-vr1" @mousemove="confity" @click="continuarTrivia">CONTINUAR TRIVIA!</button> -->
                <div class="btn-primary" @mousemove="confity" @click="volverEscenario">VOLVER AL
                    ESCENARIO</div>
                <!--  <button class="btn-primary-vr1" @mousemove="confity" id="salir">SALIR</button> -->
            </template>
        </VentanaPuntosFinal>


        <div>

            <div class="contenedor-items flex-center-elements-column gap-2  center-element">
                <div v-if="mostrarMensajesIntroduccion">

                    <div v-if="IsVisibleInstruccion">
                        <div class="title">¿En qué posición se encontraba la pausa activa?</div>
                    </div>

                    <div v-else>
                        <div class="title">Memorice la ubicación de cada uno de los ejercicios.</div>


                    </div>

                </div>

                <!--  -->
                <Cronometro v-if="mostrarcronometro" :isCronometroPausa="detenerTiempo" :isRun="habilitarCronometro"
                    :segundos="actualizarTiempoPausa" @endTime="FinOpcion" @tiempoActual="tiempoActualCronometro" />
                <div class="btn-ayuda tooltip" v-if="opcionCorrecta" @click="VerInstruccionesPausa">
                    <span class="tooltiptext">Ver Instrucciones</span>
                </div>
                <div :style="stylecontendorInterrogante">
                    <div v-if="imagenRamdom">
                        <div class="imagen-random">
                            <div class="imagen-random-img">
                                <div>

                                    <img :id="getOpcionRandomSeleccionada()?.id"
                                        :src="getOpcionRandomSeleccionada()?.imagen" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!opcionCorrecta" :style="styleCuadricula" class="auto" id="cuadricula">
                        <div style="border: 1px solid var(--azul-axa);
    border-radius: 12px;overflow: hidden;" v-for="(imagen, index) in getRamdomimagen" :key="`cuadrado-${index}`">
                            <!-- v-for="i in filas" :key="i" -->
                            <div v-if="!continuar"
                                class="contenedor-opciones   animate__animated animate__fadeIn  animate__zoomIn">

                                <CuadriculaNumero v-if="visible" :numero="imagen.valorCheck" :posicion="index + 1"
                                    :idImagenEjericicio="imagen.idInstruccion"
                                    :opcion="opcionIdInterroganteSeleccionada" :girarOpciones="girarOpcionesFiguras"
                                    @finAnimacionFlip="finAnimacionFlip" @OpcionCorrecto="opcionSiguiente"
                                    @OpcionInCorrecto="aumentarPuntosMalos"
                                    :srcUrlImagen="mostrarImagen ? imagen.imagen : Interrogante">

                                </CuadriculaNumero>
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="opcionCorrecta">
                    <div class="titulo auto">
                        <h4>Si por recomendación médica no debe realizar el ejercicio, por favor
                            abstenerse.</h4>
                        <h3>Cuando esté listo para hacer la pausa activa, debe dar clic sobre el botón comenzar para que
                            el tiempo del cronómetro inicie.</h3>
                        <h2>¡Hora de realizar el ejercicio!</h2>

                    </div>
                    <div class="contenedor-ejercicio-realizado  gap-4">
                        <!-- v-if="monstrarMensajeCambio" -->
                        <!-- <div class="mensaje-cambio" >
                            CAMBIO DE LADO...
                        </div> -->
                        <div :style="styleItemsCuadricula">
                            <!--  <img :id="opcionIdInterroganteSeleccionada" :src="opcionImagenInterroganteSeleccionada"
                                alt="" style="width: auto;height: 43vh"> -->
                            <VideoPausas :ismonstrarMensajeCambio="monstrarMensajeCambio" :videoPausaUrl="videoPausa"
                                :isPlayVideo="estadoVideoPause" :isPauseVideo="!estadoVideoPause"
                                :mostrarImagenUrl="opcionImagenInterroganteSeleccionada" />
                        </div>
                        <div class="contenedor-ejercicios" v-if="camaraReady">

                            <div>
                                <CaramaWeb :width="250" :height="250" @camaraLoad="finLoadCamara" />
                                <div class="flex-center-elements-column loading-camara" v-if="!camaraWebCargada">
                                    <span class="spiner"></span>
                                </div>
                            </div>
                            <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                        </div>
                        <!--  <div class="flex-center-elements-row gap-3">

                       
                    </div> -->

                    </div>
                    <!--  <div class="auto flex-center-elements-row gap-2" style="text-align:center;height:5vh">
                        <div v-if="finTiempo" class="btn-primary" @click="continuarSiguienteActividad">CONTINUAR</div>
                    </div> -->
                </div>
                <div v-if="ocultarBotonComenzarActividad"
                    :class="{ 'habilitar-boton-listo': ocultarBotonComenzarActividad }"
                    class="auto  inhabilitar-boton-listo flex-center-elements-row gap-2" style="text-align:center"
                    @click="OcultarBotonComenzar">
                    <div class="button-bs"> COMENZAR</div>
                </div>
                <div class="auto flex-center-elements-row gap-2" style="text-align:center;height:5vh">
                    <div v-if="BotonInicio" class="btn-primary" @click="continuarActividad">CONTINUAR</div>
                </div>
            </div>
        </div>




        <InstruccionesPausa v-if="isInstruccionesPausaVisible"
            @eventOcultarInstruccionesVentana="ocultarVentanaInstruccionesPausas"
            :isCerrarVisible="monstrarBotonCerrarInstrucciones"
            @eventOcultarInstrucciones="isInstruccionesPausaVisible = !isInstruccionesPausaVisible">>
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
                    <!-- <div
                        :style="{ background: `transparent url(${opcionImagenInterroganteSeleccionada}) no-repeat center center`, width: '320px', height: '320px', backgroundSize: '100% 100%', width: '300px' }">
                        <img :id="mostrarImagen" :src="mostrarImagen" alt="" width="320" height="320">
                    </div> -->
                    <div>
                        <VideoPausas :videoPausaUrl="videoPausa"
                            :mostrarImagenUrl="opcionImagenInterroganteSeleccionada" />
                    </div>


                </div>
            </template>
        </InstruccionesPausa>

        <MenuPrincipal :isvisible="false" @eventInstrucciones="InstruccionesMostrar" />
    </div>
</template>

<script setup>

import { ref, computed, onBeforeMount, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../../../stores/config.js";

//COMPONENTES
import CuadriculaNumero from '../Posturas/cuadroNumero.vue'
import Cronometro from '../../Cronometro.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import InstruccionesPausa from '@/components/InstruccionesPausas.vue';
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import MenuPrincipal from '@/components/MenuPrincipal.vue';
import Interrogante from '@/assets/img/manos/pregunta.png'
import VideoPausas from '@/components/videoPausas.vue';

//Imagenes Demo
import WarnList from '@/assets/img/warn-list.png';
import ChetList from '@/assets/img/chek-list.png';




//DB instruccions
import {PausasActivas} from "@/assets/textos/PausasActivas.js";

//Textos 
import { instruccionesJuegoPosturas } from "@/assets/textos/TextosInstrucciones.js";

//Textos intrucciones
const instruccionesActividad = ref(instruccionesJuegoPosturas)

const router = useRouter()
const numeracionCuadricula = ref(0)
const numero = ref(null)
const visible = ref(true)
const ocultarInstrucciones = ref(true)
const ocultarIntroNivel = ref(false)
const isVisibleNivel = ref(false)
const imagenRamdom = ref(false)
const cargarActividad = ref(false)
const mensajeFinal = ref(false)
const puntosBuenos = ref(0)
const puntosMalos = ref(0)
const opcionIdInterroganteSeleccionada = ref(0)
const opcionImagenInterroganteSeleccionada = ref('')
const opcionCorrecta = ref(false)
const config = useConfigStore();
const isInstruccionesPausaVisible = ref(false)
const camaraReady = computed(() => config.isCamara)
const textoInstruccionPausa = ref('')
const pausasActivasInstrucciones = ref([])
const camaraWebCargada = ref(false)
const habilitarSiguienteOpcion = ref(false)
const mostrarImagen = ref(true)
const girarOpcionesFiguras = ref(false)
const mostrarMensajesIntroduccion = ref(true)
const imagenesReferenciaRandom = ref([])
const ordernInicial = ref([])
const imagenesReferencia = ref([])
const imagesActividadesPausas = ref([])
const finTiempo = ref(false)
const continuar = ref(false)
const mostrarCronometro = ref(false)
const opcionSeleccionada = ref(null)
const IsVisibleInstruccion = ref(false)
const BotonInicio = ref(true)
const tiempoActividad = ref(10)



const monstrarBotonCerrarInstrucciones = ref(false)

const ocultarBotonComenzarActividad = ref(false)

const validarCambioActividad = ref(null)

//DetenerCronometro
const detenerCronometro = ref(false)
const tiempoValidado = ref(false)
//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(false)

//Variables video pausas
const videoPausa = ref(null)
const videoPausasRef = ref(null)
const estadoVideoPause = ref(null)

//MensajeCambio.
const monstrarMensajeCambio = ref(false)

onBeforeMount(() => {

})


onMounted(() => {
    pausasActivasInstrucciones.value = Object.values(PausasActivas).filter(pausa => {
        return pausa.tipo == "recordarPosicion"
    })
    pausasActivasInstrucciones.value = pausasActivasInstrucciones.value.sort(() => Math.random() - 0.5);


     

    imagenesReferencia.value = imagenesReferencia.value.sort(() => Math.random() - 0.5)


    Object.values(pausasActivasInstrucciones.value).forEach((element, index) => {
        const { imagen, id, cambio, tiempo,video } = element
        imagesActividadesPausas.value.push({ imagen: imagen == undefined ? null : imagen, idInstruccion: id, cambio, tiempo,video })
    })




    //Excluimos las imagenes que estn null, es decir no tiene imagen.
    imagesActividadesPausas.value = Object.values(imagesActividadesPausas.value).filter(pausa => {
        return pausa.imagen !== null
    })


    //Colocamos aleatorias las imagenes.
    imagesActividadesPausas.value = imagesActividadesPausas.value.sort(() => Math.random() - 0.5);



})

const configurarActividad = (valor) => {

    //5 10 18 4 8 16 35 3 12

    if (valor == 1) {
        imagenesReferenciaRandom.value = [
            { id: 1, ...imagesActividadesPausas.value[0], valorCheck: 1 },
            { id: 2, ...imagesActividadesPausas.value[1], valorCheck: 2 },
            { id: 3, ...imagesActividadesPausas.value[2], valorCheck: 3 },
            { id: 4, ...imagesActividadesPausas.value[3], valorCheck: 4 }
        ]

        imagenesReferencia.value = [
            { id: 1, ...imagesActividadesPausas.value[0], valorCheck: 1 },
            { id: 2, ...imagesActividadesPausas.value[1], valorCheck: 2 },
            { id: 3, ...imagesActividadesPausas.value[2], valorCheck: 3 },
            { id: 4, ...imagesActividadesPausas.value[3], valorCheck: 4 }
        ]



        styleCuadricula.gridGap = "5vh 20vh"
        styleCuadricula.gridTemplateColumns = `repeat(2,1fr)`
        styleItemsCuadricula.height = "28vh"

    } else {
        imagenesReferenciaRandom.value = [
            { id: 1, ...imagesActividadesPausas.value[0], valorCheck: 1 },
            { id: 2, ...imagesActividadesPausas.value[1], valorCheck: 2 },
            { id: 3, ...imagesActividadesPausas.value[2], valorCheck: 3 },
            { id: 4, ...imagesActividadesPausas.value[3], valorCheck: 4 },
            { id: 5, ...imagesActividadesPausas.value[4], valorCheck: 5 },
            { id: 6, ...imagesActividadesPausas.value[5], valorCheck: 6 }
        ]

        imagenesReferencia.value = [
            { id: 1, ...imagesActividadesPausas.value[0], valorCheck: 1 },
            { id: 2, ...imagesActividadesPausas.value[1], valorCheck: 2 },
            { id: 3, ...imagesActividadesPausas.value[2], valorCheck: 3 },
            { id: 4, ...imagesActividadesPausas.value[3], valorCheck: 4 },
            { id: 5, ...imagesActividadesPausas.value[4], valorCheck: 5 },
            { id: 6, ...imagesActividadesPausas.value[5], valorCheck: 6 }
        ]

        styleCuadricula.gridGap = "5vh 7vh"
        styleCuadricula.gridTemplateColumns = "repeat(3,1fr)"
        styleItemsCuadricula.height = "28vh"

    }
}



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



const styleCuadricula = reactive({
    width: "auto",
    height: "61vh",
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr);",
    placeItems: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "0px auto",
    gridGap: "5vh 20vh",
});




const styleItemsCuadricula = reactive({
    width: "26vw",
    height: "58vh",
    textAlign: "center",
    color: "white",
    display: "flex",
    alignItems: "center"
})

const stylecontendorInterrogante = reactive({
    width: "90%",
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    gridTemplateColumns: "repeat(1,1fr)",
    gridGap: "11px"
})







const textoDescripcionPause = computed(() => textoInstruccionPausa.value[0]?.instruccion)
const mostrarVentanaInstrucciones = computed(() => isInstruccionesPausaVisible.value)
const actualizarTiempoPausa = computed(() => tiempoActividad.value)
const detenerTiempo = computed(() => detenerCronometro.value)
const habilitarTiempoCronometro = computed(() => habilitarCronometro.value)


const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    if (isVisibleNivel.value == false) {
        ocultarIntroNivel.value = true
        isVisibleNivel.value = true
    }

}

const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
    cargarActividad.value = true
    getRamdomimagenInterrogante()

}

const InstruccionesMostrar = () => {


    if (isInstruccionesPausaVisible.value) {
        ocultarInstrucciones.value = false
    } else {
        ocultarInstrucciones.value = true
    }

    /* isInstruccionesPausaVisible = !isInstruccionesPausaVisible */
}

const VerInstruccionesPausa = () => {
    monstrarBotonCerrarInstrucciones.value = true
    isInstruccionesPausaVisible.value = true
}


const getRamdomimagen = computed(() => {
    return imagenesReferencia.value
})



const finLoadCamara = () => {
    camaraWebCargada.value = true
    ocultarBotonComenzarActividad.value = true
}


const aumentarPuntosMalos = () => {
    puntosMalos.value = puntosMalos.value + 1
}

const aumentarPuntosBuenos = () => {
    puntosBuenos.value = puntosBuenos.value + 1
}

const guardarPuntos = () => {
    let puntos_finales = puntosBuenos.value - puntosMalos.value
    if (puntos_finales < 0) {
        puntos_finales = puntos_finales * -1
    }
    config.setPuntosGlobales(puntos_finales)
}


const configurarTiempoPausas = (id) => {
    //Configuracion de tiempo para el cronometro dependiento de las pausas.
    let tiempoPausa = Object.values(imagesActividadesPausas.value).filter((elementPausaId) => {
        return elementPausaId.idInstruccion == id
    })

    if (actualizarTiempoPausa.value !== "null") {
        //Configuramos el tiempo de la pausa de acuerdo a lo programado en el archivo pausas
        tiempoActividad.value = 0 //Reiniciamos el tiempo
        tiempoActividad.value = tiempoPausa[0].tiempo
    } else {
        //Configuramos el tiempo de la pausa de acuerdo a lo programado en el archivo pausas
        tiempoActividad.value = 0 //Reiniciamos el tiempo
        tiempoActividad.value = 5
    }


}

const continuarSiguienteActividad = () => {
    if ((Object.values(imagenesReferenciaRandom.value).length) == 0) {

        mensajeFinal.value = true
        guardarPuntos()
    } else {
        camaraWebCargada.value = false
        habilitarCronometro.value = false
        opcionCorrecta.value = false
        mostrarMensajesIntroduccion.value = true
        continuar.value = !continuar.value
        BotonInicio.value = false
        imagenRamdom.value = !imagenRamdom.value
        opcionIdInterroganteSeleccionada.value = 0
        opcionImagenInterroganteSeleccionada.value = ''

        //imagenesReferenciaRandom.value.splice(Object.values(opcionSeleccionada.value).id,1)


        getRamdomimagenInterrogante()
    }
}


const tiempoActualCronometro = (tiempo) => {

    if (validarCambioActividad.value == true) {
        if (Math.round((tiempoActividad.value / 2)) == tiempo) {
            if (tiempoValidado.value == false) {
                estadoVideoPause.value = false
                detenerCronometro.value = true
                monstrarMensajeCambio.value = true
                mostrarcronometro.value = false
                /* anime({
                   targets: '.mensaje-cambio',
                   keyframes: [
                       { translateX: -1300 },
                   ],
                   duration: 4000,
                   easing: 'easeOutElastic(1, .8)',
                   loop: false
               }); */

                setTimeout(() => {
                    estadoVideoPause.value = true
                    mostrarcronometro.value = true
                    tiempoActividad.value = tiempo
                    monstrarMensajeCambio.value = false
                    detenerCronometro.value = false
                    habilitarCronometro.value = true
                    tiempoValidado.value = false
                }, 7000)
            }
            tiempoValidado.value = true
            validarCambioActividad.value = null
        }
    }
}




const continuarActividad = () => {

    continuar.value = false
    imagenRamdom.value = !imagenRamdom.value
    IsVisibleInstruccion.value = !IsVisibleInstruccion.value
    mostrarImagen.value = false
    visible.value = false
    BotonInicio.value = false
    let loading = setTimeout(() => {
        visible.value = true
        girarOpcionesFiguras.value = true
        clearTimeout(loading)

    }, 500)


    styleCuadricula.placeContent = "flex-end"
    styleCuadricula.margin = "0px 10% 0px auto"

    if (imagenesReferencia.value.length == 4) {
        styleCuadricula.gridGap = "5vh 9vh"
    } else {
        styleCuadricula.gridGap = "4vh 1vh"
    }




    if (imagenesReferencia.value.length == 6) {
        stylecontendorInterrogante.gridTemplateColumns = "1fr 3fr"
        stylecontendorInterrogante.gridGap = "1fr 3fr"
        stylecontendorInterrogante.width = "100%"
    } else {
        stylecontendorInterrogante.gridTemplateColumns = "repeat(2,1fr)"
    }
}



const opcionSiguiente = (idInstruccion) => {

    isInstruccionesPausaVisible.value = true
    mostrarMensajesIntroduccion.value = false

    let elementClickCorrecto = imagenesReferencia.value.filter((element, index) => {
        return element.id == idInstruccion
    })

    textoInstruccionPausa.value = buscarInstruccionesEjercicio(Object.values(elementClickCorrecto)[0].idInstruccion)
   
    validarCambioActividad.value = Object.values(elementClickCorrecto)[0].cambio

    //Buscamos el id de la instruccion correspondiente a la pausa.
    /*   let idClick = Object.values(imagenesReferencia.value).filter((elementPausaId) => {
          return elementPausaId.idInstruccion == idInstruccion
      })[0]?.idIntrucciones
  
      console.log(Object.values(elementClickCorrecto)[0].idInstruccion)
      console.log(idClick) */

    configurarTiempoPausas(Object.values(elementClickCorrecto)[0].idInstruccion)
    videoPausa.value = Object.values(elementClickCorrecto)[0].video
    
    

    /* puntosBuenos.value = puntosBuenos.value + 1 */
    aumentarPuntosBuenos()


}


const ocultarVentanaInstruccionesPausas = () => {

    mostrarcronometro.value = true
    ocultarBotonComenzarActividad.value = true
    isInstruccionesPausaVisible.value = !isInstruccionesPausaVisible.value
    opcionCorrecta.value = true
    finTiempo.value = false
    imagenRamdom.value = !imagenRamdom.value/*  */
}

const getRamdomimagenInterrogante = () => {

    if ((Object.values(imagenesReferenciaRandom.value).length) == 1) {
        numero.value = 0
    } else {
        numero.value = Math.floor(Math.random() * (Object.values(imagenesReferenciaRandom.value).length - 1) - 0);
    }

    opcionSeleccionada.value = (Object.values(imagenesReferenciaRandom.value))[numero.value]
    imagenesReferenciaRandom.value.splice(numero.value, 1)





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

    if (puntosBuenos.value == imagenesReferencia.value.legnth - 1) {

    } else {
        continuar.value = !continuar.value
        finTiempo.value = true
        habilitarSiguienteOpcion.value = true
        mostrarcronometro.value = false
        monstrarBotonCerrarInstrucciones.value = false
        isInstruccionesPausaVisible.value = false
        estadoVideoPause.value = false
        continuarSiguienteActividad()

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
    config.setActividadCompletada()
    let posicionActual = config.posicionactualEscenarioJuego
    let posicionActualActividades = config.posicionActualActividades
    config.setPosicionActualActividades(posicionActualActividades + 1)
    config.setPosicionActualUsuario(posicionActual + 1)
    router.push('/Escenario')
}

const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
}

const buscarInstruccionesEjercicio = (id) => {

    return Object.values(pausasActivasInstrucciones.value).filter(pausa => {
        return pausa.id == id
    })
}

const OcultarBotonComenzar = () => {
    estadoVideoPause.value = true
    habilitarCronometro.value = !habilitarCronometro.value
    ocultarBotonComenzarActividad.value = false
}

</script>

<style lang="css" scoped>
h2 {
    font-family: Source Sans Pro;
    font-size: 1em;
    color: black;
    font-weight: 500;
    text-align: center
}

h3 {
    font-family: Source Sans Pro;
    font-size: 1em;
    color: black;
    font-weight: normal;
    text-align: center
}

.contenedor-ejercicio-realizado {
    width: 100%;
    height: 44vh;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
}

.contenedor-ejercicios {
    width: 40%;
    height: auto;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}



.contenedor-opciones {
    pointer-events: none
}

.loading-camara {
    position: absolute;
    top: 50%;
    right: 28%;
}

.imagen-random {
    overflow: hidden;
    height: 100%;
    margin-top: 22px;
}

.imagen-random-img {
    overflow: hidden;
}

.imagen-random-img img {
    width: auto;
    height: 21rem;
    padding: 14px
}


.title {
    width: 100%;
    text-align: center;
    color: black;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    font-weight: normal;
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%;

}


.titulo {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
}


.titulo-pausas {
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
    margin-bottom: 2px;
}






.contenedor-ejercicio-pausas {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-content: center;
    place-items: center;
    width: 61vw;
    margin: 0px auto;
}


.mensaje-puntos {
    background-color: white;
    z-index: 999;
    height: 57vh;
    width: 107vh;
}

.habilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(1)
}


/* MESAJE CAMBIO ACTIVIDAD */
.mensaje-cambio {
    font-family: Source Sans Pro;
    font-size: 2em;
    color: white;
    font-weight: 600;
    width: fit-content;
    height: 51%;
    display: flex;
    align-items: center;
    align-content: center;
    position: absolute;
    background-color: #000000b3;
    padding: 0px 42px;
}

.inhabilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(0)
}


@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .imagen-random-img img {
        width: auto;
        height: 14rem;
    }
}
</style>