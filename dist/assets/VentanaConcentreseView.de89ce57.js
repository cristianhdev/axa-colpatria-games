import{V as ne,C as ie}from"./VentanaIntroNivel.3803be96.js";import se from"./CamaraWeb.f07d19f2.js";import{_ as Q,r as e,w as le,D as re,e as n,f as l,p as W,i as X,g as o,u as ce,a as ue,k as J,b as de,l as T,q as f,m as me,V as ve,n as fe,h as P,j,F as $,z as G,A as H}from"./index.dfc89264.js";import"./index.0ce6332d.js";/* empty css                                                                       */import{I as g}from"./pregunta.4d0d1251.js";import{I as z,a as C,b as A,c as R}from"./Ejercicio4.41b89777.js";import{I as U,a as F}from"./Ejercicio6.7371a9a4.js";import"./anime.es.729cdde2.js";/* empty css                                                               */import"./animations.6d71844d.js";import"./_commonjsHelpers.b8add541.js";const ge=i=>(W("data-v-45c12cc5"),i=i(),X(),i),_e=["id"],pe=ge(()=>o("img",{id:"imagen",src:g,width:"120",height:"120",alt:""},null,-1)),he=[pe],Ie={props:{idItem:[Number,String],nombreItem:String,reiniciarFigura:{type:Boolean,default:!1},srcUrlImagen:{type:String,default:g},resultado:Array},emits:["clickItem"],setup(i,{emit:I}){const r=i;e(g);const x=e(!1),b=e([{imagen:z,id:1,finalizado:!1},{imagen:C,id:2,finalizado:!1},{imagen:A,id:3,finalizado:!1},{imagen:R,id:4,finalizado:!1},{imagen:U,id:5,finalizado:!1},{imagen:F,id:6,finalizado:!1}]);le(()=>r.resultado,(_,s)=>{console.log(_,s)}),re(()=>{console.log("Type: ",typeof r.resultado)});const h=()=>{let _=b.value.filter(s=>s.id==r.idItem);console.log(_[0].imagen),document.querySelector(`#${r.nombreItem} #imagen`).setAttribute("src",_[0].imagen),x.value=!0,I("clickItem",{id:r.idItem,nombre:r.nombreItem})};return(_,s)=>(n(),l("div",{onClick:h,class:"contenedor-item",id:`${i.nombreItem}`},he,8,_e))}};var K=Q(Ie,[["__scopeId","data-v-45c12cc5"]]);const w=i=>(W("data-v-240f2424"),i=i(),X(),i),be=w(()=>o("h2",null,"Para este ejercicio, debe estar de pie y en posici\xF3n erguida. Entrelace los dedos de sus manos atr\xE1s de su espalda (como se muestra en el ejemplo), realice respiraciones profundas llevando los codos hacia atr\xE1s al igual que los hombros. ",-1)),ye=w(()=>o("button",{class:"btn-primary-ghost"}," CONTINUAR",-1)),ze=[ye],Ce={class:"contenedor-actividad"},Ae={class:"contenedor-items center-element"},Se={key:0,class:"titulo auto"},ke=w(()=>o("h2",null,"Encuenta la pareja que corresponda",-1)),Ee=[ke],$e={key:0,class:"contenedor-ejercicio-realizado"},je=w(()=>o("div",{class:"auto"},[o("h2",null,"Ahora realiza el ejercicio.")],-1)),we={class:"flex-center-elements-row gap-3"},xe={class:"contenedor-ejercicios"},Be=["id","src"],Ve={key:0,class:"contenedor-ejercicios"},qe=["id","onClick","srcUrlImagen"],Ne=["id","onClick","srcUrlImagen"],Te={key:1,class:"auto flex-center-elements-row"},Re={setup(i){const I=ce(),r=ue(),x=J(()=>r.isCamara),b=e(!1),h=e(!0);e(!1),e(!1);const _=e(10);e(null),e(null);const s=e(0),S=e(0),m=e(""),v=e(""),k=e(""),E=e(""),B=e(""),y=e(!1),M=e(!1),L=e(g);e(!1);const V=e(!1);e(!1);const c=e([]),u=e([]);e([]);const q=de({width:"49%",height:"60vh",display:"grid",gridTemplateColumns:"repeat(3, 1fr)"});e(0);const Y=()=>{},Z=t=>{t==1?(c.value=[{nombre:"ImagenA1",imagen:z,id:1,finalizado:!1},{nombre:"ImagenA2",imagen:C,id:2,finalizado:!1},{nombre:"ImagenA3",imagen:A,id:3,finalizado:!1}],u.value=[{nombre:"ImagenB1",imagen:z,id:1,finalizado:!1},{nombre:"ImagenB2",imagen:C,id:2,finalizado:!1},{nombre:"ImagenB3",imagen:A,id:3,finalizado:!1}],c.value=c.value.sort(()=>Math.random()-.5),u.value=u.value.sort(()=>Math.random()-.5),q.gridTemplateColumns="repeat(3, 1fr)"):(c.value=[{imagen:z,id:1,finalizado:!1},{imagen:C,id:2,finalizado:!1},{imagen:A,id:3,finalizado:!1},{imagen:R,id:4,finalizado:!1},{imagen:U,id:5,finalizado:!1},{imagen:F,id:6,finalizado:!1}],u.value=[{imagen:z,id:1,finalizado:!1},{imagen:C,id:2,finalizado:!1},{imagen:A,id:3,finalizado:!1},{imagen:R,id:4,finalizado:!1},{imagen:U,id:5,finalizado:!1},{imagen:F,id:6,finalizado:!1}],c.value=c.value.sort(()=>Math.random()-.5),u.value=u.value.sort(()=>Math.random()-.5),q.gridTemplateColumns="repeat(4, 1fr)")},O=()=>{h.value=!h.value,b.value=!0},ee=()=>{b.value=!1},D=t=>{if(s.value==0?(m.value=t.nombre.substr(t.nombre.length-2,2),k.value=t.nombre,s.value=s.value+1):(v.value=t.nombre.substr(t.nombre.length-2,2),E.value=t.nombre,s.value=s.value+1,B.value=t.imagen),s.value==2){let p=m.value.substr(0,m.value.length-1),a=m.value.substr(1,m.value.length-1),d=v.value.substr(0,v.value.length-1),N=v.value.substr(1,v.value.length-1);p==="A"&&d==="B"||p==="B"&&d==="A"?a===N?(S.value=S.value+1,setTimeout(()=>{document.querySelector(`#${k.value}`).style.visibility="hidden",document.querySelector(`#${E.value}`).style.visibility="hidden",y.value=!0,V.value=!0,te(t.id)},1500),m.value="",v.value=""):(setTimeout(()=>{document.querySelector(`#${k.value} #imagen`).setAttribute("src",g),document.querySelector(`#${E.value} #imagen`).setAttribute("src",g)},1500),m.value="",v.value=""):(setTimeout(()=>{document.querySelector(`#${k.value} #imagen`).setAttribute("src",g),document.querySelector(`#${E.value} #imagen`).setAttribute("src",g)},1500),m.value="",v.value=""),s.value=0}},ae=()=>{y.value=!1,V.value=!1,S.value==3&&(M.value=!0)},te=t=>{let p=c.value.findIndex(d=>d.id==t),a=u.value.findIndex(d=>d.id==t);c.value[p].finalizado=!0,u.value[a].finalizado=!0,console.log(c),console.log(u)};J(()=>S.value);const oe=()=>{r.setActividadActual(I.currentRoute.value.path),h.value=!1,I.push("/Escenario")};return(t,p)=>(n(),l($,null,[b.value?(n(),T(ne,{key:0,onFinAnimacionIntroNivel:ee,onConfiguraActividad:Z,urlImagenFondo:"marco_nivel_1"})):f("",!0),h.value?(n(),T(ve,{key:1,onOcultarVentana:O},{texto:me(()=>[be,o("div",{class:"btn-jugar auto flex-center-elements-row gap-2",style:{"text-align":"center"},onClick:O},ze)]),_:1})):f("",!0),o("div",Ce,[V.value?(n(),T(ie,{key:0,segundos:_.value,onEndTime:ae},null,8,["segundos"])):f("",!0),o("div",Ae,[y.value?f("",!0):(n(),l("div",Se,Ee)),o("div",{style:fe(P(q)),class:"auto flex-center-elements-row gap-2"},[y.value?(n(),l("div",$e,[o("div",null,[je,o("div",we,[o("div",xe,[o("img",{id:B.value,src:B.value,alt:"",width:"285",height:"250"},null,8,Be)]),P(x)?(n(),l("div",Ve,[o("div",null,[j(se,{width:285,height:250,onCamaraLoad:Y})])])):f("",!0)])])])):f("",!0),y.value?f("",!0):(n(),l($,{key:1},[(n(!0),l($,null,G(c.value,(a,d)=>(n(),l("div",{class:H({desahbilitado:a.finalizado}),id:a.nombre,onClick:N=>D({id:a.id,nombre:a.nombre,imagen:a.imagen}),srcUrlImagen:L.value,key:d},[j(K,{idItem:a.id,nombreItem:a.nombre},null,8,["idItem","nombreItem"])],10,qe))),128)),(n(!0),l($,null,G(u.value,(a,d)=>(n(),l("div",{class:H({desahbilitado:a.finalizado}),id:a.nombre,onClick:N=>D({id:a.id,nombre:a.nombre,imagen:a.imagen}),srcUrlImagen:L.value,key:d},[j(K,{idItem:a.id,nombreItem:a.nombre},null,8,["idItem","nombreItem"])],10,Ne))),128))],64))],4),M.value?(n(),l("div",Te,[o("button",{class:"btn-primary-ghost",onMousemove:p[0]||(p[0]=(...a)=>t.confity&&t.confity(...a)),onClick:oe},"VOLVER A ESCENARIO",32)])):f("",!0)])])],64))}};var Ue=Q(Re,[["__scopeId","data-v-240f2424"]]);const Xe={setup(i){return(I,r)=>(n(),l("div",null,[j(Ue)]))}};export{Xe as default};
