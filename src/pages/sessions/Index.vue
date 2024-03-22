<template>
    <SessionsTable title="Sessions" :sessions="sessions" />
</template>

<script setup lang="ts">
import { useSessionsStore } from '@/stores/sessions';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SessionsTable from '@/components/tables/sessions-table/SessionsTable.vue';

const store = useSessionsStore();
const router = useRouter();

const sessions = computed(() => store.sessions);

onMounted(() => store.fetchSessions());
</script>
