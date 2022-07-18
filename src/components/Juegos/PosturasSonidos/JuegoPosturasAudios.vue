<template>
    <div class="botonMenu" @click="mostrarMenu"></div>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" urlImagenFondo="marco_nivel_1">
        <!-- <template #mensaje-nivel>
      1
    </template> -->
    </VentanaIntroNivel>
    <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarVentanaInstrucciones">
        <template #texto>
            <!-- <h2>Para este ejercicio, debe estar de pie y en posición erguida.

                Entrelace los dedos de sus manos atrás de su espalda (como se muestra en el ejemplo), realice
                respiraciones profundas llevando los codos hacia atrás al igual que los hombros.
            </h2> -->
            <div>
                <sliderInstrucciones :numerodeSliders="0" :ocultarNavegacion="true"
                    :tituloInstruccion="instruccionesActividad">

                    <template #sliders>

                        <div class="item-slider">
                            <img src="@/assets/img/Intrucciones_audios.png" class="responsive-imagen-slider" alt="">
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
        <VentanaPuntosFinal v-if="mensajeFinal" @continuarTriviaEvent="continuarTrivia"
            @volverEscenarioEvent="volverEscena">
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
                <div class="btn-primary" @mousemove="confity" @click="volverEscena">VOLVER AL
                    ESCENARIO</div>
                <!--  <button class="btn-primary-vr1" @mousemove="confity" id="salir">SALIR</button> -->
            </template>
        </VentanaPuntosFinal>


        <div class="contenedor-parlantes  center-element">
            <!--  -->
            <Cronometro v-if="mostrarcronometro" :isCronometroPausa="detenerTiempo" :isRun="habilitarCronometro"
                :segundos="actualizarTiempoPausa" @tiempoActual="tiempoActualCronometro"
                @endTime="activarNavegacionSliders" :isLoop="isLoopVideo"/>
            <div class="btn-ayuda tooltip" v-if="mostrarTooltip" @click="VerInstruccionesPausa">
                <span class="tooltiptext">Ver Instrucciones</span>
            </div>
            <div v-if="!continuar" class="titulo">

                <div>Memorice y escuche el sonido de cada una de las pausas activas que se presentan, dando clic sobre
                    el megáfono. Cuando esté listo debe dar clic sobre continuar.</div>
            </div>
            <div v-if="!continuar" class="contenedor-opciones flex-center-elements-column gap-1">
                <div :style="styleParlantes">
                    <div v-for="(imagen, index) in imagenes" :key="imagen + '-' + index">

                        <Parlante :srcUrl="imagen.imagen" :id="`figura-${index + 1}`"
                            :posicion="(parseInt(imagen.id))" :fintiempo="continuar" />
                    </div>
                    <!-- <div class="parlante-item">
                        
                    </div> -->

                    <!-- <div class="parlante-item">

                        <div v-for="(imagen, index) in imagenes.slice(3,  imagenes.length)" :key="imagen + '-' + index">
                            <Parlante :srcUrl="imagen.imagen" :id="`figura-${index + 1}`"
                                :posicion="(parseInt(imagen.id) - 1)" :fintiempo="continuar" />
                        </div>

                    </div> -->


                </div>
                <div v-if="!continuar" class="auto flex-center-elements-row gap-2" style="text-align:center">
                    <div class="btn-primary" @click="continuarAtividad">CONTINUAR</div>
                    <!-- <button class="btn-ghost-white" @click="volverEscena">VOLVER A EJERCICIOS</button> -->
                </div>


            </div>
            <div v-if="continuar" class="flex-center-elements-row gap-1">
                <div class="titulo auto">
                    <div v-if="!mostrarCamaraCalentamiento">
                        <div>Escuche el audio dando clic sobre el megáfono, este sonido ¿a cuál pausa activa pertenece?
                        </div>
                    </div>
                    <div v-else>
                        <h4>Si por recomendación médica no debe realizar el ejercicio, por favor
                            abstenerse.</h4>

                        <h3>Cuando esté listo para hacer la pausa activa, debe dar clic sobre el botón comenzar para que
                            el tiempo del cronómetro inicie.</h3>
                        <h2>¡Hora de realizar el ejercicio!</h2>
                    </div>
                </div>
            </div>
            <div class="parlante-pregunta flex-center-elements-row gap-4">

                <div v-if="continuar" class="flex-center-elements-row gap-4">



                    <!-- v-if="!mostrarCamaraCalentamiento" -->

                    <div class="flex-center-elements-column">
                        <div class="imagenes-opciones " v-if="!mostrarCamaraCalentamiento">
                            <div>
                                <div v-if="!mostrarCamaraCalentamiento"
                                    class="parlante-validador animate__animated animate__pulse animate__faster animate__repeat-2"
                                    :style="styleParlante" @click="playSonidoAleatorio()">

                                </div>
                            </div>
                            <div class="conetenedor-imagen-opcion">
                                <img id="imagen-pregunta" src="@/assets/img/manos/pregunta.png" width="150" height="150"
                                    alt="">
                            </div>

                        </div>
                        <div class="contenedor-ejercicio-imagen flex-center-elements-row gap-3 ">
                            <div class="contenedor-ejercicio-imagen-camara flex-center-elements-row gap-4 "
                                v-if="mostrarCamaraCalentamiento">
                                <div>
                                    <!-- <img id="imagen-pregunta-ejercicio" :src="imagenCorrecta" width="350" height="350"
                                        alt=""> -->
                                    <VideoPausas ref="videoPausasRef" :ismonstrarMensajeCambio="monstrarMensajeCambio"
                                        :videoPausaUrl="videoPausa" :isPlayVideo="estadoVideoPause"
                                        :isPauseVideo="!estadoVideoPause" :mostrarImagenUrl="imagenCorrecta"
                                        :mostrarimagenReferencia="false" :isLoop="isLoopVideo"/>
                                </div>
                                <div v-if="camaraReady" class=" contenedor-camara-pausa flex-center-elements-column">
                                    <CaramaWeb :width="250" :height="250" @camaraLoad="finLoadCamara" />
                                    <!--  -->
                                    <div class="flex-center-elements-column loading-camara" style="position: absolute;"
                                        v-if="!camaraWebCargada">
                                        <span class="spiner"></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-if="ocultarBotonComenzarActividad"
                            :class="{ 'habilitar-boton-listo': ocultarBotonComenzarActividad }"
                            class="auto  inhabilitar-boton-listo flex-center-elements-row gap-2"
                            style="text-align:center" @click="OcultarBotonComenzar">
                            <!-- <div class="btn-primary"> COMENZAR</div> -->
                            <div class="button-bs"> COMENZAR</div>
                        </div>
                        <!-- <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                            <button class="btn-ghost-white" @click="continuar = !continuar">CONTINUAR</button>
                            <div v-if="finTime" class="btn-primary" @click="volverEscena">VOLVER A
                                EJERCICIOS</div>
                        </div> -->
                    </div>
                </div>
                <div v-if="mostrarOpcionesrandomAudios">
                    <div :style="styleContentPrueba" class="imagenes-opciones flex-center-elements-row gap-1">
                        <div class="conetenedor-imagen-opcion"
                            :class="{ 'imagenes-opciones-click': opcionClicked, 'diabled-click-filter': !habilitarOpciones }"
                            v-for="img in imagenes" :key="`img-${img.id}`" :id="`figura-click-${img.id}`"
                            @click="comprobarRespuesta(img.id)">

                            <img :src="mostrarImagen ? img.imagen : Interrogante" width="130" height="150" alt="">
                        </div>
                    </div>

                </div>


            </div>
            <!--  <div v-if="mostrarOpcionesrandomAudios" class="auto flex-center-elements-row gap-2"
                style="text-align:center">
                <div class="btn-primary" @click="comprobarRespuesta">COMPROBAR</div>
                 <button class="btn-ghost-white">REPETIR</button>
            </div> -->
        </div>
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
                        <VideoPausas :videoPausaUrl="videoPausa" :isPlayVideo="true" :mostrarImagenUrl="imagenCorrecta" />
                    </div>
                    <!-- <div
                        :style="{ background: `transparent url(${imagenCorrecta}) no-repeat center center`, width: '320px', height: '320px', backgroundSize: '100% 100%', width: '300px' }">
                        <img :id="mostrarImagen" :src="mostrarImagen" alt="" width="320" height="320">
                    </div> -->

                </div>
            </template>
        </InstruccionesPausa>
        <MenuPrincipal :isvisible="false" @eventInstrucciones="InstruccionesMostrar" />
    </div>

</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive } from 'vue'

//COMPONENTES
import Parlante from '../PosturasSonidos/Parlante.vue'
import Cronometro from '../../Cronometro.vue'
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import InstruccionesPausa from '@/components/InstruccionesPausas.vue';
import MenuPrincipal from '@/components/MenuPrincipal.vue';
import VideoPausas from '@/components/videoPausas.vue';

//AUDIO
import Sonidos from '@/assets/helpers/sounds.js'

import { useConfigStore } from "../../../stores/config.js";
import { useRouter, useRoute } from "vue-router";

//IMAGENES PAUSAS
/* import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'
import ImagenEjercicio2 from '@/assets/img/Ejercicio2.png'
import ImagenEjercicio3 from '@/assets/img/Ejercicio3.png'
import ImagenEjercicio4 from '@/assets/img/Ejercicio4.png'
import ImagenEjercicio5 from '@/assets/img/Ejercicio5.png'
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png'
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png' */
import ImagenParlante from '@/assets/img/paralanteIcono.png'
import WarnList from '@/assets/img/warn-list.png';
import ChetList from '@/assets/img/chek-list.png';



//Sonidos
import Soundlife from '@/assets/sounds/life.mp3'
import Soundcoin from '@/assets/sounds/coin.mp3'
import Soundjump from '@/assets/sounds/jump.mp3'
import Soundcartoon1 from '@/assets/sounds/cartoon1.mp3'
import Soundcartoon2 from '@/assets/sounds/cartoon2.mp3'
import Soundcartoon3 from '@/assets/sounds/cartoon3.mp3'
import Aplausos from '@/assets/sounds/aplausos.mp3'
import Incorrecto from '@/assets/sounds/incorrecto.mp3'
import Toaster from '@meforma/vue-toaster';
import Interrogante from '@/assets/img/manos/pregunta.png'

//DB instruccions
import {PausasActivas} from "@/assets/textos/PausasActivas.js";

//Textos 
import { instruccionesJuegoPosturaAudios } from "@/assets/textos/TextosInstrucciones.js";



//Textos Instrucciones:
const instruccionesActividad = ref(instruccionesJuegoPosturaAudios)

const router = useRouter()

const config = useConfigStore();
const isInstruccionesPausaVisible = ref(false)
const camaraReady = computed(() => config.isCamara)
const ocultarIntroNivel = ref(false)
const ocultarInstrucciones = ref(true)
const isVisibleNivel = ref(false)
const mostrarOpcionesrandomAudios = ref(false)
const finTime = ref(false)
const reiniciarCronometro = ref(false)
const tiempoActividad = ref(10)
const audio = ref(null)
const audioAplausos = ref(null)
const audioIncorrecto = ref(null)
const aleatorioSonidos = ref([])
const opcionClicked = ref(false)
const continuar = ref(false)
const cronometroMostrarOpciones = ref(false)
//Puntos
const puntosBuenos = ref(0)
const puntosMalos = ref(0)
const mensajeFinal = ref(false)

const repetirAudio = ref(false)
const mostrarCamaraCalentamiento = ref(false)
const imagenCorrecta = ref(null)
const textoInstruccionPausa = ref('')

//Posicion audio aleatorio
const posicionAudioAleatorio = ref(0)
const pausasActivasInstrucciones = ref([])
const imagesActividadesPausas = ref([])
const imagenes = ref([])
const habilitarOpcionesClick = ref(false)

//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(false)



const camaraWebCargada = ref(false)
const ocultarBotonComenzarActividad = ref(false)
const monstrarBotonCerrarInstrucciones = ref(false)
const mostrarTooltip = ref(false)

// Variables pausas
const mostrarImagen = ref(false)
const mostrarImagenId = ref('')
const isLoopVideo = ref(false)

const validarCambioActividad = ref(null)
//Variables video pausas
const videoPausa = ref(null)
const videoPausasRef = ref(null)
const estadoVideoPause = ref(null)

//DetenerCronometro
const detenerCronometro = ref(false)
const tiempoValidado = ref(false)

//MensajeCambio.
const monstrarMensajeCambio = ref(false)


onBeforeMount(() => {

    pausasActivasInstrucciones.value = Object.values(PausasActivas).filter(pausa => {
        return pausa.tipo == "recordarSonido"
    })

    pausasActivasInstrucciones.value = pausasActivasInstrucciones.value.sort(() => Math.random() - 0.5);

    console.log(pausasActivasInstrucciones.value.length-1)

    Object.values(pausasActivasInstrucciones.value).forEach((element, index) => {
        const { imagen, id, video, cambio, tiempo } = element
        imagesActividadesPausas.value.push({ imagen: imagen == undefined ? null : imagen, idIntrucciones: id, finalizado: false, tiempo, video, cambio })
    })


    //Excluimos las imagenes que estn null, es decir no tiene imagen.
    imagesActividadesPausas.value = Object.values(imagesActividadesPausas.value).filter(pausa => {
        return pausa.imagen !== null
    })


    //Colocamos aleatorias las imagenes.
    imagesActividadesPausas.value = imagesActividadesPausas.value.sort(() => Math.random() - 0.5);

    
})


onBeforeMount(() => {

})

const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
}


const continuarAtividad = () => {
    continuar.value = true
    mostrarOpcionesrandomAudios.value = true

    styleContentPrueba.gridTemplateColumns = `repeat(${imagenes.value.length / 2},1fr)`
    generarSonidosAleatorios()
}

const textoDescripcionPause = computed(() => textoInstruccionPausa.value[0]?.instruccion)
const mostrarVentanaInstrucciones = computed(() => isInstruccionesPausaVisible.value)
const actualizarTiempoPausa = computed(() => tiempoActividad.value)
const habilitarOpciones = computed(() => habilitarOpcionesClick.value)
const detenerTiempo = computed(() => detenerCronometro.value)
const habilitarTiempoCronometro = computed(() => habilitarCronometro.value)

const configurarActividad = (valor) => {

    //26 15 34 32 31 0 6 1 30 2 7 17

    if (valor == 1) {
        imagenes.value = [
            { id: 1, ...imagesActividadesPausas.value[0], audio: Soundcartoon2 },
            { id: 2, ...imagesActividadesPausas.value[1], audio: Soundcartoon3 },
            { id: 3, ...imagesActividadesPausas.value[2], audio: Soundjump },
            { id: 4, ...imagesActividadesPausas.value[3], audio: Soundcartoon1 }

        ]

        imagenes.value = imagenes.value.sort(() => Math.random() - 0.5)

        /* sonidos.value = ref([
            Soundlife,
            Soundcoin,
            Soundjump
        ]) */



        styleParlantes.gridTemplateColumns = "repeat(2, 1fr)"

    } else {
        imagenes.value = [
            { id: 1, ...imagesActividadesPausas.value[0], audio: Soundcartoon2  },
            { id: 2, ...imagesActividadesPausas.value[1], audio: Soundcartoon3},
            { id: 3, ...imagesActividadesPausas.value[2], audio: Soundjump },
            { id: 4, ...imagesActividadesPausas.value[3], audio: Soundcartoon1 },
            { id: 5, ...imagesActividadesPausas.value[4], audio:  Soundlife},
            { id: 6, ...imagesActividadesPausas.value[5], audio: Soundcoin }
        ]


        imagenes.value = imagenes.value.sort(() => Math.random() - 0.5)

        /*   sonidos.value = ref([
              Soundlife,
              Soundcoin,
              Soundjump,
              Soundcartoon1,
              Soundcartoon2,
              Soundcartoon3
          ]) */


        styleParlantes.gridTemplateColumns = "repeat(3, 1fr)"
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

const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
}

const habilitarClickOpciones = () => {
    habilitarOpcionesClick.value = true
}




const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    if (isVisibleNivel.value == false) {
        ocultarIntroNivel.value = true
        isVisibleNivel.value = true
    }
}

const generarSonidosAleatorios = () => {
    let sonidosArray = []

    imagenes.value.forEach((element,index) => {
        const { id } = element
       
        sonidosArray.push(parseInt(id) - 1)
    });

    aleatorioSonidos.value = sonidosArray.sort(() => Math.random() - 0.5)
}

const styleParlante = reactive({
    width: '37px',
    height: '33px',
    backgroundImage: `url('${ImagenParlante}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer',
    position: 'fixed',
    float: "right",
    margin: "12px"
});

const styleParlantes = reactive({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(16vw, 1fr))",
    gridGap: "2vh",
    placeContent: "center",
    textAlign: "center",
    flexWrap: "wrap",
    height: "65vh"
});


const styleContentPrueba = reactive({
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)"
});



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


const activarNavegacionSliders = () => {
    if (puntosBuenos.value == imagenes.value.length) {
        /*  finTime.value = true */
        mensajeFinal.value = true
        guardarPuntos()
        cronometroMostrarOpciones.value = false
        repetirAudio.value = false
        habilitarCronometro.value = false
        mostrarCamaraCalentamiento.value = false
        mostrarOpcionesrandomAudios.value = false
        habilitarOpcionesClick.value = false
        mostrarImagen.value = false
    } else {
        cronometroMostrarOpciones.value = false
        repetirAudio.value = false
        mostrarCamaraCalentamiento.value = false
        mostrarOpcionesrandomAudios.value = true
        habilitarOpcionesClick.value = false
        habilitarCronometro.value = false
        mostrarcronometro.value = false
        mostrarImagen.value = false
        mostrarTooltip.value = false
        monstrarBotonCerrarInstrucciones.value = false
        estadoVideoPause.value = false
    }


    /* ocultarInstrucciones.value = !ocultarInstrucciones.value */
}



const playSonidoAleatorio = () => {

    console.log(imagenes.value)


    if (aleatorioSonidos.value.length !== 0) {

        if (config.audioPausas) {
            audio.value = new Audio(imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].audio)
            audio.value.play()

            audio.value.addEventListener("ended", () => {

                /*  emit("finAudioAleatorio") */
                mostrarImagen.value = true
                habilitarClickOpciones()
            });
        } else {
            if (window.confirm("El audio está desactivado.  Por favor, active la opción de sonido en el menú principal para que la actividad funcione.")) {
                if (config.audioPausas) {
                    audio.value = new Audio(imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].audio)
                    audio.value.play()

                    audio.value.addEventListener("ended", () => {

                        /*  emit("finAudioAleatorio") */
                        mostrarImagen.value = true
                        habilitarClickOpciones()
                    });
                }
            }

        }
    } else {

        posicionAudioAleatorio.value = 0
    }

}

const validar = (id) => {

    imagenes.value.forEach(element => {
        const { id } = element
        if (!element.finalizado) {
            document.querySelector(`#figura-click-${id} img`).style.boxShadow = 'none';
            document.querySelector(`#figura-click-${id} img`).style.borderRadius = 'none';
        }
    });
    document.querySelector(`#figura-click-${id} img`).style.boxShadow = '-1px -1px 16px inset blue';
    document.querySelector(`#figura-click-${id} img`).style.borderRadius = '12px';
}


const limpiarFiltro = () => {
    imagenes.value.forEach(element => {
        const { id } = element
        document.querySelector(`#figura-click-${id} img`).style.boxShadow = 'none';
        document.querySelector(`#figura-click-${id} img`).style.borderRadius = 'none';
    });
}

const comprobarRespuesta = (id) => {
    validar(id)
    if (imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]]?.id == id) {
        cronometroMostrarOpciones.value = true
        limpiarFiltro()

        imagenCorrecta.value = imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].imagen
        videoPausa.value = imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].video
        isLoopVideo.value = imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].loop
        validarCambioActividad.value = imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].cambio
        document.querySelector(`#figura-click-${id} img`).style.boxShadow = '-1px -1px 16px inset green';
        document.querySelector(`#figura-click-${id} img`).style.border = '1px solid green';
        document.querySelector(`#figura-click-${id}`).classList.add('opcion-correcto')


        document.querySelector(`#imagen-pregunta`).setAttribute('src', imagenCorrecta.value)
        document.querySelector(`#imagen-pregunta`).classList.add('imagenes-opciones')

        imagenes.value[id - 1].finalizado = true
        repetirAudio.value = false




        textoInstruccionPausa.value = buscarInstruccionesEjercicio(imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].idIntrucciones)
        isInstruccionesPausaVisible.value = true

        posicionAudioAleatorio.value = posicionAudioAleatorio.value + 1
        /* puntosBuenos.value = puntosBuenos.value + 1 */
        aumentarPuntosBuenos()


        //Buscamos el id de la instruccion correspondiente a la pausa.
        let idClick = Object.values(imagenes.value).filter((elementPausaId) => {
            return elementPausaId.id == id
        })[0].idIntrucciones
        configurarTiempoPausas(idClick)
        /* aleatorioSonidos.value.splice(0, 1) */
        /*   if (audioAplausos.value == null) {
  
              audioAplausos.value = new Sonidos('aplausos', false)
  
              audioAplausos.value.playAudio(() => {
                  
              })
  
          } else {
              audioAplausos.value.stopAudio()
          } */

        if (config.audioPausas) {
            audioAplausos.value = new Audio(Aplausos)
            audioAplausos.value.play()
            audioAplausos.value.addEventListener("ended", () => {


            })
        } else {
            window.confirm("El audio está desactivado.  Por favor, active la opción de sonido en el menú principal para que la actividad funcione.")
        }

    } else {
        limpiarFiltro()

        document.querySelector(`#figura-click-${id} img`).style.boxShadow = '-1px -1px 16px inset red';
        document.querySelector(`#figura-click-${id} img`).style.border = '1px solid red';
        /* document.querySelector(`#figura-click-${id} img`).style.borderRadius = '12px'; */
        document.querySelector(`#figura-click-${id}`).classList.add('opcion-incorrecto')
        if (config.audioPausas) {
            audioIncorrecto.value = new Audio(Incorrecto)
            audioIncorrecto.value.play()
        } else {
            window.confirm("El audio está desactivado.  Por favor, active la opción de sonido en el menú principal para que la actividad funcione.")


        }

        /*  if (audioIncorrecto.value == null) {
 
             audioIncorrecto.value = new Sonidos('incorrecto', false)
             audioIncorrecto.value.playAudio()
 
         } else {
             audioIncorrecto.value.stopAudio()
         } */
        setTimeout(() => {
            document.querySelector(`#imagen-pregunta`).style.border = 'none';
        }, 2500)
        aumentarPuntosMalos()
    }
}


const configurarTiempoPausas = (id) => {

    
    //Configuracion de tiempo para el cronometro dependiento de las pausas.
    let tiempoPausa = Object.values(imagesActividadesPausas.value).filter((elementPausaId) => {
        return elementPausaId.idIntrucciones == id
    })

    

    //Configuramos el tiempo de la pausa de acuerdo a lo programado en el archivo pausas
    tiempoActividad.value = 0 //Reiniciamos el tiempo
    tiempoActividad.value = tiempoPausa[0].tiempo
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


const reiniciarInterrogante = () => {
    mostrarCamaraCalentamiento.value = false
    document.querySelector(`#imagen-pregunta`).setAttribute('src', '@/assets/img/manos/pregunta.png')
    document.querySelector(`#imagen-pregunta`).style.border = 'none';
    cronometroMostrarPausaActiva.value = false
}

const volverEscena = () => {
    imagenCorrecta.value = null
    config.setActividadActual(router.currentRoute.value.path)
    config.setActividadCompletada()
    let posicionActual = config.posicionactualEscenarioJuego
    let posicionActualActividades = config.posicionActualActividades
    config.setPosicionActualActividades(posicionActualActividades + 1)
    config.setPosicionActualUsuario(posicionActual + 1)

    router.push('/Escenario')
}

const buscarInstruccionesEjercicio = (id) => {
    return Object.values(pausasActivasInstrucciones.value).filter(pausa => {
        return pausa.id == id
    })
}

const ocultarVentanaInstruccionesPausas = () => {
    isInstruccionesPausaVisible.value = !isInstruccionesPausaVisible.value
    cronometroMostrarOpciones.value = false
    mostrarCamaraCalentamiento.value = true
    mostrarOpcionesrandomAudios.value = false
    mostrarcronometro.value = true
    mostrarTooltip.value = true
    ocultarBotonComenzarActividad.value = true


}

const finLoadCamara = () => {
    camaraWebCargada.value = true
    ocultarBotonComenzarActividad.value = true
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


.titulo {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
}





.conetenedor-imagen-opcion {
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px;
    border: 1px solid var(--azul-axa);
    margin: 8px;
    width: auto;
    height: 25ch;
    cursor: pointer
}

.conetenedor-imagen-opcion img:hover {

    /*   box-shadow: -1px -1px 16px inset var(--azul-axa); */

}

.contenedor-opciones {
    width: fit-content;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%
}

.contenedor-ejercicio-imagen-camara {
    height: 49vh !important
}

/* .camara {
    position: absolute;
    top: 4px;
    left: 2px
} */
.contendor-interrogante {
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -225%);
    z-index: 999999;
    background-image: url(@/assets/img/interrogante.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 230px;
    text-align: center;
}


.diabled-click-filter {

    pointer-events: none;
}

.contenedor-parlantes {
    display: flex;
    flex-direction: column;
    place-items: center;
    justify-content: center;
    width: 80vw;
    height: 87vh;
    grid-gap: 9px;
    padding: 20px 0px;
    background-color: white;
    border-radius: 15px;
    /*  background-image: url(@/assets/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 100% 112%;
    background-position: center center; */
}



.parlante-item {
    display: flex;
    /* grid-template-columns: repeat(3, 1fr); */
    justify-content: center;
    flex-direction: row;
    place-items: center;
    grid-gap: 15px;
    overflow: hidden
}

.contenedor-audio {
    padding: 1px;
    width: 20vw;
    height: 33vh;
    grid-gap: 31px;
    overflow: hidden;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    position: relative
}



.imagenes-opciones {
    width: min-content;
    margin: 0px auto;
}

.imagenes-opciones img {
    width: 207px;
    height: -webkit-fill-available;
    border-radius: 12px;
    object-fit: scale-down;
    padding: 10px;
    background-color: var(--blanco)
}


/* .imagenes-opciones :hover {
    transform: scale(1.06);
    transition: transform 0.5s ease-in-out;
    cursor: pointer
}

.imagenes-opciones:not(:hover) {
    transform: scale(1);
    transition: transform 0.5s ease-in-out;

} */


#imagen-pregunta {
    object-fit: scale-down;
}

#imagen-pregunta-ejercicio {
    width: auto;
    height: 21pc;
}

.parlante-pregunta {
    text-align: center;

}

.parlante-validador {
    animation-name: stretch;
    animation-duration: 1.0s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-play-state: running;
}

.imagenes-opciones-click {
    border: 3px solid var(--border-info-mensaje)
}

.title {
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
}

.opcion-correcto::before {
    content: '';
    background: url('@/assets/img/check_awert.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(200px, 11px);
}

.opcion-incorrecto::before {
    content: '';
    background: url('@/assets/img/check_wrong.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(200px, 11px);
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
    margin-bottom: 12px
}







.contenedor-ejercicio-pausas {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-content: center;
    place-items: center;
    width: 53vw;
    margin: 0px auto;
}

@keyframes stretch {
    0% {
        transform: scale(1);
        background-color: rgb(185, 185, 185);
        border-radius: 100%;
    }

    50% {
        background-color: rgb(148, 148, 148);
    }

    100% {
        transform: scale(1.1);
        background-color: rgb(126, 123, 123);
    }
}

.habilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(1)
}

.inhabilitar-boton-listo {
    pointer-events: all;
    filter: grayscale(0)
}


@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .opcion-correcto::before {
        content: '';
        background: url('@/assets/img/check_awert.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(0px, 11px);
    }

    .opcion-incorrecto::before {
        content: '';
        background: url('@/assets/img/check_wrong.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(0px, 11px);
    }

}
</style>