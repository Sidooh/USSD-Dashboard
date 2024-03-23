<template>
    <SessionsTable title="Sessions" :sessions="sessions" />
</template>

<script setup lang="ts">
import { useSessionsStore } from '@/stores/sessions';
import { computed, onMounted } from 'vue';
import SessionsTable from '@/components/tables/sessions-table/SessionsTable.vue';

const store = useSessionsStore();

const sessions = computed(() => store.sessions);

onMounted(() => store.fetchSessions());
</script>
