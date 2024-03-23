<script setup lang="ts">
import SessionsTable from '@/components/tables/sessions-table/SessionsTable.vue';
import { useSessionsStore } from '@/stores/sessions.ts';
import { computed } from 'vue';

const store = useSessionsStore();

const sessions = computed(() => store.sessions);

await store.fetchSessions();
</script>

<template>
    <SessionsTable title="Sessions" :sessions="sessions" />
</template>
