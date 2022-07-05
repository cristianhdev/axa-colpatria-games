<template>

    <div :style="styleContenedor" class=" animate__animated animate__ animate__jackInTheBox">
        <div class="texto-instrucciones contenedor-items  center-element">
            <div :style="styleImagenTexto">
                <div class="texto">
                    <slot name="texto">

                    </slot>
                </div>
                <div v-if="opciones.isPersonajeVisible" class="imagen">
                    <img src="@/assets/img/Personajes.png" alt="" class="responsive-instrucciones">
                </div>
            </div>

            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center"
                @click="continuarActividad">
                <slot v-if="opciones.ocultarBotones" name="btntexto">
                    <div class="btn-primary">
                        {{ opciones.ocultarBotones }}JUGAR</div>
                </slot>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
import imagenFondoBienvenidaImagen from '@/assets/img/BienvidaJuegos.png'
import imagenFondoInstruccionesImagen from '@/assets/img/InstruccioneJuegos.png'

const emit = defineEmits(['ocultarVentana'])
const imagenFondo = ref('')

const continuarActividad = () => {
    emit('ocultarVentana')
}

onBeforeMount(() => {
    console.log(opciones.urlImagenFondo)
    if (opciones.urlImagenFondo === 'BienvidaJuegos') {
        imagenFondo.value = imagenFondoBienvenidaImagen
        styleContenedor.backgroundImage = `url(${imagenFondo.value})`
        styleImagenTexto.gridTemplateColumns = "2fr 1fr"
    } else {
        imagenFondo.value = imagenFondoInstruccionesImagen
        styleContenedor.backgroundImage = `url(${imagenFondo.value})`
        styleImagenTexto.gridTemplateColumns = "1fr"
    }
});


const opciones = defineProps({
    urlImagenFondo: {
        type: String,
        default: 'InstruccioneJuegos'
    },
    ocultarBotones: {
        type: Boolean,
        default: false
    },
    isPersonajeVisible: {
        type: Boolean,
        default: false
    }
});



watch(opciones.isPersonajeVisible, (newSlider, oldSlider) => {
    if (newSlider) {
        alert(newSlider)
    } else {
        styleImagenTexto.gridTemplateColumns = "1fr"
    }
})

const styleContenedor = reactive({
    backgroundImage: `url(${imagenFondo.value}.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#18488c",
    width: '100vw',
    height: '105vh',
    position: 'absolute',
    zIndex: '9999',
    filter: 'drop-shadow(2px 4px 6px black)'
});

const styleImagenTexto = reactive({
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    placeItems: "center"
});




</script>

<style lang="css" scoped>
.btn-jugar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40vh, 30vh);
}

.texto-instrucciones {
    width: 70vw;
    height: 530px;
    max-height: 514px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1%;
}

.texto-instrucciones div {
    text-align: left;
}

.texto {
    width: 65%;
    height: 42em;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    color: white;
    font-family: Source Sans Pro;
    font-size: 1em;
    font-weight: normal;
    grid-gap: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>