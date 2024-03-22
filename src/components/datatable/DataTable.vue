<script setup lang="ts">
import type { ColumnDef, ColumnFiltersState, FilterFn, SortingState, VisibilityState } from '@tanstack/vue-table';
import {
    FlexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardTitle } from '@/components/ui/card';
import DataTablePagination from '@/components/datatable/DataTablePagination.vue';
import { h, ref } from 'vue';
import { valueUpdater } from '@/lib/utils';
import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from '@radix-icons/vue';
import { Input } from '@/components/ui/input';
import DataTableToolbar from '@/components/datatable/DataTableToolbar.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { FacetedFilterType } from '@/utils/types';
import { rankItem } from '@tanstack/match-sorter-utils';

const props = defineProps<{
    title?: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    facetedFilters?: FacetedFilterType[];
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const globalFilter = ref<string | number>('');
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

const setGlobalFilter = (value: string | number) => setTimeout(() => (globalFilter.value = value), 700);

const fuzzyFilter: FilterFn<TData> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const table = useVueTable({
    get columns() {
        return [
            {
                id: 'select',
                header: ({ table }) =>
                    h(Checkbox, {
                        class: 'border-0 hover:border hover:border-gray-200',
                        checked: table.getIsAllPageRowsSelected(),
                        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
                        ariaLabel: 'Select all',
                    }),
                cell: ({ row }) =>
                    h(Checkbox, {
                        class: 'border-0 hover:border hover:border-gray-200',
                        checked: row.getIsSelected(),
                        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
                        ariaLabel: 'Select row',
                    }),
                enableSorting: false,
                enableHiding: false,
            },
            ...props.columns,
        ];
    },
    get data() {
        return props.data;
    },

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(), //  TODO: Test & Fix faceted filter error
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    globalFilterFn: fuzzyFilter,

    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),

    state: {
        get sorting() {
            return sorting.value;
        },
        get globalFilter() {
            return globalFilter.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get columnVisibility() {
            return columnVisibility.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
    },
});
</script>

<template>
    <Card class="rounded-md border-0 p-3 lg:p-6 space-y-3">
        <CardTitle v-if="title" class="flex items-end flex-col">
            <p class="text-xs lg:text-base lg:px-3">{{ title }}</p>
            <hr class="w-1/2 lg:w-1/5 mt-1" />
        </CardTitle>

        <DataTableToolbar :table="table" :faceted-filters="facetedFilters">
            <template v-slot:global-filter
                ><Input
                    class="h-8 w-[150px] lg:w-[250px]"
                    placeholder="Search table..."
                    @update:model-value="setGlobalFilter"
                />
            </template>
        </DataTableToolbar>

        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <div
                            v-if="!header.isPlaceholder"
                            class="flex items-center -ml-4 h-8 px-3 data-[state=open]:bg-accent text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                            @click="header.column.getToggleSortingHandler()"
                        >
                            <span class="font-bold text-xs md:text-sm">
                                <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                            </span>
                            <template v-if="header.column.getCanSort()">
                                <CaretUpIcon v-if="header.column.getIsSorted() == 'asc'" class="ml-2 h-4 w-4" />
                                <CaretDownIcon v-else-if="header.column.getIsSorted() == 'desc'" class="ml-2 h-4 w-4" />
                                <CaretSortIcon v-else class="ml-2 h-4 w-4" />
                            </template>
                        </div>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined"
                    >
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" className="text-xs md:text-sm">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colSpan="columns.length" class="h-24 text-center"> No results.</TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>

        <DataTablePagination :table="table" />
    </Card>
</template>
