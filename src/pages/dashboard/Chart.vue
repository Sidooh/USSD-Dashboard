<template>
    <div class="mb-0 mb-xxl-3 card">
        <card-bg-corner :corner="3"/>
        <div class="card-body position-relative"
             style="height: 300px; background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0), rgba(245, 183, 0, 1))">
            <div class="position-absolute right-0 me-3 align-items-center gx-1 row justify-content-end">
                <div class="col-auto">
                    <TooltipComponent title="Refresh Chart" placement="left">
                        <LoadingButton :loading="store.chartIsLoading" class="btn btn-sm btn-outline-dark"
                                       spinner-position="replace" @click="store.fetchChartData">
                            <font-awesome-icon :icon="faSync"/>
                        </LoadingButton>
                    </TooltipComponent>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartTypeOpt">
                        <option value="time-series">Time Series</option>
                        <option value="cumulative">Cumulative</option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartPeriodOpt"
                            @change="chartFreqOpt = chartSelectOptions[chartPeriodOpt][0]">
                        <option v-for="(vt, i) in Object.values(Period)" :key="`chart-opt-${i}`"
                                :value="vt">{{ Str.headline(vt) }}
                        </option>
                    </select>
                </div>
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartFreqOpt"
                            :disabled="chartSelectOptions[chartPeriodOpt].length < 2">
                        <option :selected="i===0" v-for="(vt, i) in chartSelectOptions[chartPeriodOpt]"
                                :key="`chart-opt-${i}`" :value="vt">{{ Str.headline(vt) }}
                        </option>
                    </select>
                </div>
            </div>

            <Line :options="chartOptions" :data="chartData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { computed, ref } from "vue";
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { useDashboardStore } from "@/stores/dashboard";
import { CardBgCorner, ChartAid, chartSelectOptions, Frequency, Period, Str, Tooltip as TooltipComponent } from "@nabcellent/sui-vue";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoadingButton from "@/components/LoadingButton.vue";

const chartTypeOpt = ref<'time-series' | 'cumulative'>('time-series')
const chartFreqOpt = ref<Frequency>(Frequency.DAILY)
const chartPeriodOpt = ref<Period>(Period.LAST_THIRTY_DAYS)

const store = useDashboardStore();

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

Chart.defaults.color = '#111'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const data = computed(() => {
    if (store.chart.length < 1) return { labels: [], dataset: [] }

    const aid = new ChartAid(chartPeriodOpt.value, chartFreqOpt.value),
        data = aid.getDataset(store.chart)

    if(chartTypeOpt.value === 'cumulative') {
        data.dataset = data.dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
    }

    return data
});

const chartData = computed<ChartData<'line'>>(() => ({
    labels: data.value.labels,
    datasets: [{
        label: `No. of Sessions`,
        data: data.value.dataset,
        borderColor: ['rgba(0, 0, 0, 1)'],
        borderWidth: 2,
        tension: 0.4,
    }]
}))
const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            align: 'start',
            display: true,
            text: 'SESSIONS',
            padding: {
                bottom: 25
            },
            font: {
                size: 17
            }
        },
        legend: {
            display: false
        },
        tooltip: {
            displayColors: false,
        }
    },
    interaction: {
        intersect: false,
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: false
            },
            ticks: {
                stepSize: 1,
            }
        },
        x: {
            border: {
                display: false
            },
            grid: {
                color: 'rgba(150, 150, 150, .1)',
            }
        }
    }
}))

await store.fetchChartData()
</script>