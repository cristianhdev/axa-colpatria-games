var o=Object.defineProperty;var u=(a,i,s)=>i in a?o(a,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[i]=s;var t=(a,i,s)=>(u(a,typeof i!="symbol"?i+"":i,s),s);class d{constructor(i){t(this,"audio");t(this,"audioOvers");t(this,"audioOversMenu");t(this,"path_sound","./src/sounds/");t(this,"sonido");t(this,"isFinalizado",!1);t(this,"isPlaying",!1);t(this,"isPlayingFondo",!1);this.sonido=i,this.cargarAudio(i)}cargarAudio(i){i.includes("/")?this.audio=new Audio(`${this.path_sound}${i}${this.sonido}.mp3`):this.audio=new Audio(`${this.path_sound}${this.sonido}.mp3`)}playAudio(i,s){this.audio.loop=s,this.audio.autoplay=!1,this.audio.muted=!0,this.audio.volume=.2,this.isPlaying=!0,this.audio.addEventListener("canplaythrough",()=>{this.audio.muted=!1,this.audio.play()}),this.audio.addEventListener("ended",()=>{this.isFinalizado=!0,i!=null&&(i(),this.isPlaying=!1)})}playAudioFondo(){this.audio.loop=!0,this.audio.muted=!1,this.audio.play(),this.isPlayingFondo=!0}silenciarAudioParlante(){this.audio.muted=!this.audio.muted,this.audio.muted?document.querySelector("#imagen-audio").setAttribute("src","./assets/animaciones/parlanteOff.gif"):document.querySelector("#imagen-audio").setAttribute("src","./assets/animaciones/parlanteOn.gif")}stopAudio(){this.audio.muted=!this.audio.muted,this.audio.currentTime=0}pauseAudio(){this.audio!=null&&this.audio.pause()}getIntance(){return this.audio}getFinalizado(){return this.isFinalizado}getPlayingFondo(){return this.isPlayingFondo}getPlaying(){return this.isPlaying}getCurrentTimeAudio(){if(this.audio!=null)return Math.floor(this.audio.currentTime)}changeSound(i){this.audio.src=`${this.path_sound}${i}.mp3`,this.audio.pause(),this.audio.load(),this.audio.play()}destroy(){this.audio=null}}export{d as S};
