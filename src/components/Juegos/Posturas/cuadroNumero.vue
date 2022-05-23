<template>
    <div>
        <div :id="'contenedor-' + secuencia.opcion" :style="stylePointerEvents" class="contenedor-opciones"
            @click="validarClick(getIdimagen)"
            :class="{ correcto: respuestaCorrecta, incorrecto: respuestaIncorrecta }">
            <div :id="'contenedor-imagen' + getIdimagen" v-if="mostrarNumero">
                <div class="interrogante">

                </div>
            </div>
            <div v-else :style="styleObject">
                <img :src="secuencia.srcUrlImagen" alt="">
            </div>


        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeMount, watch, defineEmits } from 'vue'
import gsap from "gsap";
import Sonidos from '../../../helpers/sounds.js'
const audioIncorrecto = ref(null)
const audioCorrecto = ref(null)

const emit = defineEmits(['ocultarVentana', 'finAnimacion', 'finAnimacionFlip', 'OpcionCorrecto'])


const mostrarNumero = ref(false)
const respuestaCorrecta = ref(false)
const respuestaIncorrecta = ref(false)

onMounted(() => {

})

onBeforeMount(() => {

    document.body.focus()

})





const imagenes = ref([
    { imagen: "/src/img/Ejercicio1.png", numero: secuencia.numero },
    { imagen: "/src/img/Ejercicio2.png", numero: secuencia.numero },
    { imagen: "/src/img/Ejercicio3.png", numero: secuencia.numero },
    { imagen: "/src/img/Ejercicio4.png", numero: secuencia.numero },
    { imagen: "/src/img/Ejercicio5.png", numero: secuencia.numero },
    { imagen: "/src/img/Ejercicio6.png", numero: secuencia.numero },
])


const secuencia = defineProps({
    srcUrlImagen: String,
    posicion: Number,
    numero: Number,
    correcto: Boolean,
    opcion: Number,
    girarOpciones: Boolean
})




/* watch(secuencia.correcto, (newCorrecto, oldCorrecto) => {
    secuencia.correcto.value=newCorrecto
}) */

watch(() => secuencia.correcto, (newCorrecto, oldCorrecto) => {
    console.log(
        "Watch props.selected function called with args:",
        newCorrecto,
        oldCorrecto
    );
    newCorrecto ? respuestacorecta.value = !respuestacorecta.value : respuestacorecta.value
});

watch(() => secuencia.girarOpciones, (newGiroOpcion, oldGiroOpcion) => {

    if (newGiroOpcion == true) {
        let clientWidth = document.querySelector('.cuadricula').clientWidth;
        let clientHeight = document.querySelector('.cuadricula').clientHeight;
        mostrarNumero.value = true
        gsap.to(`.contenedor-opciones`, {
            alpha: 1,
            rotationY: 180,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
            duration: 0.4,
            stagger: {
                grid: [7, 1],
                from: "center",
                amount: 1.5,
            }, onComplete: () => {

                emit('finAnimacionFlip')
                stylePointerEvents.pointerEvents = 'all'

            }, onUpdate: function () {

            }
        });
    } else {

        mostrarNumero.value = false
        respuestaCorrecta.value = false
        respuestaIncorrecta.value = false
        stylePointerEvents.pointerEvents = 'none'
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

                emit('finAnimacion')


            }, onUpdate: function () {

            }
        });
    }

});




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
    height: "16vh"
})

const stylePointerEvents = reactive({
    pointerEvents: 'none'
})

const validarClick = (id) => {


    //emit('clickFicha',id)

   

    if (parseInt(secuencia.opcion) === parseInt(id)) {
        if (audioCorrecto.value == null) {
            stylePointerEvents.pointerEvents = 'none'
            audioCorrecto.value = new Sonidos('aplausos', false)
            audioCorrecto.value.playAudio(() => {
                emit("OpcionCorrecto")
            })

        } else {
            audioCorrecto.value.stopAudio()
        }
        respuestaCorrecta.value = true
    } else {
        stylePointerEvents.pointerEvents = 'none'
        if (audioIncorrecto.value == null) {

            audioIncorrecto.value = new Sonidos('incorrecto', false)
            audioIncorrecto.value.playAudio()

        } else {
            audioIncorrecto.value.stopAudio()
        }
        respuestaIncorrecta.value = true
    }

}

</script>

<style lang="css" scoped>
.contenedor-opciones {
    width: 100%;
    height: 18vh;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.interrogante {
    background-image: url(/src/img/manos/pregunta.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 243px;
    height: 15vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 0px auto;
}



.contenedor-opciones:hover {
    background-color: var(--bg-pacific);
    cursor: pointer;
    transform: scale(1.2) rotateY(180deg) !important;
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
}

.correcto {
    background-color: green
}

.incorrecto {
    background-color: red
}
</style>