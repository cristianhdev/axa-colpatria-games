<template>
    <VentanaInstrucciones v-if="ocultarInstrucciones" @ocultarVentana="ocultarInstrucciones = !ocultarInstrucciones">
        <template #texto>
            <h2>Gira la ruleta y pon a prueba los conocimientos sobre pausas activas, recuerda completar todas las
                opciones,
                así podrás aplicar lo aprendido en  tu jornada laboral, estás listo.</h2>
        </template>
    </VentanaInstrucciones>
    <div class="container-ruleta">
        <div v-if="mostrarMensaje"
            class="mensaje-puntos center-element flex-center-elements-column gap-2 border-axa padding-2 animate__animated animate__fadeIn">
            <div>
                <h1>
                    ¡GENIAL! <br> TIENES {{ puntosBuenos }} RESPUESTAS SEGUIDAS
                </h1>
            </div>
            <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="continuarTrivia">CONTINUAR TRIVIA</button>
                <button class="btn-primary" @click="volverEscenario">VOLVER A EJERCICIOS</button>
            </div>
        </div>
        <div>
            <div v-if="loading">
                <div class="spiner center-element">

                </div>
            </div>
            <div class="center-element">

                <div class="ruleta-completa">
                    <object type="image/svg+xml" data="./src/svg/ruleta.svg" class="ruleta">

                    </object>
                    <div>

                        <object type="image/svg+xml" data="./src/svg/indicador.svg" class="indicador">

                        </object>
                    </div>

                </div>
                <div v-if="btnContinuar" class="auto flex-center-elements-row gap-2" style="text-align:center">
                    <button class="btn-primary" @click="continuarActividad">GIRAR</button>
                </div>

            </div>
            <!-- <div class="barra-izquierda">

            </div>
             <div class="barra-derecha">

            </div> -->
            <div v-if="animacionRuletaFin"
                class="contenedor-preguntas  flex-center-elements-column gap-2 animate__animated animate__fadeInLeftBig">



                <div class="texto-pregunta animate__animated animate__fadeIn ">

                    <h2>{{ randomPregunta.pregunta }}</h2>

                </div>


                <div class="opciones-pregunta  gap-1">
                    <div class="opcion flex-center-elements-row animate__animated  animate__delay-1s animate__zoomIn"
                        v-for="(opcion, index) in randomPregunta.opciones" :key="`opciones-${index}`"
                        :id="`opciones-${index}`"
                        @click="opcionCorrecta(randomPregunta.correcta, String.fromCharCode(`6${index + 5}`).toLocaleLowerCase(), `opciones-${index}`)">
                        <div class="opcion-border-rigth  opcion-normal">
                            {{ String.fromCharCode(`6${index + 5}`) }}
                        </div>
                        <div class="texto-opcion ">
                            {{ opcion }}.
                        </div>

                    </div>

                    <div>

                    </div>
                </div>


            </div>
        </div>
        <div v-if="mostrarDebug" class="debug">
            {{ preguntasRealizadas }}<br>
            {{ NumeroRuletaAleatorio }}<br>
            {{ NumeroLanzados.sort((a, b) => a - b) }}
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive } from "vue";
import gsap from "gsap";
import animateCSS from "../../../helpers/animations.js";
import PreguntasTrivia from "../../../textos/Preguntas.json";
import Sonidos from '../../../helpers/sounds.js'
import { useRouter, useRoute } from "vue-router";
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import { useConfigStore } from "../../../stores/config.js";


const router = useRouter()
const animacionRuletaFin = ref(false)
const loading = ref(true)
const rotate = ref(null)
const posicionPreguntaActual = ref(0)
const puntosBuenos = ref(0)
const puntosMalos = ref(0)
const acomuladorPuntos = ref(5)
const mostrarMensaje = ref(false)
const mostrarDebug = ref(false)
const audioAplausos = ref(null)
const audioRuleta = ref(null)
const audioIncorrecto = ref(null)
const btnContinuar = ref(true)
const ocultarInstrucciones = ref(true)
const NumeroRuletaAleatorio = ref(['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'])
const NumeroLanzados = ref([])
const preguntasRuletaGeneradas = useConfigStore();

/**
 * !Provicional
 */
const preguntasRealizadas = ref([])


onMounted(() => {

    loading.value = false


})

onBeforeMount(() => {

    console.log(preguntasRuletaGeneradas.preguntasAleatoriasSeleccionadas.length)

    if (preguntasRuletaGeneradas.preguntasAleatoriasSeleccionadas.length ==0 ) {
        let temporal = Object.values(PreguntasTrivia.Preguntas)

        for (let index = 0; index < 14; index++) {
            const element = temporal[index];
            preguntas.value.push(element)
        }

        //Generamos un array de manera aleatoria para las preguntas.
        preguntas.value.sort(() => Math.random() - 0.5);


        preguntasRuletaGeneradas.setPreguntasAleatorias(Object.values(preguntas.value.map((element) => {
            return element.id
        })))

        //Generamos un array de manera aleatoria para los numero de la ruleta.
        NumeroRuletaAleatorio.value.sort(() => Math.random() - 0.5);
    } else {

        console.log(preguntasRuletaGeneradas.preguntasAleatoriasSeleccionadas)

        /* preguntas.value = preguntasRuletaGeneradas.preguntasAleatoriasSeleccionadas

        preguntasRuletaGeneradas.setPreguntasAleatorias(Object.values(preguntas.value.map((element) => {
            return element.id
        })))

        //Generamos un array de manera aleatoria para los numero de la ruleta.
        NumeroRuletaAleatorio.value.sort(() => Math.random() - 0.5); */
    }
})




const continuarActividad = () => {
    btnContinuar.value = false
    document.querySelector('.ruleta').focus()
    girarRuleta()
}

const randomPregunta = computed(() => {
    let pregunta = preguntas.value[posicionPreguntaActual.value]
    preguntasRealizadas.value.push(pregunta.id)
    return pregunta
})






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
    girarRuleta()
    mostrarMensaje.value = false
}


const girarRuleta = () => {
    if (audioRuleta.value == null) {
        audioRuleta.value = new Sonidos('Ruleta_sonido_editado', false)
        audioRuleta.value.playAudio()
    } else {
        audioRuleta.value.pauseAudio()
    }
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
                audioRuleta.value.pauseAudio()
                audioRuleta.value = null
                detenerRuleta()
            }
        })





}




const detenerRuleta = () => {
    //do stuff

    gsap.to(rotate.value, {
        timeScale: 0, duration: Math.random(), onComplete: () => {
            gsap.to('.ruleta-completa', {
                x: 700, duration: 2, onComplete: () => {

                    animacionRuletaFin.value = true
                }
            })
        }, onUpdate: () => {



        }
    });
}

const opcionCorrecta = (correcta, actual, id) => {

    if (correcta == actual) {
        document.querySelector(`#${id}`).classList.add('opcion-correcto')
        if (audioAplausos.value == null) {
            audioAplausos.value = new Sonidos('aplausos', false)
            audioAplausos.value.playAudio(() => {

                animateCSS(".contenedor-preguntas", "fadeOut").then((message) => {
                    animacionRuletaFin.value = false

                    gsap.to('.ruleta-completa', {
                        x: 50, duration: 3, onComplete: () => {
                            posicionPreguntaActual.value = posicionPreguntaActual.value + 1
                            puntosBuenos.value = puntosBuenos.value + 1
                            if (puntosBuenos.value == 5) {
                                mostrarMensaje.value = true
                                acomuladorPuntos.value = acomuladorPuntos.value + 5
                            } else {
                                rotate.value.restart()
                                girarRuleta()
                            }
                        }
                    })

                });
            })
        } else {
            audioAplausos.value.stopAudio()
        }

    } else {
        if (audioIncorrecto.value == null) {

            audioIncorrecto.value = new Sonidos('incorrecto', false)
            audioIncorrecto.value.playAudio()

        } else {
            audioIncorrecto.value.stopAudio()
        }
        puntosMalos.value = puntosMalos.value + 1
        document.querySelector(`#${id}`).classList.add('opcion-incorrecto')
    }
}

const opcionInCorrecta = () => {

}

const volverEscenario = () => {
    router.push("/Escenario")
}


</script>

<style lang="css" scoped>
.debug {
    position: absolute;
    top: 0px;
    left: 0px
}

.container-ruleta {
    width: 100vw;
    height: 100vh;
    background-color: #9FD9B4
}




hr {
    width: 80%
}

.texto-pregunta {
    color: var(--blanco);
    width: 83%;
    text-align: left;
    font-size: 1.4em;
    line-height: 1.5em;
}

.mensaje-puntos {
    z-index: 999999;
    background-color: white;
    text-align: center
}

.contenedor-preguntas {
    width: 67vw;
    height: 95vh;
    margin: 0px 9vh;
    background-color: #004E54;
    background: transparent url(/src/img/fonto.png) no-repeat center center;
    background-size: 105% 82%;
    z-index: 999999;
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
    background: transparent url(/src/img/BarrasAfter-Before.png) no-repeat center center;
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
    background: transparent url(/src/img/BarrasAfter-Before.png) no-repeat center center;
    background-size: 105% 82%;
}


.ruleta {
    width: 70vw;
    height: 50vw;
}

.indicador {
    width: 17vw;
    height: 17vw;
    position: absolute;
    top: 31%;
    left: 128px;
    box-shadow: 3px 3px solid black
}



.opciones-pregunta {
    display: flex;
    width: fit-content;
    place-items: center;
    grid-gap: 2vh;
    padding: 32px;
    flex-wrap: wrap
}

.opciones-pregunta .opcion {
    font-family: 'SourceSansPro, Arial, Georgia, Sans Serif, Serif';
    width: 32vh;
    height: 19vh;
    text-align: justify;
    border: 3px solid var(--bg-igloo);
    vertical-align: middle;
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 8px
}

.opcion-border-rigth {
    /*     background: var(--info-mensaje); */
    height: inherit;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-right: 7px;
    color: var(--azul-axa);

}

.opcion:hover {
    box-shadow: 3px 4px 5px silver;
    transform: scale(1.03);
    transition: transform 0.5s ease-in-out;
    cursor: pointer
}

.opcion:not(:hover) {
    box-shadow: 3px 4px 0px silver;
    transform: scale(1);
    transition: transform 0.5s ease-in-out;
}

/* s */

.texto-opcion {
    pointer-events: none;
    text-align: center;
    color: var(--blanco);
    font-size: 23px;
    font-family: Source Sans Pro
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
</style>