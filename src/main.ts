import {createApp} from 'vue'

//modules
import {createPinia} from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./routes"
import {useAuthStore} from "./stores/auth"

const pinia = createPinia()


//initialize
const app = createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token
