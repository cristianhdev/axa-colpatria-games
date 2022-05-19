<template>
    <div>
        <div class="contenedor-slider flex-center-elements-row">
            <div v-if="parentId.navegacion" :class="`prev-${parentId.id}`" >&lt;&lt;</div>

            <div :class="`padre-Slider-${parentId.id}`"
                style="  display: flex;flex-direction: row;flex-wrap: nowrap;grid-gap: 35px;">
                <slot name="sliders"></slot>

            </div>
            <div v-if="parentId.navegacion" :class="`next-${parentId.id}`" >&gt;&gt;</div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sliderActual = ref(0)


const parentId = defineProps({
    id: Number,
    numSliders: Number,
    navegacion: Boolean
})








</script>

<style lang="css" scoped>
.contenedor-slider {
    width: 260px;
    height: 210px;
    overflow: hidden;
    margin: 0px auto;
    grid-gap: 2px;
}

.contenedor-slider>div {
    width: 200px;
}

.contenedor-slider>div img {
    width: 200px;
}
</style>