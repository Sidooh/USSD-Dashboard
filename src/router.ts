import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { useAuthStore } from "./stores/auth";

const Home = () => import("./pages/Home.vue")

const Login = () => import("@/pages/auth/Login.vue")
const Auth = defineAsyncComponent(() => import("@/layouts/Auth.vue"))

const StatusPage = { template: '<div>Alive!!</div>' }

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, meta: { layout: Auth, guest: true }, name: 'login' },

        { path: '/', component: Home },
        {
            path: '/sessions', children: [
                { path: '', name: 'sessions', component: () => import("./pages/sessions/Index.vue") },
                { path: ':id', name: 'sessions.show', component: () => import("./pages/sessions/Show.vue") }
            ]
        },

        // Status check
        { path: '/__vite_ping', component: StatusPage, meta: { layout: Auth, guest: true }, name: 'status.ping' },
    ]
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (!authStore.token && !to.meta.guest) return '/login'
})

export default router