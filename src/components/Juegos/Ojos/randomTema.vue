<template>
  <div>
    <div class="
        contenedor-temas
        flex-center-elements-column 
        gap-3
      " v-for="(recuadros, index) in cantidadTemas" :key="`recuadros-${index}`">
      <RandomTemaItem class="flex-center-elements-column  gap-3 " @finSeleccionTemas="temasSeleccionados" />
      <div class="auto flex-center-elements-row gap-2" style="text-align:center">
        <div class="btn-primary" @click="continuarActividad">CONTINUAR</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, defineEmits } from "vue";
import RandomTemaItem from './randomTemaItem.vue'

const emit = defineEmits(['finSeleccionTemasAleatorios','continuar'])


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

const continuarActividad = () => {
    emit("continuar")
}


const temasSeleccionados = (tema) => {
  emit("finSeleccionTemasAleatorios", tema)
}




</script>

<style lang="css" scoped>
.contenedor-temas {
  width: 35vw;
  height: fit-content;
  z-index: 99999999;
  background-color: white;
  color: black;
  margin-bottom: 12px;
  text-align: center;
  padding: 43px 23px;
  border-radius: 23px;
}
</style>