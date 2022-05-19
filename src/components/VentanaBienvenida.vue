

<template>
  <div
    class="
      ventana-usuario
      center-element
      border-axa
      flex-center-elements-column
      animate__animated animate__fadeIn animate__slow animate__delay_5s
    "
  >
    <div v-if="!sliderActive">
      <div class="flex-center-elements-column">
        <h1 class="title">
          <slot name="titulo">
            Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
            Numquam aut eum deleniti aut quam dolorem. Ratione distinctio
            dolorem id quia cupiditate eos.
          </slot>
        </h1>
        <p>
          <slot name="texto">
            Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
            Numquam aut eum deleniti aut quam dolorem. Ratione distinctio
            dolorem id quia cupiditate eos.
          </slot>
        </p>
        <div class="btn-primary auto" @click="hiddenWindow">
          <slot name="button-ventana"> COMENZAR </slot>
        </div>
      </div>
    </div>
    <div v-else>
      <SliderVentana
        :sliderActual="slid"
        v-for="slider in sliders.slider"
        :key="slider.id"
      >
        <template #titulo> {{ slider.titulo }} </template>
        <template #texto>
          {{ slider.texto }}
        </template>
      </SliderVentana>
      <ButtonSliders
        @someEvent="Botonslider"
        :numneroBotones="sliders.slider.length"
      />
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";
import SliderVentana from "./sliderVentana.vue";
import ButtonSliders from "../components/buttonsSliders/botonsSliders.vue";
import animateCSS from "../helpers/animations.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const slid = ref(0);

const sliders = defineProps({
  slider: Array,
  sliderActive: Boolean,
  ruta:String
});

const Botonslider = (id) => {
  slid.value = id - 1;
};

const hiddenWindow = () => {
  animateCSS(".ventana-usuario", "fadeOut").then((message) => {
    router.push(`/${sliders.ruta}`);
    document.querySelector(".ventana-usuario").style.display = "none";
  });
};
</script>

<style lang="css" scoped>
.ventana-usuario {
  width: 70vw;
  height: 70vh;
  border-radius: 23px;
  padding: 23px;
  background-color:rgba(255,255,255,1);
}

.title {
  widows: 100%;
  text-align: center;
  color: var(--rojo-colpatria);
}

p{
  font-family: 'Publico Banner, SourceSansProLightItalic, Arial, Georgia, Sans Serif, Serif';
}

.button {
  text-align: center;
}
</style>

