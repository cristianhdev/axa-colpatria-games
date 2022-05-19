<template>
    <div class="contenedor-principal flex-center-elements-row ">
        <div v-if="ocultarNavegacion" :class="`next-${imagen.id}`" :style="styleObjectNext" @click="next()">&lt;&lt;</div>

        <div :class="`contenedor-imagenes-${imagen.id}`" :style="[styleObjectContenedor, styleObjectValidacion]">
            <div class="sliders-order" :id="`sliders-order-${index}`" v-for="(imag, index) in arrayAleatorio"
                :key="imag">
                <img :src="imag.src" alt="imagen">
                <!-- {{arrayAleatorio}} -->
            </div>
        </div>
        <div v-if="ocultarNavegacion" :class="`prev-${imagen.id}`" :style="styleObjectPrev" @click="prev()">&gt;&gt;</div>
    </div>
</template>

<script setup>

import { ref, reactive, watch, onMounted, computed } from 'vue'
import animateCSS from "../../../helpers/animations.js";
import gsap from "gsap";

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
    ocultarNavegacion:Boolean,
    finTime: Boolean// detecta cuando termina el tiempo del conometro que es un componente que esta en el padre de este componente
})

const copiaArrayValidacion = ref([])


const imagenes = ref([
    { src: './src/img/manos/pregunta.png', isVisible: true, id: 0 },
    { src: './src/img/manos/mano1.png', isVisible: true, id: 1 },
    { src: './src/img/manos/mano2.png', isVisible: true, id: 2 },
    { src: './src/img/manos/mano3.png', isVisible: true, id: 3 },
    { src: './src/img/manos/mano4.png', isVisible: true, id: 4 },
    { src: './src/img/manos/mano5.png', isVisible: true, id: 5 }
])






const styleObjectNext = reactive({
    cursor: "default",
    zIndex: "9999",
    background: "#959595ee",
    padding: "5px",
    borderRadius: "100%",
    filter: 'opacity(0.5)',
    pointerEvents: 'all'
});

const styleObjectPrev = reactive({
    cursor: "pointer",
    zIndex: "9999",
    filter: "grayscale(1)",
    background: "#959595ee",
    padding: "5px",
    borderRadius: "100%",
    pointerEvents: 'all'
});


const styleObjectContenedor = reactive({
    width: "200px",
    display: "flex",
    flexDirection: "row",
    gridGap: "32px",
});

const styleObjectValidacion = reactive({
    /*  boxShadow: '-1px -1px 16px inset var(--border-success-mensaje)', */
    boxShadow: 'none',
    borderRadius: '12px',
    backgroundColor: 'white'

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



const arrayAleatorio = computed(() => {
    /* return  imagenes.value */
    let porsionImagenes = null;
    if (imagen.finTime) {
        porsionImagenes = imagenes.value.slice(0, imagenes.value.length)
    } else {
        porsionImagenes = imagenes.value.slice(1, imagenes.value.length).sort(() => Math.random() - 0.5)
        /*  console.log(porsionImagenes[0]) */
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
            gsap.to(`.contenedor-imagenes-${imagen.id}`, {
                x: '+=-232px'
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
            gsap.to(`.contenedor-imagenes-${imagen.id}`, {
                x: '+=232px', ease: 'Power.easeInOut', onComplete: () => {
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
    if (sliderActual.value == 0) {
        document.querySelector(`.prev-${imagen.id}`).style.filter = 'opacity(1)'
        document.querySelector(`.next-${imagen.id}`).style.filter = 'opacity(0.5)'
    } else if (sliderActual.value == imagenes.value.length - 1) {
        document.querySelector(`.prev-${imagen.id}`).style.filter = 'opacity(0.5)'
        document.querySelector(`.next-${imagen.id}`).style.filter = 'opacity(1)'
    } else {
        document.querySelector(`.prev-${imagen.id}`).style.filter = 'none'
        document.querySelector(`.next-${imagen.id}`).style.filter = 'none'
        styleObjectNext.cursor = 'pointer'
        styleObjectNext.filter = 'opacity(1)'
        styleObjectPrev.cursor = 'pointer'
        styleObjectPrev.filter = 'opacity(1)'

    }
}





</script>

<style lang="css" scoped>
.contenedor-principal {
    overflow: hidden
}

.slider-order {
    overflow: hidden
}

.sliders-order img {
    width: 200px;
    height: 200px;
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px;

}

.sliders-random img {
    width: 200px;
    height: 200px;
    box-shadow: -1px -1px 16px inset black;
    border-radius: 12px
}

.correcto {}


.incorrecto {
    /* box-shadow: -1px -1px 16px inset var(--border-error-mensaje);
    border-radius: 12px */
}
</style>