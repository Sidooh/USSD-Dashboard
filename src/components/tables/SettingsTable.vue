<template>
  <div class="card">
    <div class="card-body">
      <DataTable :title="title??'Settings'" :data="settings" :columns="columns"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Setting} from "@/utils/types";
import {CellContext, createColumnHelper} from "@tanstack/vue-table";
import {DataTable} from "@nabcellent/sui-vue";
import {h} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import {RouterLink} from "vue-router";

defineProps<{ title?: string, settings: Setting[] }>()

const columnHelper = createColumnHelper<Setting>(),
    columns = [
      columnHelper.accessor('name', {
        header: 'Name',
      }),
      columnHelper.accessor('value', {
        header: 'Value',
      }),
      {
        id: 'actions',
        header: '',
        cell: ({row: {original}}: CellContext<Setting, string>) => h('div', {class: 'd-flex justify-content-evenly'}, [
          h(
              RouterLink,
              {to: {name: 'settings'}},
              () => h(FontAwesomeIcon, {icon: faPencil})
          ),
        ])
      },
    ]
</script>

<style scoped>

</style>