<template>
    <div class="emulate-confetti-1">

    </div>
    <div class="emulate-confetti-2">

    </div>
    <div class="contenedor-actividad">
        <div>
            <div class="contenedor-barras-personaje  center-element">
                <div class="personaje flex-center-elements-column">

                    <div class="flex-center-elements-row">
                        <img src="@/assets/img/personajeFinal.png" class="responsive" alt="">
                    </div>
                    <div class="asluz">

                    </div>

                </div>
                <div class="flex-center-elements-column">
                    
                    <div>
                        <h2>Tu balance {{usuario.nombreUsuario.toUpperCase()}}</h2>
                    </div>
                    <div class="flex-center-elements-column gap-4">
                        <div class="contenedor-iconos  gap-2">
                            <div class="icono-salud">

                            </div>
                            <div class="icono-estres">

                            </div>
                            <div class="icono-energia">

                            </div>
                        </div>
                        <div id="salud" class="flex-center-elements-row-nowrap gap-1">
                            <div>
                                Salud
                            </div>
                            <div class="contenedor-barras">

                                <div class="overlay">
                                    <div class="barra-salud">

                                    </div>
                                </div>

                            </div>

                        </div>
                        <div id="estres" class="flex-center-elements-row-nowrap gap-1">
                            <div>
                                Estrés
                            </div>
                            <div class="contenedor-barras">
                                <div class="overlay">
                                    <div class="barra-estres">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="energia" class="flex-center-elements-row-nowrap gap-1">
                            <div>
                                Energía
                            </div>
                            <div class="contenedor-barras">
                                <div class="overlay">
                                    <div class="barra-energia">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import gsap from "gsap";
import { ref, onMounted, onBeforeMount, computed, reactive } from "vue";
import party from "party-js";
import { useConfigStore } from "../stores/config.js";
const usuario = useConfigStore();

onMounted(() => {
    gsap.fromTo('.icono-energia', 1.4, { marginLeft: '7pc' }, { marginLeft: '80%', repeat: -1, repeatDelay: 1.3, yoyo: true, transformOrigin: 'center center' });
    gsap.fromTo('.icono-salud', 2.4, { marginLeft: '7pc' }, { marginLeft: '80%', repeat: -1, repeatDelay: 1.3, yoyo: true, transformOrigin: 'center center' });
    gsap.fromTo('.icono-estres', 1.8, { marginLeft: '7pc' }, { marginLeft: '80%', repeat: -1, repeatDelay: 1.3, yoyo: true, transformOrigin: 'center center' });

    document.querySelector(".emulate-confetti-1").addEventListener("click", (e) => {

        party.confetti(e.target);
    });

    document.querySelector(".emulate-confetti-2").addEventListener("click", (e) => {
        party.confetti(e.target);
    });

    setInterval(() => {
        document.querySelector(".emulate-confetti-1").click();
    }, 4500);

    setInterval(() => {
        document.querySelector(".emulate-confetti-2").click();
    }, 4500);

    document.querySelector(".icono-estres").addEventListener("mouseover", (e) => {

        party.sparkles(e);
    });

    document.querySelector(".icono-salud").addEventListener("mouseover", (e) => {

        party.sparkles(e);
    });

    document.querySelector(".icono-energia").addEventListener("mouseover", (e) => {

        party.sparkles(e);
    });

})


</script>

<style lang="css" scoped>
#salud,
#estres,
#energia {
    width: 28vw;
    border-radius: 23px;
    padding: 12px;
    background-color: #355F9E;
    color: #8fadd8;
    font-family: Source Sans Pro;
    font-size:1em
}

.asluz {
    position: absolute;
    bottom: 53px;
    left: 25px;
    width: 30vh;
    height: 38vh;
    background: transparent url(/src/assets/img/asluz.png) no-repeat center center;
    background-size: 100% 100%;
    opacity: 0.5;
    filter: blur(1px);
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoPantallaIntermedias.png');
    background-size: 100% 100%;
    font-family: Source Sans Pro;
}

.contenedor-barras-personaje {
    display: grid;
    grid-template-columns: 1fr 2fr;
    place-items: center;
    width: 56vw;
    height: 70vh;
    background: transparent url(@/assets/img/fondoPuntos.png) no-repeat center center;
    background-size: 100% 100%;
}

.emulate-confetti-1 {
    position: absolute;
    top: 10px;
}

.emulate-confetti-2 {
    position: absolute;
    top: 10px;
    right: 0px;
}



.contenedor-barras {
    overflow: hidden;
    width: 100%;
    height: 4vh;
}


.overlay {
    width: 100%;
}



.icono-salud {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoSalud.png) no-repeat center;
    background-size: cover;
    margin-left: 19%
}

.icono-estres {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoEstres.png) no-repeat center;
    background-size: cover;
    margin-left: 19%
}

.icono-energia {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoEnergia.png) no-repeat center;
    background-size: cover;
    margin-left: 19%;

}


.barra-salud {
    width: 100%;
    height: 4vh;
    background: transparent url(@/assets/img/barraSalud.png) repeat-x center;
    background-size: cover;
}


.barra-estres {
    width: 100%;
    height: 4vh;
    background: transparent url(@/assets/img/barraEstres.png) repeat-x center;
    background-size: cover;
}

.barra-energia {
    width: 100%;
    height: 4vh;
    background: transparent url(@/assets/img/barraEnergia.png) repeat-x center;
    background-size: cover;
}


.contenedor-iconos {
    display: flex;
    align-items: flex-start;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 57vh;
}

/*Barras de habilidad */

.responsive {
    width: 40vh;
    height: 80vh;
    position: absolute;
    top: -5pc;
    left: 0%;
}
</style>