import {defineStore} from "pinia";
import {ussdClient} from "../helpers/clients";

type Session = {
    id: string,
    session_id: string,
    phone: string,
    text: string,
    code?: string,
    status: string,
    product: number,
    created_at: Date,
    updated_at: Date,
    screen_path: Object,
    vars: Object
}

export const useSessionsStore = defineStore("sessions", {
    state: () => ({
        sessions: <Session[]>[],
        session: <Session>{}
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
        },

        async setSessionFromId(id: string) {
            if (this.sessions.length === 0) {
                await this.fetchSessions()
            }

            if (Object.keys(this.session).length === 0 || this.session.id !== id) {
                this.session = this.sessions.find((session: any) => session.id === id) || <Session>{}
            }
        }
    }
})