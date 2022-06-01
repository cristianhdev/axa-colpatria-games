<template>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" urlImagenFondo="marco_nivel_1">
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
        <Cronometro v-if="habilitarCronometro" :segundos="tiempoActividad" @endTime="continuarActividad" />

        <div class="contenedor-items   center-element">
            <div v-if="!opcionCorrecta" class="titulo auto">
                <h2>Encuenta la pareja que corresponda</h2>

            </div>
            <div :style="stylecuadriculaItems" class=" auto flex-center-elements-row gap-1">

                <div v-if="opcionCorrecta" class="contenedor-ejercicio-realizado">
                    <div>
                        <div class="auto">
                            <h2>Ahora realiza el ejercicio.</h2>
                        </div>
                        <div class="flex-center-elements-row gap-3">

                            <div class="contenedor-ejercicios">
                                <img :id="mostrarImagen" :src="mostrarImagen" alt="" width="285" height="250">
                            </div>
                            <div class="contenedor-ejercicios" v-if="camaraReady">

                                <div>
                                    <CaramaWeb :width="285" :height="250" @camaraLoad="finLoadCamara" />
                                </div>
                                <!--  <div v-else>
                        <h2>Cargando camara...</h2>
                    </div> -->

                            </div>
                        </div>

                    </div>

                </div>
                <template v-if="!opcionCorrecta">
                    <div :class="{ 'desahbilitado': imagen.finalizado, 'remove-click': innabilitarClick }"
                        :id="imagen.nombre"
                        @click="validarClick({ id: imagen.id, nombre: imagen.nombre, imagen: imagen.imagen })"
                        :srcUrlImagen="srcUrlImagen" v-for="(imagen, index) in imagenesTablero" :key="index">
                        <ItemConcentrese :idItem="imagen.id" :nombreItem="imagen.nombre" :finActividad="activarBotonContinuar" />

                    </div>
                </template>

            </div>
            <div v-if="activarBotonContinuar" class="auto flex-center-elements-row">
                <button class="btn-primary-ghost" @mousemove="confity" @click="volverEscenario">VOLVER A
                    ESCENARIO</button>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, onBeforeMount, computed, reactive } from 'vue'
import Cronometro from '../../Cronometro.vue'
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import ItemConcentrese from "@/components/Juegos/Concentrese/ItemsConcentrese.vue"


import { useConfigStore } from "../../../stores/config.js";
import { useRouter, useRoute } from "vue-router";
import ImagenInterrogante from '@/assets/img/manos/pregunta.png'
import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'
import ImagenEjercicio2 from '@/assets/img/Ejercicio2.png'
import ImagenEjercicio3 from '@/assets/img/Ejercicio3.png'
import ImagenEjercicio4 from '@/assets/img/Ejercicio4.png'
import ImagenEjercicio5 from '@/assets/img/Ejercicio5.png'
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png'
import ImagenParlante from '@/assets/img/parlanteOn.gif'

//Ejericicios Postura -Gif
import Ejercicio1 from '@/assets/ejercicios/Ej1.gif'
import Ejercicio2 from '@/assets/ejercicios/Ej2.gif'
import Ejercicio3 from '@/assets/ejercicios/Ej3.gif'
import Ejercicio4 from '@/assets/ejercicios/Ej4.gif'


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
const puntosBuenos = ref(0)
const opcionSeleccionada1 = ref('')
const opcionSeleccionada2 = ref('')
const nombreSeleccionada1 = ref('')
const nombreSeleccionada2 = ref('')
const mostrarImagen = ref('')
const opcionCorrecta = ref(false)
const activarBotonContinuar = ref(false)
const innabilitarClick = ref(false)

const srcUrlImagen = ref(ImagenInterrogante)


const continuar = ref(false)

const habilitarCronometro = ref(false)
const reiniciaFiguraCheck = ref(false)
const imagenesA = ref([])
const imagenesB = ref([])
const imagenesTablero = ref([])
const resultado = ref([])


const stylecuadriculaItems = reactive({
    width: "49%",
    height: "60vh",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)"
})


//Posicion audio aleatorio
const posicionAudioAleatorio = ref(0)

const finLoadCamara = () => { }

const configurarActividad = (valor) => {

    if (valor == 1) {
        imagenesA.value = [
            { nombre: 'ImagenA1', imagen: ImagenEjercicio1, id: 1, finalizado: false },
            { nombre: 'ImagenA2', imagen: ImagenEjercicio2, id: 2, finalizado: false },
            { nombre: 'ImagenA3', imagen: ImagenEjercicio3, id: 3, finalizado: false },
            /* { nombre:'ImagenA4',imagen: ImagenEjercicio4, id: 4, finalizado: false },
            { nombre:'ImagenA5',imagen: ImagenEjercicio5, id: 5, finalizado: false },
            { nombre:'ImagenA6',imagen: ImagenEjercicio6, id: 6, finalizado: false } */
        ]

        imagenesB.value = [
            { nombre: 'ImagenB1', imagen: ImagenEjercicio1, id: 1, finalizado: false },
            { nombre: 'ImagenB2', imagen: ImagenEjercicio2, id: 2, finalizado: false },
            { nombre: 'ImagenB3', imagen: ImagenEjercicio3, id: 3, finalizado: false },
            /* { nombre:'ImagenB4',imagen: ImagenEjercicio4, id: 4, finalizado: false },
            { nombre:'ImagenB5',imagen: ImagenEjercicio5, id: 5, finalizado: false },
            { nombre:'ImagenB6',imagen: ImagenEjercicio6, id: 6, finalizado: false } */
        ]


        imagenesTablero.value = imagenesA.value.concat(imagenesB.value)
        /* imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
        imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */
        imagenesTablero.value = imagenesTablero.value.sort(() => Math.random() - 0.5)

        stylecuadriculaItems.gridTemplateColumns = "repeat(3, 1fr)"

    } else {
        imagenesA.value = [
            { nombre: 'ImagenA1', imagen: ImagenEjercicio1, id: 1, finalizado: false },
            { nombre: 'ImagenA2', imagen: ImagenEjercicio2, id: 2, finalizado: false },
            { nombre: 'ImagenA3', imagen: ImagenEjercicio3, id: 3, finalizado: false },
            { nombre: 'ImagenA4', imagen: ImagenEjercicio4, id: 4, finalizado: false },
            { nombre: 'ImagenA5', imagen: ImagenEjercicio5, id: 5, finalizado: false },
            { nombre: 'ImagenA6', imagen: ImagenEjercicio6, id: 6, finalizado: false }
        ]

        imagenesB.value = [
            { nombre: 'ImagenB1', imagen: ImagenEjercicio1, id: 1, finalizado: false },
            { nombre: 'ImagenB2', imagen: ImagenEjercicio2, id: 2, finalizado: false },
            { nombre: 'ImagenB3', imagen: ImagenEjercicio3, id: 3, finalizado: false },
            { nombre: 'ImagenB4', imagen: ImagenEjercicio4, id: 4, finalizado: false },
            { nombre: 'ImagenB5', imagen: ImagenEjercicio5, id: 5, finalizado: false },
            { nombre: 'ImagenB6', imagen: ImagenEjercicio6, id: 6, finalizado: false }
        ]

        imagenesTablero.value = imagenesA.value.concat(imagenesB.value)
        /* imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
        imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */
        imagenesTablero.value = imagenesTablero.value.sort(() => Math.random() - 0.5)

        /*  imagenesA.value = imagenesA.value.sort(() => Math.random() - 0.5)
         imagenesB.value = imagenesB.value.sort(() => Math.random() - 0.5) */

        stylecuadriculaItems.gridTemplateColumns = "repeat(4, 1fr)"
    }
}

const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    ocultarIntroNivel.value = true
}


const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
}



const validarClick = (elementoclick) => {



    if (contadorClicks.value == 0) {
        opcionSeleccionada1.value = elementoclick.nombre.substr(elementoclick.nombre.length - 2, 2)
        nombreSeleccionada1.value = elementoclick.nombre
        contadorClicks.value = contadorClicks.value + 1


    } else if (contadorClicks.value == 1) {
        opcionSeleccionada2.value = elementoclick.nombre.substr(elementoclick.nombre.length - 2, 2)
        nombreSeleccionada2.value = elementoclick.nombre
        contadorClicks.value = contadorClicks.value + 1
        mostrarImagen.value = elementoclick.imagen


    }
    if (contadorClicks.value == 2) {
        innabilitarClick.value = true
        let letra1 = opcionSeleccionada1.value.substr(0, opcionSeleccionada1.value.length - 1)
        let numero1 = opcionSeleccionada1.value.substr(1, opcionSeleccionada1.value.length - 1)
        let letra2 = opcionSeleccionada2.value.substr(0, opcionSeleccionada2.value.length - 1)
        let numero2 = opcionSeleccionada2.value.substr(1, opcionSeleccionada2.value.length - 1)



        if (letra1 === 'A' && letra2 === 'B' || letra1 === 'B' && letra2 === 'A') {



            if (numero1 === numero2) {
                console.log('clickaca2')
                puntosBuenos.value = puntosBuenos.value + 1

                setTimeout(() => {
                    document.querySelector(`#${nombreSeleccionada1.value}`).style.visibility = "hidden"
                    document.querySelector(`#${nombreSeleccionada2.value}`).style.visibility = "hidden"

                    opcionCorrecta.value = true
                    habilitarCronometro.value = true

                    eliminarElemento(elementoclick.id)
                }, 1500)
                opcionSeleccionada1.value = ''
                opcionSeleccionada2.value = ''
            } else {
                console.log('clickaca2')
                innabilitarClick.value = true
                setTimeout(() => {
                    innabilitarClick.value = false
                     document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', "")
                    document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', "")
                    document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', ImagenInterrogante)
                    document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', ImagenInterrogante)
                }, 1500)
                opcionSeleccionada1.value = ''
                opcionSeleccionada2.value = ''





            }




            /*  nombreSeleccionada1.value = ''
             nombreSeleccionada2.value = '' */
        } else {
            console.log('clickaca3')
            innabilitarClick.value = true
            setTimeout(() => {
                 innabilitarClick.value = false
                document.querySelector(`#${nombreSeleccionada1.value} #imagen`).setAttribute('src', ImagenInterrogante)
                document.querySelector(`#${nombreSeleccionada2.value} #imagen`).setAttribute('src', ImagenInterrogante)
            }, 1500)
            opcionSeleccionada1.value = ''
            opcionSeleccionada2.value = ''

        }

        contadorClicks.value = 0
    }

}

const continuarActividad = () => {
    opcionCorrecta.value = false
    habilitarCronometro.value = false
    if (puntosBuenos.value == imagenesA.value.length) {
        activarBotonContinuar.value = true
    }
}

const eliminarElemento = (id) => {
    innabilitarClick.value = false
    let posicionA = imagenesA.value.findIndex((elementId) => {
        return elementId.id == id
    })
    let posicionB = imagenesB.value.findIndex((elementId) => {
        return elementId.id == id
    })

    imagenesA.value[posicionA].finalizado = true
    imagenesB.value[posicionB].finalizado = true

}


const puntosBuenosActividad = computed(() => {
    return puntosBuenos.value
})

const volverEscenario = () => {
    config.setActividadActual(router.currentRoute.value.path)
    ocultarInstrucciones.value = false
    router.push('/Escenario')
}

</script>

<style lang="css" scoped>
.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoPantallaIntermedias.png');
    background-size: 100% 100%
}



.contenedor-items {
    flex-direction: column;
    place-items: center;
    width: 69%;
    height: 78vh;
    grid-gap: 24px;
    padding: 20px 0px;
    background-image: url(@/assets/img/fonto.png);
    background-repeat: no-repeat;
    background-size: 100% 112%;
    background-position: center center;
}

.desahbilitado {
    filter: grayscale(1);
    pointer-events: none;

}

.titulo {
    width: 39%;
    margin: 0px auto
}

.contenedor-ejercicio-realizado {
    width: 50vw;
    text-align: center
}

.remove-click {
    pointer-events: none;
}
</style>