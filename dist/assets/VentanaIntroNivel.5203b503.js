import{_ as p,r as v,b as g,c as o,o as h,q as i,d as f,e as I,f as n,n as l,g as r,s as c,p as y,h as b,x as j}from"./index.bc17c826.js";var k="/assets/marco_nivel_1.126683c0.png",x="/assets/marco_nivel_2.1378fd7a.png";const N=e=>(y("data-v-fe8b6d10"),e=e(),b(),e),S={class:"ventana-mensaje-puntos flex-center-elements-column gap-2 padding-2"},B={class:"info-mensaje"},w=N(()=>n("span",null," Nivel ",-1)),C={class:"mensaje-opcion"},F=j(" 1 "),V={props:{urlImagenFondo:{type:String,default:"marco_nivel_1"}},emits:["finAnimacionIntroNivel"],setup(e,{emit:d}){const m=e,a=v("");g(()=>{m.urlImagenFondo==="marco_nivel_1"?a.value=k:a.value=x,s.backgroundImage=`url(${a.value})`});const _=o({width:"80%",height:"30vh",display:"grid",gridTemplateColumns:"1fr 1fr",gridGap:"10vh",placeContent:"center",alignItems:"center"}),s=o({display:"flex",flexDirection:"column",width:"56vw",height:"49vh",backgroundImage:`url(${a.value}.png)`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"100% 100%"});return h(()=>{i(".ventana-mensaje-puntos","jackInTheBox").then(t=>{setTimeout(()=>{i(".ventana-mensaje-puntos","bounceOutRight").then(u=>{d("finAnimacionIntroNivel")})},2400)})}),(t,u)=>(f(),I("div",S,[n("div",{style:l(r(s)),class:"flex-center-elements-column gap-1 animate__animated animate__heartBeat animate__slow animate__delay-2s",id:"simulate-click"},[n("div",{style:l(r(_))},[n("div",B,[c(t.$slots,"mensaje-respuestas",{},()=>[w],!0)]),n("div",C,[c(t.$slots,"mensaje-nivel",{},()=>[F],!0)])],4)],4)]))}};var $=p(V,[["__scopeId","data-v-fe8b6d10"]]);export{$ as V};