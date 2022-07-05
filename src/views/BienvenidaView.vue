
<template>
  <div class="container">
    <!-- <div class="puntos-avance">

      <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

      </object>
    </div> -->

    <div v-if="mostrarVentanaContinuidad">
      <VentanaContinuidad />
    </div>
    <div v-else>
      <!-- <VentanaInstrucciones v-if="ocultarVentana" @ocultarVentana="cerrarBienvenida" urlImagenFondo="BienvidaJuegos" :isPersonajeVisible="true"
        :ocultarBotones="ocultarBotones">
        <template #texto>
          <h2>
            Las pausas activas son una forma de promover la actividad física, como habito
            de vida saludable, por lo cual se deben desarrollar programas educativos sobre
            la importancia y los beneficios de la actividad física regular.
          </h2>
          <h2>Son sesiones de actividad física desarrolladas en el entorno laboral, con una
            duración continua mínima de 10 minutos que incluye adaptación física
            cardiovascular, fortalecimiento muscular y mejoramiento de la flexibilidad
            buscando reducir el riesgo cardiovascular y las lesiones musculares por sobreuso asociados al desempeño
            laboral.
          </h2>

          <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center" @click="openFullscreen">
            <div  class="button-bs"> COMENZAR</div>
          </div>


        </template>
        <template #btntexto>

        </template>

      </VentanaInstrucciones> -->

      <VentanaBienvenida v-if="ocultarVentana" :sliderActive="false"
        class="animate__animated animate__delay-2s animate__fadeIn" ruta="usuario" @cerrarVentana="openFullscreen">
        <!--  <template #titulo> Bienvenido </template> -->
        <template #texto>



          <p><strong> Las pausas activas </strong> son sesiones de actividad física desarrolladas en el entorno laboral,
            con una duración
            continua mínima de 10 minutos que incluye adaptación física cardiovascular, fortalecimiento muscular y
            mejoramiento de la flexibilidad buscando reducir el riesgo cardiovascular y las lesiones musculares por
            sobreuso asociados al desempeño laboral.
          </p>
          <p>
            Las Pausas Activas serán una forma de promover la actividad física, como hábito de vida saludable, por lo
            cual se deben desarrollar programas educativos sobre la importancia y los beneficios de la actividad física
            regular.
          </p>


          <!-- <p>En el entorno laboral, la gran mayoría de trabajadores permanecen por lo menos
            ocho horas del día, y dependiendo del trabajo, en muchas ocasiones están
            sentados, con un nivel de actividad física mínimo. </p> -->
        </template>

      </VentanaBienvenida>
      <VentanaInstrucciones v-if="ocultarInstrucciones" urlImagenFondo="Instrucciones" :ocultarNavegacion="true">
        <template #texto>
          <div>
            <sliderInstrucciones :numerodeSliders="3" :ocultarNavegacion="false"
              :tituloInstruccion="InstruccionesActividad">

              <template #sliders>
                <div class="item-slider">
                  <img src="@/assets/img/sliders_camara_usuario.png" class="responsive-imagen-slider" alt="">
                </div>
                <div class="item-slider">
                  <img src="@/assets/img/Intrucciones_escenario.png" class="responsive-imagen-slider" alt="">
                </div>
                <div class="item-slider">
                  <img src="@/assets/img/Intrucciones_ruleta.png" class="responsive-imagen-slider" alt="">
                </div>
                <div class="item-slider">
                  <img src="@/assets/img/sliders_instrucciones_balance_final.png" class="responsive-imagen-slider" alt="">
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






  </div>
</template>

<script setup>
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';
import VentanaBienvenida from "@/components/VentanaBienvenida.vue";
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue";
import VentanaContinuidad from "@/components/VentanaContinuidad.vue";
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import { ref, reactive, onMounted, computed } from "vue";
import Sliders from "@/assets/textos/Bienvenida.json";
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'
import { useConfigStore } from "../stores/config.js";
import { useRouter, useRoute } from "vue-router";
import animateCSS from "@/assets/helpers/animations.js";
import { instruccionesBienvenida } from "@/assets/textos/TextosInstrucciones.js";

//Textos Instrucciones
const InstruccionesActividad = ref(instruccionesBienvenida)

const router = useRouter()
const ocultarInstrucciones = ref(null)

const ocultarVentana = ref(false);
const ocultarBotones = ref(false);
const mostrarVentanaContinuidad = ref(false);
const countert = ref(null);
const config = useConfigStore();

onMounted(() => {



  if (config.posicionactualEscenarioJuego > 0) {
    setTimeout(() => {
      mostrarVentanaContinuidad.value = true
    }, 2000)

  }

})

const verifyMobile = () => {
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile
}

const ocultarVentanaInstrucciones = () => {
  router.push(`/Usuario`);
}

const openFullscreen = () => {
  ocultarVentana.value = true
  ocultarInstrucciones.value = !ocultarInstrucciones.value
  if (verifyMobile()) {
    var targetelement = document.documentElement;

    if (targetelement.requestFullscreen) {
      targetelement.requestFullscreen();
    }
    if (targetelement.webkitRequestFullscreen) {
      targetelement.webkitRequestFullscreen();
    }
    if (targetelement.mozRequestFullScreen) {
      targetelement.mozRequestFullScreen();
    }
    if (targetelement.msRequestFullscreen) {
      targetelement.msRequestFullscreen();
    }
  }

}

const texto = reactive({
  titulo: computed(() => { config.titulo })
})


const cerrarBienvenida = () => {
  ocultarVentana.value = false

  /*  router.push(`/Usuario`); */
  /*  animateCSS(".contenedor-instrucciones", "fadeOut").then((message) => {
 
 
    
   }); */
}

onMounted(() => {
  const { Bienvenida } = Sliders[0];

  Bienvenida.forEach((element) => {
    slidersBienvenida.value.push(element);
  });

  // persist state in localStorage
  /*   const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    ) */



  countert.value = config.titulo


  let instruciones = setTimeout(() => {
    ocultarVentana.value = !ocultarVentana.value
    clearTimeout(instruciones)
  }, 4200);

  /*     const counter = ref(config.counter) */


  /*  config.increment()
 
   console.log(config.doubleCount); */

});

const slidersBienvenida = ref([]);
</script>



<style lang="css">
.animacion-bienvenida {
  width: 99vw;
  height: 100vh;
  background-image: url('@/assets/animaciones/axa.gif');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.puntos-escena {
  width: 94vw;
  height: 910px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>