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

const sonidos = ref([
    { id: 1, audio: new Audio(Soundlife) },
    { id: 2, audio: new Audio(Soundcoin) },
    { id: 3, audio: new Audio(Soundjump) },
    { id: 4, audio: new Audio(Soundcartoon1) },
    { id: 5, audio: new Audio(Soundcartoon2) },
    { id: 6, audio: new Audio(Soundcartoon3) }
]);





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
    margin: '3px 7px',
    top: "30px",
    left: "27px"
});

const posicionSonidos = defineProps({
    posicion: [Number, String],
    fintiempo: Boolean,
    srcUrl: String,
    estilos: Object
})



const playSonido = (posicion) => {


    let audioPlay = Object.values(sonidos.value).filter((Audio) => {
        return Audio.id == posicion
    })
    console.log(audioPlay)

    if (audio.value == null) {
        if (config.audioPausas) {
            audio.value = audioPlay[0].audio
            audio.value.play()
        } else {
            if (window.confirm("El audio esta desactivado por favor,active la opcion de sonido en el menu principal.")) {

            }

            /* 
             emit("finAudioAleatorio") */
        }
    } else {
        audio.value = audioPlay[0].audio
        audio.value.play()
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
    width: 16vw;
    height: 27vh;
    border: 1px solid var(--azul-axa);
    border-radius: 12px;

}

.imagen-ejercicio img {
    object-fit: contain;
    width: -webkit-fill-available;
    height: 100%;
}
</style>