import { createApp } from 'vue'
import { createPinia } from 'pinia'
/* import piniaPersist from 'pinia-plugin-persist' */

import piniaPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()


/* if(localStorage.getItem('configState')){
    pinia.state.value =  JSON.parse(localStore.getItem("configState"))
}

watch(
    () => pinia.state.value,
    (state) => {
        localStorage.setItem('configState',JSON.stringify(state))
    },
    {deep:true}
)
 */
pinia.use(piniaPersist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
