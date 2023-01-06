import { defineStore } from "pinia";
import moment from "moment";
import { ussdClient } from "@/utils/clients";
import { Session } from "@/utils/types";
import { groupBy } from "@/utils/helpers";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        chart: <{ [k: string]: { labels: string[], data: number[] } }>{ LAST_7_DAYS: { labels: [], data: [] } },
    }),

    actions: {
        async fetchChartData() {
            try {
                const { data: res } = await ussdClient.get('/sessions/logs')
                const getDataset = (duration: number) => {
                    const dataset: Session[] = res.filter((sess: Session) => moment(sess.created_at).isAfter(moment().subtract(duration, 'd')))
                        .map((d: Session) => ({ date: moment(d.created_at).format('Do MMM') }))

                    const byDay = groupBy(dataset, 'date')

                    let labels = [], data = []
                    for (let i = duration; i >= 0; i--) {
                        let day = moment().subtract(i, 'd').format('Do MMM'),
                            label = day

                        if (i === 0) label = 'Today'
                        if (i === 1) label = 'Yesterday'

                        labels.push(label)
                        data.push(!byDay[day] ? 0 : byDay[day].length)
                    }

                    return { labels, data }
                }

                this.chart.LAST_7_DAYS = getDataset(7)
                this.chart.LAST_30_DAYS = getDataset(30)
            } catch (e) {
                console.error(e)
            }
        },
    }
})