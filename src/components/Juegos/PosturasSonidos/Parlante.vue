<template>
    <div v-if="!fintiempo" class="contenedor-audio gap-1" :id="`parlante-${posicionSonidos.posicion}`">
        <div :style="styleParlante" class="animate__animated animate__fadeIn animate__delay-1s animate__faster"
            @click="playSonido(posicionSonidos.posicion)">
            {{ posicionSonidos.audiosSound }}
        </div>
        <div class=" imagen-ejercicio animate__animated animate__fadeIn animate__delay-2s animate__faster">
            <img :src="srcUrl" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive } from 'vue'
import Sonidos from '@/assets/helpers/sounds.js'
import ImagenParlante from '@/assets/img/paralanteIcono.png'
import Soundlife from '@/assets/sounds/life.mp3'
import Soundcoin from '@/assets/sounds/coin.mp3'
import Soundjump from '@/assets/sounds/jump.mp3'
import Soundcartoon1 from '@/assets/sounds/cartoon1.mp3'
import Soundcartoon2 from '@/assets/sounds/cartoon2.mp3'
import Soundcartoon3 from '@/assets/sounds/cartoon3.mp3'
import { useConfigStore } from "../../../stores/config.js";



onBeforeMount(() => {
    /*  setTimeout(() => {
         document.querySelector('#figura-0').style.display = "none"
     }, 13000) */
})




const audio = ref(null)
const config = useConfigStore();
const emit = defineEmits(['finAudioAleatorio'])


const styleParlante = reactive({
    backgroundColor: 'silver',
    width: '30px',
    height: '31px',
    backgroundImage: `url('${ImagenParlante}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer',
    position: 'absolute',
    zIndex: '99999',
    margin: '3px 7px'
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
        if (config.audioPausas) {
            audio.value = sonidos[parseInt(posicion)]
            audio.value.play()
        } else {
            if (window.confirm("El audio esta desactivado por favor,active la opcion de sonido en el menu principal.")) {
               
            }
  
            /* 
             emit("finAudioAleatorio") */
        }
    }
}







</script>

<style lang="css" scoped>
.parlante-click {
    border: 3px solid green;
}

.imagen-ejercicio {
    /*  width: 100%;
     */
    width: -webkit-fill-available;
    height: 32vh;
    border: 1px solid var(--azul-axa);
    border-radius: 12px;

}

.imagen-ejercicio img {
    object-fit: contain;
    width: -webkit-fill-available;
    height: 100%;
}
</style>