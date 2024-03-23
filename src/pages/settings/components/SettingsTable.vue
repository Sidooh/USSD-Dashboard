<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings.ts';
import { computed } from 'vue';
import { columns } from '@/pages/settings/table/columns.ts';
import DataTable from '@/components/datatable/DataTable.vue';

const store = useSettingsStore();

const settings = computed(() => store.settings);

await store.fetchSettings();
</script>

<template>
    <DataTable :columns="columns" :data="settings" title="Settings" />
</template>
