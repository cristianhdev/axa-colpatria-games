import{_ as f,r as _,a as C,k as y,u as b,c as k,o as g,e as a,f as e,l as w,w as r,V as x,m,h as o,g as t,j as S,q as V,s as I,p as B,i as N}from"./index.e25269cb.js";import"./index.0ce6332d.js";import O from"./CamaraWeb.a6e08b2d.js";import"./_commonjsHelpers.b8add541.js";var R="/assets/camarawebImagen.b93d623a.png";const q=s=>(B("data-v-2b7378a9"),s=s(),N(),s),A={class:"container"},E={key:0,src:R,alt:"",width:"240"},L={key:0,class:"contenedor-camara"},M={key:1},$=q(()=>t("h2",null,"Permitir el acceso a la c\xE1mara web.",-1)),j=[$],z={key:0,class:"flex-center-elements-row gap-3"},P={key:1},T={setup(s){const i=_(!1),u=_(!0),c=C(),n=y(()=>c.isCamara),p=b();k(()=>{}),g(()=>{});const v=()=>{i.value=!0},d=()=>{I(".ventana-usuario","fadeOut").then(h=>{p.push("/Escenario"),document.querySelector(".ventana-usuario").style.display="none"})};return(h,l)=>(a(),e("div",A,[u.value?(a(),w(x,{key:0,sliderActive:!1},{titulo:r(()=>[o(n)?m("",!0):(a(),e("img",E))]),texto:r(()=>[o(n)?(a(),e("div",L,[t("div",null,[S(O,{width:200,height:200,onCamaraLoad:v})])])):(a(),e("div",M,j))]),"button-ventana":r(()=>[o(n)?(a(),e("div",P,[t("div",{class:V([{"disable-button":!i.value},"btn-primary-vr1 flex-center-elements-row gap-3"]),onClick:d}," CONTINUAR ",2)])):(a(),e("div",z,[t("div",{class:"btn-primary-vr1",onClick:l[0]||(l[0]=U=>o(c).habilitarCamara())},"SI"),t("div",{class:"btn-primary-vr1",onClick:d},"NO")]))]),_:1})):m("",!0)]))}};var H=f(T,[["__scopeId","data-v-2b7378a9"]]);export{H as default};