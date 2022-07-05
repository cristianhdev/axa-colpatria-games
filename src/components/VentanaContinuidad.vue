<template>
    <div class="
      ventana-usuario
      center-element
      flex-center-elements-column
      animate__animated animate__fadeIn animate__slow animate__delay_5s
    ">
        <div>
            <div class="contenedor-central pantalla-presentacion-continuidad">
                <div class="responsive-img auto">
                    <img src="@/assets/img/interrogante-icono.png" alt="">
                </div>
                <div class="title"> ¿Desea continuar con el avance guardado?</div>
                <div>
                    <div class="flex-center-elements-row gap-3">
                        <div class="btn-primary" @click="openFullscreen('si')"> SI </div>
                        <div class="btn-primary" @click="openFullscreen('no')"> NO </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "../stores/config.js";
const config = useConfigStore();
const router = useRouter()

const openFullscreen = (desicion) => {

    if (desicion == 'si') {
        router.push(`/Escenario`);
    } else {
        /* config.setPosicionActualUsuario(0)
        config.setPosicionActualActividades(0)
        config.reiniciarActividadActual([])
        config.setReiniciarActividadesCompletadas([]) */
        config.reiniciarTodo()
        router.push(`/Escenario`);
    }

    /* var targetelement = document.documentElement;

    if (targetelement.requestFullscreen) {
        targetelement.requestFullscreen();
    } */
   /*  if (targetelement.webkitRequestFullscreen) {
        targetelement.webkitRequestFullscreen();
    }
    if (targetelement.mozRequestFullScreen) {
        targetelement.mozRequestFullScreen();
    }
    if (targetelement.msRequestFullscreen) {
        targetelement.msRequestFullscreen();
    } */
    
}


</script>

<style lang="css" scoped>
.ventana-usuario {
    width: auto;
    height: 100vh;
    border-radius: 23px;
    padding: 23px;
    z-index: 999999;
}

.title {
    width: 70%;
    text-align: center;
    color: black;
    font-family: Source Sans Pro;
    font-size: var(--h2-title-size);
    font-weight: normal;
}

p {
    font-family: 'Publico Banner, SourceSansProLightItalic, Arial, Georgia, Sans Serif, Serif';
}

.button {
    text-align: center;
}


.responsive-img {
    text-align: center
}

.responsive-img img {
    width: 50%;
    object-fit: cover;
    height: auto
}

.pantalla-presentacion-continuidad{
    display:flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-around
}

/* 
  ##Device = Desktops
  ##Screen = 1281px to higher resolution desktops
*/

@media (min-width: 1281px) {

    /* CSS */
    /* .container-ruleta {
        border: 4px solid rgb(20, 196, 49)
    } */



}

/* 
  ##Device = Laptops, Desktops
  ##Screen = B/w 1025px to 1280px
*/

@media (min-width: 1025px) and (max-width: 1280px) {

    /* CSS */
    /*   .container-ruleta {
        border: 3px solid blue
    } */
}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {

    /* CSS */
    /*   .container-ruleta {
        border: 3px solid red
    } */



}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .ventana-usuario {
        width: 100vw;
        padding: 0px
    }

    .responsive-img {
        text-align: center
    }

    .responsive-img img {
        width: 40%;
        object-fit: cover;
        height: auto
    }

    .title {
        font-size:1em
    }

}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {

    /* CSS */
    /*  .container-ruleta {
        border: 3px solid purple
    } */

}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {

    /* CSS */
    /* .container-ruleta {
        border: 3px solid teal
    } */


}
</style>
