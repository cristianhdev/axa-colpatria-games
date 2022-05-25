<template>
    <div  v-if="!fintiempo" class="contenedor-audio flex-center-elements-column gap-1" :id="`parlante-${posicionSonidos.posicion}`">
        <div :style="styleParlante" class="animate__animated animate__fadeIn animate__delay-1s animate__faster" @click="playSonido(posicionSonidos.posicion)">

        </div>
        <div class="animate__animated animate__fadeIn animate__delay-2s animate__faster">
            <img :src="srcUrl" width="77" height="88" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, reactive } from 'vue'
import Sonidos from '@/assets/helpers/sounds.js'

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
    backgroundImage: 'url(@/assets/img/parlanteOn.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    borderRadius: '100%',
    padding: '3px 3px',
    cursor: 'pointer'
});

const posicionSonidos = defineProps({
    posicion: [Number,String],
    fintiempo: Boolean,
    srcUrl:String,
    estilos:Object
})

const sonidos = ref([
    'life',
    'coin',
    'jump',
    'cartoon1',
    'cartoon2',
    'cartoon3'

])

const playSonido = (posicion) => {
    if (audio.value == null) {
        console.log(sonidos.value[parseInt(posicion)])
        audio.value = new Sonidos(sonidos.value[parseInt(posicion)], false)
        audio.value.playAudio()
    } else {
        audio.value.stopAudio()
    }
}







</script>

<style lang="css" scoped>
.parlante-click {
    border: 3px solid green;
}

</style>