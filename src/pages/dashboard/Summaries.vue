<template>
    <div class="g-3 mb-3 h-100 row">
        <div class="col-md-6 col-xxl-12">
            <div class="card h-md-100">
                <card-bg-corner />
                <div class="card-body position-relative d-flex flex-column justify-content-center">
                    <h6 class="mb-md-0 mb-lg-2">Sessions</h6>
                    <h5 class="fw-normal text-700 m-0">
                        <count-up :end-val="store.summaries?.sessions_count?.total" />
                    </h5>
                    <div class="position-absolute top-0 end-0 m-3">
                        <Badge pill>
                            <count-up :end-val="store.summaries?.sessions_count?.today" class="h-100" />
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xxl-12">
            <div class="card h-md-100 bg-line-chart-gradient">
                <card-bg-corner :corner="2" />
                <div class="card-body position-relative d-flex flex-column justify-content-center">
                    <h6 class="mb-3">USSD Balance</h6>
                    <h5 class="fw-normal text-700 m-0">
                        <count-up :end-val="store.summaries?.ussd_balance" :options="{ prefix: 'KES ' }" />
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3';
import { useDashboardStore } from '@/stores/dashboard';
import { Badge, CardBgCorner } from '@nabcellent/sui-vue';

const store = useDashboardStore();

await store.fetchSummaries();
</script>
