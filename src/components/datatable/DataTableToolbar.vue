<template>
    <div class="flex items-center justify-between">
        <div class="flex flex-1 items-center space-x-2">
            <slot name="global-filter" />

            <!--            <template v-if="facetedFilters">
                <DataTableFacetedFilter
                    v-for="filter in facetedFilters"
                    :key="filter.column_id"
                    :column="table.getColumn(filter.column_id)"
                    :title="filter.title"
                    :options="filter.options"
                />
            </template>-->

            <template v-if="isFiltered">
                <Button variant="ghost" @click="handleResetFilters" class="h-8 px-2 lg:px-3">
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
            </template>
        </div>
        <DataTableViewOptions :table="table" />
    </div>
</template>

<script setup lang="ts" generic="TData">
import { computed } from 'vue';
import { type Table } from '@tanstack/vue-table';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-icons/vue';
import DataTableViewOptions from './DataTableViewOptions.vue';
import { FacetedFilterType } from '@/utils/types';

const props = defineProps<{
    table: Table<TData>;
    facetedFilters?: FacetedFilterType[];
}>();

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);

const handleResetFilters = () => {
    props.table.resetColumnFilters();
};
</script>
