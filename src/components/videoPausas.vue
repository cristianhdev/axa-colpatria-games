<template>
    <div class="flex-center-elements-row" style="position: relative;">
       
        <video ref="videoPausaSeleccionado" :id="idElementCamara" :poster="videoPausaUrl == '' ? mostrarImagenUrl : ''">
            <source :src="videoPausaUrl == '' ? '' : videoPausaUrl" type="video/mp4">
        </video>

        <!-- v-if="ismonstrarMensajeCambio" -->
        <div v-if="ismonstrarMensajeCambio" class="mensaje-cambio">
            CAMBIO DE LADO...
        </div>
        <div v-if="mostrarimagenReferencia" class="info-imagen auto">
            Imagen de referencia
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch, computed, reactive } from 'vue'

const videoPausaSeleccionado = ref(null)
const videoTiempoActual = ref(0)

const opcionesVideo = defineProps({
    videoPausaUrl: String,
    mostrarImagenUrl: String,
    mostrarimagenReferencia: {
        type: Boolean,
        default: true
    },
    isLoop: {
        type: Boolean,
        default: true
    },
    isPlayVideo: {
        type: Boolean,
        default: false
    },
    isPauseVideo: {
        type: Boolean,
        default: false
    },
    ismonstrarMensajeCambio: {
        type: Boolean,
        default: false
    },
    idElementCamara: {
        type: String,
        default: 'videoPausa'
    }


})

onMounted(() => {

    videoPausaSeleccionado.value = document.getElementById(`${opcionesVideo.idElementCamara}`)
    videoPausaSeleccionado.value.autoplay = opcionesVideo.isPlayVideo
    videoPausaSeleccionado.value.loop = opcionesVideo.isLoop
})

watch(() => opcionesVideo.isPlayVideo, (playVideoNew, playVideoNewOld) => {


    playVideoPausa()


})

watch(() => opcionesVideo.isPauseVideo, (pauseVideoNew, pauseVideoNewOld) => {
    if (pauseVideoNew) {
        pauseVideoPausa()
    }
})

const detectarTiempo = (e) => {

    let tiempo;


    videoTiempoActual.value = Math.floor(e.target.currentTime)



    /*   if (Math.floor(videoPausaSeleccionado.value.currentTime) == 1) {
          videoPausaSeleccionado.value.pause()
          tiempo = setTimeout(() => {
              videoPausaSeleccionado.value.currentTime = 2
              videoPausaSeleccionado.value.play()
              clearTimeout(tiempo)
          }, 4000)
      }
      if (Math.floor(videoPausaSeleccionado.value.currentTime) == 3) {
          videoPausaSeleccionado.value.pause()
          setTimeout(() => {
              videoPausaSeleccionado.value.currentTime = 4
              videoPausaSeleccionado.value.play()
              clearTimeout(tiempo)
          }, 4000)
      }
      if (Math.floor(videoPausaSeleccionado.value.currentTime) == 4) {
          videoPausaSeleccionado.value.pause()
          videoPausaSeleccionado.value.removeEventListener("timeupdate", detectarTiempo)
          clearTimeout(tiempo)
      } */

}

const playVideoPausa = () => {
    videoPausaSeleccionado.value.currentTime = videoTiempoActual.value
    videoPausaSeleccionado.value.play()

    videoPausaSeleccionado.value.addEventListener('ended', () => {
        videoPausaSeleccionado.value.currentTime = 0
        videoPausaSeleccionado.value.pause()
    }, false);

    videoPausaSeleccionado.value.addEventListener("timeupdate", detectarTiempo)


}

const pauseVideoPausa = () => {
    videoPausaSeleccionado.value.currentTime = videoTiempoActual.value
    videoPausaSeleccionado.value.pause()
}

</script>

<style lang="scss" scoped>
.info-imagen {
    width: 60%;
    font-size: 0.8em;
    font-weight: 600
}

video {
    width: 290px;
    border: 1px solid blue;
}

.mensaje-cambio {
    font-family: Source Sans Pro;
    font-size: 1.3em;
    color: white;
    font-weight: 600;
    width: 208px;
    height: 4vh;
    display: flex;
    align-items: center;
    align-content: center;
    position: absolute;
    background-color: #000000b3;
    padding: 0px 42px;
    margin: 0px auto;
    bottom: 0vh;
    text-align: center;
    justify-content: center;
}
</style>