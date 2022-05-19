<template>
  <div class="flex-center-elements-row gap-3">
    <div
      class="items"
      v-for="i = 0 in numneroBotones"
      :key="i"
      @click="$emit('someEvent', i)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sliderActual = ref(0);
/* const emit = defineEmits(['clickBotton', 'submit']) */

const botones = defineProps({
  numneroBotones: {
    type: Number,
    default: 1,
  },
});
</script>

<style lang="css" scoped>
.items {
  width: 2vh;
  height: 2vh;
  border-radius: 100%;
  background: silver;
}

.items:hover {
  transform: scale(1.3, 1.3);
  animation: transform 0.8s ease-in-out;
  background: rgb(69, 69, 69);
  cursor: pointer;
}


.items:not(:hover) {
  transform: scale(1, 1);
  animation: transform 0.8s ease-in-out;
}

</style>