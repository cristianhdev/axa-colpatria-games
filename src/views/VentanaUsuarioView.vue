

<template>
  <div class="container">
    <!-- <div class="puntos-avance">

      <object ref="escena" type="image/svg+xml" :data="PuntosEscenario" class="puntos-escena">

      </object>
    </div> -->
    <!-- <VentanaBienvenida :sliderActive="true" :slider="slidersBienvenida" /> -->
    <VentanaIntroduccion v-if="ocultarVentana" :sliderActive="false" ruta="webcamera">
      <template #titulo>
        <div class="icono-perfil">
          <!-- <img src="@/assets/img/perfil-icon.png" alt=""> -->
        </div>
        {{
            config.nombreUsuario == ""
              ? "Ingrese su nombre:"
              : `¡Hola ${capitalize}! `
        }}
      </template>
      <template #texto>

        <div>
          <div class="flex-center-elements-row gap-2" v-if="guardar">
            <input id="usuarionombre" type="text" v-model="usuario" placeholder="Nombre" maxlength="12" />


          </div>
        </div>
      </template>
      <template #button-ventana>
        <div v-if="config.nombreUsuario == null" class="btn-primary-vr1 flex-center-elements-row gap-3"
          @click="guardar = !guardar">
          GUARDAR
        </div>
        <div class="btn-primary flex-center-elements-row gap-3">
          CONTINUAR
        </div>
      </template>
    </VentanaIntroduccion>
  </div>
</template>


<script setup>
import PuntosEscenario from '@/assets/svg/puntos_fondo.svg';
import VentanaIntroduccion from "@/components/VentanaIntroduccion.vue";
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
  height: 2.2em;
  padding: 8px;
  border:2px solid var(--azul-axa);
  margin: 8px 0 0;
  /* box-shadow: 3px 3px #F0F0F0; */
  background-color: #FFFFFF;
 /*  border-radius: 12px; */
}


.puntos-escena {
  width: 94vw;
  height: 910px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}



.icono-perfil {
    background-image: url('@/assets/img/perfil-icon.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    width: 43vh;
    height: 22vh;
    position: relative;
    top: -43px;
    margin: 0px auto;
}


</style>