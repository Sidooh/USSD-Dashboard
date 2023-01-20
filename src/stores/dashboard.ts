import { defineStore } from "pinia";
import moment from "moment";
import { ussdClient } from "@/utils/clients";
import { Session } from "@/utils/types";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        chart: <{ [k: string]: { labels: string[], data: number[] } }>{ LAST_7_DAYS: { labels: [], data: [] } },
        recentSessions: <Session[]>[]
    }),

    actions: {
        async fetchChartData() {
            try {
                const { data: res } = await ussdClient.get('/dashboard/chart')

                const getDataset = (duration: number) => {
                    let labels: string[] = [], data: number[] = []

                    for (let i = duration; i >= 0; i--) {
                        const day = moment().subtract(i, 'd')
                        const label = day.format('Do MMM')

                        const existingSet = res?.find((x: any) => x.date == day.format('YYYYMMD'))

                        labels.push(label)
                        data.push(existingSet ? existingSet.count : 0)
                    }

                    return {labels, data}
                }

                this.chart.LAST_7_DAYS = getDataset(7)
                this.chart.LAST_30_DAYS = getDataset(30)
            } catch (e) {
                console.error(e)
            }
        },
        async fetchRecentSessions() {
            try {
                const { data } = await ussdClient.get('/dashboard/recent-sessions')

                this.recentSessions = data
            } catch (e) {
                console.error(e)
            }
        },
    }
})