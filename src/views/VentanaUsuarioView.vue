

<template>
  <div class="container">
    <!-- <div class="puntos-avance">

      <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

      </object>
    </div> -->
    <!-- <VentanaBienvenida :sliderActive="true" :slider="slidersBienvenida" /> -->
    <VentanaBienvenida v-if="ocultarVentana" :sliderActive="false" ruta="webcamera">
      <template #titulo>
        {{
            config.nombreUsuario == ""
              ? "Ingresa el nombre:"
              : `¡Hola ${capitalize}! `
        }}
      </template>
      <template #texto>

        <div>
          <div class="flex-center-elements-row gap-2" v-if="guardar">
            <input id="usuarionombre" type="text" v-model="usuario" placeholder="Nombre" />


          </div>
        </div>
      </template>
      <template #button-ventana>
        <div v-if="config.nombreUsuario == null" class="btn-primary-vr1 flex-center-elements-row gap-3"
          @click="guardar = !guardar">
          GUARDAR
        </div>
        <div class="btn-primary-vr1 flex-center-elements-row gap-3">
          CONTINUAR
        </div>
      </template>
    </VentanaBienvenida>
  </div>
</template>


<script setup>
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';
import VentanaBienvenida from "@/components/VentanaBienvenida.vue";
import { ref, onMounted, computed, watch } from "vue";
import Sliders from "@/assets/textos/Bienvenida.json";
import { useConfigStore } from "../stores/config.js";

onMounted(() => {
  const { Bienvenida } = Sliders[0];

  Bienvenida.forEach((element) => {
    slidersBienvenida.value.push(element);
  });

  config.nombreUsuario ? guardar.value = false : guardar.value = true

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

<style lang="css" scoped>
input#usuarionombre[type=text] {
  width: 20em;
  height: 25px;
  padding: 8px;
  border: 1px solid #E5E5E5;
  margin: 8px 0 0;
  box-shadow: 3px 3px #F0F0F0;
  text-transform: capitalize;
  background-color: #f0ff93;
  border-radius: 12px;
}


.puntos-escena {
  width: 94vw;
  height: 910px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>