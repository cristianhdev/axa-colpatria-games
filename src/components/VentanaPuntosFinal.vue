<template>
    <div>
        <div class="emulate-confetti-1-pantantalla-puntos">

        </div>
        <div class="emulate-confetti-2-pantantalla-puntos">

        </div>

        <div
            class="ventana-mensaje-puntos center-element  flex-center-elements-column gap-2 padding-2 animate__animated animate__fadeIn">

            <div class="contenedor-central flex-center-elements-column " id="simulate-click">
                <div style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: baseline;grid-gap: 59px;">
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
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad repudiandae, quos,
                                    dolores
                                    pariatur
                                    vero
                                    accusantium ut doloremque ratione sint soluta, recusandae porro possimus modi
                                    distinctio
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

        </div>
        <div class="button">Click me!</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch, onBeforeUnmount } from "vue";
import party from "party-js";


const ventanaClick = ref(null)
const timeclick = ref(null)



onMounted(() => {
    //party debug
    document.querySelector(".button").addEventListener("click", confetti);



    /*  document.querySelector(".emulate-confetti-2").addEventListener("click", (e) => {
         party.confetti(e.target);
     });
  */
    timeclick.value = setInterval(() => {
        document.querySelector(".button").click();
    }, 4500);

    /*  setInterval(() => {
         document.querySelector(".emulate-confetti-2").click();
     }, 4500); */
});

const confetti = (e) => {
    party.sparkles(e.target);
}


onBeforeMount(() => {

});






const emit = defineEmits(['continuarTriviaEvent', 'volverEscenarioEvent'])





const continuarTrivia = () => {
    emit('continuarTriviaEvent')
}

const volverEscenario = () => {
    emit('volverEscenarioEvent')
}


onBeforeUnmount(() => {
    document.querySelector(".button").removeEventListener("click", confetti)
    if (timeclick.value != null) {
        clearInterval(timeclick.value);
    }

});

</script>

<style lang="css" scoped>
.button {
    visibility: hidden
}

.info-mensaje {
    font-size: 1.8em;
    color: black;
    font-family: Source Sans Pro
}

.mensaje-opcion {
    font-size: 1.5em;
    color: black;
    height: inherit;
    font-family: Publico Banner
}

.contenedor-puntos-buenos {
    width: 100%;
    height: 14vh;
    font-size: 3.4em;
    color: var(--blanco);
    font-family: Publico Banner;
    background-color: var(--azul-axa);
    border-top-left-radius: 12px;
    overflow: hidden;
    border-top-right-radius: 12px;
}

.ventana-mensaje-puntos {
    width: 100vw;
    height: 100vh;
    z-index: 9;
    text-align: center;
    background: transparent url(@/assets/img/fondoEscenario.png) no-repeat center center;
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
    grid-gap: 3vh;
}





.emulate-confetti-1-pantantalla-puntos {
    position: absolute;
    top: 10px;
    border: 2px solid red
}

.emulate-confetti-2-pantantalla-puntos {
    position: absolute;
    top: 10px;
    right: 0px;
    border: 2px solid red
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .mensaje-opcion {
        font-size: 1.5em;
        color: white;
        height: inherit;
        font-family: Publico Banner
    }

    .contenedor-mensajes {
        height: 16%;
       /*  margin-top: 22vh; */
    }

    .contenedor-mensaje {
        height: 15rem;
    }
    

    .mensaje-opcion {
        font-size: 1.5em;
    }

    .info-mensaje {
        font-size: 1.8em;
    }

    .contenedor-puntos-buenos {
        top: 11%;
        font-size: 4em;
        height: 26vh;
    }
}
</style>