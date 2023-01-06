<template>
    <div class="row g-3 mb-3">
        <div class="col-xxl-12">
            <ComponentLoader>
                <Chart/>
            </ComponentLoader>
        </div>
    </div>
</template>

<script setup lang="ts">

import Chart from "@/pages/dashboard/Chart.vue";
import ComponentLoader from "@/components/loaders/ComponentLoader.vue";
</script>