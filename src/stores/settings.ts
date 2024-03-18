import {defineStore} from "pinia";
import {ussdClient} from "@/utils/clients";
import {Setting} from "@/utils/types";

export const useSettingsStore = defineStore("settings", {
    state: () => ({
        settings: <Setting[]>[],
        setting: <Setting>{}
    }),

    actions: {
        async fetchSettings() {
            try {
                const {data} = await ussdClient.get('/settings')
                this.settings = data
            } catch (e) {
                console.error(e)
            }
        },

        async setSetting(name: string, value: string) {
            try {
                const {data} = await ussdClient.post('/settings/' + name, {value})

                await this.fetchSettings()
            } catch (e) {
                console.error(e)
            }
        }
    }
})