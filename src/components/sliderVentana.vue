<template>
  <div class="sliders flex-center-elements-column animate__animated animate__fadeIn animate__slow">
    <h1 class="title">
      <slot name="titulo">
        Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
        Numquam aut eum deleniti aut quam dolorem. Ratione distinctio dolorem id
        quia cupiditate eos.
      </slot>
    </h1>
    <p>
      <slot name="texto">
        Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos.
        Numquam aut eum deleniti aut quam dolorem. Ratione distinctio dolorem id
        quia cupiditate eos.
      </slot>
    </p>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, watch } from "vue";

/* Formato corto */
onMounted(() => {
  document.querySelectorAll(".sliders").forEach((element) => {
    element.style.display = "none";
  });
  document.querySelectorAll(".sliders")[0].style.display = "block";
});

onBeforeMount(() => {
  /*  console.log(document.querySelectorAll('.sliders')) */
});

/* const emit = defineEmits(['changeSlider', 'cambieSlider']) */

const identificador = defineProps({
  idslider: {
    type: Number,
    default: 1,
  },
  sliderActual: {
    type: Number,
    default: 0,
  },
});

// watch works directly on a ref
/* watch(identificador.sliderActual, (newSlider, oldSlider) => {
    
}) */

watch(
  () => identificador.sliderActual,
  (newSlider, oldSlider) => {
    document.querySelectorAll(".sliders").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll(".sliders")[newSlider].style.display = "block";
  }
);
</script>

<style lang="css" scoped>
.sliders {
  text-align: justify;
  display: block;
  height: 70vh;
}

.title{
    widows: 100%;
     text-align: center;
}
</style>