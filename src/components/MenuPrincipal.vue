<template>
    <div v-if="isMenuPrincipalVisible" class="overflow-menu">
        <div
            class="contenedor-central-menu flex-center-elements-row  gap-2 animate__animated animate__fadeIn animate__slow">
            <div class="contenedor-configuracion">
                <div class="titulo">

                    <div>{{
                            config.nombreUsuario == ""
                                ? "Hola Invitado"
                                : `Hola ${UpperCase} `
                    }}

                    </div>
                </div>

                <div class="title">
                    <div>
                        <strong>Menú principal</strong>
                    </div>




                </div>



                <div class="config-opciones flex-center-elements-row gap-2">
                    <div class="flex-center-elements-row gap-1">
                        <div>
                            Camara:
                        </div>
                        <div>
                            <SwitchBotonCamara :idSwitch="idSA" @event="onOffCamara" />

                        </div>

                    </div>
                    <div class="flex-center-elements-row gap-1">
                        <div>
                            Sonido:
                        </div>
                        <div>
                            <SwitchBotonSonido :idSwitch="idSB" @event="onOffSonido" />
                        </div>
                        <!--  <div style="background-color: silver;border-radius: 100%;">
                            <img :src="sonidoListo ? ImagenParlanteOn : ImagenParlanteOff" alt="" width="35"
                                height="35">
                        </div> -->
                    </div>

                </div>


                <div class="botones-menu flex-center-elements-column gap-2">

                    <div class="btn-primary" @click="mostrarInstrucciones">Instrucciones</div>
                    <div class="btn-primary" @click="ReiniciarPartida">Reinciar Partida</div>
                    <div class="btn-primary">Reinciar Configuración</div>
                    <div class="btn-primary" @click="ocultarMenuPrincipal">Salir</div>

                </div>

            </div>
        </div>
        <!--    <div class="test-camara" v-if="camaraReadyMenu">
            <div class="contenedor-camara" v-if="camaraReadyMenu">
                @camaraLoad="camaraReady = !camaraReady"
                <CaramaWeb :width="200" :height="200" />
                <div class="flex-center-elements-row center-element" v-if="!camaraReady">
                    <span class="spiner"></span>
                </div>
            </div>
            <div class="contenedor-camara" v-else>
                <div class="center-element">
                    CAMARA OFF
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useConfigStore } from "../stores/config.js";
import { useRouter, useRoute } from "vue-router";

import CaramaWeb from '@/components/Camaraweb/CamaraWeb.vue'
import SwitchBotonCamara from '@/components/Botones/BtnSwicthCamara.vue'
import SwitchBotonSonido from '@/components/Botones/BtnSwicthSonido.vue'
import ImagenParlanteOn from '@/assets/img/parlanteOn.gif'
import ImagenParlanteOff from '@/assets/img/parlanteOff.gif'

const config = useConfigStore();
const router = useRouter()
const usuario = ref('')
const camaraReadyMenu = ref(false)
const sonidoReady = ref(true)
const idSB = ref(1)
const idSA = ref(2)
const emit = defineEmits(['eventInstrucciones'])


const configMenuPrincipal = defineProps({
    isVisible: {
        type: Boolean,
        default: true
    }
});




onMounted(() => {
    usuario.value = config.nombreUsuario
})

const UpperCase = computed(() => {
    return usuario.value.charAt(0).toUpperCase() + usuario.value.slice(1);
})

const onOffCamara = (estado) => {
    camaraReadyMenu.value = estado
}


const onOffSonido = (estado) => {
    /* sonidoReady.value = estado */
    config.setAudioPausas(estado)

}

const ocultarMenuPrincipal = () => {
    config.setMenuEstadoVisible(false)
}

const ReiniciarPartida = () => {
    config.setMenuEstadoVisible(false)
    router.go(router.currentRoute.value.path)

}

const mostrarInstrucciones = () => {
    emit('eventInstrucciones')
    config.setMenuEstadoVisible(false)
}

const camaraReady = computed(() => config.isCamara)
const sonidoListo = computed(() => config.audioPausas)
const isMenuPrincipalVisible = computed(() => config.menuEstadoVisible)

</script>

<style lang="css" scoped>
.contenedor-configuracion {
    height: -webkit-fill-available;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
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
    width: 70%;
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
    width: 31vw;
    height: 512px;
    max-height: 512px;
    background-color: #fff;
    border-radius: 4%;
    overflow: hidden;
    border: 1px solid var(--azul-axa);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        height: 90vh
    }

    .botones-menu {
        display: grid;
        justify-content: center;
        align-items: stretch;
        width: 92%;
        align-content: center;
        margin: 13px auto;
        height: auto;
        padding: 7px;
        grid-template-columns: 1fr 1fr;
    }

    .titulo {
        text-align: center;
        font-size: 2.1em;
        font-family: Source Sans Pro;
        width: auto;
        height: 19%;
    }

    .config-opciones {
    height: 77vh;
}

}
</style>