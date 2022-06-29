import {defineStore} from "pinia";
import {ussdClient} from "../helpers/clients";

export const useSessionsStore = defineStore("sessions", {
    state: () => ({
        sessions: <[]>[],
    }),

    actions: {
        async fetchSessions() {

            console.log('fetch sessions')
            try {
                const data = await ussdClient.get('/sessions/logs')
                this.sessions = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})