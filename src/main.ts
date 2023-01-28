import { createApp } from 'vue'

//modules
import { createPinia } from "pinia"
import axios from "axios"

//component
import App from './App.vue'
import router from "./router"
import { useAuthStore } from "./stores/auth"
import { defaultConfig, plugin } from "@formkit/vue";

import 'bootstrap/dist/js/bootstrap.min.js'
import '@nabcellent/sui-vue/dist/style.min.css'

//initialize
createApp(App)
    .use(router)
    .use(createPinia())
    .use(plugin, defaultConfig())
    .mount('#app')

axios.defaults.headers.common['Authorization'] = "Bearer " + useAuthStore().token
