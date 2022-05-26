<template>
    <div class="container-escena">
        <!-- <object ref="escena" type="image/svg+xml" :data="ImagHospital" class="hospital-escena">

        </object> -->
        <!-- <img :src="ImagHospital" alt=""> -->
        <div id="personaje" :style="stylePersonaje">
            <img src="@/assets/img/personaje.png" alt="">
        </div>
    </div>
</template>

<script setup>

import { onMounted, onBeforeMount, ref, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../stores/config.js";
import { gsap } from "gsap"
import anime from 'animejs/lib/anime.es.js';
import ImagHospital from '@/assets/svg/hospitl_escena.svg';



const router = useRouter()
const escena = ref(null)
const escenaCojines = ref([])
const rutasActividad = ref(['/JuegoPosturas', '/JuegoManos', '/JuegoRuleta', '/JuegoOjos', '/JuegoRuleta', '/JuegoOjos', '/JuegoPosturas', '/JuegoRuleta', '/JuegoPosturas', '/JuegoRuleta'])
const config = useConfigStore();
const animacionAvancePersonaje = ref(null)

/* '/JuegoAudiosPosturas' */

/* const camaraReady = computed(() => ) */

const coordenadasAnimacionPersonaje = ref([
    { 'x': 234, 'y': -141 },
    { 'x': 128, 'y': -242 },
    { 'x': 129, 'y': -342 },
    { 'x': 232, 'y': -392 },
    { 'x': 336, 'y': -488 },
    { 'x': 493, 'y': -517 },
    { 'x': 593, 'y': -417 },
    { 'x': 803, 'y': -417 },
    { 'x': 803, 'y': -317 },
    { 'x': 1011, 'y': -367 },
    { 'x': 1017, 'y': -212 },
    { 'x': 1170, 'y': -139 },
])

onMounted(() => {

    cargaEscenario()

})


onBeforeMount(() => {

    if (config.posicionactualEscenarioJuego > 0) {

        stylePersonaje.transform = `translate(${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].x + 'px'}, ${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].y + 'px'})`
    }

})

const cargaEscenario = () => {
    /* let elementosSvgEscenario = document.querySelector('.hospital-escena')
    elementosSvgEscenario.addEventListener('load', () => {
        let documentoMapa = elementosSvgEscenario.getSVGDocument()
        let elementosDomSvgMapa = documentoMapa.querySelectorAll('svg g')

        let niveles = Object.values(elementosDomSvgMapa).filter((svggelement) => {
            return svggelement.id == 'niveles'
        })


        //Sacamos los g atribute del los cojines del svg 
        escenaCojines.value = Object.values(niveles[0].childNodes).filter((element, index) => {
            if (element?.id != 'undefined') {
                return element.id
            }

        })
        reiniciarPosiciones()
        animarEscenaPersonaje()
    }) */
}


const animarPuntos = () => {

    let posicionActual = config.posicionactualEscenarioJuego



    /*     animacionAvancePersonaje.value.pause() */

    console.log(animacionAvancePersonaje.value)


    reiniciarPosiciones()
    escenaCojines.value[posicionActual].childNodes[5].style.fill = '#EDFF91'


    if (posicionActual == 4 || posicionActual == 8 || posicionActual == 12) {

        console.log(posicionActual)
        posicionActual++
        config.setPosicionActualUsuario(posicionActual)
        animacionAvancePersonaje.value.pause()
        /* setTimeout(() => {
            config.setActividadActual(rutasActividad.value[posicionActual-1])
            router.push(rutasActividad.value[posicionActual - 1])
        }, 1500); */



    } else {

        /*  setTimeout(() => {
             if (posicionActual == 0) {
                 config.setActividadActual(rutasActividad.value[posicionActual])
                 router.push(rutasActividad.value[posicionActual])
             } else {
                 config.setActividadActual(rutasActividad.value[posicionActual - 1])
                 router.push(rutasActividad.value[posicionActual - 1])
             }
         }, 1500) */

        https://codepen.io/mediapipe/pen/RwGWYJw

        posicionActual++
        config.setPosicionActualUsuario(posicionActual)
        animacionAvancePersonaje.value.pause()

    }
    if (posicionActual >= escenaCojines.value.length) {
        posicionActual = 0
        config.setPosicionActualUsuario(posicionActual)
    } else {

    }
}

const animarEscenaPersonaje = () => {

    let posicionActual = config.posicionactualEscenarioJuego

    animacionAvancePersonaje.value = gsap.timeline({ timeScale: 0.1, delay: 0.2 })
        .to('#personaje', { x: coordenadasAnimacionPersonaje.value[posicionActual].x + 'px', y: coordenadasAnimacionPersonaje.value[posicionActual].y + 'px', delay: 1.2, duration: 1, ease: 'Linear.easeInOut', onComplete: animarPuntos }, '2')//1 ok
}



const reiniciarPosiciones = () => {
    Object.values(escenaCojines.value).forEach(element => {
        element.childNodes[5].style.fill = '#B5D0EE'
    });
}



const stylePersonaje = reactive({
    position: "absolute",
    left: "8px",
    bottom: "0vh",
    transform: "translate(0px, 8px)"
});

</script>

<style lang="css" scoped>
.container-escena {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/svg/hospitl_escena.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}



.hospital-escena {
    width: 100%;
    height: 100vh;
    transform: scaleX(1.2);
}



@media only screen and (min-width: 992px) {
    body {
        border: 4px solid BLUE
    }


}


@media only screen and (min-width: 1200px) {
    body {
        border: 1px solid red
    }

    /*  .hospital-escena {
        width: 100vw;
        object-fit: contain;
        height: -webkit-fill-available;
    } */
}

svg {
    width: 100%;
    height: 100%
}

#personaje img {
    width: 12vh;
    height: 20vw;
}
</style>