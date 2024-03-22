<template>
    <DataTable :columns="columns" :data="settings" title="Settings" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import DataTable from '@/components/datatable/DataTable.vue';
import { columns } from '@/pages/settings/table/columns';

const store = useSettingsStore();

const settings = computed(() => store.settings);

onMounted(() => store.fetchSettings());
</script>
