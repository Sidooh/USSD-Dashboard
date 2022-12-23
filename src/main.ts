import { createApp } from 'vue'

//modules
import { createPinia } from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./router"
import { useAuthStore } from "./stores/auth"

import 'bootstrap/dist/js/bootstrap.min.js'

//initialize
createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token
