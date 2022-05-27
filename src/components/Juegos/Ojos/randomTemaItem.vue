<template>
    <div>
        <div class="interrogacion ">
            <slot name="texto">
                Selecciona las siguientes imagenes:
            </slot>

            <!--  {{temas.opciones}} -->
        </div>
        <div class="tema-texto">
            {{ tema }}
        </div>
        <div class="tema-texto flex-center-elements-row gap-2">

            <div v-if="finGiros">
                <img :src="imagen.imagen" v-for="(imagen, index) in filtrarImagenes" :key="`imagen-${index}`"
                    width="130" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, computed } from "vue";
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
const temas = ref(["animal", "oficina", "fruta"]);
const tema = ref("")
const temaSeleccionado = ref("")
const giros = ref();
const finGiros = ref(false)
const emit = defineEmits(['finSeleccionTemas'])


const imagenes = ref([
    { imagen: ImagenBanano, tipo: "fruta" },
    { imagen: ImagenAni1, tipo: "animal" },
    { imagen: ImagenFresa, tipo: "fruta" },
    { imagen: ImagenAni2, tipo: "animal" },
    { imagen: ImagenNaranja, tipo: "fruta" },
    { imagen: ImagenAni3, tipo: "animal" },
    { imagen: ImagenLibro, tipo: "oficina" },
    { imagen: ImagenCalculadora, tipo: "oficina" },
    { imagen: ImagenPc, tipo: "oficina" }
]);


onMounted(() => {


})

onBeforeMount(() => {

    generarTemasAleatorios()
})

const generarTemasAleatorios = () => {
    /**
     * ! la linea inferior no tomarla encuenta.
     */
    /* temas.value=temas.value.sort(() =>{ Math.random()-0.5}) */
    let numero = 0;
    giros.value = generarGirosAleatorios()



    let tiempogiro = setInterval(() => {

        tema.value = temas.value[numero].charAt(0).toUpperCase() + temas.value[numero].slice(1);
        numero == temas.value.length - 1 ? (numero = 0) : numero++;
        giros.value = giros.value - 1;
        if (giros.value == 0) {
            finGiros.value = true
            clearInterval(tiempogiro);
            temaSeleccionado.value = temas.value.sort(() => Math.random() - 0.5)[generarPosicionaleatoria()]
            tema.value = temaSeleccionado.value.charAt(0).toUpperCase() + temaSeleccionado.value.slice(1);
            emit("finSeleccionTemas", tema.value.toLocaleLowerCase())
        }
    }, 100);
}

const generarGirosAleatorios = () => {
    return Math.floor(Math.random() * (40 - 2));
}


const generarPosicionaleatoria = () => {
    let numeroPosicion = Math.floor(Math.random() * ((temas.value.length - 1) - 0));
    temas.value.splice(numeroPosicion, 1)
    return numeroPosicion
}




const filtrarImagenes = computed(() => {
    console.log(tema.value)
    return Object.values(imagenes.value).filter((element) => {
        return element.tipo == tema.value.toLocaleLowerCase()
    })
})



</script>

<style lang="css" scoped>
.interrogacion {
    font-size: 2.1em
}

.tema-texto {
    font-size: 2.1em
}
</style>