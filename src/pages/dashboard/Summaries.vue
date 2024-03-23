<template>
    <Card class="relative lg:col-span-3 flex items-center">
        <card-bg-corner
            class="absolute w-full min-h-full overflow-hidden will-change-[transform,opacity,filter] bg-no-repeat z-0 left-0 top-0 bg-contain bg-right rounded-tr-md rounded-br-md;"
        />
        <div class="ps-6 relative space-y-3">
            <h6>Sessions</h6>
            <h5 class="fw-normal text-700 m-0">
                <count-up :end-val="store.summaries?.sessions_count?.total" />
            </h5>
        </div>
        <div class="absolute top-0 end-0 m-3">
            <Badge class="rounded-full">
                <count-up :end-val="store.summaries?.sessions_count?.today" class="h-100" />
            </Badge>
        </div>
    </Card>
    <Card class="relative lg:col-span-3 flex items-center">
        <card-bg-corner
            :corner="2"
            class="absolute w-full min-h-full overflow-hidden will-change-[transform,opacity,filter] bg-no-repeat z-0 left-0 top-0 bg-contain bg-right rounded-tr-md rounded-br-md;"
        />
        <div class="ps-6 relative space-y-3">
            <h6>USSD Balance</h6>
            <h5 class="fw-normal text-700 m-0">
                <count-up :end-val="store.summaries?.ussd_balance" :options="{ prefix: 'KES ' }" />
            </h5>
        </div>
    </Card>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3';
import { useDashboardStore } from '@/stores/dashboard';
import { CardBgCorner } from '@nabcellent/sui-vue';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const store = useDashboardStore();

await store.fetchSummaries();
</script>
