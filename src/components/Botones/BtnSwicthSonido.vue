<template>
    <div>
        <div class="onoffswitch">
            <input type="checkbox" @change="changeEvent"  @click="chageStateteClick" v-model="estado" name="onoffswitch"
                class="onoffswitch-checkbox" :id="`myonoffswitch${config.idSwitch}`" tabindex="0" checked>
            <label class="onoffswitch-label" :for="`myonoffswitch${config.idSwitch}`">
                <span class="onoffswitch-inner"></span>
                <span class="onoffswitch-switch"></span>
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch} from 'vue'
import { useConfigStore } from "../../stores/config.js";
const audioConfig = useConfigStore();
const emit = defineEmits(['event'])
/* const estado = ref(true) */





const changeEvent = () => {
    console.log(estado.value)
    audioConfig.setAudioPausas(estado.value)
    emit('event', estado.value)
}

const estado = ref(audioConfig.audioPausas)

const changeEstado = computed(() => {
    return audioConfig.audioPausas
})

watch(changeEstado, (pauseVideoNew, pauseVideoNewOld) => {
    estado.value=pauseVideoNew
})

onMounted(() => {

})

const chageStateteClick =  () => {
    estado.value =  true
}

const config = defineProps({
    idSwitch: {
        type: Number,
        default: 1
    },
    audio: {
        type: Boolean,
        default: false
    },
    width: {
        type: Number,
        default: 600
    },
    height: {
        type: Number,
        default: 500
    }
})

</script>

<style lang="css" scoped>
.onoffswitch {
    position: relative;
    width: 90px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid var(--azul-axa);
    border-radius: 20px;
}

.onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}

.onoffswitch-inner:before,
.onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 14px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
}

.onoffswitch-inner:before {
    content: "ON";
    padding-left: 10px;
    background-color: #00008F;
    color: #FFFFFF;
}

.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 10px;
    background-color: #EEEEEE;
    color: #999999;
    text-align: right;
}

.onoffswitch-switch {
    display: block;
    width: 18px;
    margin: 6px;
    background: #4DD605;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 56px;
    border: 2px solid var(--azul-axa);
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}

.onoffswitch-checkbox:checked+.onoffswitch-label .onoffswitch-switch {
    right: 0px;
}
</style>