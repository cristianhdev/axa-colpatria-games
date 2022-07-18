<template>
    <div class="botonMenu" @click="mostrarMenu"></div>

    <div class="container-escena">

        <!-- <img :src="ImagHospital" alt=""> -->
        <!-- start-1 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-1">
        <!-- start-2 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-2">
        <!-- start-3 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-3">
        <!-- start-4 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-4">
        <!-- start-5 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-5">
        <!-- start-6 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-6">
        <!-- start-7 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-7">
        <!-- start-8 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-8">
        <!-- start-9 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-9">
        <!-- start-10 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-10">
        <!-- start-11 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-11">
        <!-- start-12 -->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-12">
        <!-- start-1 3-->
        <img ref="escena" :src="StartPoint" class="puntos-start" id="puntos-start-13">

        <div class="puntos-avance">

            <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

            </object>
        </div>
        <div :style="styleOvalo" id="ovalo">

            <div id="personaje" :style="stylePersonaje">
                <img src="@/assets/img/personaje.png" alt="">
            </div>
        </div>
        <MenuPrincipal :isvisible="false" @eventInstrucciones="ocultarInstrucciones = !ocultarInstrucciones" />
        <VentanaInstrucciones v-if="ocultarInstrucciones" urlImagenFondo="Instrucciones" :ocultarNavegacion="true">
            <template #texto>
                <div>
                    <sliderInstrucciones :numerodeSliders="3" :ocultarNavegacion="false"
                        :tituloInstruccion="InstruccionesActividad">

                        <template #sliders>
                            <div class="item-slider">
                                <img src="@/assets/img/sliders_camara_usuario.png" class="responsive-imagen-slider"
                                    alt="">
                            </div>
                            <div class="item-slider">
                                <img src="@/assets/img/Intrucciones_escenario.png" class="responsive-imagen-slider"
                                    alt="">
                            </div>
                            <div class="item-slider">
                                <img src="@/assets/img/Intrucciones_ruleta.png" class="responsive-imagen-slider" alt="">
                            </div>
                            <div class="item-slider">
                                <img src="@/assets/img/sliders_instrucciones_balance_final.png"
                                    class="responsive-imagen-slider" alt="">
                            </div>
                        </template>
                    </sliderInstrucciones>
                </div>
                <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                    @click="ocultarVentanaInstrucciones">
                    <div class="btn-primary"> CONTINUAR</div>
                </div>

            </template>
        </VentanaInstrucciones>
    </div>
</template>

<script setup>

import { onMounted, onBeforeMount, onBeforeUnmount, ref, reactive, computed, watch } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../stores/config.js";
import { gsap } from "gsap"
import anime from 'animejs/lib/anime.es.js';
//import ImagHospital from '@/assets/svg/hospitl_escena.svg';
import ImagHospital from '@/assets/svg/oficina2.svg';
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';
//import StartPoint from '@/assets/svg/start.svg';
import StartPoint from '@/assets/svg/start.svg';
import MenuPrincipal from '@/components/MenuPrincipal.vue';


import { instruccionesBienvenida } from "@/assets/textos/TextosInstrucciones.js";

//Textos Instrucciones
const InstruccionesActividad = ref(instruccionesBienvenida)

const router = useRouter()
const escena = ref(null)
const escenaCojines = ref([])
const rutasActividad = ref([

    '/JuegoConcentrese',//11
    '/JuegoManos',//7
     '/JuegoAudiosPosturas',//3
    '/JuegoPosturas',//0
    '/JuegoAudiosPosturas',//4
    '/JuegoManos',//6
    '/JuegoOjos',//10
    '/JuegoConcentrese',//12
    '/JuegoOjos',//9
    '/JuegoPosturas',//1
    
])
const config = useConfigStore();
const animacionAvancePersonaje = ref(null)
const cleanTimeAvance = ref(null)
const posicionAvanceJuego = computed(() => {
    return config.posicionactualEscenarioJuego
})
const posicionAvanceJuegoActual = computed(() => {
    return config.posicionActualActividades
})

const posicionActual = ref(null)
const posicionActualActividades = ref(null)



/* '/JuegoAudiosPosturas' */

/* const camaraReady = computed(() => ) */

const coordenadasAnimacionPersonaje = ref([
    { 'x': '-31', 'y': 17 },
    { 'x': -38, 'y': 9 },
    { 'x': -38, 'y': 1 },
    { 'x': -27.3, 'y': -5 },
    { 'x': -15, 'y': -9 },
    { 'x': -3, 'y': -7.4 },
    { 'x': -3.5, 'y': 0.6 },
    { 'x': 8.5, 'y': -5.4 },
    { 'x': 8.5, 'y': 2.6 },
    { 'x': 22.9, 'y': 1.8 },
    { 'x': 22.9, 'y': 10.8 },
    { 'x': 31.9, 'y': 15.8 },
    { 'x': '-31', 'y': 17 }
])

const coordenadasStarts = ref([])

const ocultarInstrucciones = ref(null)
const actividadesCompletadas = ref(null)

const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
}

const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    config.setInstrucionesDeInicio()
    animarEscenaPersonaje()
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


onMounted(() => {
     rutasActividad.value = rutasActividad.value.reverse()
     let temporal = rutasActividad.value.sort(() => Math.random() - 0.5)
     rutasActividad.value = temporal
    /* console.log(rutasActividad.value) */
    //console.log()

    //Ocultamos todas las estrellas.

    coordenadasStarts.value = document.querySelectorAll('.puntos-start')

   




    actividadesCompletadas.value = config.actividadCompletada
    posicionActual.value = config.posicionactualEscenarioJuego
    posicionActualActividades.value = config.posicionActualActividades

    


    if (ocultarInstrucciones.value) {
        ocultarInstrucciones.value = config.mostrarInicioInstrucciones
        animarEscenaPersonaje()
    } else {
        if (posicionActual.value == 0) {
            animarEscenaPersonaje()
            /*  cargaEscenario() */
        } else {
            /* Object.values(config.actividadCompletada) */
            /* ages.every(checkAge)
    
            function checkAge(age) {
                return age > 18;
            } */


            if (Object.values(config.actividadCompletada).includes(1)) {
                mostrarEstrella()
                animarEscenaPersonaje()
            }


            /* cargaEscenario() */
        }

    }

})


onBeforeMount(() => {

    if (config.posicionactualEscenarioJuego > 0) {

        styleOvalo.transform = `translate(${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].x + 'vw'}, ${coordenadasAnimacionPersonaje.value[config.posicionactualEscenarioJuego - 1].y + 'vw'})`
    }



})

const mostrarEstrella = () => {
    
    let index = actividadesCompletadas.value.length - 1
    while (index >= 0) {
       
        coordenadasStarts.value[index].style.display = 'block'
        index = index - 1
    }
    /*  coordenadasStarts.value.forEach((element, index) => {
        
              coordenadasStarts.value[index].style.display = 'block'
         
        
     }); */


}

const cargaEscenario = () => {

    //Estrellas
    let elementosSvgEscenario = document.querySelector('.puntos-escena')
    elementosSvgEscenario.addEventListener('load', () => {
        let documentoMapa = elementosSvgEscenario.getSVGDocument()
        let elementosDomSvgMapa = documentoMapa.querySelectorAll('svg g')


        let niveles = Object.values(elementosDomSvgMapa).filter((svggelement) => {
            return svggelement.id.includes('cojin')
        })


        //Sacamos los g atribute del los cojines del svg 
        escenaCojines.value = Object.values(niveles).filter((element, index) => {

            if (element.id != 'undefined') {
                return element.id
            }
        })

        //reiniciarPosiciones()

    })
}


const detenerAnimacionPersonaje = () => {
    if (animacionAvancePersonaje.value != null) {
        animacionAvancePersonaje.value.pause()
    }
}

const animarPuntos = () => {





    /*     animacionAvancePersonaje.value.pause() */




    reiniciarPosiciones()

    /*  escenaCojines.value[posicionActual].style.fill = '#EDFF91' */


    if (posicionActual.value == 2 || posicionActual.value == 5 || posicionActual.value == 8) {
        posicionActualActividades.value = posicionActualActividades.value + 1
        //Detenemos la animacion del personaje.
        detenerAnimacionPersonaje()

        cleanTimeAvance.value = setTimeout(() => {
            router.push('/JuegoRuleta')
        }, 1500);



    } else if (posicionActual.value == 11) {
        router.push('/VentanaFinal')
    } else {

        setTimeout(() => {
            if (posicionActual.value == 0) {
                router.push(rutasActividad.value[posicionActualActividades.value])
            } else {
                router.push(rutasActividad.value[posicionActualActividades.value - 1])

            }

        }, 1500)





        //Detenemos la animacion del personaje.
        detenerAnimacionPersonaje()
    }


    /* animarEscenaPersonaje() */

    //Detenemos la animacion del personaje.
    detenerAnimacionPersonaje()

    if (posicionActual.value == escenaCojines.value.length) {
        posicionActual.value = 0
        config.setPosicionActualUsuario(posicionActual.value)
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



/* watch(router.params, (previous, current) => {
  console.log(`${previous} and ${current}`); // Debug info
}) */
/* 
watch(posicionAvanceJuegoActual, (to, from) => {
   
}); */








onBeforeUnmount(() => {
    clearTimeout(cleanTimeAvance.value)
})



</script>

<style lang="css" scoped>
/*Referenia para la posicion de los puntos*/
.puntos-avance {
    width: 99vw;
    height: 91vh;
    position: absolute;
    visibility: hidden
}




.puntos-start {
    width: 7.5%;
    position: fixed;
    bottom: 50%;
    left: 50%;
    display: none
}

#puntos-start-1 {
    transform: translate(-32.5vw, 19.5vw)
}

#puntos-start-2 {
    transform: translate(-39.6vw, 11.3vw);
}

#puntos-start-3 {
    transform: translate(-39.6vw, 3vw);
}

#puntos-start-4 {
    transform: translate(-29.6vw, -3.2vw);
}


#puntos-start-5 {
    transform: translate(-16.6vw, -6.9vw);
}

#puntos-start-6 {
    transform: translate(-4.6vw, -5vw);
}

#puntos-start-7 {
    transform: translate(-5.3vw, 2.6vw);
}

#puntos-start-8 {
    transform: translate(6.9vw, -3.2vw);
}

#puntos-start-9 {
    transform: translate(6.8vw, 5vw);
}

#puntos-start-10 {
    transform: translate(21.5vw, 4.5vw);
}

#puntos-start-11 {
    transform: translate(21.5vw, 4.5vw);
}

#puntos-start-12 {
    transform: translate(21.1vw, 13.3vw);
}

#puntos-start-13 {
    transform: translate(29.6vw, 18.3vw);
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

/* @/assets/svg/hospitl_escena.svg */
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