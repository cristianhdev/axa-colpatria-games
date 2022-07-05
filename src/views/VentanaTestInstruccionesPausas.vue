<template>
    <div>
        <InstruccionesPausas>
            <template #texto-instrucciones>
                <div>
                    <img src="@/assets/img/mensaje.png" width="580" alt="">
                </div>
                <div class="contenedor-ejercicio-pausas  gap-1">

                    <div>
                        <div class="titulo-instrucciones-pausas auto">
                            <div>Instrucciones</div>
                        </div>
                        <div>
                            <h2>Eos et et repudiandae nostrum omnis rem magni quis. Et id consequuntur ut et sequi
                                numquam veritatis sint. Distinctio blanditiis est magni dolore.</h2>
                        </div>

                    </div>
                    <div>
                        <img src="@/assets/img/Ejercicio1.png" alt="">
                    </div>

                </div>
            </template>
        </InstruccionesPausas>
    </div>
</template>

<script setup>
import InstruccionesPausas from "@/components/InstruccionesPausas.vue";
</script>

<style lang="css" scoped>
.contenedor-ejercicio-pausas {
    display: grid;
    grid-template-columns: 2fr 1fr;
    place-content: center;
    place-items: center;
    width: 61vw;
    margin: 0px auto;
}

.titulo {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    color: white;
    font-weight: normal;
}

.titulo-instrucciones-pausas {
    width: 80%;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 1.5em;
    color: black;
    font-weight: bold;
}

h2 {
    color: black;
    text-align: left;
}
</style>