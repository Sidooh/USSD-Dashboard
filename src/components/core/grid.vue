<script setup lang="ts">
import {AgGridVue} from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {PropType} from "vue";
import {Column} from "ag-grid-community"; // Optional theme CSS

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

</script>

<template>

  <ag-grid-vue
      class="ag-theme-material"
      style="height: 500px"
      :columnDefs="columns"
      :rowData="rows"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
  />

</template>

<style lang="scss">

</style>