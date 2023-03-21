<template>
    <div class="mb-0 mb-xxl-3 card">
        <card-bg-corner :corner="3"/>
        <div class="card-body d-flex flex-column justify-content-between"
             style="height: 300px; background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0), rgba(245, 183, 0, 1))">
            <div class="position-absolute right-0 me-3 align-items-center gx-1 row justify-content-end">
                <div class="col-auto">
                    <select class="form-select form-select-sm px-2" v-model="chartSelect">
                        <option v-for="(vt, i) in Object.keys(store.chart)" :key="`chart-opt-${i}`"
                                :value="vt">{{ vt.replaceAll('_', ' ').toUpperCase() }}
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
import { CardBgCorner } from "@nabcellent/sui-vue";

const chartSelect = ref<string>("LAST_7_DAYS")

const store = useDashboardStore();

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

Chart.defaults.color = '#111'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const chartData = computed<ChartData<'line'>>(() => ({
    labels: store.chart[chartSelect.value].labels,
    datasets: [{
        label: `No of Sessions`,
        data: store.chart[chartSelect.value].data,
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
            display: true,
            text: 'SESSIONS',
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