import{_ as x,r as e,b as f,c as B,C as F,D as M,e as y,f as I,g as s,h as m,q as O,v as $,p as A,i as N,u as H,a as V,o as P,s as w,n as C,t as S,y as z}from"./index.e25269cb.js";const U=a=>(A("data-v-6962d5bc"),a=a(),N(),a),G={id:"cronometro"},q={class:"base-timer"},W={class:"base-timer__svg",viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg"},Y={class:"base-timer__circle"},J=U(()=>s("circle",{class:"base-timer__path-elapsed",cx:"50",cy:"50",r:"45"},null,-1)),K=["stroke-dasharray"],Q={id:"base-timer-label",class:"base-timer__label"},X={props:{segundos:{type:Number,default:10},reiniciar:{type:Boolean,default:!1}},emits:["endTime"],setup(a,{emit:l}){const _=a,p=e(283),c=e(10),i=e(5),d=e(null),t=f({info:{color:"green"},warning:{color:"orange",threshold:c},alert:{color:"red",threshold:i}}),o=_.segundos;let u=e(0),r=e(o),g=e(null),k=e(t.info.color),b=e(null);B(()=>{L()}),F(_.reiniciar,(n,h)=>{});const E=()=>{clearInterval(g.value),document.getElementById("base-timer-label").style.animation="none",l("endTime")},L=()=>{g.value=setInterval(()=>{u.value=u.value+=1,r.value=o-u.value,document.getElementById("base-timer-label").innerHTML=T(r.value),D(),R(r.value),r.value===0&&E()},1e3)},T=n=>{const h=Math.floor(n/60);let v=n%60;return v<10&&(v=`0${v}`),`${h}:${v}`},R=n=>{n<=t.alert.threshold?(document.getElementById("base-timer-path-remaining").classList.remove(t.warning.color),document.getElementById("base-timer-path-remaining").classList.add(t.alert.color)):n<=t.warning.threshold&&(document.getElementById("base-timer-path-remaining").classList.remove(t.info.color),document.getElementById("base-timer-path-remaining").classList.add(t.warning.color))},j=()=>{const n=r.value/o.value;return n-1/o.value*(1-n)},D=()=>{b.value=`${(j()*p.value).toFixed(0)} 283`};return M(()=>{clearInterval(g.value),d.value!=null&&(d.value.stopAudio(),d.value=null)}),(n,h)=>(y(),I("div",G,[s("div",q,[(y(),I("svg",W,[s("g",Y,[J,s("path",{id:"base-timer-path-remaining","stroke-dasharray":m(b),class:O(["base-timer__path-remaining",m(k)]),d:`\r
          M 50, 50\r
          m -45, 0\r
          a 45,45 0 1,0 90,0\r
          a 45,45 0 1,0 -90,0\r
        `},null,10,K)])])),s("span",Q,$(T(m(r))),1)])]))}};var le=x(X,[["__scopeId","data-v-6962d5bc"]]),Z="/assets/marco_nivel_1.126683c0.png",ee="/assets/marco_nivel_2.1378fd7a.png";const ae=a=>(A("data-v-fd4d199c"),a=a(),N(),a),te={class:"ventana-mensaje-puntos flex-center-elements-column gap-2 padding-2"},ne={class:"info-mensaje"},se=ae(()=>s("span",null," Nivel ",-1)),oe={class:"mensaje-opcion"},ie={props:{urlImagenFondo:{type:String,default:"marco_nivel_1"}},emits:["finAnimacionIntroNivel","configuraActividad"],setup(a,{emit:l}){const _=H(),p=V(),c=e(0),i=e("");P(()=>{w(".ventana-mensaje-puntos","jackInTheBox").then(o=>{setTimeout(()=>{w(".ventana-mensaje-puntos","bounceOutRight").then(u=>{l("finAnimacionIntroNivel")})},2400)})}),B(()=>{p.actividadActual.includes(_.currentRoute.value.path)?(c.value=2,i.value=ee,l("configuraActividad",2)):(c.value=1,i.value=Z,l("configuraActividad",1)),t.backgroundImage=`url(${i.value})`});const d=f({width:"80%",height:"30vh",display:"grid",gridTemplateColumns:"1fr 1fr",gridGap:"10vh",placeContent:"center",alignItems:"center"}),t=f({display:"flex",flexDirection:"column",width:"56vw",height:"49vh",backgroundImage:`url(${i.value}.png)`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"100% 100%"});return(o,u)=>(y(),I("div",te,[s("div",{style:C(m(t)),class:"flex-center-elements-column gap-1 animate__animated animate__heartBeat animate__slow animate__delay-2s",id:"simulate-click"},[s("div",{style:C(m(d))},[s("div",ne,[S(o.$slots,"mensaje-respuestas",{},()=>[se],!0)]),s("div",oe,[S(o.$slots,"mensaje-nivel",{},()=>[z($(c.value),1)],!0)])],4)],4)]))}};var ce=x(ie,[["__scopeId","data-v-fd4d199c"]]);export{le as C,ce as V};