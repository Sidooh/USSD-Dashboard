<template>
    <div class="row g-3">
        <div class="col-xxl-9">
            <ComponentLoader>
                <Chart/>
            </ComponentLoader>
        </div>
        <div class="col">
            <ComponentLoader>
                <Statistics/>
            </ComponentLoader>
        </div>
    </div>

    <ComponentLoader>
        <RecentSessions/>
    </ComponentLoader>
</template>

<script setup lang="ts">
import Chart from "@/pages/dashboard/Chart.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
import RecentSessions from "@/pages/dashboard/RecentSessions.vue";
import Statistics from "@/pages/dashboard/Summaries.vue";
</script>