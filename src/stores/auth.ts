import {defineStore} from "pinia";
import axios from "axios";
import {accountsClient} from "@/utils/clients";
import { JWT } from "@nabcellent/sui-vue";
import moment from "moment";
import router from "@/router";
import { logger } from "@/utils/logger";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: <string | null>null,
        user: {}
    }),

    actions: {
        async authenticate(email: string, password: string) {
            try {
                const data = await accountsClient.post("users/signin", {
                    email,
                    password
                })

                this.token = data.data.access_token
                this.user = {
                    token: data.data.access_token
                }

                localStorage.setItem("token", data.data.access_token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;
            } catch (error: any) {
                if (error?.response?.status === 400 && error.response.data) {
                    throw new Error(error.response.data.errors[0].message)
                }
                throw new Error(error.message)
            }
        },

        checkLocalAuth() {
            this.token = localStorage.getItem("token")
            this.user = JSON.parse(String(localStorage.getItem("user")))

            if(this.token) {
                const tokenData = JWT.decode(this.token)
                const expiresIn = moment.unix(tokenData.exp).diff(moment(), 'minutes');

                logger.log(`Session expires in: ${expiresIn} minutes`);

                if (moment.unix(tokenData.exp).isBefore(moment())) this.logout()
            }
        },

        logout() {
            this.$reset()

            localStorage.removeItem('token')

            router.push({ name: 'login' })
        }
    }
})