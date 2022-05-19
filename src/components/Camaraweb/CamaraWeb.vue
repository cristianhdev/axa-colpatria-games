<template>
    <div>
        <div id="video" class="video-wrap">
            <video ref="video" id="video" playsinline autoplay></video>
        </div>
         <div>
            <canvas id="canvas" width="640" height="480"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount, watch } from "vue";
import Handsfree from 'handsfree'

const handsfree = ref(null)

const video = ref(null)


onBeforeMount(() => {

   /*  const handsfree = new Handsfree({ pose: true })
    handsfree.start() */

    /*   const handsfree = new Handsfree({ showDebug: true, hands: true })
      handsfree.start() */

    /* const hands = new Handsfree({
        showDebug: true,
        $id: document.getElementById('video'),
        // Use the hand model with custom config
        hands: {
            // Always make sure to enable them
            enabled: true,


            // Let's track up to 4 hands. It's best to be kind and ask permission first tho!
            maxNumHands: 4,
            // Minimum confidence [0 - 1] for a hand to be considered detected
            minDetectionConfidence: 0.5,

            // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
            // Higher values are more robust at the expense of higher latency
            minTrackingConfidence: 0.5
        }
    })

    hands.start() */

    // Let's create a plugin called "logger" to console.log the data
    //handsfree.use('logger', async (data) => {
    // I like to always bail if there's no data,
    // which might happen if you swap out hands for the face later on


    /*  try {
         if (data.hands) {
             const { pinchState } = data.hands
             console.log('Izquierda',Object.values(pinchState)[0])
             console.log('Derecha',Object.values(pinchState)[1])
         }
     } catch (err) {
         console.error(err); // TypeError: failed to fetch
     } */

    // Log the data  




    // Do something if we are pinching with left [0] pinky [3]
    /*  if (pinchState[0][3] === 'held') {
         console.log('pinching with left pinky')
     } */
    //})


})

onMounted(() => {





})


const config = defineProps({
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



const constraints = ref({
    audio: config.audio,
    video: {
        width: config.width, height: config.height
    }
})


const init = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
        handleSuccess(stream);
    } catch (e) {
        //errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
        console.log(`navigator.getUserMedia error:${e.toString()}`)
    }
}

const handleSuccess = (stream) => {
    window.stream = stream;
    video.value.srcObject = stream;
}

onMounted(() => {
    init()
})

</script>

<style lang="scss" scoped>
</style>