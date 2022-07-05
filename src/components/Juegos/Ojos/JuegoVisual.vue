<template>
  <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
    urlImagenFondo="marco_nivel_1">
    <!-- <template #mensaje-nivel>
      1
    </template> -->
  </VentanaIntroNivel>
  <VentanaInstrucciones v-if="ocultarInstrucciones">
    <template #texto>
      <h2>Para este ejercicio, mantenga la cabeza recta. La idea es que mueva los ojos hacia todas las direcciones
        (arriba,
        abajo, derecha e izquierda).

        Para lograr esto, debe seguir con la vista los elementos que aparecerán en la pantalla, y de acuerdo al tema que
        le salga en el juego (ej: animales), debe dar clic sobre estos, siempre siguiendo de forma concentrada los
        elementos que vayan apareciendo.</h2>
      <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
        @click="ocultarVentanaInstrucciones">
        <div class="btn-primary"> CONTINUAR</div>
      </div>
    </template>
  </VentanaInstrucciones>
  <!--  <VentanaBienvenida  :sliderActive="false" ruta="webcamera">
      <template #titulo>
       Hola
      </template>
      <template  #texto>

        <div>
          <div class="flex-center-elements-row-nowrap gap-2" v-if="guardar">
            <input  type="text" v-model="usuario" placeholder="Su nombre" />

            <div  class="btn-primary flex-center-elements-row gap-3"
              @click="guardar = !guardar">
              GUARDAR
            </div>
          </div>

        </div>

      </template>
      <template #button-ventana>
        CONTINUAR
      </template>
    </VentanaBienvenida> -->
  <VentanaPuntosFinal v-if="mostrarMensajeFinal" @continuarTriviaEvent="continuarTrivia"
    @volverEscenarioEvent="volverEscenario">
    <template #puntos-buenos>
      <div v-if="puntos_correctos > 0">
        <span>¡Genial!</span>
      </div>
      <div v-else>
        <span>¡Lo sentimos!</span>
      </div>
    </template>
    <template #mensaje-respuestas>
      <div v-if="puntos_correctos > 0" class="auto">
        <img :src="ChetList" width="180" height="180" alt="">
      </div>
      <div v-else class="auto">
        <img :src="WarnList" width="180" height="180" alt="">
      </div>
    </template>
    <template #mensaje-opcion>
      <span style="font-size:2em">{{ puntos_correctos }}</span> <span>Respuestas seguidas</span>
    </template>
    <template #botones>
      <!-- <button class="btn-primary-vr1" @mousemove="confity" @click="continuarTrivia">CONTINUAR TRIVIA!</button> -->
      <div class="btn-primary" @mousemove="confity" @click="volverEscenario">VOLVER AL ESCENARIO</div>
      <!--  <button class="btn-primary-vr1" @mousemove="confity" id="salir">SALIR</button> -->
    </template>
  </VentanaPuntosFinal>
  <!--  <div v-if="mostrarMensajeFinal"
    class="mensaje-puntos center-element flex-center-elements-column gap-2 border-axa padding-2 animate__animated animate__fadeIn">
    <div>
      <h1>
        ¡La actividad ha terminado! <br> Genial {{ puntos_correctos }} respuestas correctas
      </h1>
    </div>
    <div class="auto flex-center-elements-row gap-2" style="text-align:center">
      <button class="btn-primary" @click="continuarTrivia">CONTINUAR</button>
      <button class="btn-primary" @click="volverEscenario">VOLVER AL ESCENARIO</button>
    </div>
  </div> -->
  <div class="container-ojos">
    <!--    <div v-if="!isTemasRandomVisible" class="puntos flex-center-elements-row gap-2">
      <div>
        Tema: {{ temasSeleccionadosArray[0] }}
      </div>
      <div>
        <span>Puntos Buenos:</span> {{ puntos_correctos }}
      </div>
      <div>
        <span> Puntos Malos:</span> {{ puntos_incorrectos }}
      </div>
    </div> -->
    <!-- v-if="InstruccionesVisible == true" -->
    <div class="ventana-juego-ojos ">
      <div :class="`contenedor-temas-aleatorios  center-element
      ${ajusteAleatorio}
      gap-3`">
        <!--  @finTemas="animarElementsoAleatorios" -->
        <div v-if="cargarActividad">
          <RandomTemas :cantidadTemas="numerodeTemas" :opciones="temas"
            @finSeleccionTemasAleatorios="temasSeleccionados" :class="`${ajusteAleatorio} gap-3`"
            @continuar="continuarActividad" />

        </div>
      </div>
    </div>


    <div v-show="isTemasRandomVisible">



      <div ref="tamanoContenedor" id="contenedor-elemento-random" class="contenedor-mensaje center-element ">
        <!--  -->
        <div v-show="isTemasRandomVisible">
          <Cronometro v-if="mostrarcronometro" :isRun="habilitarCronometro" :segundos="25" @endTime="limpiarTiempo" />
        </div>
        <div :id="`objetos-volador-abajo-${index + 1} `" :style="styleObjectPositionAbajo"
          class="objetos-actividad-1 flex-center-elements-row" v-for="(imagen, index) in imagenes_aleatorias"
          :key="index" @click="validarClick(imagen.tipo, `objetos-volador-abajo-${index + 1} `)">
          <ContenedorImagenes :id="index + 1" :srcImagen="imagenes_aleatorias[index].imagen"
            class="animate__animated animate__heartBeat animate__infinite" />
        </div>
        <div :id="`objetos-volador-arriba-${index + 1} `" :style="styleObjectPositionArriba"
          class="objetos-actividad-2 flex-center-elements-column" v-for="(imagen, index) in imagenes_aleatorias"
          :key="index" @click="validarClick(imagen.tipo, `objetos-volador-arriba-${index + 1} `)">
          <ContenedorImagenes :id="index + 1" :srcImagen="imagenes_aleatorias[index].imagen"
            class="animate__animated animate__heartBeat animate__infinite" />
        </div>
        <div :id="`objetos-volador-derecha-${index + 1} `" :style="styleObjectPositionDerecha"
          class="objetos-actividad-3 flex-center-elements-column" v-for="(imagen, index) in imagenes_aleatorias"
          :key="index" @click="validarClick(imagen.tipo, `objetos-volador-derecha-${index + 1} `)">
          <ContenedorImagenes :id="index + 1" :srcImagen="imagenes_aleatorias[index].imagen"
            class="animate__animated animate__heartBeat animate__infinite" />
        </div>
        <div :id="`objetos-volador-izquierda-${index + 1} `" :style="styleObjectPositionIzquierda"
          class="objetos-actividad-4 flex-center-elements-column" v-for="(imagen, index) in imagenes_aleatorias"
          :key="index" @click="validarClick(imagen.tipo, `objetos-volador-izquierda-${index + 1} `)">
          <ContenedorImagenes :id="index + 1" :srcImagen="imagenes_aleatorias[index].imagen"
            class="animate__animated animate__heartBeat animate__infinite" />
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, watch, reactive, onBeforeMount, onMounted, computed } from "vue";

//COMPONENTES
import ContenedorImagenes from "./contendorImagen.vue";
import RandomTemas from "./randomTema.vue";
import anime from 'animejs/lib/anime.es.js';
import Cronometro from '../../../components/Cronometro.vue'
import { useRouter, useRoute } from "vue-router";
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
/* import VentanaBienvenida from "@/components/VentanaBienvenida.vue"; */
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import { useConfigStore } from "../../../stores/config.js";

//Imagenes
import WarnList from '@/assets/img/warn-list.png';
import ChetList from '@/assets/img/chek-list.png';
import ImagenBanano from '@/assets/img/banano.png';
import ImagenFresa from '@/assets/img/fresa.png';
import ImagenUvas from '@/assets/img/uvas.png';
import ImagenNaranja from '@/assets/img/naranja.png';
import ImagenAni1 from '@/assets/img/ani1.png';
import ImagenAni2 from '@/assets/img/ani2.png';
import ImagenAni3 from '@/assets/img/ani3.png';
import ImagenCalculadora from '@/assets/img/calculadora.png';
import ImagenPc from '@/assets/img/pc.png';
import ImagenLibro from '@/assets/img/libros.png';





const router = useRouter()
const config = useConfigStore();
const isTemasRandomVisible = ref(false)


const puntos_correctos = ref(0);
const puntos_incorrectos = ref(0);
const puntos_perdidos = ref(0);
const objetos1 = ref([])
const objetos2 = ref([])
const objetos3 = ref([])
const objetos4 = ref([])
const numerodeTemas = ref(1)
const temasSeleccionadosArray = ref([])
const tiempoElementosAleatorios = ref(null)
const btnContinuar = ref(false)
const InstruccionesVisible = ref(false)
const tiempoElemenos = ref(2500)
const ocultarInstrucciones = ref(true)
const ocultarIntroNivel = ref(false)
const cargarActividad = ref(false)
const mostrarMensajeFinal = ref(false)
const temas = ref(["animal", "colores", "oficina", "paises"]);
const tamanoContenedor = ref(null)


//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(false)


const ocultarVentanaInstrucciones = () => {
  ocultarInstrucciones.value = !ocultarInstrucciones.value
  ocultarIntroNivel.value = true

}

const finAnimacionIntro = () => {
  ocultarIntroNivel.value = false
  cargarActividad.value = true
  inicioActividad()
}


const imagenes = reactive({
  direcciones: [
    { animacion: "fadeInLeftBig", classFlecha: ".flecha-left" },
    { animacion: "fadeInRightBig", classFlecha: ".flecha-right" },
    { animacion: "fadeInUpBig", classFlecha: ".flecha-bottom" },
    { animacion: "fadeInDownBig", classFlecha: ".flecha-top" },
    { animacion: "backInDown", classFlecha: ".flecha-bottom" },
    { animacion: "backInLeft", classFlecha: ".flecha-left" },
    { animacion: "backInRight", classFlecha: ".flecha-right" },
    { animacion: "backInUp", classFlecha: ".flecha-top" },
  ],
  imagen: [
    { imagen: ImagenBanano, tipo: "fruta" },
    { imagen: ImagenFresa, tipo: "fruta" },
    { imagen: ImagenUvas, tipo: "fruta" },
    { imagen: ImagenBanano, tipo: "fruta" },
    { imagen: ImagenNaranja, tipo: "fruta" },
    { imagen: ImagenFresa, tipo: "fruta" },
    { imagen: ImagenAni1, tipo: "animal" },
    { imagen: ImagenAni2, tipo: "animal" },
    { imagen: ImagenAni3, tipo: "animal" }
    /*     { imagen: ImagenAni1, tipo: "animal" },
    { imagen: ImagenAni2, tipo: "animal" },
    { imagen: ImagenCalculadora, tipo: "oficina" },
    { imagen: ImagenPc, tipo: "oficina" },
    { imagen: ImagenLibro, tipo: "oficina" },
    { imagen: ImagenCalculadora, tipo: "oficina" },
    { imagen: ImagenLibro, tipo: "oficina" },
    { imagen: ImagenPc, tipo: "oficina" } */
  ],
});

const styleObjectPositionArriba = reactive({
  position: 'relative',
  top: '100%',
  left: '0%',
  /*   border: '2px solid red', */
  width: '15vh',
  height: '15vh',
  cursor: "pointer"
});


const styleObjectPositionAbajo = reactive({
  position: 'relative',
  top: '-26%',
  left: '0%',
  /*   border: '2px solid green', */
  width: '15vh',
  heigth: '15vh',
  cursor: "pointer"
});



const styleObjectPositionDerecha = reactive({
  position: 'relative',
  top: '-15vh',
  right: '-100%',
  /*  border: '2px solid green', */
  width: '15vh',
  height: '15vh',
  cursor: "pointer"
});


const styleObjectPositionIzquierda = reactive({
  position: 'relative',
  top: '-199%',
  left: '-15%',
  /*   border: '2px solid blue', */
  width: '15vh',
  height: '15vh',
  cursor: "pointer"
});


onMounted(() => {

  objetos1.value = document.querySelectorAll('.contenedor-mensaje .objetos-actividad-1')
  objetos2.value = document.querySelectorAll('.contenedor-mensaje .objetos-actividad-2')
  objetos3.value = document.querySelectorAll('.contenedor-mensaje .objetos-actividad-3')
  objetos4.value = document.querySelectorAll('.contenedor-mensaje .objetos-actividad-4')



})

onBeforeMount(() => {


});

const inicioActividad = () => {


}


const continuarActividad = () => {
  isTemasRandomVisible.value = true
  mostrarcronometro.value = true
  habilitarCronometro.value = true


  animarElementsoAleatorios()
}

const animarElementsoAleatorios = () => {

  /* objetos.value.forEach((element, index) => {
    element.addEventListener('click', validarClick);
  }); */




  let numero1 = 0
  let numero2 = 0
  let numero3 = 0
  let numero4 = 0

  tiempoElementosAleatorios.value = setInterval(() => {



    numero1 = Math.floor((Math.random() * (objetos1.value.length - 0)) + 0);
    numero2 = Math.floor((Math.random() * (objetos2.value.length - 0)) + 0);
    numero3 = Math.floor((Math.random() * (objetos3.value.length - 0)) + 0);
    numero4 = Math.floor((Math.random() * (objetos4.value.length - 0)) + 0);



    animarObjectoAleatorioAbajo(objetos1.value[numero1])
    animarObjectoAleatorioArriba(objetos2.value[numero2])
    animarObjectoAleatorioDerecha(objetos3.value[numero3])
    animarObjectoAleatorioIzquierda(objetos4.value[numero4])
    /* if (numero > objetos.length) {
      numero = 0
    } */
  }, tiempoElemenos.value)

  setInterval(() => {
    tiempoElemenos.value = tiempoElemenos.value - 1
  }, 3000);
}





const validarClick = (elemento, id) => {
  let busqueda = Object.values(temasSeleccionadosArray.value)
  if (busqueda[0].toLowerCase() == elemento.toLowerCase()) {
    document.getElementById(`${id}`).style.filter = "drop-shadow(2px 4px 6px green)";
    puntos_correctos.value = puntos_correctos.value + 1
    setTimeout(() => {
      document.getElementById(`${id}`).style.filter = "none";
    }, 1000)
  } else {
    document.getElementById(`${id}`).style.filter = "drop-shadow(2px 4px 6px red)";
    puntos_incorrectos.value = puntos_incorrectos.value + 1
    setTimeout(() => {
      document.getElementById(`${id}`).style.filter = "none";
    }, 1000)
  }


}

const limpiarTiempo = () => {
  clearInterval(tiempoElementosAleatorios.value)
  objetos1.value.forEach((elemento) => {
    elemento.style.visibility = 'hidden'
  })
  objetos2.value.forEach((elemento) => {
    elemento.style.visibility = 'hidden'
  })

  mostrarMensajeFinal.value = true
  isTemasRandomVisible.value = false
}


const temasSeleccionados = (tema) => {
  temasSeleccionadosArray.value.push(tema)

  if (temasSeleccionadosArray.value.length == numerodeTemas.value) {
    btnContinuar.value = true
  }
}

const animarObjectoAleatorioAbajo = (divelemento) => {

  anime({
    targets: divelemento,
    translateY: function () {
      return anime.random(400, ((1034 - 150) * -1));
    },
    delay: function (el, i, l) {
      return i * 3;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 190;
    },
    /* translateX: function () {
      return anime.random(window.screen.width, window.screen.height);
    }, */
    /* delay: function (el, i) { return i * 4000; }, */
    delay: anime.stagger(1000, { direction: 'alternate' }),
    direction: 'alternate',
    easing: 'easeOutSine',
    loop: 1
  });
}

const animarObjectoAleatorioArriba = (divelemento) => {
  anime({
    targets: divelemento,
    translateY: function () {
      return anime.random(-400, ((1034 - 150) * -1));
    },
    delay: function (el, i, l) {
      return i * 9;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 90;
    },
    /* translateX: function () {
      return anime.random(window.screen.width, window.screen.height);
    }, */
    /* delay: function (el, i) { return i * 4000; }, */
    delay: anime.stagger(1000, { direction: 'alternate' }),
    direction: 'alternate',
    easing: 'easeOutSine',
    loop: 1
  });
}


const animarObjectoAleatorioDerecha = (divelemento) => {
  anime({
    targets: divelemento,
    translateX: function () {
      return anime.random(-100, ((1034 - 100) * -1));
    },
    delay: function (el, i, l) {
      return i * 9;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 90;
    },
    /* translateX: function () {
      return anime.random(window.screen.width, window.screen.height);
    }, */
    /* delay: function (el, i) { return i * 4000; }, */
    delay: anime.stagger(1000, { direction: 'alternate' }),
    direction: 'alternate',
    easing: 'easeOutSine',
    loop: 1
  });
}

const animarObjectoAleatorioIzquierda = (divelemento) => {
  anime({
    targets: divelemento,
    translateX: function () {
      return anime.random(100, ((1034 - 100) * 1));
    },
    delay: function (el, i, l) {
      return i * 9;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 90;
    },
    /* translateX: function () {
      return anime.random(window.screen.width, window.screen.height);
    }, */
    /* delay: function (el, i) { return i * 4000; }, */
    delay: anime.stagger(1000, { direction: 'alternate' }),
    direction: 'alternate',
    easing: 'easeOutSine',
    loop: 1
  });
}



/**
 * funcion que retorna las imagenes en orden alatorio
 */
const imagenes_aleatorias = computed(() => {
  return imagenes.imagen.sort(() => Math.random() - 0.5);
});


const ajusteAleatorio = computed(() => {
  return numerodeTemas.value == 1 ? 'flex-center-elements-column' : 'flex-center-elements-row'
});

watch(isTemasRandomVisible, (isNewVisible, isOldVisible) => {

})



const volverEscenario = () => {
  config.setActividadActual(router.currentRoute.value.path)
  config.setActividadCompletada()
  let posicionActual = config.posicionactualEscenarioJuego
  let posicionActualActividades = config.posicionActualActividades
  config.setPosicionActualActividades(posicionActualActividades + 1)
  config.setPosicionActualUsuario(posicionActual + 1)
  router.push('/Escenario')
}


</script>

<style lang="css" scoped>
.mensaje-puntos {
  z-index: 999999;
  background-color: white;
  text-align: center
}

.container-ojos {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/fondoEscenario.png');
  background-size: cover;
}

.ventana-juego-ojos {
  z-index: 99999;
  width: 100vw;
  height: 100vh;

}

.objetos-actividad-1 {
  display: inline-block
}


.objetos-actividad-2 {
  display: inline-block
}

.objetos-actividad-3 {
  display: block
}


.contenedor-temas-aleatorios {
  width: 70vw
}


h2 {
  font-family: Source Sans Pro;
  font-size: var(--h2-title-size);
  color: black;
  font-weight: normal;
}

.contenedor-actividad {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%
}

.contenedor-mensaje {
  width: 74vw;
  height: 37em;
  background-color: white;
  border-radius: 23px;
  filter: drop-shadow(2px 4px 6px black);
  position: absolute;
  transform: translate(-50%, -50%);
  overflow: hidden
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

  /* CSS */

}
</style>