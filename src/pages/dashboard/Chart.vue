<template>
    <div class="card overflow-hidden h-100">
        <div class="card-body d-flex flex-column justify-content-between"
             style="height:350px; background-image: linear-gradient(-45deg, rgba(255, 255, 255, 1), rgba(245, 183, 0, 1))">

            <Line :options="chartOptions" :data="chartData"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { computed } from "vue";
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

const store = useDashboardStore();

Chart.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

Chart.defaults.color = '#111'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const chartData = computed<ChartData<'line'>>(() => ({
    labels: store.chart.labels,
    datasets: [{
        label: `No of Sessions`,
        data: store.chart.data,
        borderColor: ['rgba(0, 0, 0, 1)'],
        borderWidth: 2,
        tension: 0.3,
    }]
}))
const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'SESSIONS PER DAY',
            font: {
                size: 17
            }
        },
        subtitle: {
            display: true,
            text: 'Last 7 days'
        },
        legend: {
            display: false
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