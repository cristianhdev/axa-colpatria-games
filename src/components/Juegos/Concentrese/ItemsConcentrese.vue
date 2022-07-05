<template>
    <div @click="cambiarImagen" class="contenedor-item" :id="`${nombreItem}-click`">
        <img :id="`imagen`" :src="srcUrlImagen" width="160" height="160" alt="">
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive, watchEffect, watch } from 'vue'
import ImagenInterrogante from '@/assets/img/manos/pregunta.png'

//Imagenes
/* import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'
import ImagenEjercicio2 from '@/assets/img/Ejercicio2.png'
import ImagenEjercicio3 from '@/assets/img/Ejercicio3.png'
import ImagenEjercicio4 from '@/assets/img/Ejercicio4.png'
import ImagenEjercicio5 from '@/assets/img/Ejercicio5.png'*/
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png'

//Ejericicios Postura -Gif

import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'

import Ejercicio1 from '@/assets/ejercicios/EJ_P1.gif'
import Ejercicio2 from '@/assets/ejercicios/EJ_P2.gif'
import Ejercicio3 from '@/assets/ejercicios/EJ_P3.gif'
import Ejercicio4 from '@/assets/ejercicios/EJ_P4.gif'
import Ejercicio5 from '@/assets/ejercicios/EJ_P5.gif'
import Ejercicio6 from '@/assets/ejercicios/EJ_P6.gif'
import Ejercicio7 from '@/assets/ejercicios/EJ_P7.gif'
import Ejercicio8 from '@/assets/ejercicios/EJ_P8.gif'
import Ejercicio9 from '@/assets/ejercicios/EJ_P9.png'
import Ejercicio10 from '@/assets/ejercicios/EJ_P10.png'
import Ejercicio11 from '@/assets/ejercicios/EJ_P11.gif'
import Ejercicio12 from '@/assets/ejercicios/EJ_P12.png'
import Ejercicio13 from '@/assets/ejercicios/EJ_P13.png'
import Ejercicio14 from '@/assets/ejercicios/EJ_P14.gif'
import Ejercicio15 from '@/assets/ejercicios/EJ_P15.gif'
import Ejercicio16 from '@/assets/ejercicios/EJ_P16.gif'
import Ejercicio17 from '@/assets/ejercicios/EJ_P17.gif'
import Ejercicio18 from '@/assets/ejercicios/EJ_P18.png'
import Ejercicio19 from '@/assets/ejercicios/EJ_P19.png'
import Ejercicio20 from '@/assets/ejercicios/EJ_P20.png'
import Ejercicio21 from '@/assets/ejercicios/EJ_P21.png'
import Ejercicio22 from '@/assets/ejercicios/EJ_P22.png'
import Ejercicio23 from '@/assets/ejercicios/EJ_P23.png'
import Ejercicio24 from '@/assets/ejercicios/EJ_P24.gif'
import Ejercicio25 from '@/assets/ejercicios/EJ_P25.gif'
import Ejercicio26 from '@/assets/ejercicios/EJ_P26.gif'
import Ejercicio27 from '@/assets/ejercicios/EJ_P27.gif'




const srcUrlImagen = ref(ImagenInterrogante)
const mostrarImagen = ref(false)

const emit = defineEmits(['clickItem'])



const imagenesReferencia = ref([
    { imagen: Ejercicio1, id: 0, numero: secuencia.numero },
    { imagen: Ejercicio2, id: 1, numero: secuencia.numero },
    { imagen: Ejercicio3, id: 2, numero: secuencia.numero },
    { imagen: Ejercicio4, id: 3, numero: secuencia.numero },
    { imagen: Ejercicio5, id: 4, numero: secuencia.numero },
    { imagen: Ejercicio6, id: 5, numero: secuencia.numero },
    { imagen: Ejercicio7, id: 6, numero: secuencia.numero },
    { imagen: Ejercicio8, id: 7, numero: secuencia.numero },
    { imagen: Ejercicio9, id: 8, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 9, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 10, numero: secuencia.numero },
    { imagen: Ejercicio10, id: 11, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 12, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 13, numero: secuencia.numero },
    { imagen: Ejercicio11, id: 14, numero: secuencia.numero },
    { imagen: Ejercicio12, id: 15, numero: secuencia.numero },
    { imagen: Ejercicio13, id: 16, numero: secuencia.numero },
    { imagen: Ejercicio14, id: 17, numero: secuencia.numero },
    { imagen: Ejercicio15, id: 18, numero: secuencia.numero },
    { imagen: Ejercicio16, id: 19, numero: secuencia.numero },
    { imagen: Ejercicio17, id: 20, numero: secuencia.numero },
    { imagen: Ejercicio18, id: 21, numero: secuencia.numero },
    { imagen: Ejercicio19, id: 22, numero: secuencia.numero },
    { imagen: Ejercicio20, id: 23, numero: secuencia.numero },
    { imagen: Ejercicio21, id: 24, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 25, numero: secuencia.numero },
    { imagen: Ejercicio23, id: 26, numero: secuencia.numero },
    { imagen: Ejercicio24, id: 27, numero: secuencia.numero },
    { imagen: Ejercicio25, id: 28, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 29, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 30, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 31, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 32, numero: secuencia.numero },
    { imagen: ImagenEjercicio1, id: 34, numero: secuencia.numero },
    { imagen: Ejercicio26, id: 35, numero: secuencia.numero },
    { imagen: Ejercicio27, id: 36, numero: secuencia.numero }
])

const secuencia = defineProps({
    idItem: [Number, String],
    nombreItem: String,
    reiniciarFigura: {
        type: Boolean,
        default: false
    },
    srcUrlImagen: {
        type: String,
        default: ImagenInterrogante
    },
    arrayImagenesJuego: {
        type: Array,
        default: []
    },
    finActividad: Boolean
})

onMounted(() => {
   /*  imagenesReferencia.value = secuencia.arrayImagenesJuego */
});

watch(() => secuencia.finActividad, (newCorrecto, oldCorrecto) => {
    console.log(newCorrecto, oldCorrecto)
    if (secuencia.finActividad) {
        document.querySelector(`#${secuencia.nombreItem}`).setAttribute('src', ImagenInterrogante)
    }

});

watchEffect(() => {
    console.log("Type: ", secuencia.finActividad)

})

const reiniciarImagen = () => {
    srcUrlImagen.value = ImagenInterrogante
}




const cambiarImagen = () => {
    let idItemElement = imagenesReferencia.value.filter((elemento) => {
        return elemento.id == secuencia.idItem
    })

    console.log(secuencia.idItem)
    console.log(idItemElement[0].imagen)

   
     document.querySelector(`#${secuencia.nombreItem} #imagen`).setAttribute('src',idItemElement[0].imagen)
   /*  srcUrlImagen.value = idItemElement[0].imagen */
    mostrarImagen.value = true
    emit('clickItem', {imagen:idItemElement[0].imagen })
}


</script>

<style lang="css" scoped>
.contenedor-item {
    width: 15vw;
    height: 25vh;
    display: flex;
    align-items: center;
    place-content: center;
    cursor: pointer;
}

.contenedor-item img {
    object-fit: scale-down;
    border: 3px solid var(--azul-axa);
    height: -webkit-fill-available;
}

.contenedor-ejercicio-realizado {
    width: 100vw;
    text-align: center;
    margin: 0px auto;
}


@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .responsive {
        width: auto;
        height: auto;
        object-fit: scale-down;
    }

    .contenedor-item {
        width: 10vw;
        height: 23vh;
    }
}
</style>