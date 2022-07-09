<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

import MenuPrincipal from '@/components/MenuPrincipal.vue';
/* import PleaseRotate from 'pleaserotate.min.js' */

onMounted(() => {
  /*  var options = {
      startOnPageLoad: true,
      onHide: function () { },
      onShow: function () { },
      forcePortrait: false,
      message: "Por favor gire el dispositivo para realizar la actividad",
      subMessage: "",
      allowClickBypass: false,
      onlyMobile: true,
      zIndex: 9999999,
      iconNode: null
    };
PleaseRotate.start(options) */
  /* let externalScript = document.createElement('script');
  externalScript.setAttribute('src', '')
  document.head.appendChild(externalScript) */
})

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
