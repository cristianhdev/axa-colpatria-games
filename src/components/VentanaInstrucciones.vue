<template>

    <div :style="styleContenedor" class=" animate__animated animate__ animate__jackInTheBox">
        <div class="texto-instrucciones center-element">
            <div class="imagen-texto">
                <div class="texto">
                    <slot name="texto">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus illo odit eos porro
                            consectetur
                            ipsum, unde impedit id consequatur deserunt sint quidem laboriosam voluptatibus doloribus.

                        </h2>
                    </slot>
                </div>
                <div class="imagen">
                    <img src="@/assets/img/Personajes.png" alt="" width="500">
                </div>
            </div>

            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="continuarActividad" >
                <slot v-if="opciones.ocultarBotones" name="btntexto"><button class="btn-primary-ghost"> {{opciones.ocultarBotones}}JUGAR</button></slot>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import imagenFondoBienvenidaImagen from '@/assets/img/BienvidaJuegos.png'
import imagenFondoInstruccionesImagen from '@/assets/img/InstruccioneJuegos.png'

const emit = defineEmits(['ocultarVentana'])
const imagenFondo = ref('')

const continuarActividad = () => {
    emit('ocultarVentana')
}

onBeforeMount(() => {
    if (opciones.urlImagenFondo === 'BienvidaJuegos') {
        imagenFondo.value = imagenFondoBienvenidaImagen
    } else {
        imagenFondo.value = imagenFondoInstruccionesImagen
    }

    styleContenedor.backgroundImage=`url(${imagenFondo.value})`
});


const opciones = defineProps({
    urlImagenFondo: {
        type: String,
        default: 'InstruccioneJuegos'
    },
    ocultarBotones:{
        type:Boolean,
        default:false
    }
});

const styleContenedor = reactive({
    backgroundImage: `url(${imagenFondo.value}.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#18488c",
    width: '100vw',
    height: '105vh',
    position: 'absolute',
    zIndex: '9999'
});



</script>

<style lang="css" scoped>
.imagen-texto {
    display: grid;
    place-items: center;
    grid-template-columns: 3fr 1fr;
    align-items: center;
}

.btn-jugar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40vh, 30vh);
}

.texto-instrucciones {
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.texto-instrucciones div {
    text-align: left;
}

.texto {
    width: 39vw;
}





.imagen {}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>