import {createApp} from 'vue'
import '@/style.css'
import App from '@/App.vue'
import {router} from '@/routers'
import {createPinia} from "pinia";

const app = createApp(App)

const pinia = createPinia()
app.use(router).use(pinia).mount('#app')
