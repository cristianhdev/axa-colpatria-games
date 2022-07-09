<template>
    <div :id="'contenedor-' + secuencia.posicion" :style="stylePointerEvents" class="contenedor-opciones"
        @click="validarClick(secuencia.posicion)">
        <div :class="{ correcto: respuestaCorrecta, incorrecto: respuestaIncorrecta }"
            :id="'contenedor-imagen' + getIdimagen" v-if="mostrarNumero">
            <div class="item-image" :style="styleInterrogante">
                <!-- secuencia.srcUrlImagen -->
                <img class="item-image-img" :src="imagenCorrecta" alt="">
            </div>
        </div>
        <div v-else>
            <div class="item-image" :style="styleInterrogante">
                <!-- secuencia.srcUrlImagen -->

                <img class="item-image-img" :src="imagenCorrecta" alt="">
            </div>
            <!--  <img class="imagen-actividad" :src="secuencia.srcUrlImagen" alt=""> -->
        </div>


    </div>

</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeMount, watch, defineEmits } from 'vue'
import gsap from "gsap";
import Sonidos from '@/assets/helpers/sounds.js'

import Interrogante from '@/assets/img/manos/pregunta.png'
import { useConfigStore } from "../../../stores/config.js";
import { arrayImagenesPausas } from '@/assets/helpers/imagenes.js'

//Sonidos
import Aplausos from '@/assets/sounds/aplausos.mp3'
import Incorrecto from '@/assets/sounds/incorrecto.mp3'

const audioIncorrecto = ref(null)
const audioCorrecto = ref(null)

const emit = defineEmits(['ocultarVentana', 'finAnimacion', 'finAnimacionFlip', 'OpcionCorrecto', 'OpcionInCorrecto'])


const mostrarNumero = ref(false)
const respuestaCorrecta = ref(false)
const respuestaIncorrecta = ref(false)
const imagenCorrecta = ref('')

const config = useConfigStore()



const imagenes = ref(arrayImagenesPausas)




const secuencia = defineProps({
    srcUrlImagen: String,
    posicion: Number,
    numero: Number,
    correcto: Boolean,
    opcion: Number,
    girarOpciones: Boolean,
    idImagenEjericicio: Number
})


const getIdimagen = computed(() => {
    return imagenes.value[secuencia.numero - 1].numero
})


const styleObject = reactive({
    /*  backgroundImage: `url(${imagenes.value[secuencia.numero - 1].imagen})`,
     backgroundPosition: "center center",
     backgroundSize: "contain",
     backgroundRepeat: "no-repeat", */
    display: "flex",
    alignItem: "center",
    alignContent: "center",
    textAlign: "center",
    width: "10vw",
    height: "25vh"
})

const styleInterrogante = reactive({
    /*    backgroundImage: `url(${})`,
       backgroundSize: "contain",
       backgroundRepeat: "no-repeat",
       backgroundPosition: "center", */

    width: "14vw",
    height: "29vh",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    margin: "0px auto",
})


const stylePointerEvents = reactive({
    pointerEvents: 'none',
    backgroundColor: "transparent",
    pointerEvents: 'none'
})


onMounted(() => {

    imagenCorrecta.value = secuencia.srcUrlImagen
    if (secuencia.girarOpciones) {

        gsap.to(`.contenedor-opciones`, {
            alpha: 1,
            delay: 0.9,
            rotationY: -180,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
            duration: 0.4,
            stagger: {
                grid: [7, 1],
                from: "center",
                amount: 1.5,
            }, onComplete: () => {
                stylePointerEvents.pointerEvents = 'all'
                /* emit('finAnimacionFlip') */


            }, onUpdate: function () {

            }
        });
    }
})

onBeforeMount(() => {

    document.body.focus()

})



watch(() => secuencia.srcUrlImagen, (newCorrecto, oldCorrecto) => {

    imagenCorrecta.value = `url(${newCorrecto})`
    /*  if(newCorrecto!=="/src/assets/img/manos/pregunta.png"){
        
     } */

})

watch(() => secuencia.correcto, (newCorrecto, oldCorrecto) => {
    newCorrecto ? respuestacorecta.value = !respuestacorecta.value : respuestacorecta.value
});

watch(() => secuencia.srcUrlImagen, (imagenNew, imagenOld) => {

});

watch(() => secuencia.girarOpciones, (newGiroOpcion, oldGiroOpcion) => {

    if (newGiroOpcion) {


    } /* else {

         mostrarNumero.value = false
         respuestaCorrecta.value = false
         respuestaIncorrecta.value = false
 
         gsap.to(`.contenedor-opciones`, {
             alpha: 1,
             rotationY: -180,
             transformStyle: "preserve-3d",
             transformPerspective: 1000,
             duration: 0.4,
             stagger: {
                 grid: [7, 1],
                 from: "center",
                 amount: 1.5,
             }, onComplete: () => {
                 stylePointerEvents.pointerEvents = 'all'
                 emit('finAnimacionFlip')
 
 
             }, onUpdate: function () {
 
             }
         }); 
    } */

});

const animarTarjetas = () => {

}

const validarClick = (id) => {


    //emit('clickFicha',id)
    let idItem = id



    if (parseInt(secuencia.opcion) === parseInt(idItem)) {
        if (audioCorrecto.value == null) {
            stylePointerEvents.pointerEvents = 'none'
            /* stylePointerEvents.backgroundColor = 'green' */

            document.getElementById(`contenedor-${idItem}`).classList.add('opcion-correcto')
            let recuadro = document.querySelectorAll(`.item-image-img`)


            let imagen = imagenes.value.filter((element) => {
                return element.id == secuencia.idImagenEjericicio
            })[0].imagen
            recuadro[idItem - 1].style.boxShadow = '-1px -1px 16px inset green';
            mostrarNumero.value = true

            imagenCorrecta.value = imagen
            if (config.audioPausas) {
                audioCorrecto.value = new Audio(Aplausos)
                audioCorrecto.value.play()
                audioCorrecto.value.addEventListener("ended", () => {
                    emit("OpcionCorrecto", idItem)
                });
            } else {



                mostrarNumero.value = false
                emit("OpcionCorrecto", idItem)
            }

            /* audioCorrecto.value = new Sonidos('aplausos', false)
            audioCorrecto.value.playAudio(() => {
               
            }) */

        } else {
            audioCorrecto.value.stopAudio()
        }
        respuestaCorrecta.value = true
    } else {
        /* stylePointerEvents.pointerEvents = 'all' */


        document.getElementById(`contenedor-${idItem}`).classList.add('opcion-incorrecto')
        let recuadro = document.querySelectorAll(`.item-image-img`)

        recuadro[idItem - 1].style.boxShadow = '-1px -1px 16px inset red';


        if (config.audioPausas) {
            audioIncorrecto.value = new Audio(Incorrecto)
            audioIncorrecto.value.play()
            emit("OpcionInCorrecto")
        } else {
            emit("OpcionInCorrecto")
        }

        /* if (audioIncorrecto.value == null) {

            audioIncorrecto.value = new Sonidos('incorrecto', false)
            audioIncorrecto.value.playAudio()

        } else {
            audioIncorrecto.value.stopAudio()
        } */
        respuestaIncorrecta.value = true
    }

}

</script>

<style lang="css" scoped>
.contenedor-opciones {
    width: 100%;
    height: 28vh;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}






.contenedor-opciones:hover {
    background-color: var(--bg-pacific);
    cursor: pointer;
    transform: scale(1) rotateY(180deg) !important;
    transition: transform 0.7s ease-out
}

.contenedor-opciones:not(:hover) {
    transform: scale(1) rotateY(180deg) !important;
    transition: transform 0.7s ease-out
}

span {
    font-size: 2.4em;
    font-family: 'Courier New', Courier, monospace;
}

img {
    margin: 0px auto;
    width: 19vw;
}



h1 {
    font-family: Source Sans Pro;
    font-size: var(--h1-title-size);
    line-height: var(--h1-title-height);
    margin: 2px;
}

h2 {
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
}

.imagen-actividad {
    width: 28vh;
    object-fit: scale-down;
    border-radius: 12px;
}

.item-image img {
    object-fit: scale-down;
}

/* Iconos indicador */
.opcion-correcto::before {
    content: '';
    background: url('@/assets/img/check_awert.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(80px, -70px);
    float: right;
}

.opcion-incorrecto::before {
    content: '';
    background: url('@/assets/img/check_wrong.png') no-repeat;
    background-size: contain;
    position: fixed;
    width: 3vw;
    height: 3vh;
    transform: translate(80px, -70px);
    float: right;
}
</style>

