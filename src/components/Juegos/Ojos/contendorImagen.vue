<template>
  <div :id="`recuadro-imagen-${id}`" :style="styleObject"></div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onBeforeMount } from "vue";
import gsap from "gsap";

const anteriorPosicionX = ref(null);
const anteriorPosicionY = ref(null);

const largoventana = ref(window.screen.height);
const anchoventana = ref(window.screen.width);

const coordenadaX = ref(0);
const coordenadaY = ref(0);

onBeforeMount(() => {
  /* coordenadaPX();
  coordenadaPY();
  styleObject.transform = `translate(${coordenadaX.values}px,${coordenadaY.values}px)`; */
});

onMounted(() => {
  animacion();
  styleObject.transform = `translate(${coordenadaX.values}px,${coordenadaY.values}px)`;
});

const animacion = () => {
  /*  gsap.to(`#recuadro-imagen-${props.id}`, {
     x:  Math.floor(Math.random() * (window.innerWidth - 1)) + 0,
     y:  Math.floor(Math.random() * (window.innerHeight - 1)) + 0,
     duration: 2.5,
     stagger: {
       grid: [7, 15],
       from: "center",
       amount: 1.5,
     },
      delay:Math.round(Math.random()) *
       5 -
     1
   }); */
};

const props = defineProps({
  srcImagen: String,
  id: Number,
  textoImagen: String,
});

const styleObject = reactive({
  textAlign:"center",
  width: "7vw",
  height: "17vh",
  display: "inline",
  position: "absolute",
  backgroundImage: `url(${props.srcImagen})`,
  /*  transform: `translate(${coordenadaX.values}px,${coordenadaY.values}px)`, */
/*   transform: `translate(100px,760px)`, */
  backgroundPosition: "center center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
});

const coordenadaPX = () => {
  coordenadaX.values =
    Math.floor(Math.random() * (anchoventana.value - 0)) *
    Math.round(Math.random()) *
    2 -
    1;
};

const coordenadaPY = () => {
  coordenadaY.values =
    Math.floor(Math.random() * (largoventana.value - 0)) *
    Math.round(Math.random()) *
    2 -
    1;
};
</script>

<style lang="css" scoped>
</style>