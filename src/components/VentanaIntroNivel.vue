<template>
    <div class="ventana-mensaje-puntos  flex-center-elements-column gap-2 padding-2">

        <div class=" contenedor-mensaje flex-center-elements-column gap-1 animate__animated animate__heartBeat animate__slow animate__delay-2s"
            id="simulate-click">

            <div class="contenedor-principal-ventana">
                <div class="info-mensaje">
                    <slot name="mensaje-respuestas">
                        <span class="texto-nivel">
                            Nivel
                        </span>
                    </slot>
                </div>
                <div class="mensaje-opcion">
                    <slot name="mensaje-nivel">
                        {{ nivel }}
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >

import animateCSS from "@/assets/helpers/animations.js";
import { ref, onBeforeMount, onMounted, reactive } from 'vue';
import { useConfigStore } from "../stores/config.js";
import imagenFondo from '@/assets/img/fonto.png'
import { useRouter, useRoute } from "vue-router";
const router = useRouter()

const config = useConfigStore();
const nivel = ref(0)




const emit = defineEmits(['finAnimacionIntroNivel', 'configuraActividad'])

onMounted(() => {
    animateCSS(".ventana-mensaje-puntos", "jackInTheBox").then((message) => {

        setTimeout(() => {
             animateCSS(".ventana-mensaje-puntos", "bounceOutRight").then((message) => {
                 emit('finAnimacionIntroNivel')
             });
        }, 2400)
    });
})

onBeforeMount(() => {

    if (config.actividadActual.includes(router.currentRoute.value.path)) {
        nivel.value = 2

        emit('configuraActividad', 2)
    } else {
        nivel.value = 1

        emit('configuraActividad', 1)
    }
    /* styleContenedorMensaje.backgroundImage = `url(${imagenFondo.value})` */
});

const opciones = defineProps({
    urlImagenFondo: {
        type: String,
        default: 'marco_nivel_1'
    }
});

const styleContenedor = reactive({

})


</script>

<style lang="css" scoped>
.contenedor-principal-ventana {
    width: 80%;
    height: 28rem;
    display: flex;
    flex-direction: column;
    grid-gap: 6rem;
    place-content: center;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 6%;
}

.contenedor-mensaje {
    display: flex;
    flex-direction: column;
    width: 36vw;
    height: 78vh;
}

.info-mensaje {
    font-size: 6.8em;
    color: #668980;
    font-family: Publico Banner-Bold
}

.texto-nivel {
    font-size: 1em;
    color: #668980;
    font-family: Publico Banner;
    font-weight: normal;
}

.mensaje-opcion {
    font-size: 6em;
    color: var(--blanco);
    height: inherit;
    font-family: Publico Banner;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #668980;
    border-radius: 100%;
    height: 8rem;
    width: 8rem;
}

.contenedor-puntos-buenos {
    width: 23vw;
    height: 23vh;
    background: transparent url(@/assets/img/Puntos.png) no-repeat center center;
    background-size: contain;
    position: absolute;
    top: 8%;
    font-size: 8em;
    color: var(--azul-axa);
}

.ventana-mensaje-puntos {
    width: 100vw;
    height: 100vh;
    z-index: 99999999999999;
    text-align: center;
    background: transparent url(@/assets/img/fondoEscenario.png) no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    .responsive {
        width: auto;
        height: auto;
        object-fit: scale-down;
    }

    .contenedor-principal-ventana {
        width: 100%;
        height: inherit;
        display: flex;
        flex-direction: column;
        grid-gap: 4rem;
        place-content: center;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 6%;
    }


}
</style>