<template>
    <div class="contenedor-actividad">


        <div class="contenedor-parlantes  center-element">
            <div v-if="!continuar" class="contenedor-opciones flex-center-elements-column gap-3">
                <div v-if="!continuar" class="titulo">
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
                    <button class="btn-primary-ghost" @click="continuar = !continuar">CONTINUAR</button>
                    <!-- <button class="btn-primary-ghost" @click="volverEscena">VOLVER A EJERCICIOS</button> -->
                </div>


            </div>
            <div class="parlante-pregunta flex-center-elements-column ">
                <div v-if="continuar" class="flex-center-elements-column gap-1">
                    <div class="flex-center-elements-column gap-1">
                        <div v-if="!mostrarCamaraCalentamiento">
                            <h2>Escucha el audio, segun el sonido a que ejercicio hace referencia</h2>
                        </div>
                        <div v-if="mostrarCamaraCalentamiento">
                            <h2>Hora realiza el ejercicio</h2>
                        </div>
                        <div v-if="!mostrarCamaraCalentamiento"
                            class="parlante-validador animate__animated animate__pulse animate__faster animate__repeat-2"
                            :style="styleParlante" @click="playSonidoAleatorio()">

                        </div>
                    </div>


                    <!-- v-if="!mostrarCamaraCalentamiento" -->

                    <div class="flex-center-elements-column">
                        <div class="imagenes-opciones " v-if="!mostrarCamaraCalentamiento">
                            <img id="imagen-pregunta" src="@/assets/img/manos/pregunta.png" width="150" height="150"
                                alt="">
                        </div>
                        <div class="contenedor-ejercicio-imagen flex-center-elements-row gap-3 ">
                            <div class="contenedor-ejercicio-imagen-camara flex-center-elements-row gap-3 "
                                v-if="mostrarCamaraCalentamiento">
                                <div>
                                    <img id="imagen-pregunta-ejercicio" :src="imagenCorrecta" width="350" height="350"
                                        alt="">
                                </div>
                                <div v-if="camaraReady">
                                    <CaramaWeb class="camara" :width="250" :height="250" />
                                </div>
                            </div>
                        </div>
                        <div  class="auto flex-center-elements-row gap-2" style="text-align:center">
                            <!-- <button class="btn-primary-ghost" @click="continuar = !continuar">CONTINUAR</button> -->
                            <button v-if="mostrarCamaraCalentamiento" class="btn-primary-ghost" @click="volverEscena">VOLVER A EJERCICIOS</button>
                        </div>
                    </div>
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
                        <button class="btn-primary-ghost" @click="comprobarRespuesta">COMPROBAR</button>
                        <button class="btn-primary-ghost">REPETIR</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, reactive } from 'vue'
import Parlante from '../PosturasSonidos/Parlante.vue'
import Cronometro from '../../Cronometro.vue'
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import Sonidos from '@/assets/helpers/sounds.js'
import { useConfigStore } from "../../../stores/config.js";
import { useRouter, useRoute } from "vue-router";
import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'
import ImagenEjercicio2 from '@/assets/img/Ejercicio2.png'
import ImagenEjercicio3 from '@/assets/img/Ejercicio3.png'
import ImagenEjercicio4 from '@/assets/img/Ejercicio4.png'
import ImagenEjercicio5 from '@/assets/img/Ejercicio5.png'
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png'
import ImagenParlante from '@/assets/img/parlanteOn.gif'

//Sonidos
import Soundlife from '@/assets/sounds/life.mp3'
import Soundcoin from '@/assets/sounds/coin.mp3'
import Soundjump from '@/assets/sounds/jump.mp3'
import Soundcartoon1 from '@/assets/sounds/cartoon1.mp3'
import Soundcartoon2 from '@/assets/sounds/cartoon2.mp3'
import Soundcartoon3 from '@/assets/sounds/cartoon3.mp3'


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
const imagenCorrecta = ref(null)

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
    width: '37px',
    height: '33px',
    backgroundImage: `url('${ImagenParlante}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer'
});

/* { imagen: ImagenEjercicio4, id: 4, finalizado: false },
{ imagen: ImagenEjercicio5, id: 5, finalizado: false },
{ imagen: ImagenEjercicio6, id: 6, finalizado: false }, */

const imagenes = ref([
    { imagen: ImagenEjercicio1, id: 1, finalizado: false },
    { imagen: ImagenEjercicio2, id: 2, finalizado: false },
    { imagen: ImagenEjercicio3, id: 3, finalizado: false }

])

const sonidos = ref([
    Soundlife,
    Soundcoin,
    Soundjump,
    Soundcartoon1,
    Soundcartoon2,
    Soundcartoon3

])

const activarNavegacionSliders = () => {
    finTime.value = true
    cronometroMostrarOpciones.value = false
    repetirAudio.value = false
}



const playSonidoAleatorio = () => {

    if (aleatorioSonidos.value.length !== 0) {
        if (audio.value == null) {
            audio.value = new Audio(sonidos.value[aleatorioSonidos.value[posicionAudioAleatorio.value]])
            audio.value.play()
            audio.value.addEventListener("ended", () => {
                cronometroMostrarOpciones.value = true
                repetirAudio.value = true
            });

            /*  audio.value = new Sonidos(sonidos.value[aleatorioSonidos.value[posicionAudioAleatorio.value]], false)
             audio.value.playAudio(() => {
                
             }) */

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
        imagenCorrecta.value = imagenes.value[aleatorioSonidos.value[posicionAudioAleatorio.value]].imagen
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.boxShadow = '-1px -1px 16px inset green';
        /*  document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.borderRadius = '12px';
         document.querySelector(`#figura-click-${opcionSeleccionada.value}`).style.pointerEvents = 'none'; */
        document.querySelector(`#figura-click-${opcionSeleccionada.value}`).classList.add('imagenes-opciones')
        document.querySelector(`#imagen-pregunta`).style.border = '3px solid green';
        document.querySelector(`#imagen-pregunta`).setAttribute('src', imagenes.value[opcionSeleccionada.value - 1].imagen)
        document.querySelector(`#imagen-pregunta`).classList.add('imagenes-opciones')
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
    document.querySelector(`#imagen-pregunta`).setAttribute('src', '@/assets/img/manos/pregunta.png')
    document.querySelector(`#imagen-pregunta`).style.border = 'none';
    cronometroMostrarPausaActiva.value = false
}

const volverEscena = () => {
    config.setActividadActual(router.currentRoute.value.path)
    router.push('/')
}


</script>


.

<style lang="css" scoped>
.titulo {
    width: 50vw;
}

.contenedor-ejercicio-imagen {
    /*     height: 28vh; */
}

.contenedor-opciones {
    width: fit-content;
    height: 75vh;
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoPantallaIntermedias.png');
    background-size: 100% 100%
}

.contenedor-ejercicio-imagen-camara {
    height: 59vh !important
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
    background-image: url(@/assets/img/interrogante.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 230px;
    text-align: center;
}



.contenedor-parlantes {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 69%;
    height: 80vh;
    grid-gap: 24px;
    padding: 20px 0px;
    background-image: url(@/assets/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 100% 112%;
    background-position: center center;
}

.contenedor-parlantes .parlantes {
    display: flex;
    flex-direction: column;
    grid-gap: 2vh;
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
    width: 150px;
    height: 181px;
}



.imagenes-opciones img {
    width: 100px;
    height: 100px;
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px;
    object-fit: scale-down;
    padding: 10px;
    background-color: var(--blanco)
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

#imagen-pregunta-ejercicio {
    width: 18vw;
    height: 40vh;
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