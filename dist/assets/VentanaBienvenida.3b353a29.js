import{_ as m,o as q,c as $,w as S,e as t,f as s,g as l,y as u,s as r,r as f,F as v,z as h,u as B,j as k,l as A,m as _,t as p}from"./index.dfc89264.js";import{a as E}from"./animations.6d71844d.js";const x={class:"sliders flex-center-elements-column animate__animated animate__fadeIn animate__slow"},N={class:"title"},b=r(" Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos. Numquam aut eum deleniti aut quam dolorem. Ratione distinctio dolorem id quia cupiditate eos. "),g=r(" Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos. Numquam aut eum deleniti aut quam dolorem. Ratione distinctio dolorem id quia cupiditate eos. "),w={props:{idslider:{type:Number,default:1},sliderActual:{type:Number,default:0}},setup(n){const o=n;return q(()=>{document.querySelectorAll(".sliders").forEach(e=>{e.style.display="none"}),document.querySelectorAll(".sliders")[0].style.display="block"}),$(()=>{}),S(()=>o.sliderActual,(e,a)=>{document.querySelectorAll(".sliders").forEach(d=>{d.style.display="none"}),document.querySelectorAll(".sliders")[e].style.display="block"}),(e,a)=>(t(),s("div",x,[l("h1",N,[u(e.$slots,"titulo",{},()=>[b],!0)]),l("p",null,[u(e.$slots,"texto",{},()=>[g],!0)])]))}};var C=m(w,[["__scopeId","data-v-b793956c"]]);const V={class:"flex-center-elements-row gap-3"},I=["onClick"],R={props:{numneroBotones:{type:Number,default:1}},setup(n){return f(0),(o,e)=>(t(),s("div",V,[(t(!0),s(v,null,h(n.numneroBotones,(a=0)=>(t(),s("div",{class:"items",key:a,onClick:d=>o.$emit("someEvent",a)},null,8,I))),128))]))}};var M=m(R,[["__scopeId","data-v-89476b92"]]);const F={class:"ventana-usuario center-element border-axa flex-center-elements-column animate__animated animate__fadeIn animate__slow animate__delay_5s"},O={key:0},j={class:"contenedor-central flex-center-elements-column gap-2"},z={class:"title"},D=r(" Eum nemo voluptas nemo ratione. Et quam est officia dolorem quos. Numquam aut eum deleniti aut quam dolorem. Ratione distinctio dolorem id quia cupiditate eos. "),L={class:"flex-center-elements-row gap-3"},T=r(" COMENZAR "),W={key:1},Z={props:{slider:Array,sliderActive:Boolean,ruta:{type:String,default:""}},setup(n){const o=n,e=B(),a=f(0),d=i=>{a.value=i-1},y=()=>{o.ruta!=""&&E(".ventana-usuario","fadeOut").then(i=>{e.push(`/${o.ruta}`),document.querySelector(".ventana-usuario").style.display="none"})};return(i,G)=>(t(),s("div",F,[n.sliderActive?(t(),s("div",W,[(t(!0),s(v,null,h(o.slider,c=>(t(),A(C,{sliderActual:a.value,key:c.id},{titulo:_(()=>[r(p(c.titulo),1)]),texto:_(()=>[r(p(c.texto),1)]),_:2},1032,["sliderActual"]))),128)),k(M,{onSomeEvent:d,numneroBotones:o.slider.length},null,8,["numneroBotones"])])):(t(),s("div",O,[l("div",j,[l("h1",z,[u(i.$slots,"titulo",{},void 0,!0)]),u(i.$slots,"texto",{},()=>[D],!0),l("div",{onClick:y},[l("div",L,[u(i.$slots,"button-ventana",{},()=>[T],!0)])])])]))]))}};var K=m(Z,[["__scopeId","data-v-76527043"]]);export{K as V};
