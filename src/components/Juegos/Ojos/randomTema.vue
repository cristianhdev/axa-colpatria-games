<template>
  <div>
    <div class="
        contenedor-temas
        border-axa
        flex-center-elements-column 
        gap-3
      " v-for="(recuadros, index) in cantidadTemas" :key="`recuadros-${index}`">
      <RandomTemaItem class="flex-center-elements-column  gap-3 " @finSeleccionTemas="temasSeleccionados" />
        
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, defineEmits } from "vue";
import RandomTemaItem from './randomTemaItem.vue'

const emit = defineEmits(['finSeleccionTemasAleatorios'])


const temas = defineProps({
  opciones: {
    type: Array
  },
  cantidadTemas: {
    type: Number,
    default: 1
  }
})

onMounted(() => {
  

})


onBeforeMount(() => {


});



const temasSeleccionados = (tema) =>{
  emit("finSeleccionTemasAleatorios",tema)
}




</script>

<style lang="css" scoped>
.contenedor-temas {
  width: 35vw;
  height: 43vh;
  z-index: 99999999;
  background-color: #004E54;
  color: var(--blanco);
  margin-bottom:12px;
  text-align:center
}
</style>