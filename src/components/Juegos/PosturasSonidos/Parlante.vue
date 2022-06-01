<template>
    <div v-if="!fintiempo" class="contenedor-audio flex-center-elements-column gap-1"
        :id="`parlante-${posicionSonidos.posicion}`">
        <div :style="styleParlante" class="animate__animated animate__fadeIn animate__delay-1s animate__faster"
            @click="playSonido(posicionSonidos.posicion)">
            {{ posicionSonidos.audiosSound }}
        </div>
        <div class="animate__animated animate__fadeIn animate__delay-2s animate__faster">
            <img class="imagen-ejercicio" :src="srcUrl" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive } from 'vue'
import Sonidos from '@/assets/helpers/sounds.js'
import ImagenParlante from '@/assets/img/parlanteOn.gif'
import Soundlife from '@/assets/sounds/life.mp3'
import Soundcoin from '@/assets/sounds/coin.mp3'
import Soundjump from '@/assets/sounds/jump.mp3'
import Soundcartoon1 from '@/assets/sounds/cartoon1.mp3'
import Soundcartoon2 from '@/assets/sounds/cartoon2.mp3'
import Soundcartoon3 from '@/assets/sounds/cartoon3.mp3'

onBeforeMount(() => {
    /*  setTimeout(() => {
         document.querySelector('#figura-0').style.display = "none"
     }, 13000) */
})




const audio = ref(null)



const styleParlante = reactive({
    backgroundColor: 'silver',
    width: '26px',
    height: '27px',
    backgroundImage: `url('${ImagenParlante}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer'
});

const posicionSonidos = defineProps({
    posicion: [Number, String],
    fintiempo: Boolean,
    srcUrl: String,
    estilos: Object
})



const playSonido = (posicion) => {
    console.log(posicion)
    let sonidos = [
        new Audio(Soundlife),
        new Audio(Soundcoin),
        new Audio(Soundjump),
        new Audio(Soundcartoon1),
        new Audio(Soundcartoon2),
        new Audio(Soundcartoon3)
    ]
    if (audio.value == null) {

        sonidos[parseInt(posicion)].play()
        /* audio.value = new Sonidos(sonidos[parseInt(posicion)], false)
        audio.value.playAudio() */
    } else {
        /* audio.value.stopAudio() */
    }
}







</script>

<style lang="css" scoped>
.parlante-click {
    border: 3px solid green;
}

.imagen-ejercicio {
    width: 15vh;
    height: 12vh;
}
</style>