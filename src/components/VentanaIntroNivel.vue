<template>
    <div class="ventana-mensaje-puntos flex-center-elements-column gap-2 padding-2">

        <div :style="styleContenedorMensaje"
            class=" flex-center-elements-column gap-1 animate__animated animate__heartBeat animate__slow animate__delay-2s"
            id="simulate-click">

            <div :style="styleContenedor">
                <div class="info-mensaje">
                    <slot name="mensaje-respuestas">
                        <span>
                            Nivel
                        </span>
                    </slot>
                </div>
                <div class="mensaje-opcion">
                    <slot name="mensaje-nivel">
                        1
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >

import animateCSS from "@/assets/helpers/animations.js";
import { ref,onBeforeMount, onMounted, reactive } from 'vue';
import { useConfigStore } from "../stores/config.js";
import imagenFondoNivel1 from '@/assets/img/marco_nivel_1.png'
import imagenFondoNivel2 from '@/assets/img/marco_nivel_2.png'


const imagenFondo= ref('')

onBeforeMount(() => {
    if (opciones.urlImagenFondo === 'marco_nivel_1') {
        imagenFondo.value = imagenFondoNivel1
    } else {
        imagenFondo.value = imagenFondoNivel2
    }

    styleContenedorMensaje.backgroundImage = `url(${imagenFondo.value})`
});

const opciones = defineProps({
    urlImagenFondo: {
        type: String,
        default: 'marco_nivel_1'
    }
});

const styleContenedor = reactive({
    width: "80%",
    height: "30vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10vh",
    placeContent: "center",
    alignItems: "center"
})


const styleContenedorMensaje = reactive({
    display: "flex",
    flexDirection: "column",
    width: "56vw",
    height: "49vh",
    backgroundImage: `url(${imagenFondo.value}.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    /* background: `transparent url(src/assets/img/${opciones.urlImagenFondo}.png) no-repeat center center`, */
    backgroundSize: "100% 100%"
})



const emit = defineEmits(['finAnimacionIntroNivel'])

onMounted(() => {
    animateCSS(".ventana-mensaje-puntos", "jackInTheBox").then((message) => {

        setTimeout(() => {
            animateCSS(".ventana-mensaje-puntos", "bounceOutRight").then((message) => {
                emit('finAnimacionIntroNivel')
            });
        }, 2400)
    });
})



</script>

<style lang="css" scoped>
.info-mensaje {
    font-size: 6.8em;
    color: var(--blanco);
    font-family: Publico Banner-Bold
}

.mensaje-opcion {
    font-size: 6em;
    color: #00008f;
    height: inherit;
    font-family: Publico Banner-Bold;
    background: transparent url(@/assets/img/marco_nivel_numero.png) no-repeat center center;
    background-size: 80% 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contenedor-puntos-buenos {
    width: 23vw;
    height: 23vh;
    background: transparent url(@/assets/img/Puntos.png) no-repeat center center;
    background-size: contain;
    position: absolute;
    top: 8%;
    font-size: 8em;
    color: var(--blanco);
}

.ventana-mensaje-puntos {
    width: 100vw;
    height: 100vh;
    z-index: 99999999999999;
    text-align: center;
    background: transparent url(@/assets/img/fondoPantallaFinalPuntos.png) no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
}
</style>