<template>
    <div @click="cambiarImagen" class="contenedor-item" :id="`${nombreItem}-click`">
        <img :id="`imagen`" :src="srcUrlImagen" width="160" height="160" alt="">
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, reactive, watchEffect, watch } from 'vue'
import ImagenInterrogante from '@/assets/img/manos/pregunta.png'


import {arrayImagenesPausas} from '@/assets/helpers/imagenes.js'
const imagenesReferencia = ref(arrayImagenesPausas)


const srcUrlImagen = ref(ImagenInterrogante)
const mostrarImagen = ref(false)

const emit = defineEmits(['clickItem'])





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
  
    if (secuencia.finActividad) {
        document.querySelector(`#${secuencia.nombreItem}`).setAttribute('src', ImagenInterrogante)
    }

});

watchEffect(() => {
    

})

const reiniciarImagen = () => {
    srcUrlImagen.value = ImagenInterrogante
}




const cambiarImagen = () => {
    let idItemElement = imagenesReferencia.value.filter((elemento) => {
        return elemento.id == secuencia.idItem
    })

     document.querySelector(`#${secuencia.nombreItem} #imagen`).setAttribute('src',idItemElement[0].imagen)
   /*  srcUrlImagen.value = idItemElement[0].imagen */
    mostrarImagen.value = true
    emit('clickItem', {id:idItemElement[0].id,imagen:idItemElement[0].imagen })
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