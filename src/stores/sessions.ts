import {defineStore} from "pinia";
import {ussdClient} from "@/utils/clients";
import {Session} from "@/utils/types";

export const useSessionsStore = defineStore("sessions", {
    state: () => ({
        sessions: <Session[]>[],
        session: <Session>{}
    }),

    actions: {
        async fetchSessions() {
            try {
                const {data} = await ussdClient.get('/sessions')
                this.sessions = data
            } catch (e) {
                console.error(e)
            }
        },

        async setSessionFromId(id: string) {
            if (this.sessions.length === 0) {
                await this.fetchSessions()
            }

            if (Object.keys(this.session).length === 0 || this.session.id !== id) {
                let session = this.sessions.find((session: any) => session.id === id)

                if (!session) {
                    try {
                        const {data} = await ussdClient.get('/sessions/' + id)
                        session = data
                    } catch (e) {
                        console.error(e)
                    }
                }

                this.session = session || <Session>{}
            }
        }
    }
})