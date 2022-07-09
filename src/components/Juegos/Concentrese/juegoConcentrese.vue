<template>
    <!-- MENU PRINCIPAL -->
    <div class="botonMenu" @click="mostrarMenu"></div>

    <!-- VENTANA NIVEL -->
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" urlImagenFondo="marco_nivel_1">
    </VentanaIntroNivel>



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
                EJERCICIOS</div>
            <!--  <button class="btn-primary-vr1" @mousemove="confity" id="salir">SALIR</button> -->
        </template>
    </VentanaPuntosFinal>






    <div class="contenedor-actividad">

        <div class="contenedor-items   center-element">

            <div class=" contenedor-concentrese flex-center-elements-row gap-1">
                <div v-if="!opcionCorrecta" class="titulo auto">
                    <h2>Encuentre la pareja de cada pausa activa, una vez encontrada cada pareja, deberá realizar la
                        pausa activa.</h2>
                </div>
                <div class=" auto flex-center-elements-column gap-1">


                    <Cronometro v-if="mostrarcronometro" :isCronometroPausa="detenerTiempo"
                        :isRun="habilitarTiempoCronometro" :segundos="actualizarTiempoPausa"
                        @endTime="continuarActividad" @tiempoActual="tiempoActualCronometro" />
                    <div class="btn-ayuda tooltip" v-if="opcionCorrecta" @click="VerInstruccionesPausa">
                        <span class="tooltiptext">Ver Instrucciones</span>
                    </div>


                    <div v-if="opcionCorrecta" class=" auto flex-center-elements-column gap-3">
                        <div class="titulo auto">
                            <h4>Si por recomendación médica no debe realizar el ejercicio, por favor
                                abstenerse.</h4>

                            <h3>Cuando esté listo para hacer la pausa activa, debe dar clic sobre el botón comenzar para
                                que el tiempo del cronómetro inicie.</h3>
                            <h2>¡Hora de realizar el ejercicio!</h2>


                        </div>
                        <div :style="styleContenedorEjercicioRealizado"
                            class="size-imagen-pausas contenedor-ejercicio-realizado  gap-4">
                            <div
                                :style="{ border: `1.35px solid black`, background: `transparent url(${mostrarImagen}) no-repeat center center`, backgroundSize: '100% 100%', width: '-webkit-fill-available', maxWidth: '25vw', height: '22vw' }">
                                <!-- <img :id="mostrarImagen" :src="mostrarImagen" alt="" width="320" height="320"> -->
                            </div>
                            <div v-if="camaraReady">
                                <div class=" contenedor-camara-pausa flex-center-elements-column">
                                    <CaramaWeb :width="250" :height="250" @camaraLoad="finLoadCamara" />
                                    <!--  -->
                                    <div class="flex-center-elements-column loading-camara" v-if="!camaraWebCargada">
                                        <span class="spiner"></span>
                                    </div>
                                </div>
                                <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                            </div>
                        </div>
                        <div v-if="ocultarBotonComenzarActividad"
                            :class="{ 'habilitar-boton-listo': ocultarBotonComenzarActividad }"
                            class="auto  inhabilitar-boton-listo flex-center-elements-row gap-2"
                            style="text-align:center">
                            <div class="button-bs" @click="OcultarBotonComenzar"> COMENZAR</div>

                        </div>

                    </div>
                    <div :style="stylecuadriculaItems" v-if="!opcionCorrecta">
                        <div v-for="(imagen, index) in imagenesTablero" :key="index"
                            :class="`ptrueba-${imagen.nombre}`">
                            <div :class="{ 'desahbilitado': imagen.finalizado, 'remove-click': innabilitarClick }"
                                :id="imagen.nombre"
                                @click="validarClick({ id: imagen.id, nombre: imagen.nombre, imagen: imagen.imagen })"
                                :srcUrlImagen="srcUrlImagen">

                                <ItemConcentrese :idItem="imagen.id" @clickItem="cargarImagen"
                                    :nombreItem="imagen.nombre" :finActividad="activarBotonContinuar" />

                            </div>
                        </div>

                    </div>

                </div>
                <div v-if="activarBotonContinuar" class="auto flex-center-elements-row">
                    <div class="btn-primary" @mousemove="confity" @click="volverEscenario">VOLVER AL
                        ESCENARIO</div>
                </div>
            </div>
            <div v-if="monstrarMensajeCambio" class="mensaje-cambio ">
                CAMBIO...
            </div>

        </div>
        <!-- VENTANA INSTRUCCIONES -->
        <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarVentanaInstrucciones">
            <template #texto>
                <!-- <div class="titulo">Para este ejercicio, debe estar de pie y en posición erguida.

                Entrelace los dedos de sus manos atrás de su espalda (como se muestra en el ejemplo), realice
                respiraciones profundas llevando los codos hacia atrás al igual que los hombros.
            </div> -->
                <div>
                    <sliderInstrucciones :numerodeSliders="0" :ocultarNavegacion="true"
                        :tituloInstruccion="instruccionesActividad">

                        <template #sliders>
                            <div class="item-slider">
                                <img src="@/assets/img/Intrucciones_concentrese.png" class="responsive-imagen-slider"
                                    alt="">
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

                        <VideoPausas :videoPausa="videoPausa" :mostrarImagen="mostrarImagen" />
                        <!-- <div v-show="videoPausa">
                           
                        </div>
                        <div v-show="!videoPausa"
                            :style="{ border: `1.35px solid black`, background: `transparent url(${mostrarImagen}) no-repeat center center`, width: '320px', height: '320px', backgroundSize: '100% 100%', width: '300px' }">
                            
                        </div> -->

                    </div>
                </div>
            </template>
        </InstruccionesPausa>

        <!-- VENTANA MENU OPCIONES PRINCIPAL -->
        <MenuPrincipal :isvisible="false" @eventInstrucciones="InstruccionesMostrar" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive } from 'vue'
import animateCSS from "@/assets/helpers/animations.js";
//COMPONENTES
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import Cronometro from '../../Cronometro.vue'
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import MenuPrincipal from '@/components/MenuPrincipal.vue';
import InstruccionesPausa from '@/components/InstruccionesPausas.vue';
import VideoPausas from '@/components/videoPausas.vue';

//DB instruccions
import InstruccionesEjercicio from "@/assets/textos/PausasActivas.json";


import WarnList from '@/assets/img/warn-list.png';
import ChetList from '@/assets/img/chek-list.png';


import ItemConcentrese from "@/components/Juegos/Concentrese/ItemsConcentrese.vue"


import { useConfigStore } from "../../../stores/config.js";
import { useRouter, useRoute } from "vue-router";
import ImagenInterrogante from '@/assets/img/manos/pregunta.png'


import Popper from "vue3-popper";

import anime from 'animejs/lib/anime.es.js';

//audiosSound
import Aplausos from '@/assets/sounds/aplausos.mp3'
import Incorrecto from '@/assets/sounds/incorrecto.mp3'

//Textos 
import { instruccionesJuegoConcentrese } from "@/assets/textos/TextosInstrucciones.js";


const router = useRouter()

const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)
const ocultarIntroNivel = ref(false)
const ocultarInstrucciones = ref(true)
const finTime = ref(false)
const reiniciarCronometro = ref(false)
const tiempoActividad = ref(10)
const audioAplausos = ref(null)
const audioIncorrecto = ref(null)
const contadorClicks = ref(0)
//Puntos
const puntosBuenos = ref(0)
const puntosMalos = ref(0)

const opcionSeleccionada1 = ref('')
const opcionSeleccionada2 = ref('')
const nombreSeleccionada1 = ref('')
const nombreSeleccionada2 = ref('')

// Variables pausas
const mostrarImagen = ref('')
const mostrarImagenId = ref('')
const validarCambioActividad = ref(null)
const videoPausa = ref(null)


const opcionCorrecta = ref(false)
const activarBotonContinuar = ref(false)
const innabilitarClick = ref(false)
const camaraWebCargada = ref(false)
const ocultarBotonComenzarActividad = ref(true)
const monstrarBotonCerrarInstrucciones = ref(false)

//Cargamos los ejercicios.
const pausasActivasInstrucciones = ref([])
const srcUrlImagen = ref(ImagenInterrogante)

const continuar = ref(false)

const mensajeFinal = ref(false)

//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(false)


const instruccionesActividad = ref(instruccionesJuegoConcentrese)

//DetenerCronometro
const detenerCronometro = ref(false)
const tiempoValidado = ref(false)


const imagenesA = ref([])
const imagenesB = ref([])
const imagenesTablero = ref([])
const imagesActividadesPausas = ref([])
const textoInstruccionPausa = ref('')
const isInstruccionesPausaVisible = ref(false)
const isVisibleNivel = ref(false)

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

onMounted(() => {

    /*  animateCSS(".mensaje-cambio", "bounceInLeft").then((message) => {
        
     }); */




    pausasActivasInstrucciones.value = Object.values(InstruccionesEjercicio.PausasActivas).filter(pausa => {
        return pausa.tipo == "concentrese"
    })

    /* animarVideo() */

    /*  console.log(pausasActivasInstrucciones.value)
     console.log(pausasActivasInstrucciones.value.sort((a, b) => {
         return a.id - b.id
     })) */

    pausasActivasInstrucciones.value = pausasActivasInstrucciones.value.sort(() => Math.random() - 0.5);



    Object.values(pausasActivasInstrucciones.value).forEach((element, index) => {
        const { imagen } = element
        imagesActividadesPausas.value.push({ imagen: imagen == undefined ? null : imagen, id: element.id, video: element.video, cambio: element.cambio, finalizado: false, tiempo: element.tiempo })
    })




    //Excluimos las imagenes que estn null, es decir no tiene imagen.
    imagesActividadesPausas.value = Object.values(imagesActividadesPausas.value).filter(pausa => {
        return pausa.imagen !== null
    })


    //Colocamos aleatorias las imagenes.
    imagesActividadesPausas.value = imagesActividadesPausas.value.sort(() => Math.random() - 0.5);


    console.log(imagesActividadesPausas.value)
    /*   imagesActividadesPausas.value = imagesActividadesPausas.value.sort((a, b) => {
          return a.id - b.id
      }) */

})

const tiempoActualCronometro = (tiempo) => {

    if (validarCambioActividad.value) {
        if (Math.round((tiempoActividad.value / 2)) == tiempo) {
            if (tiempoValidado.value == false) {
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
                    mostrarcronometro.value = true
                    tiempoActividad.value = tiempo
                    monstrarMensajeCambio.value = false
                    detenerCronometro.value = false
                    habilitarCronometro.value = true
                }, 7000)
            }
            tiempoValidado.value = true
            validarCambioActividad.value = null
        }
    }



}

const configurarActividad = (valor) => {

    if (valor == 1) {



        imagenesA.value = [
            { nombre: 'ImagenA1', ...imagesActividadesPausas.value[0] },
            { nombre: 'ImagenA2', ...imagesActividadesPausas.value[1] },
            { nombre: 'ImagenA3', ...imagesActividadesPausas.value[2] }

        ]

        imagenesB.value = [
            { nombre: 'ImagenB1', ...imagesActividadesPausas.value[0] },
            { nombre: 'ImagenB2', ...imagesActividadesPausas.value[1] },
            { nombre: 'ImagenB3', ...imagesActividadesPausas.value[2] }

        ]


        imagenesTablero.value = imagenesA.value.concat(imagenesB.value)
        /* imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
        imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */
        /* imagenesTablero.value = imagenesTablero.value.sort(() => Math.random() - 0.5) */

        stylecuadriculaItems.gridTemplateColumns = "repeat(3, 1fr)"



    } else {
        imagenesA.value = [
            { nombre: 'ImagenA1', ...imagesActividadesPausas.value[0] },
            { nombre: 'ImagenA2', ...imagesActividadesPausas.value[1] },
            { nombre: 'ImagenA3', ...imagesActividadesPausas.value[2] },
            { nombre: 'ImagenA4', ...imagesActividadesPausas.value[3] },

        ]

        /*{ nombre: 'ImagenA5', imagen: ImagenEjercicio5, id: 5, finalizado: false },
        { nombre: 'ImagenA6', imagen: ImagenEjercicio6, id: 6, finalizado: false }*/

        imagenesB.value = [
            { nombre: 'ImagenB1', ...imagesActividadesPausas.value[0] },
            { nombre: 'ImagenB2', ...imagesActividadesPausas.value[1] },
            { nombre: 'ImagenB3', ...imagesActividadesPausas.value[2] },
            { nombre: 'ImagenB4', ...imagesActividadesPausas.value[3] },

        ]

        /*{ nombre: 'ImagenB5', imagen: ImagenEjercicio5, id: 5, finalizado: false },
            { nombre: 'ImagenB6', imagen: ImagenEjercicio6, id: 6, finalizado: false }*/

        imagenesTablero.value = imagenesA.value.concat(imagenesB.value)
        /* imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
        imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */
        /*  imagenesTablero.value = imagenesTablero.value.sort(() => Math.random() - 0.5) */

        /*  imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
         imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */

        stylecuadriculaItems.gridTemplateColumns = "repeat(4, 1fr)"
        stylecuadriculaItems.gridGap = "5vh 2vh"
    }
}

const textoDescripcionPause = computed(() => textoInstruccionPausa.value[0]?.instruccion)
const mostrarVentanaInstrucciones = computed(() => isInstruccionesPausaVisible.value)
const mostrarVentanaInstruccionesActividad = computed(() => config.mostrarInicioInstrucciones)
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
}


const OcultarBotonComenzar = () => {
    habilitarCronometro.value = !habilitarCronometro.value
    ocultarBotonComenzarActividad.value = false
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

const validarClick = (elementoclick) => {

    if (contadorClicks.value == 0) {
        opcionSeleccionada1.value = elementoclick.nombre.substr(elementoclick.nombre.length - 2, 2)
        document.querySelector(`#${elementoclick.nombre}`).style.pointerEvents = "none"
        nombreSeleccionada1.value = elementoclick.nombre
        contadorClicks.value = contadorClicks.value + 1


    } else if (contadorClicks.value == 1) {
        opcionSeleccionada2.value = elementoclick.nombre.substr(elementoclick.nombre.length - 2, 2)
        document.querySelector(`#${elementoclick.nombre}`).style.pointerEvents = "none"
        nombreSeleccionada2.value = elementoclick.nombre
        contadorClicks.value = contadorClicks.value + 1



    }
    if (contadorClicks.value == 2) {
        innabilitarClick.value = true
        let letra1 = opcionSeleccionada1.value.substr(0, opcionSeleccionada1.value.length - 1)
        let numero1 = opcionSeleccionada1.value.substr(1, opcionSeleccionada1.value.length - 1)
        let letra2 = opcionSeleccionada2.value.substr(0, opcionSeleccionada2.value.length - 1)
        let numero2 = opcionSeleccionada2.value.substr(1, opcionSeleccionada2.value.length - 1)




        if (letra1 === 'A' && letra2 === 'B' || letra1 === 'B' && letra2 === 'A') {



            if (numero1 === numero2) {
                document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.add('opcion-correcto')
                document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.add('opcion-correcto')
                document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = '-1px -1px 16px inset green';
                document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = '-1px -1px 16px inset green';


                //puntosBuenos.value = puntosBuenos.value + 1
                aumentarPuntosBuenos()

                setTimeout(() => {

                    //Si la configuracion de audio general esta en true
                    if (config.audioPausas) {
                        audioAplausos.value = new Audio(Aplausos)
                        audioAplausos.value.play()
                        audioAplausos.value.addEventListener("ended", () => {

                            /* document.querySelector(`#${nombreSeleccionada1.value}`).style.visibility = "hidden"
                            document.querySelector(`#${nombreSeleccionada2.value}`).style.visibility = "hidden" */

                            /*   console.log(elementoclick.id) */

                            //Buscamos la instruccion del ejercicio
                            textoInstruccionPausa.value = Object.values(buscarInstruccionesEjercicio(elementoclick.id))

                            document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = 'none';
                            document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = 'none';

                            isInstruccionesPausaVisible.value = true


                            /* habilitarCronometro.value = true */
                            eliminarElemento(elementoclick.id)


                        })
                    } else {

                        /* stylecuadriculaItems.gridTemplateColumns = "repeat(1, 1fr)" */

                        /*  document.querySelector(`#${nombreSeleccionada1.value}`).style.visibility = "hidden"
                         document.querySelector(`#${nombreSeleccionada2.value}`).style.visibility = "hidden" */

                        //Buscamos la instruccion del ejercicio
                        textoInstruccionPausa.value = Object.values(buscarInstruccionesEjercicio(elementoclick.id))

                        document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = 'none';
                        document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = 'none';

                        isInstruccionesPausaVisible.value = true

                        /* habilitarCronometro.value = true */
                        eliminarElemento(elementoclick.id)
                    }



                }, 1500)

                opcionSeleccionada1.value = ''
                opcionSeleccionada2.value = ''
            } else {

                if (config.audioPausas) {
                    audioIncorrecto.value = new Audio(Incorrecto)
                    audioIncorrecto.value.play();
                    innabilitarClick.value = true
                } else {
                    innabilitarClick.value = true
                }


                document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.add('opcion-incorrecto')
                document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.add('opcion-incorrecto')
                document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = '-1px -1px 16px inset red';
                document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = '-1px -1px 16px inset red';

                setTimeout(() => {
                    innabilitarClick.value = false


                    document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', "")
                    document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', "")
                    document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', ImagenInterrogante)
                    document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', ImagenInterrogante)

                    document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = 'none';
                    document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = 'none';

                    document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.remove('opcion-incorrecto')
                    document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.remove('opcion-incorrecto')
                    document.querySelector(`#${nombreSeleccionada1.value}`).style.pointerEvents = "all"
                    document.querySelector(`#${nombreSeleccionada2.value}`).style.pointerEvents = "all"


                }, 1500)

                aumentarPuntosMalos()

            }




            /*  nombreSeleccionada1.value = ''
             nombreSeleccionada2.value = '' */
        } else {
            document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.add('opcion-incorrecto')
            document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.add('opcion-incorrecto')
            document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = '-1px -1px 16px inset red';
            document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = '-1px -1px 16px inset red';


            if (config.audioPausas) {
                audioIncorrecto.value = new Audio(Incorrecto)
                audioIncorrecto.value.play();
                innabilitarClick.value = true
            } else {
                innabilitarClick.value = true
            }
            setTimeout(() => {

                innabilitarClick.value = false
                document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', ImagenInterrogante)
                document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', ImagenInterrogante)
                document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.remove('opcion-incorrecto')
                document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.remove('opcion-incorrecto')
                document.querySelector(`#${nombreSeleccionada1.value} #imagen`).style.boxShadow = 'none';
                document.querySelector(`#${nombreSeleccionada2.value} #imagen`).style.boxShadow = 'none';
                document.querySelector(`#${nombreSeleccionada1.value}`).style.pointerEvents = "all"
                document.querySelector(`#${nombreSeleccionada2.value}`).style.pointerEvents = "all"

            }, 1500)


            opcionSeleccionada1.value = ''
            opcionSeleccionada2.value = ''
            aumentarPuntosMalos()
        }


        contadorClicks.value = 0

    }

}

const aumentarPuntosMalos = () => {
    puntosMalos.value = puntosMalos.value + 1
}

const aumentarPuntosBuenos = () => {
    puntosBuenos.value = puntosBuenos.value + 1
}


const cargarImagen = (elemento) => {

    mostrarImagen.value = elemento.imagen
    mostrarImagenId.value = elemento.id

    let busquedaVideoForId = Object.values(imagesActividadesPausas.value).filter((elementoImagen) => {
        return elementoImagen.id == mostrarImagenId.value
    })

    console.log(busquedaVideoForId[0])

    validarCambioActividad.value = busquedaVideoForId[0].cambio
    console.log(validarCambioActividad.value)
    videoPausa.value = busquedaVideoForId[0].video

}


const continuarActividad = () => {

    if (puntosBuenos.value == imagenesA.value.length) {
        activarBotonContinuar.value = false
        mensajeFinal.value = true
        guardarPuntos()
    } else {
        monstrarBotonCerrarInstrucciones.value = false
        isInstruccionesPausaVisible.value = false
        opcionCorrecta.value = false
        habilitarCronometro.value = false
        mostrarcronometro.value = false
    }
}

const guardarPuntos = () => {
    let puntos_finales = puntosBuenos.value - puntosMalos.value
    if (puntos_finales < 0) {
        puntos_finales = puntos_finales * -1
    }
    config.setPuntosGlobales(puntos_finales)
}

const eliminarElemento = (id) => {
    innabilitarClick.value = false
    let posicionA = imagenesA.value.findIndex((elementId) => {
        return elementId.id == id
    })
    let posicionB = imagenesB.value.findIndex((elementId) => {
        return elementId.id == id
    })

    configurarTiempoPausas(id)

    imagenesA.value[posicionA].finalizado = true
    imagenesB.value[posicionB].finalizado = true

    document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.remove('opcion-correcto')
    document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.remove('opcion-correcto')
    document.querySelector(`.ptrueba-${nombreSeleccionada1.value}`).classList.remove('opcion-incorrecto')
    document.querySelector(`.ptrueba-${nombreSeleccionada2.value}`).classList.remove('opcion-incorrecto')

    opcionSeleccionada1.value = ''
    opcionSeleccionada2.value = ''

    /* stylecuadriculaItems.gridTemplateColumns = "repeat(3, 1fr)" */

    /* animarVideo() */
}

const configurarTiempoPausas = (id) => {
    //Configuracion de tiempo para el cronometro dependiento de las pausas.
    let tiempoPausa = Object.values(imagesActividadesPausas.value).filter((elementPausaId) => {
        return elementPausaId.id == id
    })[0].tiempo


    //Configuramos el tiempo de la pausa de acuerdo a lo programado en el archivo pausas
    tiempoActividad.value = 0 //Reiniciamos el tiempo
    tiempoActividad.value = tiempoPausa
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

const puntosBuenosActividad = computed(() => {
    return puntosBuenos.value
})

const volverEscenario = () => {
    config.setActividadActual(router.currentRoute.value.path)
    config.setActividadCompletada()
    let posicionActual = config.posicionactualEscenarioJuego
    let posicionActualActividades = config.posicionActualActividades
    config.setPosicionActualActividades(posicionActualActividades + 1)
    config.setPosicionActualUsuario(posicionActual + 1)
    ocultarInstrucciones.value = false
    router.push('/Escenario')
}

const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
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

.mensaje-cambio {
    font-family: Source Sans Pro;
    font-size: 2em;
    color: red;
    font-weight: 600;
    width: fit-content;
    height: 10vh;
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