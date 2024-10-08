import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// axios.interceptors.request.use(
//     config => {
//         config.headers?.authorization = "Bearer " + useAuthStore().token
//         return config;
//     },
//     error => Promise.reject(error)
// );

axios.interceptors.response.use(
    (response) => {
        if (response.data && response.data.errors) {
            return Promise.reject(response.data);
        }
        return response;
    },
    async (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore();

                authStore.logout();
            }
        }

        return Promise.reject(error);
    }
);

axios.defaults.baseURL = import.meta.env.VITE_ACCOUNTS_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const accountsClient = axios.create({
    baseURL: import.meta.env.VITE_ACCOUNTS_API_URL,
});

export const ussdClient = axios.create({
    baseURL: import.meta.env.VITE_USSD_API_URL,
});
