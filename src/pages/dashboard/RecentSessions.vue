<template>
    <SessionsTable title="Recent Sessions" :sessions="store.recentSessions"/>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SessionsTable from "@/components/tables/SessionsTable.vue";
import { useDashboardStore } from "@/stores/dashboard";

const store = useDashboardStore()
const router = useRouter()

await store.fetchRecentSessions()
</script>
