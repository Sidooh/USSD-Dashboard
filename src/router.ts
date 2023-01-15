import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import { useAuthStore } from "./stores/auth";

const Login = () => import("@/pages/auth/Login.vue")
const Auth = defineAsyncComponent(() => import("@/layouts/Auth.vue"))

const StatusPage = { template: '<div>Alive!!</div>' }

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, meta: { layout: Auth, guest: true }, name: 'login' },

        { path: '/', name: 'dashboard', component: () => import("./pages/dashboard/Index.vue") },
        {
            path: '/sessions', children: [
                { path: '', name: 'sessions', component: () => import("./pages/sessions/Index.vue") },
                { path: ':id', name: 'sessions.show', component: () => import("./pages/sessions/Show.vue") }
            ]
        },

        // Status check
        { path: '/__vite_ping', component: StatusPage, meta: { layout: Auth, guest: true }, name: 'status.ping' },

        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: () => ({ name: 'dashboard' })
        },
    ]
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (!authStore.token && !to.meta.guest) return '/login'
})

export default router