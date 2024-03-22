<template>
    <div class="grid lg:grid-cols-12 gap-3 mb-3">
        <div class="lg:col-span-9 row-span-2">
            <ComponentLoader>
                <Chart />
            </ComponentLoader>
        </div>
        <ComponentLoader>
            <Statistics />
        </ComponentLoader>
    </div>

    <ComponentLoader>
        <RecentSessions />
    </ComponentLoader>
</template>

<script setup lang="ts">
import Chart from '@/pages/dashboard/Chart.vue';
import ComponentLoader from '@/components/loaders/ComponentLoader.vue';
import RecentSessions from '@/pages/dashboard/RecentSessions.vue';
import Statistics from '@/pages/dashboard/Summaries.vue';
</script>
