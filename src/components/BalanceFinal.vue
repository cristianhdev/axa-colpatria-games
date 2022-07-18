<template>
    <div class="emulate-confetti-1">

    </div>
    <div class="emulate-confetti-2">

    </div>
    <div class="contenedor-actividad">
        <div>
            <div class="contenedor-items-ventana-final center-element">
                <div class="personaje flex-center-elements-column">

                    <div class="flex-center-elements-row gap-3">
                        <img src="@/assets/img/personajeFinal.png" class="responsive-personaje" alt="">
                    </div>


                </div>
                <div class="flex-center-elements-column gap-4">

                    <div>
                        <div class="titulo">Balance de {{ usuario.nombreUsuario.toUpperCase() }}</div>
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
                <div class="auto">
                    <div class="btn-primary" @click="reiniciar">CONTINUAR</div>
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
import { useRouter, useRoute } from "vue-router";



const usuario = useConfigStore();
const router = useRouter()
const puntosFinalesActividad = ref(0)
const puntos_energia = ref(100)
const puntos_salud = ref(100)
const puntos_estres = ref(100)

onMounted(() => {
    let barraEnergia = document.querySelector('.barra-energia').getBoundingClientRect()

    puntosFinalesActividad.value = usuario.puntosGlobalesActividad

    if(puntosFinalesActividad.value<10){
        puntosFinalesActividad.value=puntosFinalesActividad.value * 10
    }


    puntos_energia.value = Math.round(puntos_energia.value - ((puntosFinalesActividad.value / 3) / 100) * 100 - 30)
    puntos_salud.value = Math.round(puntos_salud.value - ((puntosFinalesActividad.value / 3) / 100) * 100 - 15)
    puntos_estres.value = Math.round(puntos_estres.value - ((puntosFinalesActividad.value / 3) / 100) * 100 - 40)


    gsap.to('.icono-energia', 1.4, { marginLeft: `${puntos_energia.value}%`, repeat: 0, repeatDelay: 1.3, yoyo: true, transformOrigin: 'center center' });
    gsap.to('.icono-salud', 2.4, { marginLeft: `${puntos_salud.value}%`, repeat: 0, repeatDelay: 1.3, yoyo: false, transformOrigin: 'center center' });
    gsap.to('.icono-estres', 1.8, { marginLeft: `${puntos_estres.value}%`, repeat: 0, repeatDelay: 1.3, yoyo: false, transformOrigin: 'center center' });

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


const reiniciar = () => {
    usuario.reiniciarTodo()
    router.push('/')
}

</script>

<style lang="css" scoped>
.contenedor-items-ventana-final {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    place-items: center;
    width: 42vw;
    height: 546px;
    max-height: 610px;
    grid-gap: 24px;
    background-color: white;
    border-radius: 23px;
    filter: drop-shadow(2px 4px 6px black);
}

#salud,
#estres,
#energia {
    width: 28vw;
    border-radius: 23px;
    padding: 12px;
    background-color: #355F9E;
    color: #8fadd8;
    font-family: Source Sans Pro;
    font-size: 1em
}

.asluz {
    position: absolute;
    bottom: 8px;
    left: -119px;
    width: 27vh;
    height: 38vh;
    background: transparent url(/src/assets/img/asluz.png) no-repeat center center;
    background-size: 100% 100%;
    opacity: 0.5;
    filter: blur(1px);
}

.contenedor-actividad {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/fondoEscenario.png');
    background-size: cover;
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



/* background-image: url(/src/assets/img/fonto.png); background-repeat: no-repeat; background-size: contain; background-position: center center; */
;

.icono-salud {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoSalud.png) no-repeat center;
    background-size: contain;
    margin-left: 8%
}

.icono-estres {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoEstres.png) no-repeat center;
    background-size: contain;
    margin-left: 8%
}

.icono-energia {

    width: 13vh;
    height: 10vh;
    background: transparent url(@/assets/img/IconoEnergia.png) no-repeat center;
    background-size: contain;
    margin-left: 10%;

}


.barra-salud {
    width: 100%;
    height: 4vh;
    background-color: #df97ab;
    border-radius: 15px;
    /*  background: transparent url(@/assets/img/barraSalud.png) repeat-x center;
    background-size: cover; */
}


.barra-estres {
    width: 100%;
    height: 4vh;
    background-color: #3bbbcd;
    border-radius: 15px;
    /*  background: transparent url(@/assets/img/barraEstres.png) repeat-x center;
    background-size: cover; */
}

.barra-energia {
    width: 100%;
    height: 4vh;
    background-color: #a3d0b2;
    border-radius: 15px;
    /*  background: transparent url(@/assets/img/barraEnergia.png) repeat-x center;
    background-size: cover; */
}

.titulo {
    width: 100%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: black;
    font-weight: normal;
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

.responsive-personaje {
    width: 40%;
    position: absolute;
    top: 0pc;
    left: -24%;
}
</style>