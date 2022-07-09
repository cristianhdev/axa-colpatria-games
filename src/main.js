import { createApp } from 'vue'
import { createPinia } from 'pinia'
/* import piniaPersist from 'pinia-plugin-persist' */
import Popper from "vue3-popper";
import piniaPersist from 'pinia-plugin-persistedstate'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue'
import router from './router'



const pinia = createPinia()




pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Popper)
app.use(VueToast)
app.mount('#app')
/* let instance = app.$toast.open('You did it!');

// Force dismiss specific toast
instance.dismiss();
// Dismiss all opened toast immediately
app.$toast.clear(); */