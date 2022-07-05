<template>
    <div class="
      ventana-usuario
      center-element
      border-axa
      flex-center-elements-column
      animate__animated animate__fadeIn animate__slow animate__delay_5s
    ">
        <div v-if="!sliderActive">
            <div class="contenedor-central flex-center-elements-column gap-4">
                <div class="titulos-ventanas-intro">
                    <slot name="titulo">
                        <!--  Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
            Numquam aut eum deleniti aut quam dolorem. Ratione distinctio
            dolorem id quia cupiditate eos. -->
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
import { ref } from "vue";
import SliderVentana from "./sliderVentana.vue";
import ButtonSliders from "../components/buttonsSliders/botonsSliders.vue";
import animateCSS from "@/assets/helpers/animations.js";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const slid = ref(0);

const sliders = defineProps({
    slider: Array,
    sliderActive: Boolean,
    ruta: {
        type: String,
        default: ''
    }
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
    }/* else{
             document.querySelector(".ventana-usuario").style.display = "none";
    } */
};
</script>

<style lang="css" scoped>
.contenedor-central {
    width: 483px;
    height: 583px;
    background-color: #fff;
    border-radius: 4%;
}


.ventana-usuario {
    width: 100vw;
    height: 100vh;
    border-radius: 23px;
    padding: 23px;
    background-color: #fff;
    background: transparent url(@/assets/img/fondoEscenario.png) no-repeat center center;
    background-size: cover;
}


.title {
    widows: 100%;
    text-align: center;
    color: var(--blanco);
}

p {
    font-family: 'Publico Banner, SourceSansProLightItalic, Arial, Georgia, Sans Serif, Serif';
}

.button {
    text-align: center;
}

.titulos-ventanas-intro {
    width: 80%;
    font-family: Source Sans Pro;
    font-size: 1.8em;
    font-weight: 700;
    text-align: center;
    margin: 0 auto;
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .contenedor-central{
        height:79vh
    }
}
</style>

