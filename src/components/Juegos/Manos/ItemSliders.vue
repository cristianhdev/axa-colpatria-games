<template>
    <div :style="styleContenedorPrincipal" class=" flex-center-elements-column ">

        <div :class="`next-${imagen.id}`" :style="styleObjectNext" @click="next()">
            <img :src="ImagenFlechaDerecha" alt="" width="38">
        </div>
        <div class="container-slider" style="height: 369rem;overflow: hidden;">
            <div :class="`contenedor-imagenes-${imagen.id}`" :style="[styleObjectContenedor, styleObjectValidacion]">
                <div class="sliders-order" :id="`sliders-order-${index}`" v-for="(imag, index) in arrayAleatorio"
                    :key="imag">
                    <img :src="imag.src" alt="imagen" width="50">
                    <!-- {{arrayAleatorio}} -->
                </div>
            </div>
        </div>
        <div :class="`prev-${imagen.id}`" :style="styleObjectPrev" @click="prev()">
            <img :src="ImagenFlechaIzquierda" alt="" width="38">
        </div>
    </div>
</template>

<script setup>

import { ref, reactive, watch, onMounted, computed } from 'vue'
import animateCSS from "@/assets/helpers/animations.js";
import gsap from "gsap";

import ImagenPregunta from '@/assets/img/manos/pregunta.png';
import ImagenFlechaDerecha from '@/assets/img/barraDerecha.png';
import ImagenFlechaIzquierda from '@/assets/img/barraIzquierda.png';

import ImagenMano1 from '@/assets/img/manos/mano1.png';
import ImagenMano2 from '@/assets/img/manos/mano2.png';
import ImagenMano3 from '@/assets/img/manos/mano3.png';
import ImagenMano4 from '@/assets/img/manos/mano4.png';
import ImagenMano5 from '@/assets/img/manos/mano5.png';


const sliderActual = ref(0)

const isVIsibleTime = ref(false)
const finAnimacionSlider = ref(false)



onMounted(() => {


})


const emit = defineEmits(['validarOpciones', 'guardarOrdenRespuesta'])





const imagen = defineProps({
    id: Number,
    src: Array,
    correcto: Boolean,
    ocultarNavegacion: {
        type: Boolean,
        default: false
    },
    finTime: Boolean// detecta cuando termina el tiempo del conometro que es un componente que esta en el padre de este componente
})

const copiaArrayValidacion = ref([])


const imagenes = ref([
    { src: ImagenPregunta, isVisible: true, id: 0 },
    { src: ImagenMano1, isVisible: true, id: 1 },
    { src: ImagenMano2, isVisible: true, id: 2 },
    { src: ImagenMano3, isVisible: true, id: 3 },
    { src: ImagenMano4, isVisible: true, id: 4 },
    { src: ImagenMano5, isVisible: true, id: 5 }
])






const styleObjectNext = reactive({

    cursor: "default",
    zIndex: "9999",
    /*  backgroundColor: "#00008F", */
    padding: "5px",
    borderRadius: "100%",
    filter: 'opacity(0.5)',
    pointerEvents: 'all',
    color: "white",
    transform: "rotate(90deg)",
    /* backgroundImage: `url('${ImagenFlechaDerecha}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain', */
    width: 'min-content',
    height: '100vw',
    visibility: 'hidden'
});

const styleObjectPrev = reactive({
    cursor: "pointer",
    zIndex: "9999",

    /* backgroundColor: "#00008F", */
    padding: "5px",
    borderRadius: "100%",
    pointerEvents: 'all',
    color: "white",
    transform: "rotate(90deg)",
    /*   backgroundImage: `url('${ImagenFlechaIzquierda}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain', */
    width: 'min-content',
    height: '100vw',
    visibility: 'hidden'
});


const styleObjectContenedor = reactive({
    width: "33vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    height: "59%",
    gridGap: "44px"
});

const styleObjectValidacion = reactive({
    /*  boxShadow: '-1px -1px 16px inset var(--border-success-mensaje)', */
    boxShadow: 'none',
    borderRadius: '12px',
    backgroundColor: 'white'

});

const styleContenedorPrincipal = reactive({
    /*  boxShadow: '-1px -1px 16px inset var(--border-success-mensaje)', */
    height: "320px",
    maxHeight: "320px",
    width: "230px"
});



//TODO:Refactorizaar las variables (estan en modo Prueba)
/* watch(() => imagen.finTime, (newCorrecto, oldCorrecto) => {

    console.log(newCorrecto,oldCorrecto)
    if (newCorrecto != oldCorrecto) {
        styleObjectPrev.pointerEvents = 'none'
        styleObjectPrev.filter = "grayscale(0.5)"
        styleObjectNext.pointerEvents = 'none'
        styleObjectNext.filter = "grayscale(0.5)"
    }

}); */


//TODO:Refactorizaar las variables (estan en modo Prueba)
watch(() => imagen.correcto, (newCorrecto, oldCorrecto) => {
    console.log(
        "Watch props.selected function called with args:",
        newCorrecto,
        oldCorrecto
    );

    newCorrecto ? styleObjectValidacion.backgroundColor = 'var(--border-error-mensaje)' : styleObjectValidacion.backgroundColor = 'var(--border-success-mensaje)'

});

watch(() => imagen.ocultarNavegacion, (newCorrecto, oldCorrecto) => {
    console.log(
        "Watch props.selected function called with args:",
        newCorrecto,
        oldCorrecto
    );

    if (newCorrecto==true) {
        styleObjectPrev.visibility = 'visible'
        styleObjectNext.visibility = 'visible'
    } else {
        styleObjectPrev.visibility = 'hidden'
        styleObjectNext.visibility = 'hidden'
    }



});


//${imagen.ocultarNavegacion}?'hidden':'visible'


const arrayAleatorio = computed(() => {
    /* return  imagenes.value */
    let porsionImagenes = null;
    if (imagen.finTime) {
        porsionImagenes = imagenes.value.slice(0, imagenes.value.length)
    } else {
        porsionImagenes = imagenes.value.slice(1, imagenes.value.length).sort(() => Math.random() - 0.5)

        copiaArrayValidacion.value.push(porsionImagenes[0])
    }

    return porsionImagenes
    /* return  imagenes.value.filter((img)=> { return img.isVisible==true}).sort(() => Math.random() - 0.5) */
    /* return imagen.finTime ? imagenes.value : imagenes.value.sort(() => Math.random() - 0.5) */
    /* return imagen.finTime ? imagenes.value.filter((img)=> { return img.isVisible!=true}):imagenes.value.filter((img)=> { return img.isVisible!=false}) */
});


const prev = () => {


    if (sliderActual.value != imagenes.value.length - 1) {
        if (finAnimacionSlider.value != true) {
            finAnimacionSlider.value = true
            let con = document.querySelector(`.contenedor-imagenes-${imagen.id}`).getBoundingClientRect()

            gsap.to(`.contenedor-imagenes-${imagen.id}`, {
                y: `+=-${Math.round(con.width)}px`
                , onComplete: () => {
                    finAnimacionSlider.value = false
                    sliderActual.value++
                    /*  opcinesValidacion.posicionSlider = (imagen.id - 1)
                     opcinesValidacion.actual = sliderActual
                     opcinesValidacion.validacionArray = copiaArrayValidacion */
                    emit('validarOpciones', { posicionSlider: (imagen.id - 1), actual: sliderActual, validacionArray: copiaArrayValidacion })
                    navegacion()
                }
            });
        }


    }

}

const next = () => {

    if (sliderActual.value > 0) {
        if (finAnimacionSlider.value != true) {
            finAnimacionSlider.value = true
            let con = document.querySelector(`.contenedor-imagenes-${imagen.id}`).getBoundingClientRect()
            gsap.to(`.contenedor-imagenes-${imagen.id}`, {
                y: `+=${Math.round(con.width)}px`, ease: 'Power.easeInOut', onComplete: () => {
                    finAnimacionSlider.value = false
                    sliderActual.value--
                    /*  opcinesValidacion.posicionSlider = (imagen.id - 1)
                     opcinesValidacion.actual = sliderActual
                     opcinesValidacion.validacionArray = copiaArrayValidacion */
                    emit('validarOpciones', { posicionSlider: (imagen.id - 1), actual: sliderActual, validacionArray: copiaArrayValidacion })
                    navegacion()
                }
            });
        }
    }

}


const navegacion = () => {
    let btnPrev = document.querySelector(`.prev-${imagen.id}`)
    let btnNext = document.querySelector(`.next-${imagen.id}`)
    if (btnPrev != null || btnNext != null) {
        if (sliderActual.value == 0) {
            btnPrev.style.cursor = 'pointer'
            btnNext.style.cursor = 'pointer'
            btnPrev.style.filter = 'opacity(1)'
            btnNext.style.filter = 'opacity(0.5)'

        } else if (sliderActual.value == imagenes.value.length - 1) {
            btnPrev.style.cursor = 'pointer'
            btnNext.style.cursor = 'pointer'
            btnPrev.style.filter = 'opacity(0.5)'
            btnNext.style.filter = 'opacity(1)'
        } else {
            btnPrev.style.cursor = 'pointer'
            btnNext.style.cursor = 'pointer'
            btnPrev.style.filter = 'opacity(1)'
            btnNext.style.filter = 'opacity(1)'
        }
    }
}





</script>

<style lang="css" scoped>
.slider-order {
    overflow: hidden;
    border-radius: 12px;
    border-radius: 12px;
    border: 1px solid #00008F
}

.sliders-order img {
    width: 25vh;
    height: 26vh;
    /* box-shadow: -1px -1px 16px inset black; */
    border: 1px solid #00008F;
    margin: 0px auto;
    border-radius: 12px;
}



.sliders-random img {
    width: 20vh;
    height: 20vh;
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px
}

.correcto {}


.incorrecto {
    /* box-shadow: -1px -1px 16px inset var(--border-error-mensaje);
    border-radius: 12px */
}

.contenedor-items {
    margin: 0px auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /*  grid-gap: 12px 20px; */
}



@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    /* CSS */
    .sliders-order img {
        width: 20vh;
        height: 20vh;
    }
}
</style>