<template>
    <ComponentLoader class="lg:h-[40rem] w-full">
        <SessionsTable />
    </ComponentLoader>
</template>

<script setup lang="ts">
import ComponentLoader from '@/components/loaders/ComponentLoader.vue';
import SessionsTable from '@/pages/sessions/components/SessionsTable.vue';
</script>
