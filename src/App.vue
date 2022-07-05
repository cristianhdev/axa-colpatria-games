<script setup>
import { ref, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

import MenuPrincipal from '@/components/MenuPrincipal.vue';

</script>

<template>
 
  <RouterView />
<!--  <MenuPrincipal :isvisible="false" /> -->

</template>

<style>
/* @import "@/assets/css/base.css"; */
@import "@/assets/css/styles.css";
@import "@/assets/css/style-axa.css";
@import "@/assets/css/help.css";
@import "@/assets/css/animate.min.css";
</style>
