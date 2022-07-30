<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  useVueTable,
} from '@tanstack/vue-table'
import {PropType} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  title: String,
  columns: {
    type: Object as PropType<any>,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})

const pageSizes = [10, 20, 30, 40, 50];

const table = useVueTable({
  get data() {
    return props.data
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

const goToPage = (e: Event) => {
  const target = (e.target as HTMLInputElement)
  const page = target.value ? Number(target.value) - 1 : 0
  table.setPageIndex(page)
}

const setPageSize = (e: Event) => {
  const target = (e.target as HTMLSelectElement)
  table.setPageSize(Number(target.value))
}

const emit = defineEmits(['rowClicked'])
const handleRowClick = (row: Row<unknown>) => {
  emit('rowClicked', row.original)
}
</script>

<template>
  <div id="table">
    <div class="my-3 row">
      <div class="col">
        {{ title }}
      </div>
      <div class="col">
        <input class="search form-control w-50 float-end"/>
      </div>
    </div>
    <div class="table-responsive scrollbar">
      <table class="table table-bordered table-striped fs--1 mb-0">
        <thead class="bg-200 text-900">
        <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
        >
          <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
          >
            <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
            />
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" @click="handleRowClick(row)">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
            />
          </td>
        </tr>
        </tbody>
      </table>

      <div class="h-2"/>
      <div class="flex items-center gap-2">
        <button
            class="border rounded p-1"
            @click="() => table.setPageIndex(0)"
            :disabled="!table.getCanPreviousPage()"
        >
          &lt;&lt;
        </button>
        <button
            class="border rounded p-1"
            @click="() => table.previousPage()"
            :disabled="!table.getCanPreviousPage()"
        >
          &lt;
        </button>
        <button
            class="border rounded p-1"
            @click="() => table.nextPage()"
            :disabled="!table.getCanNextPage()"
        >
          &gt;
        </button>
        <button
            class="border rounded p-1"
            @click="() => table.setPageIndex(table.getPageCount() - 1)"
            :disabled="!table.getCanNextPage()"
        >
          &gt;&gt;
        </button>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {{ table.getState().pagination.pageIndex + 1 }} of {{ ' ' }}
            {{ table.getPageCount() }}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              :value="table.getState().pagination.pageIndex + 1"
              @change="goToPage"
              class="border p-1 rounded w-16"
          />
        </span>
        <select
            :value="table.getState().pagination.pageSize"
            @change="setPageSize"
        >
          <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
            Show {{ pageSize }}
          </option>
        </select>
      </div>
      <div>{{ table.getRowModel().rows.length }} Rows</div>
      <pre>{{ JSON.stringify(table.getState().pagination, null, 2) }}</pre>

    </div>
  </div>

</template>

<style scoped>
</style>