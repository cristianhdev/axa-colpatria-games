<template>
    <div class="contenedor-actividad">
        <div class="contendor-interrogante">
            <div v-if="camaraReady">
                <img id="imagen-pregunta" src="../../../img/manos/pregunta.png" width="150" height="150" alt="">
            </div>
        </div>
        <div class="parlante-pregunta flex-center-elements-column">
            <div v-if="continuar" class="flex-center-elements-column">
                <h2 v-if="!mostrarCamaraCalentamiento">
                    Segun el sonido a que ejercicio hace referencia
                </h2>
                <h1 v-if="mostrarCamaraCalentamiento">
                    <h1>Hora realiza el ejercicio</h1>
                </h1>
                <div v-if="!mostrarCamaraCalentamiento"
                    class="parlante-validador animate__animated animate__pulse animate__faster animate__repeat-2"
                    :style="styleParlante" @click="playSonidoAleatorio()">

                </div>
            </div>
            <div class="flex-center-elements-row-nowrap gap-3 ">
                <div v-show="mostrarCamaraCalentamiento">
                    <div v-if="camaraReady">
                        <CaramaWeb class="camara" :width="250" :height="250" />
                    </div>
                </div>


            </div>
        </div>
        <div class="contenedor-parlantes  center-element">
            <div v-if="!continuar" style="text-align:center">
                <h2>Escucha cada uno de los audios y relacionalo con las imagenes, cuando estes listo da
                    click en continuar.</h2>
            </div>
            <Cronometro v-if="cronometroMostrarOpciones" :segundos="tiempoActividad"
                @endTime="activarNavegacionSliders" />
            <div class="parlantes">
                <div class="parlante-item">
                    <div v-for="(imagen, index) in imagenes.slice(0, 3)" :key="imagen + '-' + index">

                        <Parlante :srcUrl="imagen.imagen" :id="`figura-${index + 1}`"
                            :posicion="`${parseInt(index) + 1}`" :fintiempo="continuar" />
                    </div>
                </div>

                <div class="parlante-item">

                    <div v-for="(imagen, index) in imagenes.slice(3, 6)" :key="imagen + '-' + index">
                        <Parlante :srcUrl="imagen.imagen" :id="`figura-${index + 1}`"
                            :posicion="`${parseInt(index) + 1}`" :fintiempo="continuar" />
                    </div>

                </div>


            </div>
            <div v-if="!continuar" class="auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="continuar = !continuar">CONTINUAR</button>
                <button class="btn-primary" @click="volverEscena">VOLVER A EJERCICIOS</button>
            </div>

            <div v-if="cronometroMostrarOpciones">
                <div class="imagenes-opciones flex-center-elements-row gap-3">
                    <div :class="{ 'imagenes-opciones-click': opcionClicked }" v-for="img in imagenes"
                        :key="`img-${img.id}`" :id="`figura-click-${img.id}`" @click="validar(img.id)">
                        <img :src="img.imagen" width="130" height="150" alt="">
                    </div>
                </div>
                <br>
                <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                    <button class="btn-primary" @click="comprobarRespuesta">COMPROBAR</button>
                    <button class="btn-primary">REPETIR</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, reactive } from 'vue'
import Parlante from '../PosturasSonidos/Parlante.vue'
import Cronometro from '../../Cronometro.vue'
import CaramaWeb from '../../Camaraweb/CamaraWeb.vue'
import Sonidos from '../../../helpers/sounds.js'
import { useConfigStore } from "../../../stores/config.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()

const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)

const finTime = ref(false)
const reiniciarCronometro = ref(false)
const tiempoActividad = ref(20)
const audio = ref(null)
const audioAplausos = ref(null)
const audioIncorrecto = ref(null)
const aleatorioSonidos = ref([])
const opcionSeleccionada = ref()
const opcionClicked = ref(false)
const continuar = ref(false)
const cronometroMostrarOpciones = ref(false)
const repetirAudio = ref(false)
const mostrarCamaraCalentamiento = ref(false)

//Posicion audio aleatorio
const posicionAudioAleatorio = ref(0)


onBeforeMount(() => {

    generarSonidosAleatorios()


})


const generarSonidosAleatorios = () => {
    let sonidosArray = []

    imagenes.value.forEach(element => {
        const { id } = element
        sonidosArray.push(parseInt(id) - 1)
    });

    aleatorioSonidos.value = sonidosArray.sort(() => Math.random() - 0.5)
}

const styleParlante = reactive({
    backgroundColor: 'silver',
    width: '43px',
    height: '45px',
    backgroundImage: 'url(/src/img/parlanteOn.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'auto',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer'
});

const imagenes = ref([
    { imagen: "/src/img/Ejercicio1.png", id: 1, finalizado: false },
    { imagen: "/src/img/Ejercicio2.png", id: 2, finalizado: false },
    { imagen: "/src/img/Ejercicio3.png", id: 3, finalizado: false },
    { imagen: "/src/img/Ejercicio4.png", id: 4, finalizado: false },
    { imagen: "/src/img/Ejercicio5.png", id: 5, finalizado: false },
    { imagen: "/src/img/Ejercicio6.png", id: 6, finalizado: false },
])

const sonidos = ref([
    'life',
    'coin',
    'jump',
    'cartoon1',
    'cartoon2',
    'cartoon3'

])

const activarNavegacionSliders = () => {
    finTime.value = true
    cronometroMostrarOpciones.value = false
    repetirAudio.value = false
}


const playSonidoAleatorio = () => {

    if (aleatorioSonidos.value.length !== 0) {
        if (audio.value == null) {

            audio.value = new Sonidos(sonidos.value[aleatorioSonidos.value[posicionAudioAleatorio.value]], false)
            audio.value.playAudio(() => {
                if (!repetirAudio.value) {
                    cronometroMostrarOpciones.value = !cronometroMostrarOpciones.value
                    repetirAudio.value = true
                }
            })

        } else {
            audio.value.stopAudio()
        }
        audio.value = null
    } else {
        generarSonidosAleatorios()
        posicionAudioAleatorio.value = 0
    }

}

const validar = (id) => {
    opcionSeleccionada.value = id
    imagenes.value.forEach(element => {
        const { id } = element
        if (!element.finalizado) {
            document.querySelector(`#figura-click-${id}`).style.boxShadow = 'none';
            document.querySelector(`#figura-click-${id}`).style.borderRadius = 'none';
        }

    });
    document.querySelector(`#figura-click-${id}`).style.boxShadow = '-1px -1px 16px inset blue';
    document.querySelector(`#figura-click-${id}`).style.borderRadius = '12px';


}

const comprobarRespuesta = () => {
    if (imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].id == opcionSeleccionada.value) {
        cronometroMostrarOpciones.value = true
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.boxShadow = '-1px -1px 16px inset green';
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.borderRadius = '12px';
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.pointerEvents = 'none';
        document.querySelector(`#imagen-pregunta`).style.border = '3px solid green';
        document.querySelector(`#imagen-pregunta`).setAttribute('src', imagenes.value[opcionSeleccionada.value - 1].imagen)
        imagenes.value[opcionSeleccionada.value - 1].finalizado = true
        repetirAudio.value = false

        posicionAudioAleatorio.value = posicionAudioAleatorio.value + 1
        /* aleatorioSonidos.value.splice(0, 1) */
        if (audioAplausos.value == null) {

            audioAplausos.value = new Sonidos('aplausos', false)

            audioAplausos.value.playAudio(() => {
                cronometroMostrarOpciones.value = false
                mostrarCamaraCalentamiento.value = true
            })

        } else {
            audioAplausos.value.stopAudio()
        }

    } else {

        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.boxShadow = '-1px -1px 16px inset red';
        document.querySelector(`#imagen-pregunta`).style.border = '3px solid red';
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.borderRadius = '12px';
        if (audioIncorrecto.value == null) {

            audioIncorrecto.value = new Sonidos('incorrecto', false)
            audioIncorrecto.value.playAudio()

        } else {
            audioIncorrecto.value.stopAudio()
        }
        setTimeout(() => {
            document.querySelector(`#imagen-pregunta`).style.border = 'none';
        }, 2500)
    }
}


const reiniciarInterrogante = () => {
    mostrarCamaraCalentamiento.value = false
    document.querySelector(`#imagen-pregunta`).setAttribute('src', '/src/img/manos/pregunta.png')
    document.querySelector(`#imagen-pregunta`).style.border = 'none';
    cronometroMostrarPausaActiva.value = false
}

const volverEscena = () => {
    router.push('/')
}


</script>


.

<style lang="css" scoped>
.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('/src/img/fondoEscenario.png');
    background-size: 100% 100%
}

/* .camara {
    position: absolute;
    top: 4px;
    left: 2px
} */
.contendor-interrogante {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -225%);
    z-index: 999999;
    background-image: url(/src/img/interrogante.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 230px;
    text-align: center;
}



.contenedor-parlantes {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    width: 90%;
    height: 80vh;
    grid-gap: 9px;
    padding: 12px 0px;
    background-image: url(/src/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background-position: center center;
}

.contenedor-parlantes .parlantes {
    display: flex;
    flex-direction: column;
    grid-gap:6vh;
    place-content: center;
    text-align: center;
    flex-wrap: wrap;
}

.parlante-item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    grid-gap: 15px;
}

.contenedor-audio {
    border: 2px solid white;
    padding: 8px;
    width: 240px;
}



.imagenes-opciones img {
    width: 100px;
    height: 100px;
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px;
    object-fit: scale-down;
    padding: 10px;
}


.imagenes-opciones :hover {
    transform: scale(1.06);
    transition: transform 0.5s ease-in-out;
    cursor: pointer
}

.imagenes-opciones:not(:hover) {
    transform: scale(1);
    transition: transform 0.5s ease-in-out;

}


#imagen-pregunta {
    object-fit: scale-down;
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
        transform: scale(1.3);
        background-color: rgb(126, 123, 123);
    }
}
</style>