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
        { path: '/login', component: Login, meta: { layout: Auth }, name: 'login' },

        { path: '/', name: 'dashboard', meta: { auth: true }, component: () => import("./pages/dashboard/Index.vue") },
        {
            path: '/sessions', meta: { auth: true }, children: [
                { path: '', name: 'sessions', component: () => import("./pages/sessions/Index.vue") },
                { path: ':id', name: 'sessions.show', component: () => import("./pages/sessions/Show.vue") }
            ]
        },

        // Status check
        { path: '/__vite_ping', component: StatusPage, meta: { layout: Auth }, name: 'status.ping' },

        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: () => ({ name: 'dashboard' })
        },
    ]
})

router.beforeEach((to, from, next) => {
    const { token } = useAuthStore()

    if (!token && to.meta.auth) {
        localStorage.setItem('urlIntended', to.path)

        next({ name: 'login' });
    } else if (!to.meta.auth && token) {
        next({ name: 'dashboard' });
    } else {
        next()
    }
})

export default router