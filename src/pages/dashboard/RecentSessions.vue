<template>
    <SessionsTable title="Recent Sessions" :sessions="store.recentSessions" />
</template>

<script setup lang="ts">
import SessionsTable from '@/components/tables/sessions-table/SessionsTable.vue';
import { useDashboardStore } from '@/stores/dashboard';

const store = useDashboardStore();

await store.fetchRecentSessions();
</script>
