<template>

    <div class="contenedor-instrucciones animate__animated animate__ animate__jackInTheBox">
        <div class="texto-instrucciones center-element">
            <div class="imagen-texto">
                <div class="texto">
                    <slot name="texto">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus illo odit eos porro
                            consectetur
                            ipsum, unde impedit id consequatur deserunt sint quidem laboriosam voluptatibus doloribus.</h2>
                    </slot>
                </div>
                <div class="imagen">
                    <img src="../img/Personajes.png" alt="" width="500">
                </div>
            </div>



            <div class="btn-jugar auto flex-center-elements-row gap-2" style="text-align:center">
                <button class="btn-primary" @click="continuarActividad">JUGAR</button>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['ocultarVentana'])

const continuarActividad = () => {
    emit('ocultarVentana')
}

</script>

<style lang="css" scoped>
.imagen-texto {
    display: grid;
    place-items: center;
    grid-template-columns: 3fr 1fr;
    align-items: center;
}

.btn-jugar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40vh, 30vh);
}

.texto-instrucciones {
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.texto-instrucciones div {
    text-align: left;
}

.texto {
    width: 39vw;
}

.contenedor-instrucciones {
    background: var(--azul-axa) url(/src/img/InstruccioneJuegos.png) no-repeat center center;
    background-size: cover;
    background-color: #18488c;
    width: 100vw;
    height: 105vh;
    position: absolute;
    z-index: 9999;
}

.imagen {}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>