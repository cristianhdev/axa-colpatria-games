<template>
  <div id="cronometro">

    <div class="base-timer">
      <!-- <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path id="base-timer-path-remaining" :stroke-dasharray="circleDasharray" class="base-timer__path-remaining"
            :class="remainingPathColor" d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "></path>
        </g>
      </svg> -->
      <span id="base-timer-label" class="base-timer__label" :class="{ 'animate_blinks': isRun }">
        {{ formatTime(timeLeft) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, onBeforeMount, watch } from 'vue'

import Sonidos from '@/assets/helpers/sounds.js'


const emit = defineEmits(['endTime','tiempoActual'])

const FULL_DASH_ARRAY = ref(283);
const WARNING_THRESHOLD = ref(10);
const ALERT_THRESHOLD = ref(5);
const clockAudio = ref(null)

const COLOR_CODES = reactive({
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
});




const TIME_LIMIT = tiempo.segundos;
let timePassed = ref(0);
let timeLeft = ref(TIME_LIMIT);
let timerInterval = ref(null);
let remainingPathColor = ref(COLOR_CODES.info.color);
let circleDasharray = ref(null)

onBeforeMount(() => {


})


onMounted(() => {
  if (tiempo.isRun) {
    startTimer();
  }
})

const tiempo = defineProps({
  segundos: {
    type: Number,
    default: 10
  },
  reiniciar: {
    type: Boolean,
    default: false
  },
  isRun: {
    type: Boolean,
    default: true
  },
  isCronometroPausa: {
    type: Boolean,
    default: false
  }
})


watch(tiempo.reiniciar, (reiniciarTiempoNew, reiniciarTiempoOld) => {

})

watch(() => tiempo.isRun, (reiniciarTiempoNew, reiniciarTiempoOld) => {
  startTimer();
})

watch(() => tiempo.isCronometroPausa, (reiniciarTiempoNew, reiniciarTiempoOld) => {
  clearInterval(timerInterval.value);
  if (clockAudio.value != null) {
    clockAudio.value.stopAudio()
    clockAudio.value = null
    /* document.getElementById("base-timer-label").style.animation = 'none' */
  }
})


const onTimesUp = () => {
  clearInterval(timerInterval.value);
  document.getElementById("base-timer-label").style.animation = 'none'
  emit('endTime')
}






const startTimer = () => {

  /*  if (clockAudio.value == null) {
 
     clockAudio.value = new Sonidos('tictocEditado', true)
     clockAudio.value.playAudio()
 
   } else {
     clockAudio.value.stopAudio()
   } */



  timerInterval.value = setInterval(() => {
    timePassed.value = timePassed.value += 1;
    timeLeft.value = TIME_LIMIT - timePassed.value;
    emit('tiempoActual',timeLeft.value)
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft.value
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft.value);

    if (timeLeft.value === 0) {
      //sonidoReloj.stopAudio()
      onTimesUp();
    }
  }, 1000);
}

const stopTimer = () => {
   clearInterval(timerInterval.value);
}


const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
  return `${minutes}:${seconds}`;
}




const setRemainingPathColor = (timeLeft) => {

  /*  if (timeLeft <= COLOR_CODES.alert.threshold) {
     document
       .getElementById("base-timer-path-remaining")
       .classList.remove(COLOR_CODES.warning.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.add(COLOR_CODES.alert.color);
   } else if (timeLeft <= COLOR_CODES.warning.threshold) {
     document
       .getElementById("base-timer-path-remaining")
       .classList.remove(COLOR_CODES.info.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.add(COLOR_CODES.warning.color);
   } */
}



const calculateTimeFraction = () => {
  const rawTimeFraction = timeLeft.value / TIME_LIMIT.value;
  return rawTimeFraction - (1 / TIME_LIMIT.value) * (1 - rawTimeFraction);
}

const setCircleDasharray = () => {
  circleDasharray.value = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY.value
  ).toFixed(0)} 283`;
  /*   document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray); */
}


onUnmounted(() => {
  clearInterval(timerInterval.value);
  if (clockAudio.value != null) {
    clockAudio.value.stopAudio()
    clockAudio.value = null
    /* document.getElementById("base-timer-label").style.animation = 'none' */
  }
})

</script>

<style lang="css" scoped>
/* Cronometro */
.base-timer {
  position: absolute;
  width: 150px;
  height: 150px;
  top: -18px;
  right: 0rem;
  float: right;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  font-family: Source Sans pro;
  left: 50%;
  transform: translate(-50%, -50%);
}

.animate_blinks {
  animation: bliks 1s infinite
}

@keyframes bliks {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0
  }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .base-timer__label {
    top: 35%;
    font-size: 2em;
    left: 68%;
    transform: translate(-50%, -50%);
  }
}
</style>