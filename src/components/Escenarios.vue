<template>
    <div class="container-escena">

        <!-- <img :src="ImagHospital" alt=""> -->
        <div class="puntos-avance">

            <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

            </object>
        </div>
        <div :style="styleOvalo" id="ovalo">
            <div id="personaje" :style="stylePersonaje">
                <img src="@/assets/img/personaje.png" alt="">
            </div>
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
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';



const router = useRouter()
const escena = ref(null)
const escenaCojines = ref([])
const rutasActividad = ref(['/JuegoPosturas', '/JuegoManos', '/JuegoRuleta', '/JuegoOjos', '/JuegoRuleta', '/JuegoOjos', '/JuegoPosturas', '/JuegoRuleta', '/JuegoPosturas', '/JuegoRuleta'])
const config = useConfigStore();
const animacionAvancePersonaje = ref(null)

/* '/JuegoAudiosPosturas' */

/* const camaraReady = computed(() => ) */

const coordenadasAnimacionPersonaje = ref([
    { 'x': '-29', 'y': 14 },
    { 'x': -36, 'y': 6.5 },
    { 'x': -36, 'y': -1.3 },
    { 'x': -29, 'y': -5 },
    { 'x': -29, 'y': -5 },
    { 'x': -22.4, 'y': -13 },
    { 'x': -12.4, 'y': -15 },
    { 'x': -5.9, 'y': -7.2 },
    { 'x': 8, 'y': -7.2 },
    { 'x': 7.9, 'y': 0.8 },
    { 'x': 20.9, 'y': -3.2 },
    { 'x': 20.9, 'y': 8.6 },
    { 'x': 30.9, 'y': 14.3 }
])

onMounted(() => {

    cargaEscenario()




})


onBeforeMount(() => {

    if (config.posicionactualEscenarioJuego > 0) {

        styleOvalo.transform = `translate(${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].x + 'vw'}, ${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].y + 'vw'})`
    }

})

const cargaEscenario = () => {
    let elementosSvgEscenario = document.querySelector('.puntos-escena')
    elementosSvgEscenario.addEventListener('load', () => {
        let documentoMapa = elementosSvgEscenario.getSVGDocument()
        let elementosDomSvgMapa = documentoMapa.querySelectorAll('svg g')

        let niveles = Object.values(elementosDomSvgMapa).filter((svggelement) => {
            return svggelement.id.includes('cojin')
        })


        //Sacamos los g atribute del los cojines del svg 
        escenaCojines.value = Object.values(niveles).filter((element, index) => {
            console.log(niveles[index].id)
            if (element.id != 'undefined') {
                return element.id
            }

        })

        reiniciarPosiciones()
        animarEscenaPersonaje()
    })
}


const animarPuntos = () => {

    let posicionActual = config.posicionactualEscenarioJuego



    /*     animacionAvancePersonaje.value.pause() */




    reiniciarPosiciones()

    escenaCojines.value[posicionActual].style.fill = '#EDFF91'


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



        posicionActual++
        config.setPosicionActualUsuario(posicionActual)
        animacionAvancePersonaje.value.pause()

    }

    animarEscenaPersonaje()
    if (posicionActual >= escenaCojines.value.length) {
        posicionActual = 0
        config.setPosicionActualUsuario(posicionActual)
    } else {

    }
}

const animarEscenaPersonaje = () => {

    let posicionActual = config.posicionactualEscenarioJuego

    animacionAvancePersonaje.value = gsap.timeline({ timeScale: 0.1, delay: 0.2 })
        .to('#ovalo', { x: coordenadasAnimacionPersonaje.value[posicionActual].x + 'vw', y: coordenadasAnimacionPersonaje.value[posicionActual].y + 'vw', delay: 1.2, duration: 1, ease: 'Linear.easeInOut', onComplete: animarPuntos }, '2')//1 ok
}



const reiniciarPosiciones = () => {
    Object.values(escenaCojines.value).forEach(element => {
        element.style.fill = '#B5D0EE'
    });
}



const stylePersonaje = reactive({
    position: "absolute",
    left: "-14px",
    bottom: "-4vh",
    transform: "translate(0px, 0px)"
});

const styleOvalo = reactive({
    width: "3vw",
    height: "3vh",
    borderRadius: "100%",
    position: "fixed",
    bottom: "50%",
    left: "50%",
    transform: "translate(-49vw, 24.5vw)"
});

</script>

<style lang="css" scoped>
.puntos-avance {
    width: 99vw;
    height: 91vh;
    position: absolute;
}


.puntos-escena {
    width: 94vw;
    height: 910px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

#posicion-1 {
    width: 6vw;
    height: 10vh;
    position: absolute;
    bottom: 95px;
    left: 254px
}

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





#personaje img {
    width: 12vh;
    height: 20vw;
}



/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/


@media (min-width: 1281px) {

    /* CSS */
    /*  .puntos-avance {
        border: 4px solid rgb(196, 20, 152)
    } */

  

}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {

    /* CSS */
   /*  .puntos-avance {
        border: 3px solid blue
    } */
}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {

    /* CSS */
   /*  .puntos-avance {
        border: 3px solid red
    } */
}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    /* CSS */
   /*  .puntos-avance {
        border: 3px solid orange
    }
 */
}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {

    /* CSS */
  /*   .puntos-avance {
        border: 3px solid purple
    } */

}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {

    /* CSS */
   /*  .puntos-avance {
        border: 3px solid teal
    } */

}
</style>