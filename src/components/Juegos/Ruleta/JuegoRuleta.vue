<template>
    <div class="botonMenu" @click="mostrarMenu"></div>
    <audio ref="sonidoRuleta" preload="auto">
        <source :src="RuletaSonido">
    </audio>
    <div class="emulate-confetti-1">

    </div>
    <div class="emulate-confetti-2">

    </div>

    <VentanaInstrucciones v-if="ocultarInstrucciones" :isPersonajeVisible="false">
        <template #texto>

            <div>
                <sliderInstrucciones :numerodeSliders="0" :ocultarNavegacion="true"
                    :tituloInstruccion="instruccionesActividad">

                    <template #sliders>

                        <div class="item-slider">
                            <img src="@/assets/img/Intrucciones_ruleta.png" class="responsive-imagen-slider" alt="">
                        </div>
                        <!--  <div>
                            <img src="@/assets/img/Intrucciones_audios.png" width="800" alt="">
                        </div>
 -->
                    </template>
                </sliderInstrucciones>
            </div>
            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="ocultarInstruccionesActividad">
                <div class="btn-primary"> CONTINUAR</div>
            </div>
        </template>
    </VentanaInstrucciones>
    <VentanaPuntosFinal v-if="mostrarMensaje" @continuarTriviaEvent="continuarActividad"
        @volverEscenarioEvent="volveraAlEscenario">
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
            <div class="btn-primary" @mousemove="confity" @click="continuarTrivia">CONTINUAR TRIVIA</div>
            <div class="btn-primary" @mousemove="confity" @click="volveraAlEscenario">VOLVER AL
                ESCENARIO</div>
            <!-- <button class="btn-primary-vr1" @mousemove="confity" @click="salirActividad" @id="salir">SALIR</button>
                <a href="#" @click="quitBox">Close Window</a> -->
        </template>

    </VentanaPuntosFinal>

    <div class="container-ruleta">
        <div>
            <div v-if="loading">
                <div class="spiner center-element">

                </div>
            </div>

            <div class="parent-ruleta">
                <div class="ruleta-completa">
                    <object type="image/svg+xml" :data="Ruleta" class="ruleta responsive">

                    </object>
                    <div class="indicador">

                        <object type="image/svg+xml" :data="IndicadorRuleta">

                        </object>
                    </div>

                    <div class="baseRuleta">

                        <object type="image/svg+xml" :data="baseRuleta">

                        </object>
                    </div>

                </div>
                <!--  <div v-if="btnContinuar" class="auto flex-center-elements-row gap-2" style="text-align:center">
                    <button class="btn-ghost-white " @click="continuarActividad">GIRAR</button>
                </div> -->

            </div>
            <!-- <div class="barra-izquierda">

            </div>
             <div class="barra-derecha">

            </div> -->

            <div v-if="animacionRuletaFin" class="contenedor-preguntas   animate__animated animate__fadeInLeftBig">
                <div class=" flex-center-elements-column gap-2" style="height: inherit;">

                    <div class="title animate__animated animate__fadeIn ">

                        <div>{{ randomPregunta.pregunta }}</div>

                    </div>


                    <div class="opciones-pregunta  gap-1">

                        <div class="opcion " v-for="(opcion, index) in randomPregunta.opciones"
                            :key="`opciones-${index}`" :id="`opciones-${index}`">
                            <OpcionesRuleta :id="index"
                                @click="opcionCorrecta(randomPregunta.correcta, String.fromCharCode(`6${index + 5}`).toLocaleLowerCase(), `opciones-${index}`)">

                                <template #letra>
                                    {{ String.fromCharCode(`6${index + 5}`) }}
                                </template>


                                <template #texto>
                                    {{ opcion }}.
                                </template>
                            </OpcionesRuleta>

                        </div>

                        <div>

                        </div>
                    </div>
                    <div style="height: 2vh;">
                        <div class="titulo-incorrecto" v-show="OpcionSeleccionadaRuleta">
                            ¡Opción incorrecta, inténtelo nuevamente!
                        </div>
                    </div>
                </div>
            </div>
            <MenuPrincipal :isvisible="false"
                @eventInstrucciones="isInstruccionesPausaVisible = !isInstruccionesPausaVisible" />
        </div>
    </div>


</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive } from "vue";

//ANIMACIONES
import gsap from "gsap";
import animateCSS from "@/assets/helpers/animations.js";
import PreguntasTrivia from "@/assets/textos/Preguntas.json";

import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../../../stores/config.js";

//VENTANAS COMPONENTES
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import MenuPrincipal from '@/components/MenuPrincipal.vue';

//SVG IMAGENES
import Ruleta from '@/assets/svg/ruleta.svg'
import IndicadorRuleta from '@/assets/svg/indicador.svg'
import baseRuleta from '@/assets/svg/baseRuleta.svg'
import party from "party-js";
import OpcionesRuleta from '@/components/Juegos/Ruleta/opcionPregunta.vue'

//Sonidos
import Aplausos from '@/assets/sounds/aplausos.mp3'
import Incorrecto from '@/assets/sounds/incorrecto.mp3'
import RuletaSonido from '@/assets/sounds/Ruleta_sonido_editado.mp3'
import Sonidos from '@/assets/helpers/sounds.js'

//Imagenes
import WarnList from '@/assets/img/warn-list.png';
import ChetList from '@/assets/img/chek-list.png';


//Textos 
import {instruccionesJuegoRuleta}  from "@/assets/textos/TextosInstrucciones.js";

const router = useRouter()
const animacionRuletaFin = ref(false)
const loading = ref(true)
const rotate = ref(null)
const posicionPreguntaActual = ref(0)
const puntosBuenos = ref(0)
const puntosMalos = ref(0)
const opcionSeleccionada = ref(null)
const acomuladorPuntos = ref(5)
const opcionesPregunta = ref(null)
const mostrarMensaje = ref(false)

const mostrarDebug = ref(false)
const audioAplausos = ref(null)
const audioRuleta = ref(null)
const audioIncorrecto = ref(null)
const btnContinuar = ref(true)
const ocultarInstrucciones = ref(true)
const NumeroRuletaAleatorio = ref(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'])
const NumeroLanzados = ref([])
const isInstruccionesPausaVisible = ref(false)
const instruccionesActividad = ref(instruccionesJuegoRuleta)
const config = useConfigStore();

/**
 * !Provicional
 */
const preguntasRealizadas = ref([])
const sonidoAplausos = ref(null)
const sonidoIncorrecto = ref(null)
const sonidoRuleta = ref(null)






onMounted(() => {

    document.querySelector(".emulate-confetti-1").addEventListener("click", (e) => {

        party.confetti(e.target);
    });

    document.querySelector(".emulate-confetti-2").addEventListener("click", (e) => {
        party.confetti(e.target);
    });

    /* setInterval(() => {
        document.querySelector(".emulate-confetti-1").click();
    }, 4500);

    setInterval(() => {
        document.querySelector(".emulate-confetti-2").click();
    }, 4500); */
    document.body.focus()
    loading.value = false
    sonidoPlayRuleta()

})



const sonidoPlayRuleta = () => {
    if (config.audioPausas) {
        sonidoRuleta.value = new Audio(RuletaSonido);
    }
}


onBeforeMount(() => {
    sonidoPlayRuleta
    let temporal = Object.values(PreguntasTrivia.Preguntas)

    for (let index = 0; index < 14; index++) {
        const element = temporal[index];
        preguntas.value.push(element)
    }

    //Generamos un array de manera aleatoria para las preguntas.
    preguntas.value.sort(() => Math.random() - 0.5);


    config.setPreguntasAleatorias(Object.values(preguntas.value.map((element) => {
        return element.id
    })))

    //Generamos un array de manera aleatoria para los numero de la ruleta.
    NumeroRuletaAleatorio.value.sort(() => Math.random() - 0.5);


    if (config.preguntasAleatoriasSeleccionadas.length == 0) {

    } /* else {

        let preguntaCargadas = config.preguntasAleatoriasSeleccionadas

        let temporal = Object.values(PreguntasTrivia.Preguntas)


        /*  Object.values(temporal).forEach((idReload, index) => {
             if (Object.values(temporal).includes(idReload)) {
                 temporal.splice(index, 1)
             }
         }) */

    /*   Object.values(preguntaCargadas).forEach((id) => {

          const isLargeNumber = (element) => element.id == id;

          temporal.splice(Object.values(temporal).findIndex(isLargeNumber), 1)
      }) */

    /* temporal.forEach((idReload) => {
        let pregunta = temporal.filter((element, index) => {
            const { id } = element
            id != idReload ? temporal.splice(index, 1) : null
        })
        console.log(Object.values(pregunta))
    }) */

    /*  for (let index = 0; index < 14; index++) {
         const element = temporal[index];
         preguntas.value.push(element)
     } */


    /* console.log(preguntas.value) */

    //Generamos un array de manera aleatoria para los numero de la ruleta.
    //NumeroRuletaAleatorio.value.sort(() => Math.random() - 0.5);

    //}
})


const quitBox = (cmd) => {
    open(location, '_self').close();
    return false;
}

const ocultarInstruccionesActividad = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    continuarActividad()
}



const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
}


const continuarActividad = () => {
    btnContinuar.value = false
    mostrarMensaje.value = false
    document.querySelector('.ruleta').focus()
    girarRuleta()
}

const randomPregunta = computed(() => {
    let pregunta = preguntas.value[posicionPreguntaActual.value]
    const { opciones } = pregunta
    opcionesPregunta.value = Object.keys(opciones).length
    preguntasRealizadas.value.push(pregunta.id)
    return pregunta
})


const OpcionSeleccionadaRuleta = computed(() => {
    return opcionSeleccionada.value == 'incorrecto' ? true : false
})

const randomPreguntaIds = () => {

    preguntas.value.forEach((element) => {
        return element.id
    })
}



const salirActividad = () => {
    if (confirm("Desea salir de la actividad!")) {

        /*  close(); */
    }
}


const randomNumeroAleatorioPregunta = () => {
    let numero = NumeroRuletaAleatorio.value[0]
    NumeroLanzados.value.push(numero - 1)
    NumeroRuletaAleatorio.value.splice(0, 1)
    return numero
}


const preguntas = ref([
])




const continuarTrivia = () => {
    rotate.value.restart()
    posicionPreguntaActual.value = posicionPreguntaActual.value + 1
    mostrarMensaje.value = !mostrarMensaje.value
    puntosBuenos.value = 0
    girarRuleta()

}


const girarRuleta = () => {
    sonidoPlayRuleta()
    //sonidoRuleta.value.play()



    rotate.value = gsap.timeline({ timeScale: 0.1 })
        .to('.ruleta', {
            rotation: "-360deg", duration: 0.2, repeat: 21, ease: 'none', onComplete: () => {
                rotate.value.to(".ruleta", { rotation: '333deg', duration: 0.1, ease: 'none' }, '2')//1 ok
                rotate.value.to(".ruleta", { rotation: '309deg', duration: 0.1, ease: 'none' }, '3')//2 ok
                rotate.value.to(".ruleta", { rotation: '283deg', duration: 0.1, ease: 'none' }, '4')//3 ok
                rotate.value.to(".ruleta", { rotation: '257deg', duration: 0.1, ease: 'none' }, '5')//4 ok
                rotate.value.to(".ruleta", { rotation: '232deg', duration: 0.1, ease: 'none' }, '6')//5 ok
                rotate.value.to(".ruleta", { rotation: '205deg', duration: 0.1, ease: 'none' }, '7')//6 ok
                rotate.value.to(".ruleta", { rotation: '180deg', duration: 0.1, ease: 'none' }, '8')//7 ok
                rotate.value.to(".ruleta", { rotation: '154deg', duration: 0.1, ease: 'none' }, '9')//8 ok
                rotate.value.to(".ruleta", { rotation: '129deg', duration: 0.1, ease: 'none' }, '10')//9 ok
                rotate.value.to(".ruleta", { rotation: '101deg', duration: 0.1, ease: 'none' }, '11')//10 ok
                rotate.value.to(".ruleta", { rotation: '77deg', duration: 0.1, ease: 'none' }, '12')//11 ok
                rotate.value.to(".ruleta", { rotation: '51deg', duration: 0.1, ease: 'none' }, '13')//12 ok
                rotate.value.to(".ruleta", { rotation: '25deg', duration: 0.1, ease: 'none' }, '14')//13 ok
                rotate.value.to(".ruleta", { rotation: '25deg', duration: 0.1, ease: 'none' }, '15');//14 ok

                rotate.value.seek(randomNumeroAleatorioPregunta());//posicion - 1
                rotate.value.pause()
                if (sonidoRuleta.value != null) {
                    sonidoRuleta.value.pause()
                    sonidoRuleta.value = null
                }

                detenerRuleta()
            }
        })





}




const detenerRuleta = () => {
    //do stuff

    gsap.to(rotate.value, {
        timeScale: 0, duration: Math.random(), onComplete: () => {
            gsap.to('.ruleta-completa', {
                x: '100vh', duration: 2, onComplete: () => {

                    animacionRuletaFin.value = true
                }
            })
        }, onUpdate: () => {



        }
    });
}

const opcionCorrecta = (correcta, actual, id) => {

    if (correcta == actual) {


        opcionSeleccionada.value = 'correcto'
        document.querySelector(`#${id}`).classList.add('opcion-correcto')
        /*  for (let index = 0; index < opcionesPregunta.value; index++) {
             console.log(`opciones-${index}-awswer`)
             if (opcionesPregunta.value != id) {
 
             }
             document.querySelector(`#opciones-${index}-awswer`).style.visibility = "hidden"
         } */



        /* StyleAwser.background = `transparent url(${ImagenCheckawert}) no-repeat center center` */

        document.querySelector(".emulate-confetti-1").click();
        document.querySelector(".emulate-confetti-2").click();

        //Si la configuracion de audio general esta en true
        if (config.audioPausas) {
            audioAplausos.value = new Audio(Aplausos)
            audioAplausos.value.play()
            audioAplausos.value.addEventListener("ended", () => {
                animateCSS(".contenedor-preguntas", "fadeOut").then((message) => {
                    animacionRuletaFin.value = false

                    gsap.to('.ruleta-completa', {
                        x: 50, duration: 3, onComplete: () => {
                            posicionPreguntaActual.value = posicionPreguntaActual.value + 1
                            puntosBuenos.value = puntosBuenos.value + 1
                            if (puntosBuenos.value == 3) {
                                mostrarMensaje.value = true
                                acomuladorPuntos.value = acomuladorPuntos.value + 5
                            } else {
                                rotate.value.restart()
                                girarRuleta()
                            }
                        }
                    })

                });
            });
        } else {





            animateCSS(".contenedor-preguntas", "fadeOut").then((message) => {
                animacionRuletaFin.value = false

                gsap.to('.ruleta-completa', {
                    x: 50, duration: 3, onComplete: () => {
                        posicionPreguntaActual.value = posicionPreguntaActual.value + 1
                        puntosBuenos.value = puntosBuenos.value + 1
                        if (puntosBuenos.value == 3) {
                            mostrarMensaje.value = true
                            acomuladorPuntos.value = acomuladorPuntos.value + 5
                        } else {
                            rotate.value.restart()
                            girarRuleta()
                        }
                    }
                })

            });
        }

    } else {
        opcionSeleccionada.value = 'incorrecto'

        document.querySelector(`#${id}`).classList.add('opcion-incorrecto')

        let tituloIncorrecto = document.querySelector('.titulo-incorrecto')
        console.log(tituloIncorrecto)
        tituloIncorrecto.style.visibility = 'visible'
        gsap.fromTo('.titulo-incorrecto', { opacity: 0 }, {
            opacity: 1, duration: 1.4, onComplete: () => {

                gsap.fromTo('.titulo-incorrecto', { opacity: 1 }, {
                    opacity: 0, duration: 1.4, delay: 1.2, onComplete: () => {
                        tituloIncorrecto.style.opacity = '0'

                    }
                });
            }
        });

        //Si la configuracion de audio general esta en true
        if (config.audioPausas) {
            audioIncorrecto.value = new Audio(Incorrecto)
            audioIncorrecto.value.play()
        }

        puntosMalos.value = puntosMalos.value + 1

    }
}

const volveraAlEscenario = () => {
    config.setActividadActual(router.currentRoute.value.path)
    config.setActividadCompletada()
    let posicionActual = config.posicionactualEscenarioJuego
    let posicionActualActividades = config.posicionActualActividades
    config.setPosicionActualActividades(posicionActualActividades + 1)
    config.setPosicionActualUsuario(posicionActual + 1)
    mostrarMensaje.value = false
    router.push("/Escenario")
}


</script>

<style lang="css" scoped>
.parent-ruleta {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.emulate-confetti-1 {
    position: absolute;
    top: 10px;
}

.emulate-confetti-2 {
    position: absolute;
    top: 10px;
    right: 0px;
}

.debug {
    position: absolute;
    top: 0px;
    left: 0px
}


.responsive {
    width: 100%;
    height: auto
}

.container-ruleta {
    width: 100vw;
    height: 100vh;
    background: transparent url(@/assets/img/fondoEscenario.png) no-repeat center center;
    background-size: cover;
    overflow: hidden
}




hr {
    width: 80%
}



.contenedor-preguntas {
    width: 67vw;
    height: 75vh;
    margin: 9vh 9vh;
    background-color: white;
    /* background: transparent url(@/assets/img/fonto.png) no-repeat center center;
    background-size: 105% 82%; */
    z-index: 999999;
    border-radius: 23px
}

.barra-izquierda {
    position: absolute;
    left: -210px;
    top: 33vh;
    z-index: revert;
    width: 27vw;
    height: 25vh;
    margin: 0px 9vh;
    background-color: #004E54;
    background: transparent url(@/assets/img/BarrasAfter-Before.png) no-repeat center center;
    background-size: 105% 82%;
}

.barra-derecha {
    position: absolute;
    right: 200px;
    top: 35vh;
    z-index: revert;
    width: 27vw;
    height: 25vh;
    margin: 0px 9vh;
    background-color: #004E54;
    background: transparent url(@/assets/img/BarrasAfter-Before.png) no-repeat center center;
    background-size: 105% 82%;
}


.ruleta {
    width: 53rem;
    height: 35rem;
}

.indicador {
    width: 15vw;
    height: 17vw;
    position: absolute;
    top: 39%;
    left: 124px;
    box-shadow: 3px 3px solid black
}

.baseRuleta {
    width: 15vw;
    height: 17vw;
    position: absolute;
    top: 89%;
    left: 324px;
    z-index: -9999
}




.opciones-pregunta {
    display: flex;
    width: max-content;
    place-items: center;
    grid-gap: 2vh;
    padding: 32px;
    flex-wrap: wrap
}

.opciones-pregunta .opcion {
    font-family: Publico Banner;
    width: 17vw;
    height: 19vh;
    text-align: justify;
    border: 3px solid var(--azul-axa);
    vertical-align: middle;
    display: grid;
    grid-template-columns: 1fr;
    padding: 8px;
    cursor: pointer
}




.opcion-correcto {
    color: black;
    border: 3px solid var(--border-success-mensaje) !important;
}

.opcion-incorrecto {
    color: black;
    border: 3px solid var(--border-error-mensaje) !important;
}




.opcion-normal {
    /*  background: var(--bg-ocean-blue); */
    color: white;
    font-size: 4em;
    padding-right: 9px;
    font-family: 'Publico Headline Bold';
}

.title {
    width: 83%;
    text-align: left;
    color: black;
    font-family: Source Sans Pro;
    font-size: 1.8em;
    font-weight: 400;
}

.titulo-incorrecto {
    width: 100%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: red;
    font-weight: normal;
}


/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {

    /* CSS */
    /*    .container-ruleta {
       outline: 32px double red;
    } */

    .ruleta {
        width: 53rem;
        height: 487px;
    }

    .indicador {
        width: 12vw;
        height: 11vw;
        position: absolute;
        top: 39%;
        left: 168px;
    }

    .baseRuleta {
        width: 230px;
        height: 25pc;
        position: absolute;
        top: 89%;
        left: 313px;
        z-index: -9999;
    }

    .parent-ruleta {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -16pc);
    }

}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {

    /* CSS */
    .container-ruleta {
        outline: 32px double red;
    }


    .ruleta {
        width: 53rem;
        height: 29rem;
    }

    .indicador {
        width: 12vw;
        height: 11vw;
        position: absolute;
        top: 39%;
        left: 168px;
    }

    .baseRuleta {
        width: 15vw;
        height: 17vw;
        position: absolute;
        top: 89%;
        left: 324px;
        z-index: -9999
    }


}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {

    .title{
        font-size: 1.3em;
    }

    /* CSS */
    .container-ruleta {
        outline: 32px double red;
    }

    .texto-pregunta {
        font-size: 1rem;
        line-height: 1.5em;
    }


    .ruleta {
        width: 53rem;
        height: 29rem;
    }

    .indicador {
        width: 12vw;
        height: 11vw;
        position: absolute;
        top: 39%;
        left: 188px;
    }

    .baseRuleta {
        width: 15vw;
        height: 17vw;
        position: absolute;
        top: 89%;
        left: 124px;
        z-index: -9999
    }


}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    body {
        overflow: hidden
    }

    .ruleta {
        width: 23rem;
        height: 21em;
    }

    .ruleta-completa {}

    svg {
        object-fit: scale-down;
    }


    .indicador {
        position: absolute;
        top: 29%;
        left: 14px;
    }


    .opciones-pregunta .opcion {
        font-size: 0.7rem;
        line-height: 1.5em;
    }

    .texto-pregunta {
        font-size: 0.8rem;
        line-height: 1.5em;
    }

    .opcion-correcto::before {
        content: '';
        background: url('@/assets/img/check_awert.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(35vh, -3px);
    }

    .opcion-incorrecto::before {
        content: '';
        background: url('@/assets/img/check_wrong.png') no-repeat;
        background-size: contain;
        position: fixed;
        width: 3vw;
        height: 3vh;
        transform: translate(35vh, -3px);
    }

    .contenedor-preguntas {
        width: 67vw;
        max-height: 95vh;
        height: 95vh;
    }

}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {

    /* CSS */
    /*  .container-ruleta {
        border: 3px solid purple
    } */

}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {

    /* CSS */
    /* .container-ruleta {
        border: 3px solid teal
    } */


}
</style>