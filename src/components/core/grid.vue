<script setup lang="ts">
import {AgGridVue} from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import {PropType} from "vue";
import {RowClickedEvent} from "ag-grid-community";

interface Column {
  field: string,
  headerName: string
}

const props = defineProps({
  tableName: String,
  columns: {
    type: Object as PropType<Column[]>,
    required: true
  },
  rows: {
    type: Array,
    required: true
  }
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
};

const emit = defineEmits(['rowClicked'])
const rowClicked = (e: RowClickedEvent) => {
  emit('rowClicked', e)
}
</script>

<template>

  <ag-grid-vue
      class="ag-theme-alpine"
      style="min-height: 500px;max-height: calc(100vh - 250px);height: 800px"
      :columnDefs="columns"
      :rowData="rows"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      @row-clicked="rowClicked"
  />

</template>

<style lang="scss">

</style>