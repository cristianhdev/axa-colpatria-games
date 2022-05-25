<template>
    <div
        class="ventana-mensaje-puntos center-element  flex-center-elements-column gap-2 padding-2 animate__animated animate__fadeIn">
        <div class="button">Click me!</div>
        <div class="contenedor-mensaje flex-center-elements-column gap-1" id="simulate-click">
            <div class="contenedor-puntos-buenos flex-center-elements-column gap-2">
                <slot name="puntos-buenos">

                </slot>
            </div>
            <div class="contenedor-mensajes">
                <div class="info-mensaje">
                    <slot name="mensaje-respuestas">

                    </slot>
                </div>
                <div class="mensaje-opcion">
                    <slot name="mensaje-opcion">
                        <h1>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad repudiandae, quos, dolores
                            pariatur
                            vero
                            accusantium ut doloremque ratione sint soluta, recusandae porro possimus modi distinctio
                            minus
                            placeat?
                            Incidunt, exercitationem cumque?
                        </h1>
                    </slot>
                </div>
            </div>
            <!-- comentario para subir archivo actualizado -->
            <div class="auto flex-center-elements-row gap-2" style="text-align:center">
                <slot name="botones">

                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import party from "party-js";


const ventanaClick = ref(null)


onMounted(() => {
    //party debug
    /*  party.settings.debug = true; */
    /*  document.querySelector('#simulate-click').addEventListener("mousemove", function (e) {
         e.preventDefault();
         party.confetti(e);
     }); */
  /*   document.querySelector(".button").addEventListener("click",  (e) => {
        
        party.confetti(this);
    });
    setInterval(() => {
        document.querySelector(".button").click();
    }, 8000); */
});




onBeforeMount(() => {

});


const confity = (e) => {
    party.confetti(this);
}




const emit = defineEmits(['continuarTriviaEvent', 'volverEscenarioEvent'])





const continuarTrivia = () => {
    emit('continuarTriviaEvent')
}

const volverEscenario = () => {
    emit('volverEscenarioEvent')
}

</script>

<style lang="css" scoped>
.button {
    visibility: visible
}

.info-mensaje {
    font-size: 1.8em;
    color: #f0ff93;
    font-family: Source Sans Pro
}

.mensaje-opcion {
    font-size: 6em;
    color: white;
    height: inherit;
    font-family: Publico Banner-Bold
}

.contenedor-puntos-buenos {
    width: 23vw;
    height: 23vh;
    background: transparent url(@/assets/img/Puntos.png) no-repeat center center;
    background-size: contain;
    position: absolute;
    top: 8%;
    font-size: 8em;
    color: var(--blanco);
}

.ventana-mensaje-puntos {
    width: 100vw;
    height: 100vh;
    z-index: 99999999999999;
    text-align: center;
    background: transparent url(@/assets/img/fondoPantallaFinalPuntos.png) no-repeat center center;
    background-size: 100% 100%;
}

.contenedor-mensajes {
    width: 100%;
    height: 37%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    grid-gap: 10vh;
    margin-bottom: 9vh;
    margin-top: 12vh;
}

.contenedor-mensaje {
    display: flex;
    flex-direction: column;
    width: 56vw;
    height: 60vh;
    background: transparent url(@/assets/img/fondoPuntos.png) no-repeat center center;
    background-size: 100% 100%;

}
</style>