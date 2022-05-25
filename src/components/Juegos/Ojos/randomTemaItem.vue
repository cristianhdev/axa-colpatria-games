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
const temas = ref(["animal", "oficina", "fruta"]);
const tema = ref("")
const temaSeleccionado = ref("")
const giros = ref();
const finGiros = ref(false)
const emit = defineEmits(['finSeleccionTemas'])


const imagenes = ref([
    { imagen: "@/assets/img/banano.png", tipo: "fruta" },
    { imagen: "@/assets/img/ani1.png", tipo: "animal" },
    { imagen: "@/assets/img/fresa.png", tipo: "fruta" },
    { imagen: "@/assets/img/ani2.png", tipo: "animal" },
    { imagen: "@/assets/img/naranja.png", tipo: "fruta" },
    { imagen: "@/assets/img/ani3.png", tipo: "animal" },
    { imagen: "@/assets/img/libros.png", tipo: "oficina" },
    { imagen: "@/assets/img/calculadora.png", tipo: "oficina" },
    { imagen: "@/assets/img/pc.png", tipo: "oficina" }
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