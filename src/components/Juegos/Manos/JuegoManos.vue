<template>
    <div class="botonMenu" @click="mostrarMenu"></div>
    <VentanaIntroNivel v-if="ocultarIntroNivel" @finAnimacionIntroNivel="finAnimacionIntro"
        @configuraActividad="configurarActividad" :urlImagenFondo="marco_nivel_1">
    </VentanaIntroNivel>
    <VentanaInstrucciones v-if="ocultarInstrucciones">
        <template #texto>
            <!--  <h2>Para este ejercicio, con la mano derecha debe agarrar los dedos de la mano izquierda y llevarlos
                suavemente hacia atrás como se muestra en la imagen para realizar ejercicios de estiramiento (cambiamos
                con la otra mano), Mantenemos esta postura por 10 segundos cada una.
            </h2> -->
            <div>
                <sliderInstrucciones :numerodeSliders="0" :ocultarNavegacion="true"
                    :tituloInstruccion="instruccionesActividad">

                    <template #sliders>

                        <div class="item-slider">
                            <img src="@/assets/img/Intrucciones_mano.png" class="responsive-imagen-slider" alt="">
                        </div>
                        <!--  <div>
                            <img src="@/assets/img/Intrucciones_audios.png" width="800" alt="">
                        </div>
 -->
                    </template>
                </sliderInstrucciones>
            </div>
            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="ocultarVentanaInstrucciones">
                <div class="btn-primary"> CONTINUAR</div>
            </div>

        </template>
    </VentanaInstrucciones>

    <div class="contenedor-actividad gap-2 ">

        <!-- -->

        <div class="contenedor-mensaje center-element flex-center-elements-column gap-3">
            <!--  -->
            <Cronometro v-if="mostrarcronometro" :isRun="habilitarCronometro" :segundos="15"
                @endTime="activarNavegacionSliders" />
            <div class="btn-ayuda tooltip" v-if="isInstruccionesPausaVisible" @click="VerInstruccionesPausa">
                <span class="tooltiptext">Ver Instrucciones</span>
            </div>
            <div v-if="intentosActividad != 3" class="contenedor-opciones  flex-center-elements-column ">
                <div v-if="mensajes">
                    <div v-if="!continuarActividad">
                        <div class="auto">
                            <div class="titulo">¡Hora de memorizar la secuencia! Cuando esté listo, de clic en
                                continuar.
                            </div>
                        </div>

                    </div>
                    <div v-else>
                        <div class="titulo">Dando clic sobre los íconos de las flechas fije los ejercicios
                            correspondientes
                            a la secuencia memorizada anteriormente ¡gánele al tiempo y logre hacerla correctamente!
                        </div>
                    </div>
                </div>

                <div class="contenedor-opciones-items ">

                    <div class=" flex-center-elements-row gap-3">
                        <div :style="styleCuadricula" class="gap-1">

                            <div v-for="i in cantidadItemSliders" :key="`_${i}`">

                                <ItemSliders :finTime="navegacionsEstado" :ocultarNavegacion="!ocultarPaginacion"
                                    :id="i" @validarOpciones="validarRespuesta" :comprobar="false" />
                            </div>


                        </div>
                    </div>
                    <div class="auto  flex-center-elements-row gap-3" v-if="mostrarCamara">
                        <div v-if="continuarActividad" class="titulo auto">
                            <div class="titulo">¡Hora de realizar la pausa activa! Siga la secuencia con sus manos.
                            </div>
                        </div>
                        <CaramaWeb :width="140" :height="140" @camaraLoad="finLoadCamara" />
                        <div v-if="finTiempoCronometro" class="btn-primary" @click="volverEscenario">VOLVER AL
                            ESCENARIO</div>
                    </div>
                </div>

                <div v-if="!continuarActividad">
                    <div class="auto" style="text-align:center">
                        <div class="btn-primary" @click="continuar">CONTINUAR</div>
                    </div>
                </div>
                <div>
                    <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                        
                        <div v-if="ocultarBotonComenzarActividad">
                            <div v-if="activarBotonComprobar" class="btn-primary" @click="comprobarRespuesta">COMPROBAR
                            </div>
                            <div v-if="activarBotonRepetir" class="btn-primary" @click="repetirOpciones">MODIFICAR</div>
                        </div>
                        <div v-else :class="{ 'habilitar-boton-listo': ocultarBotonComenzarActividad }"
                            class="auto  inhabilitar-boton-listo flex-center-elements-row gap-2"
                            style="text-align:center">
                            <div class="button-bs" @click="OcultarBotonComenzar"> COMENZAR</div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        <!-- VENTANA INSTRUCCIONES PAUSA -->
        <InstruccionesPausa v-if="isInstruccionesPausaVisible"
            @eventOcultarInstruccionesVentana="ocultarVentanaInstruccionesPausas"
            :isCerrarVisible="monstrarBotonCerrarInstrucciones"
            @eventOcultarInstrucciones="isInstruccionesPausaVisible = !isInstruccionesPausaVisible">
            <template #texto-instrucciones>
                <div>
                    <img src="@/assets/img/mensaje.png" width="580" alt="">
                </div>
                <div class="contenedor-ejercicio-pausas  gap-1">

                    <div>
                        <div class="titulo-instrucciones-pausas auto">
                            <div>Instrucciones</div>
                        </div>
                        <div>
                            <div v-html="textoDescripcionPause" class="texto-descripcion-pausas"></div>
                        </div>

                    </div>
                    <div
                        :style="{ border: `1.35px solid black`, background: `transparent url(${mostrarImagen}) no-repeat center center`, width: '320px', height: '320px', backgroundSize: '100% 100%', width: '300px' }">
                        <!-- <img :id="mostrarImagen" :src="mostrarImagen" alt="" width="320" height="320"> -->
                    </div>

                </div>
            </template>
        </InstruccionesPausa>
        <MenuPrincipal :isvisible="false" @eventInstrucciones="ocultarInstrucciones = !ocultarInstrucciones" />
    </div>
</template>

<script setup>
import { useConfigStore } from "../../../stores/config.js";
import { ref, computed, reactive, onMounted, onBeforeMount } from 'vue'
import SliderParent from './SlidersParent.vue'
import sliderInstrucciones from "@/components/sliderInstrucciones.vue"
import ItemSliders from './ItemSliders.vue'
import Cronometro from '../../Cronometro.vue'
import VentanaInstrucciones from "@/components/VentanaInstrucciones.vue"
import VentanaPuntosFinal from "@/components/VentanaPuntosFinal.vue"
import VentanaIntroNivel from "@/components/VentanaIntroNivel.vue"
import InstruccionesPausa from '@/components/InstruccionesPausas.vue';
import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import { useRouter, useRoute } from "vue-router";
import MenuPrincipal from '@/components/MenuPrincipal.vue';

//Textos 
import { instruccionesJuegoManos } from "@/assets/textos/TextosInstrucciones.js";

//DB instruccions
import InstruccionesEjercicio from "@/assets/textos/PausasActivas.json";

const instruccionesActividad = ref(instruccionesJuegoManos)


const config = useConfigStore();

const camaraReady = computed(() => config.isCamara)

const router = useRouter()


const cantidadSliders = ref(4)
const cantidadItemSliders = ref(null)
const navegacionsEstado = ref(false)
const continuarActividad = ref(false)
const activarBotonComprobar = ref(false)
const activarBotonRepetir = ref(false)
const activarVentanaPausa = ref(true)
const finTiempoCronometro = ref(true)
const ocultarInstrucciones = ref(true)
const mensajes = ref(true)
const ocultarPaginacion = ref(true)
const intentosActividad = ref(0)
const ocultarIntroNivel = ref(false)
const mostrarCamara = ref(false)
const activarCronometro = ref(false)
const correcto = ref(false)
const puntosTotales = ref(0)
const isInstruccionesPausaVisible = ref(false)
const textoDescripcionPause = ref('')



//Opciones del cronometro.
const habilitarCronometro = ref(false)
const mostrarcronometro = ref(false)
const ocultarBotonComenzarActividad = ref(true)

onMounted(() => {

    textoDescripcionPause.value = Object.values(InstruccionesEjercicio.PausasActivas).filter(pausa => {
        return pausa.id == 9
    })[0].instruccion

    console.log(textoDescripcionPause.value)
})


const styleCuadricula = reactive({
    margin: "0px auto",
    display: "grid",
    /*  gridTemplateColumns: "repeat(4,1fr)", */
    /*  gridGap: "12px 20px" */
})


const configurarActividad = (valor) => {

    if (valor == 1) {
        cantidadItemSliders.value = 2
        styleCuadricula.gridTemplateColumns = "repeat(2,1fr)"
    } else {
        cantidadItemSliders.value = 4
        styleCuadricula.gridTemplateColumns = "repeat(4,1fr)"
    }
}
//Guardamos las opciones actuales antes de validar
const opcinesValidacion = reactive({
    posicionSlider: null,
    actual: null,
    respuesta: [],
    orderArray: []
});


const ocultarVentanaInstrucciones = () => {
    ocultarInstrucciones.value = !ocultarInstrucciones.value
    ocultarIntroNivel.value = true

}

const activarNavegacionSliders = () => {
    mostrarcronometro.value = false
    activarBotonComprobar.value = true
    activarCronometro.value = false
    finTiempoCronometro.value = false
    ocultarPaginacion.value = true
}

const repetirOpciones = () => {
    mostrarcronometro.value = true
    activarBotonRepetir.value = false
    activarBotonComprobar.value = false
    activarCronometro.value = true
    finTiempoCronometro.value = false
    ocultarPaginacion.value = false

    /*  if (intentosActividad.value == 3) {
         activarBotonRepetir.value = false
         mostrarCamara.value = true
         activarVentanaPausa = false
         activarBotonComprobar.value = false
     } else {
        
     } */

}

const OcultarBotonComenzar = () => {
    habilitarCronometro.value = !habilitarCronometro.value
    ocultarBotonComenzarActividad.value = true
}

const validarRespuesta = (comprobar) => {

    opcinesValidacion.posicionSlider = comprobar.posicionSlider
    opcinesValidacion.actual = comprobar.actual.value
    opcinesValidacion.respuesta = comprobar.validacionArray.value
    opcinesValidacion.orderArray[comprobar.posicionSlider] = { slider: comprobar.posicionSlider, posicion: opcinesValidacion.actual, respuesta: opcinesValidacion.respuesta[0].id }
}

const comprobarRespuesta = () => {

    activarCronometro.value = false
    activarBotonComprobar.value = false
    activarBotonRepetir.value = true
    ocultarPaginacion.value = true

    opcinesValidacion.orderArray.forEach(element => {
        if (element.posicion == element.respuesta) {
            correcto.value = true
            puntosTotales.value = puntosTotales.value + 1
            document.querySelector(`.contenedor-imagenes-${element.slider + 1} `).style.pointerEvent = 'none'
            //document.querySelector(`.contenedor-imagenes-${element.slider + 1} `).style.pointerEvent = 'none'

            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.boxShadow = '-1px -1px 16px inset green';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.borderRadius = '12px';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.border = '1px solid #4caf50';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}`).style.pointerEvent = 'none';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1} #sliders-order-${element.posicion}`).classList.add('opcion-correcta-item')
        } else {
            correcto.value = false

            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.boxShadow = '-1px -1px 16px inset red';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.borderRadius = '12px';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1}  #sliders-order-${element.posicion} img`).style.boder = '1px solid #4caf50';
            document.querySelector(`.contenedor-imagenes-${element.slider + 1} #sliders-order-${element.posicion}`).classList.add('opcion-incorrecta-item')
        }
    });



    if (puntosTotales.value == cantidadItemSliders.value) {
        activarBotonRepetir.value = false
        mostrarCamara.value = true
        mensajes.value = false
        activarBotonComprobar.value = false
        activarVentanaPausa.value = true
        isInstruccionesPausaVisible.value = true
        mostrarcronometro.value = true
        habilitarCronometro.value = false
        styleCuadricula.gridTemplateColumns = "repeat(2,1fr)"

    } else {
        puntosTotales.value = 0
    }


}

const continuar = () => {
    mostrarcronometro.value = true
    habilitarCronometro.value = true
    continuarActividad.value = true
    activarCronometro.value = true
    navegacionsEstado.value = true
    mensajes.value = true
    finTiempoCronometro.value = false
    ocultarPaginacion.value = false
}

const finAnimacionIntro = () => {
    ocultarIntroNivel.value = false
    /*   cargarActividad.value = true
      inicioActividad() */
}


const VerInstruccionesPausa = () => {
    monstrarBotonCerrarInstrucciones.value = true
    isInstruccionesPausaVisible.value = true
    ocultarBotonComenzarActividad.value = false
}

const ocultarVentanaInstruccionesPausas = () => {
    isInstruccionesPausaVisible.value = !isInstruccionesPausaVisible.value
    ocultarBotonComenzarActividad.value = false
}

const volverEscenario = () => {
    config.setActividadActual(router.currentRoute.value.path)
    config.setActividadCompletada()
    let posicionActual = config.posicionactualEscenarioJuego
    let posicionActualActividades = config.posicionActualActividades
    config.setPosicionActualActividades(posicionActualActividades + 1)
    config.setPosicionActualUsuario(posicionActual + 1)
    router.push("/escenario")
}


const mostrarMenu = () => {
    config.setMenuEstadoVisible(!config.menuEstadoVisible)
}


</script>

<style lang="css" scoped>
h1 {
    text-align: center;
}

/* .contenedor-actividad {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 22px;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fonto.png');
    background-size: 100% 100%
}
 */


.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%
}

.contenedor-mensaje {
    width: 74vw;
    height: 37em;
    background-color: white;
    border-radius: 23px;
    filter: drop-shadow(2px 4px 6px black);
}


.contenedor-opciones {
    width: 70vw;
    grid-gap: 1, 4rem;
    height: 33rem;
    margin: 0px auto
        /* margin-top: 4em;*/
}

.contenedor-opciones-items {
    /* display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    height: 44vh;
    width: 100%;
    margin: 0px auto; */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    align-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 100vh;
    width: 100%;
    margin: 0px auto;
    place-content: center;
    place-items: center;
    /* overflow: hidden; */
}

.titulo-instrucciones-pausas {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 1.5em;
    color: black;
    font-weight: bold;
    margin-bottom: 0px
}

.texto-descripcion-pausas {
    text-align: justify;
    font-family: Source Sans Pro;
    font-size: 1.1em;
    color: black;
    font-weight: normal;
    padding: 19px
}




.contenedor-ejercicio-pausas {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-content: center;
    place-items: center;
    width: 61vw;
    margin: 0px auto;
}



.titulo {
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
    width: 100%
        /* margin-bottom: 4vh; */
}
</style>