<template>
    <div  class="overflow-menu">
        <div
            class="contenedor-central-menu flex-center-elements-column  gap-2 animate__animated animate__fadeIn animate__slow">
            <span v-if="isCerrarVisible" class="btn-close" @click="ocultarIntrucciones">X</span>
            <div class="contenedor-configuracion-intruccion-ventana-pausas">

                <div class="config-opciones flex-center-elements-column gap-2">

                    <slot name="texto-instrucciones">

                    </slot>
                    <!--  <div class="popup">
                        <Popper placement="left"  hover
                            content="Lea atentamente las instrucciones antes de continuar.">

                            <div
                                class="icono-instrucciones animate__animated animate__pulse animate__infinite animate__slower">
                                <img src="@/assets/img/icono-informativo.png" width="70" alt="">
                            </div>
                        </Popper>
                    </div> -->

                </div>


            </div>
            <div v-if="!isCerrarVisible" class="botones-menu flex-center-elements-column gap-2">
                <div class="btn-primary" @click="ocultarVentanaInstruccionesPausa">Continuar</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useConfigStore } from "../stores/config.js";
import { useRouter, useRoute } from "vue-router";


const config = useConfigStore();
const router = useRouter()
const usuario = ref('')
const camaraReadyMenu = ref(false)
const IsVisibleInstrucciones = ref(true)
const emit = defineEmits(['eventOcultarInstruccionesVentana','eventOcultarInstrucciones'])


const configMenuPrincipal = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    },
    isCerrarVisible:{
        type: Boolean,
        default: false
    }
});


const ocultarVentanaInstruccionesPausa = () => {
    emit('eventOcultarInstruccionesVentana')
}

const ocultarIntrucciones = () => {
    emit('eventOcultarInstrucciones')
}


</script>

<style lang="css" scoped>


.contenedor-configuracion-intruccion-ventana-pausas {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: 100% 100%;
    font-family: Source Sans Pro;
}

.icono-instrucciones {
    /* position: absolute;
   
    top: 0px;
    right: 10px; */
    width: 8%;
    height: 15%;
    /*   background-image: url(/src/assets/img/icono-informativo.png);
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat; */
    cursor: pointer
}

.popup {
    position: absolute;
    /* transform: translate(182px, 443px) !important; */
    top: 443px;
    left: -176px;
    width: 480px;
}


.contenedor-camara {
    width: 100%;
    height: 50vh;
    margin: 0px auto;
}

.title {
    font-size: 1.8em;
    font-family: Source Sans Pro;
    text-align: center;
    width: 80%;
    margin: 0px auto;
    padding: 19px;
}

.titulo {
    text-align: center;
    font-size: 3.1em;
    font-family: Source Sans Pro;
    width: auto;
    height: 100%;
    padding-top: 3px;
    background-color: var(--azul-axa);
    color: var(--blanco);
    display: flex;
    align-items: center;
    justify-content: center;
}

.test-camara {
    position: absolute;
    right: 10px;
    bottom: -30px;
}

.botones-menu {
    display: grid;
    justify-content: center;
    align-items: stretch;
    width: 20%;
    align-content: center;
    margin: 13px auto;
    height: auto;
    padding: 7px;
    grid-template-columns: 1fr;
}




.overflow-menu {
    width: 100vw;
    height: 100vh;
    background-color: #000000ab;
    position: absolute;
    top: 0px;
}

.contenedor-central-menu {
   width: 73vw;
    height: 84vh;
    max-height: 650px;
    background-color: white;
    border-radius: 32px;
    padding: 14px 12px;
    overflow: hidden;
    border: 1px solid var(--azul-axa);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) /* background: transparent url(@/assets/img/fonto.png) no-repeat center center; background-size: 100% 100%; */;
}

.btn-close {
    font-family: Arial;
    font-size: 1.2em;
    position: absolute;
    float: right;
    right: 30px;
    top: 23px;
    font-weight: bolder;
    cursor: pointer
}

.btn-close {
    text-shadow: 0.3px 3px 2px rgba(69, 69, 69, 0.2);
}




hr {
    width: 60%
}



.config-opciones {
    height: 17vh;
    text-align: center;
    font-size: 1.2em;
    font-family: Source Sans Pro;
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

    .contenedor-central-menu {
        width: 78vw;
        height: 90vh;
    }

    .botones-menu[data-v-e1368be2] {
        display: grid;
        justify-content: center;
        align-items: center;
        width: 81%;
        align-content: center;
        margin: 13px auto;
        height: auto;
        padding: 7px;
        grid-template-columns: 1fr 1fr;
    }

}
</style>