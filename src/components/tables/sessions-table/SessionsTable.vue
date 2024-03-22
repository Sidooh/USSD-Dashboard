<template>
    <DataTable :title="title ?? 'Sessions'" :data="sessions" :columns="columns" />
</template>

<script setup lang="ts">
import { Session } from '@/utils/types';
import { columns } from '@/components/tables/sessions-table/columns';
import DataTable from '@/components/datatable/DataTable.vue';

defineProps<{ title?: string; sessions: Session[] }>();
</script>
