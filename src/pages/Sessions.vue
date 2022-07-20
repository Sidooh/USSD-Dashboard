<script setup lang="ts">
import {useSessionsStore} from "../stores/sessions"
import {computed, onMounted} from "vue"

import Grid from "../components/core/grid.vue"
import {useRouter} from "vue-router";
import {RowClickedEvent} from "ag-grid-community";

const store = useSessionsStore()
const router = useRouter()

const sessions = computed(() => store.sessions)

const columns = computed(() => [
  {
    name: 'id',
    title: '#'
  },
  {
    name: 'session_id',
    title: 'SessionId'
  },
  {
    name: 'code',
    title: 'Code'
  },
  {
    name: 'phone',
    title: 'Phone'
  },
  {
    name: 'product',
    title: 'Product'
  },
  {
    name: 'status',
    title: 'Status'
  },
])

const gridColumns = columns.value.map((c) => {
  const {name: field, title: headerName} = c

  return {
    field,
    headerName
  }
})

const rowClickedEvent = ({data}: RowClickedEvent) => {
  store.session = data
  router.push(`/sessions/${data.id}`)
}

onMounted(() => store.fetchSessions())
</script>

<template>

  <div class="card">
    <div class="card-body">
      <!--      <Table-->
      <!--          key="sessions"-->
      <!--          table-name="Sessions"-->
      <!--          :columns="columns"-->
      <!--          :rows="sessions"-->
      <!--      />-->

      <Grid
          :columns="gridColumns"
          :rows="sessions"
          @row-clicked="rowClickedEvent"
      />
    </div>
  </div>

</template>
