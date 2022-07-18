<template>
    <div>
     
        <ComponentPrueabas  :id="router.params.id"/>
   
    </div>
</template>

<script setup>
import ComponentPrueabas from "@/components/testPruebasPausas/ComponentPrueabasPausas.vue";
import { useRoute } from "vue-router";
const router = useRoute()

</script>

<style scoped>

</style>