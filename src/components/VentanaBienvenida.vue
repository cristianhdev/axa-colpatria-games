

<template>
  <div :style="styleContenedor" class="animate__animated animate__fadeIn animate__slow animate__delay_5s">

    <div :style="styleImagenTexto">
      <div class="texto">
        <slot name="texto">

        </slot>
      </div>
      <div>
        <img src="@/assets/img/Personajes.png" alt="" class="responsive-instrucciones">
      </div>
    </div>

    <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center" @click="emit('cerrarVentana')">
      <slot name="btntexto">
        <div class="button-bs">COMENZAR</div>
      </slot>
    </div>
    <div v-if="!sliderActive">
      <div class="flex-center-elements-column gap-4">
        <div>
          <img src="@/assets/icons/fu001.svg" alt="">
        </div>
        <div class="titulos-ventanas-intro">
          <slot name="titulo">
          </slot>
        </div>

        <slot name="texto">
          Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
          Numquam aut eum deleniti aut quam dolorem. Ratione distinctio
          dolorem id quia cupiditate eos.
        </slot>

        <div @click="hiddenWindow">
          <div class="flex-center-elements-row gap-3">
            <slot name="button-ventana"> COMENZAR </slot>
          </div>
        </div>
      </div>
    </div>
     <div v-else>
      <SliderVentana :sliderActual="slid" v-for="slider in sliders.slider" :key="slider.id">
        <template #titulo> {{ slider.titulo }} </template>
        <template #texto>
          {{ slider.texto }}
        </template>
      </SliderVentana>
      <ButtonSliders @someEvent="Botonslider" :numneroBotones="sliders.slider.length" />
    </div>
  </div>
</template>



<script setup>
import { ref, reactive } from "vue";
import SliderVentana from "./sliderVentana.vue";
import ButtonSliders from "../components/buttonsSliders/botonsSliders.vue";
import animateCSS from "@/assets/helpers/animations.js";
import { useRouter, useRoute } from "vue-router";
import imagenFondoBienvenidaImagen from '@/assets/img/BienvidaJuegos.png'

const router = useRouter()
const slid = ref(0);
const emit= defineEmits(['cerrarVentana'])

const sliders = defineProps({
  slider: Array,
  sliderActive: Boolean,
  ruta: {
    type: String,
    default: ''
  }
});

const styleContenedor = reactive({
  backgroundImage: `url(${imagenFondoBienvenidaImagen})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundColor: "#18488c",
  width: '100vw',
  height: '105vh',
  position: 'absolute',
  zIndex: '9999'
});

const styleImagenTexto = reactive({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  placeItems: "center"
});


const Botonslider = (id) => {
  slid.value = id - 1;
};

const hiddenWindow = () => {

  if (sliders.ruta != '') {
    animateCSS(".ventana-usuario", "fadeOut").then((message) => {

      router.push(`/${sliders.ruta}`);


      document.querySelector(".ventana-usuario").style.display = "none";
    });
  }
};
</script>

<style lang="css" scoped>
.btn-jugar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40vh, 30vh);
}

.texto {
  width: 65%;
  height: 42em;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  color: white;
  font-family: Source Sans Pro;
  font-size: 1em;
  font-weight: normal;

}

.title {
  widows: 100%;
  text-align: center;
  color: black;
}

p {
  font-family: 'Publico Banner, SourceSansProLightItalic, Arial, Georgia, Sans Serif, Serif';
}

.button {
  text-align: center;
}

@media screen and (min-width: 1280px) {

  /* body {
        border: 34px solid green;
    } */
  .responsive-instrucciones {
    width: auto;
    height: 100vh;
  }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {

  .responsive-instrucciones {
    width: 60vh;
    height: auto;
  }

  .texto {
    grid-gap: 0rem;
    height: -webkit-fill-available;
    font-size: 0.8em;
  }

   .btn-jugar {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40vh, 20vh);
    }
}
</style>

