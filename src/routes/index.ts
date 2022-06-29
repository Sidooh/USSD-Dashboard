import {createRouter, createWebHistory} from "vue-router";
import {defineAsyncComponent} from "vue";
import {useAuthStore} from "../stores/auth";

const Home = () => import("../pages/Home.vue")
const Sessions = () => import("../pages/Sessions.vue")

const Login = () => import("../pages/Login.vue")
const Auth = defineAsyncComponent(() => import("../components/layout/Auth.vue"))

const StatusPage = {template: '<div>Alive!!</div>'}


const routes = [

    {path: '/', component: Home},
    {path: '/sessions', component: Sessions},

    {path: '/login', component: Login, meta: {layout: Auth, guest: true}, name: 'login'},

    // Status check
    {path: '/__vite_ping', component: StatusPage, meta: {layout: Auth, guest: true}, name: 'status.ping'},

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (!authStore.token && !to.meta.guest) return '/login'
})

export default router