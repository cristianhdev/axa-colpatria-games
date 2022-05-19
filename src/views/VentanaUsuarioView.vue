

<template>
  <div class="container">
    <!-- <VentanaBienvenida :sliderActive="true" :slider="slidersBienvenida" /> -->
    <VentanaBienvenida v-if="ocultarVentana" :sliderActive="false" ruta="webcamera">
      <template #titulo>
        {{
            config.nombreUsuario == ""
              ? "Ingresa el nombre:"
              : `¡Hola ${capitalize}! `
        }}
      </template>
      <template  #texto>

        <div>
          <div class="flex-center-elements-row-nowrap gap-2" v-if="guardar">
            <input  type="text" v-model="usuario" placeholder="Nombre" />

            <div  class="btn-primary flex-center-elements-row gap-3"
              @click="guardar = !guardar">
              GUARDAR
            </div>
          </div>
        </div>
      </template>
      <template #button-ventana>
        CONTINUAR
      </template>
    </VentanaBienvenida>
  </div>
</template>


<script setup>
import VentanaBienvenida from "@/components/VentanaBienvenida.vue";
import { ref, onMounted, computed, watch } from "vue";
import Sliders from "../textos/Bienvenida.json";
import { useConfigStore } from "../stores/config.js";

onMounted(() => {
  const { Bienvenida } = Sliders[0];

  Bienvenida.forEach((element) => {
    slidersBienvenida.value.push(element);
  });

  config.nombreUsuario?guardar.value=false:guardar.value=true
  
});


const config = useConfigStore();

const ocultarVentana = ref(true);
const usuario = ref("");
const guardar = ref(true);

const slidersBienvenida = ref([]);


console.log(config.nombreUsuario)


// watch works directly on a ref
watch(usuario, (newQuestion, oldQuestion) => {
  config.setNombreUsuario(newQuestion)
  
})

const capitalize = computed(() => {
  const usuarioNombreMinuscula = config.nombreUsuario.toLowerCase();
  const usuarioNombreUppercase = config.nombreUsuario.charAt(0).toUpperCase() + usuarioNombreMinuscula.slice(1);
  return usuarioNombreUppercase
});





</script>

<style scoped>

</style>