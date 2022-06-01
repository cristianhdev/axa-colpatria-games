<template>
    <div @click="cambiarImagen" class="contenedor-item" :id="`${nombreItem}`">
        <img :id="`imagen`" src="@/assets/img/manos/pregunta.png" width="120" height="120" alt="">
    </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, reactive, watchEffect, watch } from 'vue'
import ImagenInterrogante from '@/assets/img/manos/pregunta.png'

//Imagenes
import ImagenEjercicio1 from '@/assets/img/Ejercicio1.png'
import ImagenEjercicio2 from '@/assets/img/Ejercicio2.png'
import ImagenEjercicio3 from '@/assets/img/Ejercicio3.png'
import ImagenEjercicio4 from '@/assets/img/Ejercicio4.png'
import ImagenEjercicio5 from '@/assets/img/Ejercicio5.png'
import ImagenEjercicio6 from '@/assets/img/Ejercicio6.png'


const srcUrlImagen = ref(ImagenInterrogante)
const mostrarImagen = ref(false)

const emit = defineEmits(['clickItem'])

const imagenesReferencia = ref([
    { imagen: ImagenEjercicio1, id: 1, finalizado: false },
    { imagen: ImagenEjercicio2, id: 2, finalizado: false },
    { imagen: ImagenEjercicio3, id: 3, finalizado: false },
    { imagen: ImagenEjercicio4, id: 4, finalizado: false },
    { imagen: ImagenEjercicio5, id: 5, finalizado: false },
    { imagen: ImagenEjercicio6, id: 6, finalizado: false }
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
    finActividad: Boolean
})

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

    console.log(idItemElement[0].imagen)

    /* srcUrlImagen.value = idItemElement[0].imagen */
    console.log(idItemElement[0].imagen)
    document.querySelector(`#${secuencia.nombreItem} #imagen`).setAttribute('src', idItemElement[0].imagen)
    mostrarImagen.value = true
    emit('clickItem', { id: secuencia.idItem, nombre: secuencia.nombreItem })
}


</script>

<style lang="css" scoped>
.contenedor-item {
    width: 10vw;
    height: 19vh;
    display: flex;
    align-items: center;
    place-content: center;
    cursor: pointer;
}

.contenedor-item img {
    object-fit: scale-down;
    border: 3px solid var(--blanco)
}

.contenedor-ejercicio-realizado {
    width: 50vw;
    text-align: center
}
</style>