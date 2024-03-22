<script setup lang="ts">
import { Table } from '@tanstack/vue-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const props = defineProps<{
    table: Table<TData>;
}>();

const goToPage = (e: Event) => {
    const target = e.target as HTMLInputElement;
    let page = target.value ? Number(target.value) - 1 : 0;

    page = props.table.getPageCount() > page ? page : props.table.getPageCount() - 1;
    props.table.setPageIndex(page);
};
</script>

<template>
    <div class="flex items-center justify-between px-2 overflow-x-auto gap-3 text-nowrap text-xs md:text-sm">
        <div class="flex items-center flex-1 text-muted-foreground divide-x divide-dashed space-x-2">
            <div class="flex items-center justify-center font-medium">
                Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
            </div>
            <span class="ps-2" v-if="table.getIsSomeRowsSelected()">
                {{ table.getFilteredSelectedRowModel().rows.length }} of
                {{ table.getFilteredRowModel().rows.length }} row(s)
            </span>
            <span class="ps-2"
                >Total: <b>{{ table.getCoreRowModel().rows.length }}</b></span
            >
            <span class="flex items-center ps-2">
                <span class=""> Go to page: </span>
                <Input
                    type="number"
                    :value="table.getState().pagination.pageIndex + 1"
                    @change="goToPage"
                    step="1"
                    min="1"
                    :max="table.getPageCount()"
                    class="w-14 p-2 h-7"
                />
            </span>
        </div>

        <div class="flex items-center space-x-6 lg:space-x-8">
            <div class="flex items-center space-x-2">
                <p class="font-medium">Rows per page</p>
                <Select
                    :model-value="`${table.getState().pagination.pageSize}`"
                    @update:model-value="table.setPageSize"
                >
                    <SelectTrigger class="h-8 w-[70px]">
                        <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
                    </SelectTrigger>
                    <SelectContent side="top">
                        <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                            {{ pageSize }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex items-center space-x-2">
                <Button
                    variant="outline"
                    class="h-8 w-8 p-0"
                    @click="table.setPageIndex(0)"
                    :disabled="!table.getCanPreviousPage()"
                >
                    <span class="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon class="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    class="h-8 w-8 p-0"
                    @click="table.previousPage()"
                    :disabled="!table.getCanPreviousPage()"
                >
                    <span class="sr-only">Go to previous page</span>
                    <ChevronLeftIcon class="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    class="h-8 w-8 p-0"
                    @click="table.nextPage()"
                    :disabled="!table.getCanNextPage()"
                >
                    <span class="sr-only">Go to next page</span>
                    <ChevronRightIcon class="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    class="h-8 w-8 p-0"
                    @click="table.setPageIndex(table.getPageCount() - 1)"
                    :disabled="!table.getCanNextPage()"
                >
                    <span class="sr-only">Go to last page</span>
                    <DoubleArrowRightIcon class="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
</template>
