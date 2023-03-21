import { defineStore } from "pinia";
import moment from "moment";
import { ussdClient } from "@/utils/clients";
import { Session } from "@/utils/types";
import { logger } from "@/utils/logger";
import { RawAnalytics } from "@nabcellent/sui-vue";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        chartIsLoading: false,
        chart: <RawAnalytics[]>[],
        recentSessions: <Session[]>[],
        summaries: {
            sessions_count: {
                total: 0,
                today: 0
            },
            ussd_balance: 0
        }
    }),

    actions: {
        async fetchChartData() {
            try {
                this.chartIsLoading = true

                const { data: { data: res } } = await ussdClient.get('/dashboard/chart')

                this.chart = res

                this.chartIsLoading = false
            } catch (e) {
                console.error(e)
            }
        },
        async fetchRecentSessions() {
            try {
                const { data } = await ussdClient.get('/dashboard/recent-sessions')

                this.recentSessions = data.data
            } catch (e) {
                console.error(e)
            }
        },

        async fetchSummaries() {
            try {
                const { data } = await ussdClient.get('/dashboard/summaries')

                this.summaries = data.data
            } catch (e) {
                logger.error(e)
            }
        },
    }
})