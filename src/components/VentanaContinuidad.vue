<template>
    <div class="
      ventana-usuario
      center-element
      flex-center-elements-column
      animate__animated animate__fadeIn animate__slow animate__delay_5s
    ">
        <div>
            <div class="contenedor-central flex-center-elements-column gap-2">
                <h2 class="title"> Existe progreso en el escenario guardado, ¿continuar?</h2>
                <div>
                    <div class="flex-center-elements-row gap-3">
                        <div class="btn-primary-vr1" @click="openFullscreen('si')"> SI </div>
                        <div class="btn-primary-vr1" @click="openFullscreen('no')"> NO </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../stores/config.js";
const config = useConfigStore();
const router = useRouter()

const openFullscreen = (desicion) => {
    var targetelement = document.documentElement;

    if (targetelement.requestFullscreen) {
        targetelement.requestFullscreen();
    }
    if (targetelement.webkitRequestFullscreen) {
        targetelement.webkitRequestFullscreen();
    }
    if (targetelement.mozRequestFullScreen) {
        targetelement.mozRequestFullScreen();
    }
    if (targetelement.msRequestFullscreen) {
        targetelement.msRequestFullscreen();
    }
    if (desicion == 'si') {
        router.push(`/Escenario`);
    } else {
        config.setPosicionActualUsuario(0)
        config.setPosicionActualActividades(0)
        config.reiniciarActividadActual([])
        router.push(`/Escenario`);
    }
}


</script>

<style lang="css" scoped>
.contenedor-central {
    width: 801px;
    height: 54vh;
    background: transparent url(@/assets/img/recuadrointro.png) no-repeat center center;
    background-size: 100% 100%;
}


.ventana-usuario {
    width: 100vw;
    height: 100vh;
    border-radius: 23px;
    padding: 23px;
    z-index: 999999;
}

.title {
    widows: 100%;
    text-align: center;
    color: var(--blanco);
}

p {
    font-family: 'Publico Banner, SourceSansProLightItalic, Arial, Georgia, Sans Serif, Serif';
}

.button {
    text-align: center;
}
</style>
